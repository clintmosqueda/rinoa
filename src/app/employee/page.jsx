import { EmployeeContent } from '@/sections/EmployeeContent'
import { PageGuard } from '@/components/PageGuard'

const Employee = async () => {

  return (
    <PageGuard>
      <EmployeeContent />
    </PageGuard>
  )
}

export default Employee