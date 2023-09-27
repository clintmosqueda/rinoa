import { OrderContent } from "@/sections/OrderContent";
import { getProduct } from "@/lib/product";
import { getMenu } from "@/lib/menu";
import { getCustomers } from "@/lib/customer";
import { getPaymentMethod } from "@/lib/paymentMethod"

const Home = async () => {
  const paymentMethods = await getPaymentMethod()
  const customerData = await getCustomers()
  const products = await getProduct()
  const menus = await getMenu()
  const customers = customerData.map(customer => {
    return {
      name: customer.name,
      value: customer.id
    }
  })

  console.log('menus', menus)
  return (
    <OrderContent
      customers={customers}
      paymentMethods={paymentMethods}
      productList={products}
      menuList={menus}
    />
  )
}

export default Home
