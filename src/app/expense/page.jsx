import { getExpenses } from '@/lib/expense'
import { getEmployees } from '@/lib/employee'
import { ExpenseContent } from '@/sections/ExpenseContent'
import React from 'react'

const Expense = async () => {
  const expenses = await getExpenses()
  const employees = await getEmployees()

  return (
    <ExpenseContent data={expenses} employees={employees} />
  )
}

export default Expense