import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect"
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

export const POST = async(req) => {
  // try {
  //   const body = await req.json()
  //   const order = await prisma.orders.create({
  //     data: {
  //       order_products: {
  //         create
  //       }
  //     }
  //   })
  //   return new NextResponse(
  //     JSON.stringify(order), 
  //     {status: 201}
  //   )
  // } catch (error) {
  //   console.log('error', error)
  //   return new NextResponse(
  //     JSON.stringify({message: 'Something went wrong!'}), 
  //     {status: 500}
  //     )
  // }
}