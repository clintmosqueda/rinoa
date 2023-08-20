export const getMerch = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/merch`, {
    cache: 'no-cache'
  })
  console.log(res)

  if(!res.ok) throw new Error('Failed!')
  return res.json()
}