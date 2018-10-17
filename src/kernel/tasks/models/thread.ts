export class Thread {
    private worker: Worker;
    private threadId: number;

    constructor(worker: Worker, threadId: number) {
        this.worker = worker;
        this.threadId = threadId;
    }

    get Worker(): Worker {
        return this.worker;
    }

    get ThreadId(): number {
        return this.threadId;
    }
}