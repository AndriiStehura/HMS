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

export default class ServiceModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerText: props.headerText,
            service: props.service
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }

    handleChange(event) {
        const { service } = this.state
        service[event.target.id] = event.target.value
        this.setState({ service })
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.service)
    }

    render() {
        const { isModalOpen, onModalClose } = this.props
        const { service } = this.state
        const fields = [
            { id: "name", text: "Назва", value: service.name, required: true, type: "text" },
            { id: "description", text: "Опис", value: service.description, required: true, type: "memo" },
            { id: "price", text: "Ціна", value: service.price, required: true, type: "number" },
            { id: "measurement", text: "Одиниці вимірювання", value: service.measurement, required: false, type: "text"},
        ]
        
        return (
            <Modal isOpen={isModalOpen}>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <ModalHeader>
                        <h2>{this.state.headerText}</h2>
                    </ModalHeader>
                    <ModalBody>
                        {
                            fields.map(field =>
                                <FormGroup>
                                    <Label for={field.id}>{field.text}{field.required ? "*" : ""}:</Label>
                                    <Input type={field.type} placeholder={field.text} id={field.id} alt={field.alt}
                                        required={field.required} value={field.value} onChange={this.handleChange.bind(this)} />
                                </FormGroup>)
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-success" type="submit">Підтвердити</Button>
                        <Button onClick={onModalClose} className="btn-danger">Закрити</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}