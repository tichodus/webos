import scheduler, { Scheduler } from '../scheduler/scheduler';
import taskManager from '../task/taskManager';

export class Interupter {
    private sch: Scheduler;

    constructor(sch: Scheduler) {
        this.sch = sch;
    }

    public interupt(taskId: number) {
        if (this.isInReadyQueue(taskId)) {
            this.interuptReadyTask(taskId)
            return;
        }

        if (this.isInWorkingQueue(taskId)) {
            this.interuptWorkingTask(taskId);
            return;
        }

        throw Error("No task with given id to interupt!");
    }

    private isInWorkingQueue(taskId: number) {
        return this.sch.getWorkingTask(taskId) ? true : false;
    }

    private isInReadyQueue(taskId: number) {
        return this.sch.getReadyTask(taskId) ? true : false;
    }

    private interuptWorkingTask(taskId: number) {
        taskManager.terminate(taskId);
    }

    private interuptReadyTask(taskId: number) {
        const removedTask = this.sch.removeFromReadyQueue(taskId);
        this.sch.prepareForScheduling(removedTask);
    }
}

const interupter = new Interupter(scheduler);
export default interupter;