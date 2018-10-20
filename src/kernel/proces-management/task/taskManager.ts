import { Task } from './task';
import tasksTable, { TasksTable } from './tasksTable';
import { Job } from './types/job';
import scheduler from '../scheduler/scheduler';

class TaskManager {
    private availableIds: number;
    private tasksTable: TasksTable;

    constructor(table: TasksTable) {
        this.availableIds = 1 // 0 is browser's main thread;
        this.tasksTable = table;
    }

    public fork(): Task {
        const task = new Task(this.availableIds++);
        this.tasksTable.register(task);
        return task;
    }

    public run(task: Task) {
       scheduler.prepareForScheduling(task);
    }

    public beforeTerminate(taskId: number, callback: () => void) {
        callback();
        this.terminate(taskId);
    }

    public setJobForTask(job: Job) {
        const worker = new Worker(URL.createObjectURL(new Blob(['(' + job.job + ')()'])));
        this.tasksTable.getTask(job.taskId).Worker = worker;
    }

    public terminate(taskId: number) {
        const taskWorker = this.tasksTable.getTask(taskId).Worker;
        if (taskWorker) {
            taskWorker.terminate();
        }
        this.tasksTable.removeFromTable(taskId);
    }

    public spawnWorker(callback: () => void) {
        return new Worker(URL.createObjectURL(new Blob(['('+callback + ')()'])));
    }
}

const taskManager = new TaskManager(tasksTable);
export default taskManager;