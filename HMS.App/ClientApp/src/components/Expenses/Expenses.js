import React from "react"
import Button from 'reactstrap/lib/Button';
import Table from 'reactstrap/lib/Table';
import LoadingSpan from "../Common/LoadingSpan";
import * as api from "../../data_access/ApiFunctions"
import ConfirmDialog from "../Common/ConfirmDialog";
import ExpenseModal from "./ExpenseModal"

function formatDate(date){
    return date.toLocaleString("ua",{
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}

export default class Expenses extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            isLoading: true,
            house: this.getEmptyHouse(),
            isModalOpen: false,
            isConfirmOpen: false,
            confirmText: "",
            currentExpense: this.getEmptyExpense()
        }
    }

    getEmptyExpense(){
        const { houseId } = this.props.match.params
        return({
            expenseId: 0,
            date: "",
            serviceId: 0,
            houseId,
            quantity: 0 
        })
    }

    async onDeleteExpense(){
        this.toggleConfirmModal()
        const { currentExpense } = this.state
        await api.apiDelete(api.API_EXPENSES, currentExpense.expenseId)
        this.updateData()
    }

    onDeleteClick(expense){
        this.setState({
            currentExpense: expense,
            confirmText: `Видалити витрату на "${expense.service.name}" за ${formatDate(new Date(expense.date))}?`
        })
        this.toggleConfirmModal()
    }

    toggleConfirmModal(){
        this.setState({isConfirmOpen: !this.state.isConfirmOpen})
    }

    toggleAddModal(){
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    async onAddExpense(expense){
        expense.houseId = Number(expense.houseId)
        expense.quantity = Number(expense.quantity)
        expense.serviceId = Number(expense.serviceId)
        expense.providerId = Number(expense.providerId)
        await api.apiPost(api.API_EXPENSES, expense)
        this.toggleAddModal()
        this.updateData()
    }

    onAddClick(){
        this.setState({
            currentExpense: this.getEmptyExpense()
        })
        this.toggleAddModal()
    }

    componentDidMount(){
        this.updateData()
    }

    updateData(){
        this.setState({isLoading: true})
        const { houseId } = this.props.match.params
        api.apiGet(`${api.API_HOUSES}/${houseId}`, data => this.setState({
            house: data,
            isLoading: false
        }))
    }

    getEmptyHouse(){
        const { houseId } = this.props.match.params
        return({
            houseId,
            expenses: [],
            name: "",
            payments: []
        })
    }

    getBalance(){
        let sum = 0;
        this.state.house.payments.forEach(p => {
            sum += p.amount
        });
        let expenses = 0
        this.state.house.expenses.forEach(e => {
            expenses += e.quantity * e.service.price
        })
        return sum - expenses
    }

    render(){
        return <>
            <h2>Витрати будинку "{this.state.house.name}"</h2>
            <div className="d-flex justify-content-between">
                <h3>Баланс будинку: {this.getBalance()}</h3>
                <Button className="btn-success mb-2" onClick={this.onAddClick.bind(this)}>
                    Додати витрату
                </Button>
            </div>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{width: "15%", textAlign: "center", verticalAlign: "middle"}}>Дата</th>
                        <th style={{width: "30%", textAlign: "center", verticalAlign: "middle"}}>Послуга</th>
                        <th style={{width: "10%", textAlign: "center", verticalAlign: "middle"}}>Кількість</th>
                        <th style={{width: "15%", textAlign: "center", verticalAlign: "middle"}}>Одиниці вимірювання</th>
                        <th style={{width: "15%", textAlign: "center", verticalAlign: "middle"}}>Сума, грн</th>
                        <th style={{width: "15%", textAlign: "center", verticalAlign: "middle"}}>Опції</th>
                    </tr>
                </thead>
                {
                    this.state.isLoading ? 
                    <tbody>
                        <td colSpan="6"><LoadingSpan/></td>
                    </tbody>
                    :
                    <tbody>
                        {
                            this.state.house.expenses.map(x => (
                                <tr key={x.expenseId} style={{cursor: "pointer"}}>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {formatDate(new Date(x.date))}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}} >
                                        {x.service.name}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {x.quantity}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {x.service.measurement}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        {x.quantity * x.service.price}
                                    </td>
                                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                                        <Button className="btn-danger m-1" onClick={this.onDeleteClick.bind(this, x)}>Видалити</Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                }
            </Table>
            <ExpenseModal onSubmit={this.onAddExpense.bind(this)} headerText="Додавання нової витрати" isModalOpen={this.state.isModalOpen}
                onModalClose={this.toggleAddModal.bind(this)} expense={this.state.currentExpense}/>
            <ConfirmDialog onSubmit={this.onDeleteExpense.bind(this)} headerText={this.state.confirmText} isOpen={this.state.isConfirmOpen}
                onClose={this.toggleConfirmModal.bind(this)}/>
        </>
    }
}