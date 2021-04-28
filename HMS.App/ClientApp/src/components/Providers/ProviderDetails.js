import React from "react"
import { Button, Table } from "reactstrap"
import * as api from "../../data_access/ApiFunctions"
import LoadingSpan from "../Common/LoadingSpan";
import ServiceModal from "./ServiceModal"
import ConfirmDialog from "../Common/ConfirmDialog"

export class ProviderDetails extends React.Component {
    constructor(props) {
        super(props)
        const { providerId } = props.match.params
        this.state = {
            provider: {
                providerId,
                name: "",
                services: []
            },
            isLoading: true,
            isModalOpen: false,
            modalHeaderText: "",
            currentService: this.getEmptyService(),
            isConfirmOpen: false,
            confirmText: ""
        }
    }

    componentDidMount() {
        this.updateData()
    }

    toggleAddModal(){
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    getEmptyService(){
        const { providerId } = this.props.match.params
        return {
            serviceId: 0,
            price: 0,
            name: "",
            description: "",
            measurement: "",
            providerId: Number(providerId)
        }
    }

    updateData(){
        api.apiGet(`${api.API_PROVIDERS}/${this.state.provider.providerId}`, (data) => this.setState({ provider: data, isLoading: false }))

    }

    onAddClick(){
        this.setState({ 
            currentService: this.getEmptyService(),
            modalHeaderText: "Додавання нової послуги"
        })
        this.toggleAddModal()
    }

    onEditClick(service){
        this.setState({ 
            currentService: service,
            modalHeaderText: "Редагування послуги"
        })
        this.toggleAddModal()
    }

    async onAddService(service){
        this.toggleAddModal()
        service.price = Number(service.price)
        await api.apiPost(api.API_SERVICES, service)
        this.updateData()
    }

    async onEditService(){
        this.toggleAddModal()
        const service = this.state.currentService
        service.price = Number(service.price)
        await api.apiPut(api.API_SERVICES, service)
        this.updateData()
    }

    toggleConfirm(){
        this.setState({isConfirmOpen: !this.state.isConfirmOpen})
    }

    onDeleteClick(service){
        this.setState({
            currentService: service,
            confirmText: `Видалити послугу "${service.name}"?`
        })
        this.toggleConfirm()
    }

    async onDeleteService(){
        this.toggleConfirm()
        const {currentService} = this.state
        await api.apiDelete(api.API_SERVICES, currentService.serviceId)
        this.updateData()
    }

    render() {
        const { 
            provider, 
            isLoading, 
            isModalOpen, 
            modalHeaderText, 
            currentService,
            isConfirmOpen,
            confirmText
        } = this.state
        return <>
            <div className="d-flex justify-content-between">
                <h2>Послуги, які надає "{provider.name}"</h2>
                <Button className="btn-success mb-2" onClick={this.onAddClick.bind(this)}>
                    Додати послугу
                </Button>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{ width: "20%", textAlign: "center", verticalAlign: "middle" }}>Назва</th>
                        <th style={{ width: "45%", textAlign: "center", verticalAlign: "middle" }}>Опис</th>
                        <th style={{ width: "5%", textAlign: "center", verticalAlign: "middle" }}>Ціна, грн</th>
                        <th style={{ width: "5%", textAlign: "center", verticalAlign: "middle" }}>Одиниці вимірювання</th>
                        <th style={{ width: "25%", textAlign: "center", verticalAlign: "middle" }}>Опції</th>
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
                                provider.services.map(s =>
                                    <tr>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{s.name}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{s.description}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{s.price}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{s.measurement}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                            <Button className="btn-primary m-1" onClick={this.onEditClick.bind(this, s)}>
                                                Редагувати
                                            </Button>
                                            <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, s)}>
                                                Видалити
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                }
            </Table>
            <ServiceModal isModalOpen={isModalOpen} headerText={modalHeaderText} service={currentService}
                onSubmit={currentService.serviceId ? this.onEditService.bind(this) : this.onAddService.bind(this)}
                onModalClose={this.toggleAddModal.bind(this)}/>
            <ConfirmDialog isOpen={isConfirmOpen} onClose={this.toggleConfirm.bind(this)} headerText={confirmText}
                onSubmit={this.onDeleteService.bind(this)}/>
        </>
    }
}