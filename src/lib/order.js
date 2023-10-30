export const getOrder = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/order`)
    return res.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const addOrder = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/order`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return await res.json({ message: 'success' });

    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
};
