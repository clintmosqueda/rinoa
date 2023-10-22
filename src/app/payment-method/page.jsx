import React from 'react'
import { PaymentMethodContent } from '@/sections/PaymentMethodContent'
import { getPaymentMethod } from "@/lib/paymentMethod"

const PaymentMethod = async () => {
  const paymentMethod = await getPaymentMethod()
  return (
    <PaymentMethodContent data={paymentMethod || []} />
  )
}

export default PaymentMethod