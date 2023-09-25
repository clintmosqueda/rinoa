import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"

// delete expense
export const DELETE = async(req, { params }) => {
  const { id } = params
  try {
    await prisma.expenses.delete({
      where: {
        id: parseInt(id)
      }
    })
    return new NextResponse(
      JSON.stringify('Expense has been deleted!'), 
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
// update expense
export const PUT = async(req, { params }) => {
  const {name, cost, description, employee_id} = await req.json()
  const { id } = params
  try {
    await prisma.expenses.update({
      where: { id: parseInt(id)},
      data: {
        name,
        cost: parseFloat(cost),
        description,
        employee_id: parseInt(employee_id),
        updated_at: new Date()
      }
    })
    return new NextResponse(
      JSON.stringify('Expense has been Updated!'), 
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