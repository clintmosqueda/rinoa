import { ProfitContent } from "@/sections/ProfitContent"
import { getExpenses } from '@/lib/expense'
import { getOrder } from "@/lib/order"
import { getEmployees } from "@/lib/employee"

const Profit = async () => {
  const expenses = await getExpenses()
  const orders = await getOrder()
  const employees = await getEmployees()
  const employeeExpenseTotal = expenses.filter(expense => expense.type === 'employee').reduce((acc, curr) => (acc + curr.cost), 0)
  const shopExpenses = expenses.filter(expense => expense.type === 'admin').map(expense => {
    return {
      id: expense.id,
      name: expense.name,
      cost: expense.cost,
      description: expense.description
    }
  })
  const salaryExpense = employees.reduce((acc, cur) => (acc + cur.salary), 0)
  const allExpense = [
    { name: 'Employee Expenses', cost: employeeExpenseTotal },
    { name: 'Salary Expenses', cost: salaryExpense },
    ...shopExpenses
  ]

  const sales = orders.reduce((acc, cur) => (acc + cur.grand_total), 0)
  return (
    <ProfitContent sales={sales || 0} expenses={allExpense || []} />
  )
}

export default Profit