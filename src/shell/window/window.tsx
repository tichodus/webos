import * as React from 'react';
import Dialog from './dailog/dialog';
// import * as ReactDOM from 'react-dom';



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
    parentRef?:Element
}

export interface IWindowOptions extends IDialogOptions {
    width?: number,
    height?: number,
    parentRef?:Element
}

export class Window {
    private dialog: JSX.Element;
    constructor(options: IWindowOptions) {
        this.dialog =
            <Dialog
                afterOpenModal={options.afterOpenModal}
                modalOptions={options.modalOptions}
                contentLabel={options.contentLabel}
                subtitle={options.subtitle}
                parentRef={options.parentRef}>
                {options.content}
            </Dialog>
    }

    public getDialog() {
       return this.dialog;
    }
}
