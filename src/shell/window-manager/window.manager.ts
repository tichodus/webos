import { IWindowOptions, Window } from '../window/window';
import * as ReactDOM from 'react-dom';

export class WindowManager {
    public static runWindow(options: IWindowOptions) {
        const window =  new Window(options);
        const dialog = window.getDialog();
        const content = document.createElement("div");
        options.parentRef = content;
        ReactDOM.render(dialog, content);
    }
}