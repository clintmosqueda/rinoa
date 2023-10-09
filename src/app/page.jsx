import { OrderContent } from "@/sections/OrderContent";
import { getProduct } from "@/lib/product";
import { getMenu } from "@/lib/menu";
import { getCustomers } from "@/lib/customer";
import { getPaymentMethod } from "@/lib/paymentMethod"
import { getEmployees } from "@/lib/employee"

const Home = async () => {
  const paymentMethods = await getPaymentMethod()
  const customerData = await getCustomers()
  const products = await getProduct()
  const menus = await getMenu()
  const employeeDate = await getEmployees()
  const employees = employeeDate.map(employee => {
    return {
      id: employee.id,
      name: employee.name
    }
  })
  const customers = customerData.map(customer => {
    return {
      name: customer.name,
      value: customer.id
    }
  })

  return (
    <OrderContent
      customers={customers}
      paymentMethods={paymentMethods}
      productList={products}
      menuList={menus}
      employees={employees}
    />
  )
}

export default Home
