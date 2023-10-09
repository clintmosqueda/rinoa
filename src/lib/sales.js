export const getOrderProducts = async (queries) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/sales`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}
export const getOrderProductsByEmployeeId = async () => {
  try {
    const id = 2
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/sales/${id}`)
    return res
  } catch (error) {
    console.log('error', error)
  }
}