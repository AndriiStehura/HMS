import React, { Component } from "react"
import Button from 'reactstrap/lib/Button';
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';

export default class PaymentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerText: props.headerText,
            payment: props.payment
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }

    handleChange(event) {
        const { payment } = this.state
        payment[event.target.id] = event.target.value
        this.setState({ payment })
    }

    onSubmit(event){
        event.preventDefault()
        this.props.onSubmit(this.state.payment)
    }

    //<Input type="month" id="date" required="true" value={payment.date} onChange={this.handleChange.bind(this)} />
    render() {
        const { isModalOpen, onModalClose } = this.props
        const { payment } = this.state
        return (
            <Modal isOpen={isModalOpen}>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <ModalHeader>
                        <h2>{this.state.headerText}</h2>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="date">Оберіть дату*:</Label>
                            <Input type="month" id="date" required="true" value={payment.date} onChange={this.handleChange.bind(this)} lang="en-GB"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Сума: {payment.amount} грн.</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-success" type="submit">Підтвердити</Button>
                        <Button onClick={onModalClose} className="btn btn-danger">Закрити</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}