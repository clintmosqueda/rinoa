export const getCustomers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/customer`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addCustomer = async(formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/customer`, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          birthdate: formData.birthdate,
          phone: formData.phone,
          address: formData.address,
          updated_at: new Date()
        })
      })
      const data = await res.json()

    } catch (error) {
      console.log('error', error)
    }
}

export const deleteCustomer = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/customer/${id}`, {
    method: 'DELETE'
  })

  if(res.status === 200) {
    console.log('Customer record has been deleted')
  }
}

export const updateCustomer = async(id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/customer/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      gender: formData.gender,
      phone: formData.phone,
      nationality: formData.nationality,
      occupation: formData.occupation,
      updated_at: new Date()
    })
  })

  if(res.status === 200) {
    console.log('Customer record has been Updated')
  }
}