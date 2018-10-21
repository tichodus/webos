import * as React from 'react';
import * as Modal from 'react-modal';
interface IState {
    modalIsOpen: boolean,
}

interface IContent {
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    marginRight?: string,
    transform?: string
}
interface IModalOptions {
    content: IContent
}
interface IProps {
    afterOpenModal?: () => void
    modalOptions?: IModalOptions,
    contentLabel?: string,
    subtitle?: string,
}

class BaseDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }

    public render() {

        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={this.props.modalOptions}
                    contentLabel={this.props.contentLabel}
                >
                    <div className='modal__header--container'>
                    <h1>{this.props.subtitle}</h1>
                    </div>
                </Modal>
            </div>
        );

    }


    private openModal = () => this.setState({ modalIsOpen: true });

    private afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        if (this.props.afterOpenModal) {

            this.props.afterOpenModal();
        }
    }

    private closeModal = () => {
        this.setState({ modalIsOpen: false });
    }
}

export default BaseDialog;