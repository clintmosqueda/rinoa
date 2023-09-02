export const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/services`, {
    cache: 'no-cache'
  })

  if(!res.ok) throw new Error('Failed!')
  return res.json()
}

export const addService = async(formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/services`, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
        })
      })
      const data = await res.json()

    } catch (error) {
      console.log('error', error)
    }
}

export const deleteService = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/services/${id}`, {
    method: 'DELETE'
  })

  if(res.status === 200) {
    console.log('the product has been deleted')
  }
}

export const updateService = async(id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      price: formData.price,
    })
  })

  if(res.status === 200) {
    console.log('the product has been Updated')
  }
}