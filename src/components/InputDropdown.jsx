'use client'
import { forwardRef } from 'react'
import { Input, Box } from "@chakra-ui/react"

export const InputDropdown = forwardRef((props, ref) => {
  return (
    <Box>
      <Input list="ice-cream-flavors" />
    </Box>
  )
})
