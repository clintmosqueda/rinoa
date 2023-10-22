import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
// get all products
export const GET = async () => {
  try {
    const products = await prisma.products.findMany({
      where: {
        type: "product",
      },
    });
    return new NextResponse(
      JSON.stringify(products)
      , { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const product = await prisma.products.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
