import React, { Component } from 'react';
import Button from 'reactstrap/lib/Button';
import Table from 'reactstrap/lib/Table';
import * as api from "../../data_access/ApiFunctions";
import HousesModal from './HousesModal';
import ConfirmDialog from "../Common/ConfirmDialog";
import LoadingSpan from "../Common/LoadingSpan";

const MODE_ADD = 1, MODE_EDIT = 2

export class Houses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            houses: [],
            isModalOpen: false,
            isConfirmOpen: false,
            confirmText: "",
            modalState: {
                currentHouse: {
                    name: "",
                    address: {
                        city: "",
                        street: "",
                        buildingNumber: ""
                    },
                    meterPayment: 0
                },
                headerText: ""
            },
            mode: MODE_ADD,
            houseToDelete: null,
            isLoading: true
        }
    }

    updateData(){
        this.setState({isLoading: true})
        this.componentDidMount()
    }

    async onDeleteHouse() {
        this.onConfirmClose()
        await api.apiDelete(api.API_HOUSES, this.state.houseToDelete.houseId)
        this.setState({ houseToDelete: null })
        this.updateData()
    }

    onDeleteClick(house) {
        this.setState({
            confirmText: `Видалити будинок "${house.name}"?`,
            houseToDelete: house
        })
        this.openConfirm()
    }

    async onEditHouse(house) {
        this.onModalClose()
        const body = {
            ...house,
            meterPayment: Number(house.meterPayment)
        }
        await api.apiPut(api.API_HOUSES, body)
        this.updateData()
    }

    async onAddHouse(house) {
        this.onModalClose()
        const body = {
            ...house,
            meterPayment: Number(house.meterPayment)
        }
        await api.apiPost(api.API_HOUSES, body)
        this.updateData()
    }

    onEditButton(house) {
        const editingState = {
            ...house,
            headerText: `Редагування будинку "${house.name}"`
        }
        this.setState({
            modalState: editingState,
            mode: MODE_EDIT
        })
        this.openModal()
    }

    onAddButton() {
        const addingState = {
            name: "",
            address: {
                city: "",
                street: "",
                buildingNumber: ""
            },
            meterPayment: 0,
            headerText: "Новий будинок"
        }
        this.setState({
            modalState: addingState,
            mode: MODE_ADD
        })
        this.openModal()
    }

    openConfirm() {
        this.setState({ isConfirmOpen: true })
    }

    onConfirmClose() {
        this.setState({ isConfirmOpen: false })
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    onModalClose() {
        this.setState({ isModalOpen: false })
    }

    componentDidMount() {
        api.apiGet(api.API_HOUSES, (data) => this.setState({
            houses: data,
            isLoading: false
        }))
    }

    navigateToSettlers(house) {
        this.props.history.push(`/house/${house.houseId}`)
    }

    render() {
        const { houses, isModalOpen, isLoading, mode } = this.state
        return (<>
            <div className="d-flex justify-content-between">
                <h1>Будинки у системі</h1>
                <Button className="btn-success my-3" onClick={this.onAddButton.bind(this)}>
                    Додати будинок
                </Button>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{width: "25%", textAlign: "center", verticalAlign: "middle"}}>Назва</th>
                        <th style={{width: "25%", textAlign: "center", verticalAlign: "middle"}}>Адреса</th>
                        <th style={{width: "10%", textAlign: "center", verticalAlign: "middle"}}>Кількість мешканців</th>
                        <th style={{width: "15%", textAlign: "center", verticalAlign: "middle"}}>Оплата за 1 м кв., грн</th>
                        <th style={{width: "25%", textAlign: "center", verticalAlign: "middle"}}>Опції</th>
                    </tr>
                </thead>
                {
                    isLoading ?
                        <tbody>
                            <td colSpan="5"><LoadingSpan /></td>
                        </tbody>
                        :
                        <tbody>
                            {
                                houses.map(x => (
                                    <tr key={x.houseId} style={{cursor: "pointer"}}>
                                        <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.navigateToSettlers.bind(this, x)}>
                                            {x.name}
                                        </td>
                                        <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.navigateToSettlers.bind(this, x)}>
                                            {`${x.address.city}, ${x.address.street} ${x.address.buildingNumber}`}
                                        </td>
                                        <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.navigateToSettlers.bind(this, x)}>
                                            {x.persons.length}
                                        </td>
                                        <td style={{textAlign: "center", verticalAlign: "middle"}} onClick={this.navigateToSettlers.bind(this, x)}>
                                            {x.meterPayment}
                                        </td>
                                        <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                            <Button className="btn-primary m-1" onClick={this.onEditButton.bind(this, x)}>Редагувати</Button>
                                            <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, x)}>Видалити</Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                }
            </Table>
            <HousesModal isModalOpen={isModalOpen}
                onModalClose={this.onModalClose.bind(this)}
                modalState={this.state.modalState}
                onSubmit={mode === MODE_ADD ? this.onAddHouse.bind(this) : this.onEditHouse.bind(this)} />
            <ConfirmDialog isOpen={this.state.isConfirmOpen} headerText={this.state.confirmText}
                onSubmit={this.onDeleteHouse.bind(this)} onClose={this.onConfirmClose.bind(this)} />
        </>)
    }
}