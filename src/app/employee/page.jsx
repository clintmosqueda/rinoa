import { EmployeeContent } from '@/sections/EmployeeContent'
import { getEmployees } from '@/lib/employee'
import { PageGuard } from '@/components/PageGuard'

const Employee = async () => {
  const employees = await getEmployees()

  return (
    <PageGuard>
      <EmployeeContent data={employees || []} />
    </PageGuard>
  )
}

export default Employee