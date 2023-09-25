export const getMenu = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/menu`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addMenu = async(formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/menu`, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          type: 'menu',
          updated_at: new Date()
        })
      })
      const data = await res.json()

    } catch (error) {
      console.log('error', error)
    }
}

export const deleteMenu = async(id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/menu/${id}`, {
    method: 'DELETE'
  })

  if(res.status === 200) {
    console.log('the menu has been deleted')
  }
}

export const updateMenu = async(id, formData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/menu/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: formData.name,
      price: formData.price,
    })
  })

  if(res.status === 200) {
    console.log('the menu has been Updated')
  }
}