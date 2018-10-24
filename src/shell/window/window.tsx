import * as React from 'react';
import Dialog from './dailog/dialog';
import { Connector } from 'src/kernel/connector/connector';
import * as ReactDOM from 'react-dom';



interface IModalOptions {
    content: IContent
}


interface IContent {
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    marginRight?: string,
    transform?: string
}

export interface IDialogOptions {
    afterOpenModal?: () => void
    modalOptions?: IModalOptions,
    contentLabel?: string,
    subtitle?: string,
    content?: JSX.Element,
    parentRef?: Element
}

export interface WindowOptions extends IDialogOptions {
    width?: number,
    height?: number,
    parentRef?: Element
}

export class Window {
    private dialog: JSX.Element;
    private dialogRef: React.RefObject<Dialog>;
    private options: WindowOptions;
    private connector: Connector;

    constructor(options: WindowOptions) {
        this.options = options;
        this.dialogRef = React.createRef<Dialog>();
    }

    public get connectorInstance() {
        return this.connector;
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
                    afterOpenModal={this.options.afterOpenModal}
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
