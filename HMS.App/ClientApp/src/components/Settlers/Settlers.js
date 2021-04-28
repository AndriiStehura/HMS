import React, { Component } from "react"
import * as api from "../../data_access/ApiFunctions"
import Button from 'reactstrap/lib/Button';
import Table from 'reactstrap/lib/Table';
import SettlerModal from './SettlerModal'
import ConfirmDialog from "../Common/ConfirmDialog"
import LoadingSpan from "../Common/LoadingSpan";

export class Settlers extends Component {
    constructor(props) {
        super(props)
        const { houseId } = this.props.match.params
        const house = {
            houseId: houseId,
            name: "",
            persons: []
        }
        const person = {
            houseId: houseId,
            surname: "",
            name: "",
            flatNumber: "",
            flatArea: "",
            contacts: {
                phone: "",
                email: ""
            }
        }
        this.state = {
            house: house,
            isModalOpened: false,
            currentPerson: person,
            modalAction: this.onAddSettler,
            modalHeaderText: "",
            confirmText: "",
            personToDelete: null,
            isConfirmOpen: false,
            isLoading: true
        }
    }

    updateData(){
        this.setState({isLoading: true})
        this.componentDidMount()
    }

    componentDidMount() {
        api.apiGet(`${api.API_HOUSES}/${this.state.house.houseId}`, (data) => this.setState({ 
            house: data,
            isLoading: false 
        }))
    }

    onDetailsClick(person) {
        this.props.history.push(`/settlers/${person.personId}`)
    }

    async onDeletePerson() {
        this.onConfirmClose()
        await api.apiDelete(api.API_PERSONS, this.state.personToDelete.personId)
        this.updateData()
        this.setState({ personToDelete: null })
    }

    onDeleteClick(person) {
        this.setState({
            confirmText: `Видалити мешканця "${person.surname} ${person.name}"?`,
            personToDelete: person
        })
        this.openConfirm()
    }

    openConfirm() {
        this.setState({ isConfirmOpen: true })
    }

    onConfirmClose() {
        this.setState({
            isConfirmOpen: false,
            personToDelete: null
        })
    }

    openModal() {
        this.setState({ isModalOpened: true })
    }

    closeModal() {
        this.setState({ isModalOpened: false })
    }

    async onAddSettler(settler) {
        this.closeModal()
        settler.flatNumber = Number(settler.flatNumber)
        settler.flatArea = Number(settler.flatArea)
        await api.apiPost(api.API_PERSONS, settler)
        this.updateData()
    }

    async onEditSettler(settler) {
        this.closeModal()
        settler.flatNumber = Number(settler.flatNumber)
        settler.flatArea = Number(settler.flatArea)
        await api.apiPut(api.API_PERSONS, settler)
        this.updateData()
    }

    onEditClick(person) {
        if (!person.contacts) {
            person.contacts = {
                phone: "",
                email: ""
            }
        }
        this.setState({
            currentPerson: person,
            modalHeaderText: "Редагування даних мешканця",
            modalAction: this.onEditSettler
        })
        this.openModal()
    }

    onAddSettlerClick() {
        const person = {
            houseId: this.state.house.houseId,
            surname: "",
            name: "",
            flatNumber: "",
            flatArea: "",
            contacts: {
                phone: "",
                email: ""
            }
        }
        this.setState({
            currentPerson: person,
            modalHeaderText: "Додавання нового мешканця",
            modalAction: this.onAddSettler
        })
        this.openModal()
    }

    onExpensesClick(){
        this.props.history.push(`/expenses/${this.state.house.houseId}`)
    }

    render() {
        return <>
            <div className="d-flex justify-content-between">
                <h1>Мешканці будинку {`"${this.state.house.name}"`}</h1>
                <div className="d-flex justify-content-between">
                <Button className="btn-info m-3" onClick={this.onExpensesClick.bind(this)}>
                    Витрати будинку
                </Button>
                <Button className="btn-success my-3" onClick={this.onAddSettlerClick.bind(this)}>
                    Додати мешканця
                </Button>
                </div>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{width: "30%", textAlign: "center"}}>Прізвище</th>
                        <th style={{width: "30%", textAlign: "center"}}>Ім’я</th>
                        <th style={{width: "15%", textAlign: "center"}}>Квартира</th>
                        <th style={{width: "25%", textAlign: "center"}}>Опції</th>
                    </tr>
                </thead>
                {
                    this.state.isLoading ? 
                    <tbody>
                        <td colSpan="4"><LoadingSpan/></td>
                    </tbody>
                    :
                    <tbody>
                        {
                            this.state.house.persons.map(x => (
                                <tr key={x.personId} style={{cursor: "pointer"}}>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.onDetailsClick.bind(this, x)}>
                                        {x.surname}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.onDetailsClick.bind(this, x)}>
                                        {x.name}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.onDetailsClick.bind(this, x)}>
                                        {x.flatNumber}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        <Button className="btn-primary m-1" onClick={this.onEditClick.bind(this, x)}>Редагувати</Button>
                                        <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, x)}>Видалити</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                }
            </Table>
            <SettlerModal isModalOpen={this.state.isModalOpened} onModalClose={this.closeModal.bind(this)}
                person={this.state.currentPerson} onSubmit={this.state.modalAction.bind(this)}
                headerText={this.state.modalHeaderText} />
            <ConfirmDialog isOpen={this.state.isConfirmOpen} headerText={this.state.confirmText}
                onSubmit={this.onDeletePerson.bind(this)} onClose={this.onConfirmClose.bind(this)} />
        </>
    }
}