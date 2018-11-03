import * as React from 'react';
import { Message, MessageType, DomActions } from 'src/kernel/types/message.enum';
import { WindowOptions } from 'src/shell/window/window';
const ctx = self as any;
class Application {
    private eventRegister: Map<string, () => void>;
    private firstValue: number;
    private secondValue: number;
    private result: number;

    constructor() {
        this.eventRegister = new Map();
        this.eventRegister.set('add', this.add);
        this.eventRegister.set("sub", this.sub);
        this.eventRegister.set("mul", this.mul);
        this.eventRegister.set("div", this.div);

        this.result = 0;
        this.firstValue = 0;
        this.secondValue = 0;
    }
    public main() {
        const windowOptions: WindowOptions = {
            subtitle: "Calculator",
        }

        const message: Message = {
            data: JSON.stringify(windowOptions),
            type: MessageType.INITWINDOW,
        };

        ctx.postMessage(JSON.stringify(message));
        this.Render();
    }

    public add = () => {
        this.result = this.firstValue + this.secondValue;
        this.Render();
    }

    public sub = () => {
        this.result = this.firstValue - this.secondValue;
        this.Render();
    }

    public mul = () => {
        this.result = this.firstValue * this.secondValue;
        this.Render();
    }

    public div = () => {
        this.result = this.firstValue / this.secondValue;
        this.Render();
    }


    public Render() {
        const el =
            <div className='container'>
                <input id="firstValue" className={DomActions.PROCESSVALUE} />
                <input id="secondValue" className={DomActions.PROCESSVALUE} />
                <input value={this.result} disabled={true} />
                <button className="clickable" title={DomActions.WORKERDOM} id='add' >ADD</button>
                <button className="clickable" title={DomActions.WORKERDOM} id='sub' >SUB</button>
                <button className="clickable" title={DomActions.WORKERDOM} id='mul' >MUL</button>
                <button className="clickable" title={DomActions.WORKERDOM} id='div' >DIV</button>
            </div>

        const message: Message = {
            data: JSON.stringify(el),
            type: MessageType.RENDER,
        };
        ctx.postMessage(JSON.stringify(message));
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