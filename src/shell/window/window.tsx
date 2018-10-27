import * as React from 'react';
import Dialog, { DialogOptions } from './dailog/dialog';
import * as ReactDOM from 'react-dom';


export interface WindowOptions extends DialogOptions {
    width?: number,
    height?: number,
    parentRef?: Element
}

export class Window {
    private dialog: JSX.Element;
    private dialogRef: React.RefObject<Dialog>;
    private options: WindowOptions;


    constructor(options: WindowOptions) {
        this.options = options;
        this.dialogRef = React.createRef<Dialog>();
    }

    public setWindowContent(content: JSX.Element) {
        this.options.content = content;
        if (this.dialogRef.current) {
            this.dialogRef.current.updateContent(content);
        }
    }

    public get parent() {
        return this.options.parentRef;
    }

    public get content() {
        return this.options.content;
    }

    public render() {
        const dialog = this.getDialog();
        ReactDOM.render(dialog, (this.options.parentRef as HTMLDivElement));
    }
    public getDialog() {
        if (!this.dialog) {
            this.dialog =
                <Dialog
                    ref={this.dialogRef}
                    onDialogClose={this.options.onDialogClose}
                    modalOptions={this.options.modalOptions}
                    contentLabel={this.options.contentLabel}
                    subtitle={this.options.subtitle}
                    parentRef={this.options.parentRef}>
                    {this.options.content}
                </Dialog>
        }
        return this.dialog;
    }
}
