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

export default class ProviderModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerText: props.headerText,
            provider: props.provider
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }

    handleChange(event) {
        const { provider } = this.state
        switch (event.target.alt) {
            case "address": {
                provider.address[event.target.id] = event.target.value
                break
            }
            case "contacts": {
                provider.contacts[event.target.id] = event.target.value
                break
            }
            default: {
                provider[event.target.id] = event.target.value
                break
            }
        }

        this.setState({ provider })
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state.provider)
    }

    render() {
        const { isModalOpen, onModalClose } = this.props
        const { provider } = this.state
        const fields = [
            { id: "name", text: "Назва", value: provider.name, required: true, type: "text" },
            { id: "city", text: "Місто", value: provider.address.city, required: true, type: "text", alt: "address" },
            { id: "street", text: "Вулиця", value: provider.address.street, required: true, type: "text", alt: "address" },
            { id: "buildingNumber", text: "Номер будинку", value: provider.address.buildingNumber, required: true, type: "text", alt: "address" },
            { id: "phone", text: "Телефон", value: provider.contacts.phone, required: false, type: "tel", alt: "contacts" },
            { id: "email", text: "Електронна скринька", value: provider.contacts.email, required: false, type: "email", alt: "contacts" }
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