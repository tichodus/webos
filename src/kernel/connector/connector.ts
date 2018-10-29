import { Task } from '../proces-management/task/task';
import { Message, MessageType } from '../types/message.enum';
import { WindowOptions, Window } from 'src/shell/window/window';
import { WindowManager } from 'src/shell/window-manager/window.manager';
import { Renderer } from 'src/shell/window-manager/renderer';
import interupter from '../proces-management/interupter/interupter';



export class Connector {
    private task: Task;
    private window: Window

    constructor(task: Task) {
        this.task = task;
        if (this.task.Worker) {
            this.task.Worker.onmessage = (event: MessageEvent) => this.onMessageRecieved(JSON.parse(event.data));
        }
    }

    public render(jsxJson: JSON) {
        const jsx: JSX.Element = Renderer.render(jsxJson);
        if (!this.window) {
            throw Error("Window is not initiated.");
        }
        this.window.setWindowContent(jsx);
    }


    public notify(message: Message) {
        if (this.task.Worker) {
            this.task.Worker.postMessage(JSON.stringify(message));
        }
    }

    private initWindow(options: WindowOptions) {
        options.onDialogClose = () => {
            interupter.interupt(this.task.Pid);
        }
        this.window = WindowManager.createWindow(options);
        this.window.render();
        if (this.window.parent) {
            this.window.parent.addEventListener("click", ($event) => {
                this.notify({ type: MessageType.WITHOUTPARAMS, data: ($event.target as any).id })
            });
            this.window.parent.addEventListener("keyup", ($event) => {
                this.notify({ type: MessageType.WITHPARAMS, data: ($event.target as any).id, params:($event.target as any).innerHtml});
            });
            this.window.parent.addEventListener("change", ($event) => {
                this.notify({ type: MessageType.WITHPARAMS, data: ($event.target as any).id, params:($event.target as any).value});
            });
        }
    }

    private onMessageRecieved(message: Message) {
        switch (message.type) {
            case MessageType.RENDER:
                this.render(JSON.parse(message.data));
                break;
            case MessageType.INITWINDOW:
                this.initWindow(JSON.parse(message.data));
                break;
        }
    }
}