import { TaskQueue } from './models/taskQueue';
import { Task } from '../task/task';

export class Scheduler {
    private queue: TaskQueue;
    private timeoutId: NodeJS.Timeout;

    constructor(queue: TaskQueue) {
        this.queue = queue;
    }

    public startScheduling() {
        this.timeoutId = setInterval(() => this.queue.schedule(), 10);
    }

    public stopScheduling() {
        clearInterval(this.timeoutId);
    }

    public prepareForScheduling(task: Task) {
        this.queue.prepareTask(task);
    }

    public getWorkingTask(taskId: number) {
        return this.queue.getWorkingTask(taskId);
    }

    public getReadyTask(taskId: number): Task {
        return this.queue.getReadyTask(taskId);
    }

    public removeFromReadyQueue(taskId: number): Task {
        const taskToRemove: Task = this.getReadyTask(taskId);
        if (!taskToRemove) {
            throw Error("Task for removal is not in the ready queue");
        }
        this.queue.removeFromReadyQueue(taskId);
        return taskToRemove;
    }

    public removeFromWorkingQueue(taskId: number): Task {
        const taskToRemove: Task = this.getWorkingTask(taskId);
        if (!taskToRemove) {
            throw Error("Task for removal is not in the working queue");
        }

        this.queue.removeFromWorkingQueue(taskId);
        return taskToRemove;
    }

}

const scheduler: Scheduler = new Scheduler(new TaskQueue());
export default scheduler;