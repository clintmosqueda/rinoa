import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
// get all menu
export const GET = async() => {
  try {
    const employees = await prisma.employees.findMany()
    return new NextResponse(
      JSON.stringify(employees), 
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
    const employees = await prisma.employees.create({
      data: body
    })
    return new NextResponse(
      JSON.stringify(employees), 
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