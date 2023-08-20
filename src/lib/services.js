export const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/services`, {
    cache: 'no-cache'
  })

  if(!res.ok) throw new Error('Failed!')
  return res.json()
}