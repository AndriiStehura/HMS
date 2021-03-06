import React from "react"
import Button from "reactstrap/lib/Button"
import Col from "reactstrap/lib/Col"
import Row from "reactstrap/lib/Row"
import Table from "reactstrap/lib/Table"
import * as api from "../../data_access/ApiFunctions"
import LoadingSpan from "../Common/LoadingSpan"
import PaymentModal from "./PaymentModal"
import * as utils from "../Common/utils"
import ConfirmDialog from "../Common/ConfirmDialog"
import SettlerModal from './SettlerModal'


export class SettlerDetails extends React.Component {
    constructor(props) {
        super(props)
        const { settlerId } = this.props.match.params
        this.state = {
            person: {
                personId: settlerId,
                contacts:{
                    phone: "",
                    email: ""
                }
            },
            house: {
                name: "",
                meterPayment: 0
            },
            isLoading: true,
            isAddModalOpen: false,
            payment: this.getEmptyPayment(),
            headerText: "",
            amount: 0,
            isConfirmOpen: false,
            confirmText: "",
            paymentToDelete: null,
            isEditPersonOpen: false
        }
    }

    updateData(){
        this.setState({
            isLoading: true
        })
        this.componentDidMount()
    }

    async onEditSettler(settler) {
        this.togglePersonModal()
        settler.flatNumber = Number(settler.flatNumber)
        settler.flatArea = Number(settler.flatArea)
        await api.apiPut(api.API_PERSONS, settler)
        this.updateData()
    }

    async onDeletePayment() {
        this.toggleConfirmModal()
        await api.apiDelete(api.API_PAYMENTS, this.state.paymentToDelete.paymentId)
        this.updateData()
    }

    async onSubmit(payment) {
        this.toggleAddModal()
        payment.date = `${payment.date}-01`
        await api.apiPost(api.API_PAYMENTS, payment)
        this.updateData()
    }

    getEmptyPayment() {
        const { settlerId } = this.props.match.params
        return {
            paymentId: 0,
            amount: 0,
            date: Date(),
            personId: Number(settlerId)
        }
    }

    toggleAddModal() {
        this.setState({ isAddModalOpen: !this.state.isAddModalOpen })
    }

    toggleConfirmModal() {
        this.setState({ isConfirmOpen: !this.state.isConfirmOpen })
    }

    togglePersonModal() {
        this.setState({ isEditPersonOpen: !this.state.isEditPersonOpen })
    }

    onDeleteClick(payment) {
        this.setState({
            confirmText: `???????????????? ?????????? ???? "${utils.formatDate(new Date(payment.date))}"?`,
            paymentToDelete: payment
        })
        this.toggleConfirmModal()
    }

    async componentDidMount() {
        await api.apiGet(`${api.API_PERSONS}/${this.state.person.personId}`, (data) => this.setState({
            person: data,
            isLoading: false
        }))
        await api.apiGet(`${api.API_HOUSES}/${this.state.person.houseId}`, (data) => this.setState({
            house: data
        }))
        const { person, house } = this.state
        this.setState({ amount: person.flatArea * house.meterPayment })
        if(!person.contacts){
            person.contacts = {
                phone: "",
                email: ""
            }
            this.setState({person})
        }
    }

    render() {
        const { person, house, isLoading, payment } = this.state
        if(!person.contacts){
            person.contacts = {
                phone: "",
                email: ""
            }
        }
        payment.amount = this.state.amount
        return <>
            <h2>???????????????????? ?????? ???????????????? "{person.surname} {person.name}"</h2>
            <hr />
            <Row>
                <Col><strong>???????? ?? ??????????????:</strong> "{house.name}"</Col>
                <Col><strong><u>?????????????????? ????????</u></strong></Col>
            </Row>
            <Row>
                <Col><strong>????????????????:</strong> {person.flatNumber}</Col>
                <Col><strong>?????????? ????????????????:</strong> {person.contacts ? person.contacts.phone : "???? ??????????????"}</Col>
            </Row>
            <Row>
                <Col><strong>?????????? ????????????????:</strong> {person.flatArea ? person.flatArea : "???? ??????????????"}</Col>
                <Col><strong>???????????????????? ??????????:</strong> {person.contacts ? person.contacts.email : "???? ??????????????"}</Col>
            </Row>
            <hr />
            <div className="d-flex justify-content-between">
                <h3>?????????????? ????????????????????:</h3>
                {
                    person.flatArea ?
                        <Button className="btn-success mb-2" onClick={this.toggleAddModal.bind(this)}>
                            ???????????? ??????????
                    </Button>
                        :
                        <Button className="btn btn-warning mb-2" onClick={this.togglePersonModal.bind(this)}>
                            ?????????????? ???????????? ?????????? ????????????????, ?????? ???????????????? ????????????
                    </Button>
                }
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{ width: "35%", textAlign: "center" }}>????????</th>
                        <th style={{ width: "20%", textAlign: "center" }}>????????, ??????</th>
                        <th style={{ width: "25%", textAlign: "center" }}>??????????</th>
                    </tr>
                </thead>
                {
                    isLoading ?
                        <tbody>
                            <td colSpan="3"><LoadingSpan /></td>
                        </tbody>
                        :
                        <tbody>
                            {
                                person.payments.map(p =>
                                    <tr>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{utils.formatDate(new Date(p.date))}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>{p.amount}</td>
                                        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                                            <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, p)}>????????????????</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                }
            </Table>
            <PaymentModal onModalClose={this.toggleAddModal.bind(this)} payment={payment}
                headerText={this.state.headerText} isModalOpen={this.state.isAddModalOpen}
                onSubmit={this.onSubmit.bind(this)} />
            <ConfirmDialog isOpen={this.state.isConfirmOpen} headerText={this.state.confirmText}
                onSubmit={this.onDeletePayment.bind(this)} onClose={this.toggleConfirmModal.bind(this)} />
            <SettlerModal isModalOpen={this.state.isEditPersonOpen} onModalClose={this.togglePersonModal.bind(this)}
                person={person} onSubmit={this.onEditSettler.bind(this)}
                headerText="?????????????????????? ?????????? ????????????????"/>
        </>
    }
}