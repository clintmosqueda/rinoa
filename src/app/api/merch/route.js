import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all merch
export const GET = async() => {
  try {
    const merch = await prisma.merch.findMany()
    return new NextResponse(
      JSON.stringify(merch), 
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
    const merch = await prisma.merch.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(merch), 
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