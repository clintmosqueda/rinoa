export const getPaymentMethod = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/paymentMethod`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addPaymentMethod = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/paymentMethod`, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        interest: parseFloat(formData.interest),
      })
    })
    return res
    const data = await res.json()

  } catch (error) {
    console.log('error', error)
  }
}

export const deletePaymentMethod = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/paymentMethod/${id}`, {
    method: 'DELETE'
  })

  if (res.status === 200) {
    console.log('Merchant has been deleted')
  }
}

export const updatePaymentMethod = async (id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/paymentMethod/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      interest: parseFloat(formData.interest),
    })
  })

  return res

  if (res.status === 200) {
    console.log('Merchant has been Updated')
  }
}