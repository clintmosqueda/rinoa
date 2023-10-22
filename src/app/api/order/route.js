import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
// get all order by month
export const GET = async (req) => {
  const date = new Date();
  const month = date.getMonth() + 1
  const currentYear = date.getFullYear()

  const firstDay = `${currentYear}-${month}-01`
  const lastDay = (new Date(currentYear, month, 0)).toISOString().split('T')[0]

  try {
    const orders = await prisma.orders.findMany({
      where: {
        created_at: {
          gte: new Date(firstDay),
          lte: new Date(lastDay),
        }
      }
    })
    return new NextResponse(
      JSON.stringify(orders),
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

export const POST = async (req) => {
  try {
    const { order, order_products } = await req.json();
    const newProducts = order_products.map(product => {
      return {
        // order_id: latestOrder.id,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        type: product.type,
        employee_id: product.employee_id,
      }
    })

    const orderData = await prisma.orders.create({
      data: {
        customer_id: order.customer_id,
        grand_total: order.grand_total,
        payment_method_id: order.payment_method_id,
        employee_id: order.employee_id,
        order_products: {
          createMany: {
            data: newProducts
          }
        }
      },
    })


    return new NextResponse(
      // JSON.stringify(orderProducts),
      JSON.stringify(orderData),
      { status: 201 }
    )
  } catch (error) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
