export const getEmployees = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/employee`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addEmployee = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/employee`, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        position: formData.position,
        salary: parseFloat(formData.salary),
      })
    })
    const data = await res.json()

  } catch (error) {
    console.log('error', error)
  }
}

export const deleteEmployee = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/employee/${id}`, {
    method: 'DELETE'
  })

  if (res.status === 200) {
    console.log('Employee record has been deleted')
  }
}

export const updateEmployee = async (id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/employee/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      position: formData.position,
      salary: parseFloat(formData.salary),
    })
  })

  return res

  if (res.status === 200) {
    console.log('Employee record has been Updated')
  }
}