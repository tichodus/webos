import * as React from 'react';
import Draggable from "react-draggable";
import './dialog.css';
import { Icon, IconButton } from '@material-ui/core/';

interface IState {
    content: JSX.Element | null | undefined
    modalIsOpen: boolean,
}



interface ModalOptions {
    content: Content
}

interface Content {
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    marginRight?: string,
    transform?: string
}

export interface DialogOptions {
    onDialogClose?: () => void
    modalOptions?: ModalOptions,
    contentLabel?: string,
    subtitle?: string,
    content?: JSX.Element,
    parentRef?: Element
}

class Dialog extends React.Component<DialogOptions, IState> {
    constructor(props: DialogOptions) {
        super(props);
        this.state = {
            content: this.props.content,
            modalIsOpen: true,
        }
    }

    public updateContent(content: JSX.Element) {
        this.setState({ content });
    }

    public render() {
        return (
            <Draggable>
                <div tabIndex={0} className='modal--container'>
                    <div className='modal__title--container'>
                        <IconButton color="default" onClick={this.closeModal} className='button--close'>
                            <Icon>close</Icon>
                        </IconButton>
                        <h1>{this.props.subtitle}</h1>
                    </div>
                    <div className='modal__body--container'>
                        {this.state.content}
                    </div>
                </div>
            </Draggable>
        );

    }


    public openModal = () => this.setState({ modalIsOpen: true });

    public closeModal = () => {
        this.setState({ modalIsOpen: false });
        if (this.props.parentRef) {
            document.body.removeChild(this.props.parentRef);
        }

        const { onDialogClose } = this.props;
        if(onDialogClose) {
            onDialogClose();
        }
    }
}

export default Dialog;