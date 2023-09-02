import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all services
export const GET = async() => {
  try {
    const services = await prisma.services.findMany()
    return new NextResponse(
      JSON.stringify(services), 
      {status: 200}
    )
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({message: 'Something went wrong!'}), 
      {status: 500}
      )
  }
}

// add service
export const POST = async(req) => {
  try {
    const body = await req.json()
    const service = await prisma.services.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(service), 
      {status: 201}
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({message: 'Something went wrong!'}), 
      {status: 500}
      )
  }
}