import React from 'react'
import { PaymentMethodContent } from '@/sections/PaymentMethodContent'
import { getPaymentMethod } from "@/lib/paymentMethod"
import { PageGuard } from '@/components/PageGuard'

const PaymentMethod = async () => {
  const paymentMethod = await getPaymentMethod()
  return (
    <PageGuard>
      <PaymentMethodContent data={paymentMethod || []} />
    </PageGuard>
  )
}

export default PaymentMethod