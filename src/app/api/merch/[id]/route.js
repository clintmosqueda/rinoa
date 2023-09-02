import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"

// delete merch
export const DELETE = async(req, { params }) => {
  // const id = params.id
  const { id } = params
  try {
    await prisma.merch.delete({
      where: {
        id: parseInt(id)
      }
    })
    return new NextResponse(
      JSON.stringify('Menu Item has been deleted!'), 
      {status: 200}
    )
    
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({message: `Something went wrong!`}), 
      {status: 500}
      )
  }
}
// update merch
export const PUT = async(req, { params }) => {
  const {name, price} = await req.json()
  const { id } = params
  try {
    await prisma.merch.update({
      where: { id: parseInt(id)},
      data: {
        name,
        price
      }
    })
    return new NextResponse(
      JSON.stringify('Menu Item has been Updated!'), 
      {status: 200}
    )
    
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({message: `Something went wrong!`}), 
      {status: 500}
      )
  }
}