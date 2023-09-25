import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all customer
export const GET = async() => {
  try {
    const customers = await prisma.customers.findMany()
    return new NextResponse(
      JSON.stringify(customers),
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
    const customer = await prisma.customers.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(customer), 
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