import { TaskOwner } from '../types/taskOwner.enum';
import State from '../types/state.enum';
import Task from './task';

export class TasksTable {
    private pid: number;
    private taskOwner: TaskOwner;
    private priority: number;
    private state: State;
    private parentTask: Task;

    constructor(pid: number, taskOwner: TaskOwner, priority: number, state: State, parentTask: Task) {
        if (!pid) {
            throw Error("Procees PID must be defined");
        }
        this.pid = pid;
        this.taskOwner = taskOwner || TaskOwner.USER;
        this.priority = priority || 0;
        this.state = state || State.CREATED;
        this.parentTask = parentTask || null;
    }

    public Pid(): number {
        return this.pid;
    }

    public get TaskOwner(): TaskOwner {
        return this.taskOwner;
    }

    public set TaskOwner(taskOwner: TaskOwner) {
        this.taskOwner = taskOwner;
    }

    public get Priority(): number {
        return this.priority;
    }

    public set Priority(priority: number) {
        this.priority = priority;
    }

    public get State(): State {
        return this.state;
    }

    public set State(state: State) {
        this.state = state;
    }

    public get ParentTask(): Task {
        return this.parentTask;
    }

    public set ParentTask(parentTask: Task) {
        this.parentTask = parentTask;
    }


}