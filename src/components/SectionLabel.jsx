'use client'
import { Box, Text, Flex } from "@chakra-ui/react"

export const SectionLabel = ({ step, totalSteps, label, children }) => {
  return (
    <Box>
      <Box
        position='relative'
        zIndex='1'
        padding='0 25px 15px 0'
        bgColor='brand.white'
        display='inline-flex'
        alignItems='center'
        gap='0 23px'>
        <Text
          color='brand.gold'
          fontSize='17px'
          lineHeight='125%'
          fontWeight='bold'
        >
          ステップ
          {step} / {totalSteps}</Text>
        <Text
          color='brand.gray'
          fontSize='27px'
          lineHeight='79%'
          fontWeight='bold'
        >{label}</Text>
      </Box>
      <Box
        marginTop='-27px'
        paddingLeft='49px'
      >
        {children}
      </Box>
    </Box>
  )
}
