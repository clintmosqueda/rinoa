import { EmployeeContent } from '@/sections/EmployeeContent'
import { getEmployees } from '@/lib/employee'

const Employee = async () => {
  const employees = await getEmployees()
  return (
    <EmployeeContent data={employees} />
  )
}

export default Employee