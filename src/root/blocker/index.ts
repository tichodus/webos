import app from "./blocker";
import { MessageType, Message } from 'src/kernel/types/message.enum';

// const ctx : Worker= self as any;
self.onmessage = (event) => {
    const message: Message = JSON.parse(event.data);
    switch (message.type) {
        case MessageType.RUN:
            app.main();
            break;
        case MessageType.WITHPARAMS:
            if (message.params) {
                app.handleEventWithParams({ func: message.data, params: message.params });
            }
            break;
        case MessageType.WITHOUTPARAMS:
            app.handleEvent(message.data);
    }
}

