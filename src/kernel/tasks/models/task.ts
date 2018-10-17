import { TaskOwner } from '../types/taskOwner.enum';
import State from '../types/state.enum';

export class Task {
    private pid: number;
    private worker: Worker | null;
    private taskOwner: TaskOwner;
    private priority: number;
    private state: State;
    private parentTask: Task;
    private children: Task[];

    constructor(pid: number, worker?: Worker, taskOwner?: TaskOwner, priority?: number, state?: State, parentTask?: Task) {
        if (!pid) {
            throw Error("Procees PID must be defined");
        }
        this.pid = pid;
        this.taskOwner = taskOwner || TaskOwner.USER;
        this.priority = priority || 0;
        this.state = state || State.CREATED;
        this.parentTask = parentTask || this;
        this.worker = worker || null;
        this.children = new Array();
    }

    public addChildTask(task: Task) {
        this.children.push(task);
    }

    public get Children(): Task[] {
        return this.children;
    }
    public get Worker(): Worker | null {
        return this.worker;
    }

    public set Worker(worker: Worker | null) {
        this.worker = worker;
    }

    public get Pid(): number {
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