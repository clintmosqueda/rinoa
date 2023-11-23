import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async (req) => {
  const query = Object.fromEntries(new URL(req.url).searchParams.entries());
  const { user, password } = query
  try {
    const data = await prisma.user.findMany({
      where: {
        user: user,
        password: password
      }
    })
    return new NextResponse(
      JSON.stringify(employees),
      { status: 200 }
    )
  } catch (error) {
    console.log('error', error)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    )
  }
}