'use client'
import { Box, Text, Flex } from "@chakra-ui/react"

export const PageTitle = ({ title }) => {
  return (
    <Box marginBottom='44px'>
      <Text
        fontSize='27px'
        fontWeight='bold'
        color='brand.gray'>
        {title}
      </Text>
    </Box>
  )
}
