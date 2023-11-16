export const getExpenses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addExpense = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense`, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        cost: formData.cost,
        employee_id: formData.employeeId,
        type: formData.type
      })
    })
    return res
    const data = await res.json()

  } catch (error) {
    console.log('error', error)
  }
}

export const deleteExpense = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense/${id}`, {
    method: 'DELETE'
  })

  if (res.status === 200) {
    console.log('Expense has been deleted')
  }
}

export const updateExpense = async (formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense/${formData.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      description: formData.description,
      cost: formData.cost,
      employee_id: parseInt(formData.employeeId),
    })
  })
  return res

  if (res.status === 200) {
    console.log('Expense has been Updated')
  }
}