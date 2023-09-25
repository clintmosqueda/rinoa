export const assignedEmployee = (employeeId, employeeList) => {
  const employee = employeeList.find(f => f.id === employeeId)
  return employee.name
} 