import State from '../types/state.enum';
import { Thread } from './thread';

class Task {
    private pid: number;
    private state: State;
    private threads: Thread[];

    constructor(pid: number, thread: Thread) {
        this.pid = pid;
        this.state = State.CREATED;
        this.threads = [thread];
    }

    public get Pid(): number {
        return this.pid;
    }

    public get State(): State {
        return this.state;
    }

    public set State(state: State) {
        this.state = state;
    }

    public get Threads(): Thread[] {
        return this.threads;
    }

    public addThread(thread: Thread) {
        this.threads.push(thread);
    }

    public removeThread(thread: number | Thread) {
        if (typeof thread === "object") {
            this.threads = this.threads.filter((currentThread: Thread) => currentThread.ThreadId !== thread.ThreadId);
        }
        else {
            this.threads = this.threads.filter((currentThread: Thread) => currentThread.ThreadId !== thread);
        }
    }
}

export default Task;