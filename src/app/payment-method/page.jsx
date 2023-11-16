import React from 'react'
import { PaymentMethodContent } from '@/sections/PaymentMethodContent'
import { PageGuard } from '@/components/PageGuard'

const PaymentMethod = async () => {
  return (
    <PageGuard>
      <PaymentMethodContent />
    </PageGuard>
  )
}

export default PaymentMethod