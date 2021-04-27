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

export default class HousesModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerText: props.modalState.headerText,
            name: props.modalState.currentHouse.name,
            address: props.modalState.currentHouse.address
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.modalState });
      }

    handleChange(event){
        if(event.target.alt === "address"){
            this.setState({
                ...this.state,
                address : {
                    ...this.state.address,
                    [event.target.id] : event.target.value
                }
            })
            return    
        }

        this.setState({
            ...this.state,
            [event.target.id] : event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        this.props.onSubmit(this.state)
    }

    render() {
        const {isModalOpen, onModalClose } = this.props
        const fields = [
            { id: "name", text: "Назва", value: this.state.name },
            { id: "city", text: "Місто", value: this.state.address.city, alt: "address" },
            { id: "street", text: "Вулиця", value: this.state.address.street, alt: "address" },
            { id: "buildingNumber", text: "Номер будинку", value: this.state.address.buildingNumber, alt: "address" },
            { id: "meterPayment", text: "Плата за 1 м кв.", value: this.state.meterPayment },
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
                                <Label for={field.id}>{field.text}:</Label>
                                <Input type="text" placeholder={field.text} id={field.id} alt={field.alt}
                                       required={true} value={field.value} onChange={this.handleChange.bind(this)}/>
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