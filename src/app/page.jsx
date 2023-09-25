import { AppointmentContent } from "@/sections/AppointmentContent";
// import { getProduct } from "@/lib/product";
// import { getServices } from "@/lib/services";
// import { getCustomer } from "@/lib/customer";

export default async function Home() {
  // const customers = await getCustomer()
  // const customerRecords = customers.map(customer => {
  //   return {
  //     name: customer.customer_name,
  //     value: customer.customer_name
  //   }
  // })
  return (
    <AppointmentContent />
  )
}
