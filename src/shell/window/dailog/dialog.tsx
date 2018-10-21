import * as React from 'react';
import * as Modal from 'react-modal';


import './dialog.css';
import { Icon, IconButton } from '@material-ui/core/';
import { IDialogOptions } from '../window';

interface IState {
    modalIsOpen: boolean,
}


Modal.setAppElement("#root")

class Dialog extends React.Component<IDialogOptions, IState> {
    constructor(props: IDialogOptions) {
        super(props);
        this.state = {
            modalIsOpen: true
        }
    }

    public render() {

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={this.props.modalOptions}
                contentLabel={this.props.contentLabel}
            >
                <div className='modal--container'>
                    <div className='modal__title--container'>
                        <IconButton color="primary" onClick={this.closeModal} className='button--close'>
                            <Icon>close</Icon>
                        </IconButton>
                        <h1>{this.props.subtitle}</h1>
                    </div>
                    <div className='modal__body--container'>
                        {this.props.children}
                    </div>
                </div>

            </Modal>
        );

    }


    public openModal = () => this.setState({ modalIsOpen: true });

    public closeModal = () => {
        this.setState({ modalIsOpen: false });
        if (this.props.parentRef) {
            document.removeChild(this.props.parentRef);
        }
    }

    private afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        if (this.props.afterOpenModal) {

            this.props.afterOpenModal();
        }
    }
}

export default Dialog;