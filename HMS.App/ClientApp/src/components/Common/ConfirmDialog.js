import React, { Component } from "react"
import Button from 'reactstrap/lib/Button';
import Form from "reactstrap/lib/Form";
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

export default class ConfirmDialog extends Component {
    constructor(props){
        super(props)
    }

    onSubmit(event){
        event.preventDefault()
        this.props.onSubmit()
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <Form onSubmit={this.onSubmit.bind(this)}>
                <ModalHeader>
                    <h3>{this.props.headerText}</h3>
                </ModalHeader>
                <ModalBody>
                    <h4>Ви дійсно хочете це зробити?</h4>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-danger" type="submit">Підтвердити</Button>
                    <Button onClick={this.props.onClose} className="btn-primary">Закрити</Button>
                </ModalFooter>
                </Form>
            </Modal>
        )
    }
}