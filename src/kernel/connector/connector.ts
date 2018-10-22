import { Task } from '../proces-management/task/task';



export interface Application {
    main?: () => void,
}

export interface ConnectorHooks {
    onRender?: (content:any) => void
}
export class Connector {
    private task: Task;
    private hooks: ConnectorHooks;

    constructor(task: Task, hooks: ConnectorHooks) {
        this.task = task;
        this.hooks = hooks;
    }

    public render() {
        const taskWorker = this.task.Worker;
        if (!taskWorker) {
            return;
        }
        taskWorker.postMessage("render");

        taskWorker.onmessage = (event: MessageEvent) => {
            if (this.hooks && this.hooks.onRender) {
                const jsx:any = JSON.parse(event.data);
                this.hooks.onRender(jsx);
            }
        }
    }


}