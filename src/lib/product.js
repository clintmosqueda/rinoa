export const getProduct = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/product`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addProduct = async(formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/product`, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          type: 'merchandise',
          updated_at: new Date()
        })
      })
      const data = await res.json()

    } catch (error) {
      console.log('error', error)
    }
}

export const deleteProduct = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/product/${id}`, {
    method: 'DELETE'
  })

  if(res.status === 200) {
    console.log('the product has been deleted')
  }
}

export const updateProduct = async(id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/product/${id}`, {
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