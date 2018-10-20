import { Task } from '../../task/task';
import { Messages } from '../../task/types/message.enum';

export class TaskQueue {
    private readyQueue: Task[];
    private workingQueue: Task[];

    constructor() {
        this.readyQueue = new Array<Task>();
        this.workingQueue = new Array<Task>();
    }

    public schedule() {
        const task = this.readyQueue.shift();
        if (!task) {
            return;
        }

        if (!task.Worker) {
            throw Error("Task has no job to do.");
        }
        this.workingQueue.push(task);
        task.Worker.postMessage(Messages.RUN)
    }

    public prepareTask(task: Task) {
        this.readyQueue.push(task);
    }

    public getWorkingTask(taskId: number): Task {
        const workingTask = this.workingQueue.find((task: Task) => task.Pid === taskId);
        if (!workingTask) {
            throw Error("No task with given id is in the working queue");
        }
        return workingTask;
    }

    public getReadyTask(taskId: number): Task {
        const readyTask = this.readyQueue.find((task: Task) => task.Pid === taskId);
        if (!readyTask) {
            throw Error("No task with given id is in the ready queue");
        }

        return readyTask;
    }

    public removeFromReadyQueue(taskId: number) {
        this.readyQueue = this.readyQueue.filter((task: Task) => task.Pid !== taskId);
    }

    public removeFromWorkingQueue(taskId: number) {
        this.workingQueue = this.workingQueue.filter((task: Task) => task.Pid !== taskId);
    }
}