'use client'
import { Sidebar } from "@/sections/Sidebar"
import { Box, Flex, Text } from "@chakra-ui/react"
import { currentDate } from "@/utils/time"

export const Wrapper = ({ children }) => {
  return (
    <Flex height='100vh' overflow='hidden'>
      <Box
        width='270px'
        flexShrink='0'
        borderRight='1px solid #EBEBEB;'
        padding='29px 24px'
        overflowY='auto'
      >
        <Sidebar />
      </Box>
      <Box
        padding='29px 24px'
        w='100%'
        overflowY='auto'
      >
        <Box mb='42px'>
          <Text
            as='span'
            display='inline-block'
            fontSize='14px'
            color='brand.gray'
            border='1px solid'
            borderColor='brand.gray'
            borderRadius='5px'
            padding='7px 22px'
            lineHeight='152%'
          >
            {currentDate()}
          </Text>
        </Box>
        {children}
      </Box>
    </Flex>
  )
}
