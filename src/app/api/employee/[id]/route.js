import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"

// delete employee
export const DELETE = async(req, { params }) => {
  // const id = params.id
  const { id } = params
  try {
    await prisma.employees.delete({
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
// update employee
export const PUT = async(req, { params }) => {
  const {name, birthdate, phone, address, position, salary} = await req.json()
  const { id } = params
  try {
    await prisma.employees.update({
      where: { id: parseInt(id)},
      data: {
        name,
        birthdate,
        phone,
        address,
        salary,
        position,
        updated_at: new Date()
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