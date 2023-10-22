import { getCustomers } from '@/lib/customer'
import { CustomersContent } from '@/sections/CustomersContent'
import React from 'react'

const Customers = async () => {
  const customers = await getCustomers()
  return (
    <CustomersContent data={customers || []} />
  )
}

export default Customers