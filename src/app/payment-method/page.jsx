import React from 'react'
import { PaymentMethodContent } from '@/sections/PaymentMethodContent'

const PaymentMethod = () => {

  const data = [
    {
      id: 1,
      merchant: 'Cash',
      commission: '0'
    },
    {
      id: 2,
      merchant: 'Card payment',
      commission: '2.75%'
    },
    {
      id: 3,
      merchant: 'Gcash',
      commission: '2%'
    },
  ]
  return (
    <PaymentMethodContent data={data} />
  )
}

export default PaymentMethod