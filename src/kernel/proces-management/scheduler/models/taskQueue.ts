import { Task } from '../../task/task';
import { MessageType } from '../../../types/message.enum';

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
        task.Worker.postMessage(JSON.stringify({ type: MessageType.RUN }));
    }

    public prepareTask(task: Task) {
        this.readyQueue.push(task);
    }

    public getWorkingTask(taskId: number): Task | null {
        const workingTask = this.workingQueue.find((task: Task) => task.Pid === taskId);
        if (!workingTask) {
            return null;
        }
        return workingTask;
    }

    public getReadyTask(taskId: number): Task | null {
        const readyTask = this.readyQueue.find((task: Task) => task.Pid === taskId);
        if (!readyTask) {
            return null
        }

        return readyTask;
    }

    public removeFromReadyQueue(taskId: number) {
        this.readyQueue = this.readyQueue.filter((task: Task) => task.Pid !== taskId);
    }

    public removeFromWorkingQueue(taskId: number) {
        this.workingQueue = this.workingQueue.filter((task: Task) => task.Pid !== taskId);
    }

    public notifyWorking(message: string) {
        this.workingQueue.forEach((task: Task) => {
            if (task.Worker) {
                task.Worker.postMessage(message);
            }
        });
    }
}