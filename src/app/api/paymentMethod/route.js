import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all menu
export const GET = async() => {
  try {
    const paymentMethods = await prisma.payment_methods.findMany()
    return new NextResponse(
      JSON.stringify(paymentMethods), 
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
    const paymentMethod = await prisma.payment_methods.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(paymentMethod), 
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