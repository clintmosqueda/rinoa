import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

export const GET = async (req, { searchParams }) => {
  const query = Object.fromEntries(new URL(req.url).searchParams.entries());
  const { employeeId, month } = query
  const date = new Date();
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()

  const firstDay = `${currentYear}-${month}-01`
  const lastDay = (new Date(currentYear, month, 0)).toISOString().split('T')[0]

  try {
    let orderProducts
    if (employeeId > 0) {
      orderProducts = await prisma.order_products.findMany({
        where: {
          employee_id: parseInt(employeeId),
          created_at: {
            gte: new Date(firstDay),
            lte: new Date(lastDay),
          }
        }
      });
    } else {
      orderProducts = await prisma.order_products.findMany({
        where: {
          created_at: {
            gte: new Date(firstDay),
            lte: new Date(lastDay),
          }
        }
      })
    }

    return new NextResponse(JSON.stringify(orderProducts), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};