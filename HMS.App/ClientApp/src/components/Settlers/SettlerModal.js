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

export default class SettlerModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerText: props.headerText,
            person: props.person
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
      }

    handleChange(event){
        const { person } = this.state
        if(event.target.id === "phone" || event.target.id === "email"){
            person.contacts[event.target.id] = event.target.value    
        } else{
            person[event.target.id] = event.target.value
        }

        this.setState({
            person : person
        })
    }

    onSubmit(event){
        event.preventDefault()
        this.props.onSubmit(this.state.person)
    }

    render() {
        const {isModalOpen, onModalClose } = this.props
        const { person } = this.state
        const fields = [
            { id: "surname", text: "Прізвище", value: person.surname, required: true, type: "text" },
            { id: "name", text: "Ім’я", value: person.name, required: true, type: "text" },
            { id: "flatNumber", text: "Квартира", value: person.flatNumber, required: true, type: "number" },
            { id: "flatArea", text: "Площа квартири", value: person.flatArea, required: false, type: "number" },
            { id: "phone", text: "Телефон", value: person.contacts.phone, required: false, type: "tel" },
            { id: "email", text: "Електронна скринька", value: person.contacts.email, required: false, type: "email" },
            
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
                                <Label for={field.id}>{field.text}{field.required ? "*" : "" }:</Label>
                                <Input type={field.type} placeholder={field.text} id={field.id} 
                                       required={field.required} value={field.value} onChange={this.handleChange.bind(this)}/>
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