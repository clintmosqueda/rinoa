import React from 'react'
import { SalesContent } from '@/sections/SalesContent'
import { getEmployees } from '@/lib/employee'

const Sales = async () => {
  const employeeList = await getEmployees()
  return (
    <SalesContent employeeList={employeeList} />
  )
}

export default Sales
