import React from "react"
import Button from 'reactstrap/lib/Button';
import Table from 'reactstrap/lib/Table';
import LoadingSpan from "../Common/LoadingSpan";
import * as api from "../../data_access/ApiFunctions";
import ProviderModal from "./ProviderModal"
import ConfirmDialog from "../Common/ConfirmDialog";

export default class Providers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            providers: [],
            isModalOpen: false,
            modalProvider: this.getEmptyProvider(),
            modalHeader: "",
            isConfirmOpen: false,
            confirmHeader: ""
        }
    }

    navigateToServices(provider) {
        this.props.history.push(`/provider/${provider.providerId}`)
    }

    async onEdit(){
        const {modalProvider} = this.state
        this.toggleModal()
        await api.apiPut(api.API_PROVIDERS, modalProvider)
        this.updateData()
    }

    onEditClick(provider){
        if(!provider.contacts){
            provider.contacts = {
                phone: "",
                email: ""
            }
        }
        this.setState({
            modalProvider: provider,
            isModalOpen: true,
            modalHeader: "Редагування постачальника"
        })
    }

    async onDelete(){
        const {modalProvider} = this.state
        this.toggleConfirm()
        await api.apiDelete(api.API_PROVIDERS, modalProvider.providerId)
        this.updateData()
    }

    onDeleteClick(provider){
        this.setState({
            confirmHeader: `Видалити постачальника ${provider.name}?`,
            isConfirmOpen: true,
            modalProvider: provider
        })
    }

    onAddClick(){
        this.toggleModal()
        this.setState({modalProvider: this.getEmptyProvider(), modalHeader: "Додавання постачальника"})
    }

    async onAddProvider(provider){
        this.toggleModal()
        await api.apiPost(api.API_PROVIDERS, provider)
        this.updateData()
    }

    getEmptyProvider() {
        return ({
            providerId: 0,
            name: "",
            address: {
                city: "",
                street: "",
                buildingNumber: ""
            },
            contacts: {
                phone: "",
                email: ""
            }
        })
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    toggleConfirm() {
        this.setState({ isConfirmOpen: !this.state.isConfirmOpen })
    }

    updateData() {
        this.setState({ isLoading: true, modalProvider: this.getEmptyProvider() })
        api.apiGet(api.API_PROVIDERS, (providers) => this.setState({ isLoading: false, providers }))
    }

    componentDidMount() {
        this.updateData()
    }

    render() {
        const { 
            providers, 
            isLoading, 
            isModalOpen, 
            modalHeader, 
            modalProvider, 
            isConfirmOpen,
            confirmHeader 
        } = this.state
        return <>
            <div className="d-flex justify-content-between">
                <h1>Постачальники у системі</h1>
                <Button className="btn-success my-3" onClick={this.onAddClick.bind(this)}>
                    Додати постачальника
                </Button>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{ width: "25%", textAlign: "center", verticalAlign: "middle" }}>Назва</th>
                        <th style={{ width: "25%", textAlign: "center", verticalAlign: "middle" }}>Адреса</th>
                        <th style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>Кількість послуг</th>
                        <th style={{ width: "25%", textAlign: "center", verticalAlign: "middle" }}>Опції</th>
                    </tr>
                </thead>
                {
                    isLoading ?
                        <tbody>
                            <td colSpan="4"><LoadingSpan /></td>
                        </tbody>
                        :
                        <tbody>
                            {
                                providers.map(x => (
                                    <tr key={x.providerId} style={{ cursor: "pointer" }}>
                                        <td style={{ textAlign: "center", verticalAlign: "middle"}} onClick={this.navigateToServices.bind(this, x)}>
                                            {x.name}
                                        </td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }} onClick={this.navigateToServices.bind(this, x)}>
                                            {`${x.address.city}, ${x.address.street} ${x.address.buildingNumber}`}
                                        </td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }} onClick={this.navigateToServices.bind(this, x)}>
                                            {x.services.length}
                                        </td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                            <Button className="btn-primary m-1" onClick={this.onEditClick.bind(this, x)}>Редагувати</Button>
                                            <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, x)}>Видалити</Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                }
            </Table>
            <ProviderModal isModalOpen={isModalOpen} onModalClose={this.toggleModal.bind(this)}
                onSubmit={modalProvider.providerId ? this.onEdit.bind(this) : this.onAddProvider.bind(this)} headerText={modalHeader} provider={modalProvider}/>
            <ConfirmDialog isOpen={isConfirmOpen} onSubmit={this.onDelete.bind(this)} onClose={this.toggleConfirm.bind(this)}
                headerText={confirmHeader} />
        </>
    }
}