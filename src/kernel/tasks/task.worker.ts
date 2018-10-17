
import { Messages } from './types/message.enum';
import { Message } from './types/message';
import { Hooks } from './callbacks';

// Define context for the worker
const ctx: Worker = self as any;

let isPaused: boolean = false;


ctx.addEventListener("message", e => {
    const message: Message = e.data;

    switch (message.message) {
        case Messages.RUN:
            run(message);
            break;
        case Messages.PAUSE:
            pause(message);
            break;
        case Messages.RESUME:
            resume(message);
            break;
        case Messages.TERMINATE:
            terminate(message);
            break;
        default:
            throw Error("Inappropriate message");
    }
});

const run = (message: Message) => {
    isPaused = false;
    if (Hooks.onRun) {
        Hooks.onRun()
    }
}

const pause = (message: Message) => {
    isPaused = true;
    if (message.onPause) {
        message.onPause();
    }
    while (isPaused) { continue; };
}

const resume = (message: Message) => {
    isPaused = false;
    if (message.onResume) {
        message.onResume();
    };
}

const terminate = (message: Message) => {
    isPaused = true;
    if (message.onTerminate) {
        message.onTerminate();
    }
    ctx.terminate();
}