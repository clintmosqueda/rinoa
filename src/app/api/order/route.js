import { NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
// get all menu
// export const GET = async() => {
//   try {
//     const menus = await prisma.products.findMany({
//       where: {
//         type: 'menu'
//       }
//     })
//     return new NextResponse(
//       JSON.stringify(menus),
//       {status: 200}
//     )
//   } catch (error) {
//     console.log('error', error)
//     return new NextResponse(
//       JSON.stringify({message: 'Something went wrong!'}),
//       {status: 500}
//       )
//   }
// }

export const POST = async (req) => {
  try {
    const { order, order_products } = await req.json();
    console.log('order_products', order_products)
    console.log('order', order)
    const orderData = await prisma.orders.create({
      data: order
    })
    console.log('orderData', orderData)
    const latestOrder = await prisma.orders.findFirst({
      take: -1
    })

    const newProducts = order_products.map(product => {
      return {
        order_id: latestOrder.id,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        type: product.type,
        employee_id: product.employee_id,
      }
    })

    console.log('latestOrder', latestOrder)
    console.log('newProducts', newProducts)
    const orderProducts = await prisma.order_products.createMany({
      data: newProducts
    })
    console.log('orderProducts', orderProducts)
    // console.log('orderProducts', orderProducts)
    // const order = await prisma.orders.create({
    //   data: {
    //     order_products: {
    //       create
    //     }
    //   }
    // })
    return new NextResponse(
      JSON.stringify(orderProducts),
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
