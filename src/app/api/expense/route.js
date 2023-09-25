import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all menu
export const GET = async() => {
  try {
    const expenses = await prisma.expenses.findMany()
    return new NextResponse(
      JSON.stringify(expenses), 
      {status: 200}
    )
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({message: 'Something went wrong!'}), 
      {status: 500}
      )
  }
}

export const POST = async(req) => {
  try {
    const body = await req.json()
    const expense = await prisma.expenses.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(expense), 
      {status: 201}
    )
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({message: 'Something went wrong!'}), 
      {status: 500}
      )
  }
}