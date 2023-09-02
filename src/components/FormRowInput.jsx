'use client'
import { Box, Text, Flex } from '@chakra-ui/react'

export const FormRowInput = ({ error, message, label, children }) => {
  return (
    <Flex
      alignItems='center'
      gap="0 0"
      width='100%'>
      <Box flexShrink='0' minW='145px'>
        <Text
          fontSize='27px'
          fontWeight='bold'
          color='brand.gray'
        >{label}</Text>
      </Box>
      <Box width='100%' position='relative'>
        {children}
        {error && (
          <Text
            fontSize='12px'
            pos='absolute'
            bottom='-22px'
            left='0'
            color='brand.red'>
            {message ? message : `${label} is required`}
          </Text>
        )}
      </Box>
    </Flex>
  )
}
