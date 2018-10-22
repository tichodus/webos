import app from "./test";

// const ctx : Worker= self as any;
self.onmessage = (event) => {
    switch (event.data) {
        case 'run':
            app.main();
            break;
        case 'render':
            app.getRender();
            break;
        default:
            app.handleEvent(event.data);
            break;
    }
}

