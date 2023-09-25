'use client'
import React, { useContext } from 'react'
import { EmployeeContent } from '@/sections/EmployeeContent'
import { getEmployees } from '@/lib/employee'
import { ValueContext } from '@/context/ValueContext'

const Employee = () => {
  const { employees } = useContext(ValueContext)
  return (
    <EmployeeContent data={employees} />
  )
}

export default Employee