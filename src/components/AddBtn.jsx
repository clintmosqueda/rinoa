'use client'
import { Box, Icon, Text, Flex, Button } from "@chakra-ui/react"
import { TbPlus } from 'react-icons/tb'

export const AddBtn = ({ text }) => {
  return (
    <Button
      mt='20px'
      fontSize='30px'
      color='brand.white'
      bg='brand.purple'
      fontWeight='bold'
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='56px'
      padding='0'
      lineHeight='56px'
      w='100%'>
      <Icon fontSize='30px' as={TbPlus} />
    </Button>
  )
}


