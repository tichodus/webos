import { WindowOptions, Window } from '../window/window';

export class WindowManager {
    public static createWindow(options: WindowOptions) {
        const content = document.createElement("div");
        document.body.appendChild(content);
        options.parentRef = content;
        const window = new Window(options);
        return window;
    }
}