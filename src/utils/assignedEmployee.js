export const assignedEmployee = (employeeId, employeeList) => {
  const employee = employeeList.find(f => f.id === employeeId)
  console.log('assignedEmployee', employee)
  return employee.name
} 