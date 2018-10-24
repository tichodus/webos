import * as React from 'react';
import { Message, MessageType } from 'src/kernel/types/message.enum';
import { WindowOptions } from 'src/shell/window/window';
const ctx = self as any;
class Application {
    private eventRegister: Map<string, () => void>;

    constructor() {
        this.eventRegister = new Map();
        this.eventRegister.set('foo', this.foo);
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

    public foo() {
        console.log("clicked");
    }
    public Render() {
        let el = <div className='container'><button title='workerEvent' id='foo' onClick={this.foo}>Sofi klikni</button></div>;
        const message: Message = {
            data: JSON.stringify(el),
            type: MessageType.RENDER,
        };
        ctx.postMessage(JSON.stringify(message));
        el = <div className='container'><button title='workerEvent' id='foo' onClick={this.foo}>Updateovano klikni</button></div>;
        message.data = JSON.stringify(el);
    }

    public handleEvent(func: string) {
        const fun = this.eventRegister.get(func);
        if (fun) {
            fun();
        }
    }
}
const app = new Application();
export default app;