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
import * as api from "../../data_access/ApiFunctions";

export default class ExpenseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerText: props.headerText,
            expense: props.expense,
            providers: [],
            currentProvider: {
                services: []
            },
            currentService: {
                price: 0
            }
        }
    }

    componentDidMount() {
        this.getProviders()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
        this.getProviders()
    }

    handleChange(event) {
        const { expense } = this.state
        expense[event.target.id] = event.target.value
        this.setState({ expense })
    }

    onSubmit(event) {
        event.preventDefault()
        if (!this.validate()) {
            alert("Поля заповнені не вірно")
            return
        }
        this.props.onSubmit(this.state.expense)
        this.setState({
            currentProvider: {
                services: []
            },
            currentService: {
                price: 0
            }
        })
    }

    getProviders() {
        api.apiGet(api.API_PROVIDERS, data => this.setState({
            providers: data.filter(x => x.services.length > 0),
            currentProvider: data[0],
            currentService: data[0].services[0]
        }))
        const { expense, currentProvider, currentService } = this.state
        expense.providerId = currentProvider.providerId
        expense.serviceId = currentService.serviceId
        this.setState({ expense })
    }

    validate() {
        const { expense } = this.state
        return expense.providerId && expense.serviceId && expense.date && expense.quantity
    }

    handleProviderChange = (event) => {
        this.handleChange(event)
        const newProv = this.state.providers.find(x => x.providerId === Number(event.target.value))
        const { expense } = this.state
        expense.serviceId = newProv.services[0].serviceId
        this.setState({ currentProvider: newProv, currentService: newProv.services[0], expense })
    }

    handleServceChange = event => {
        this.handleChange(event)
        const { currentProvider } = this.state
        const newService = currentProvider.services.find(x => x.serviceId === Number(event.target.value))
        this.setState({ currentService: newService })
    }

    render() {
        const { isModalOpen, onModalClose } = this.props
        const { expense, currentProvider, currentService, providers } = this.state

        return (
            <Modal isOpen={isModalOpen}>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <ModalHeader>
                        <h2>{this.state.headerText}</h2>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="date">Оберіть дату*:</Label>
                            <Input type="date" id="date" required="true" value={expense.date} onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="providerId">Оберіть постачальника*:</Label>
                            <select id="providerId" value={expense.providerId} onChange={this.handleProviderChange} className="form-control">
                                {
                                    providers.map(p =>
                                        <option value={p.providerId}>
                                            {p.name}
                                        </option>)
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="serviceId">Оберіть послугу*:</Label>
                            <select id="serviceId" value={expense.serviceId} onChange={this.handleServceChange} className="form-control">
                                {
                                    currentProvider.services.map(s =>
                                        <option value={s.serviceId}>
                                            {s.name}
                                        </option>)
                                }
                            </select>
                        </FormGroup>
                        {
                            currentService.measurement ? 
                            <FormGroup>
                                <Label>
                                    Вимірюється як: {currentService.measurement}
                                </Label>
                            </FormGroup> : ""
                        }
                        <FormGroup>
                            <Label for="quantity">Введіть кількість*:</Label>
                            <Input type="number" id="quantity" required="true" value={expense.quantity} onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Сума: {currentService.price * expense.quantity}</Label>
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