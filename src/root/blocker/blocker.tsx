import * as React from 'react';
import { Message, MessageType, DomActions } from 'src/kernel/types/message.enum';
import { WindowOptions } from 'src/shell/window/window';
const ctx = self as any;
class Application {
    private eventRegister: Map<string, () => void>;
    private counter: number;

    constructor() {
        this.eventRegister = new Map();
        this.eventRegister.set('block', this.block);
        this.counter = 0;
    }
    public main() {
        const windowOptions: WindowOptions = {
            subtitle: "Test app",
        }

        const message: Message = {
            data: JSON.stringify(windowOptions),
            type: MessageType.INITWINDOW,
        };

        ctx.postMessage(JSON.stringify(message));
        this.Render();
    }

    public block = () => {
        while (true) { continue; }
    }



    public Render() {
        const el =
            <div className='container'>
                <label>{this.counter}</label>
                <button className="clickable" data-action={DomActions.WORKERDOM} id='block' >Start blocker</button>
            </div>

        const message: Message = {
            data: JSON.stringify(el),
            type: MessageType.RENDER,
        };
        ctx.postMessage(JSON.stringify(message));
        setTimeout(() => {
            this.counter++;
            this.Render();
        }, 3000);
    }

    public handleEvent = (func: string) => {
        const fun = this.eventRegister.get(func);
        if (fun) {
            fun();
        }
    }

    public handleEventWithParams = (data: { params: string | object, func: string }) => {
        const params = data.params;
        const func = data.func;
        this[func] = Number.parseFloat(params.toString());
        this.Render();
    }
}
const app = new Application();
export default app;