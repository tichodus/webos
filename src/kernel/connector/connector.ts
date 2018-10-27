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
            this.task.Worker.postMessage(message);
        }
    }

    private initWindow(options: WindowOptions) {
        options.onDialogClose = () => {
            interupter.interupt(this.task.Pid);
        }
        this.window = WindowManager.createWindow(options);
        this.window.render();
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