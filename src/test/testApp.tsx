import app from "./test";
import { MessageType } from 'src/kernel/types/message.enum';

// const ctx : Worker= self as any;
self.onmessage = (event) => {
    switch (event.data) {
        case MessageType.RUN:
            app.main();
            break;
        default:
            app.handleEvent(event.data);
            break;
    }
}

