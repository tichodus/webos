import * as React from 'react';
const ctx = self as any;
class Application {
    private eventRegister:Map<string, () => void>;

    constructor() {
        this.eventRegister = new Map();
        this.eventRegister.set('foo',this.foo);
    }
    public main() {
        console.log("Loaded");
    }
    public foo() {
        console.log("clicked");
    }
    public getRender() {
        const el = <div className='container'><button title='workerEvent' id='foo' onClick={this.foo}>Sofi klikni</button></div>;
        ctx.postMessage(JSON.stringify(el));
    }

    public handleEvent(func:string) {
       const fun =  this.eventRegister.get(func);
       if(fun) {
           fun();
       }
    }
}
const app = new Application();
export default app;