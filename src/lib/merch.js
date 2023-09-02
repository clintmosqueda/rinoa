export const getMerch = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/merch`, {
    cache: 'no-cache'
  })

  if(!res.ok) throw new Error('Failed!')
  return res.json()
}

export const addMerch = async(formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/merch`, {
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

export const deleteMerch = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/merch/${id}`, {
    method: 'DELETE'
  })

  if(res.status === 200) {
    console.log('the product has been deleted')
  }
}

export const updateMerch = async(id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/merch/${id}`, {
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