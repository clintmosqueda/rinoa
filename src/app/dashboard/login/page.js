'use client'
import React from 'react'
import {
  Box,
  Text,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react"

const Login = () => {
  return (
    <Flex
      h='100%'
      align='flex-start'
    >
      <Box
        maxW='500px'
        width='100%'
        flexShrink='0'
      >
        <Text
          mb='30px'
          textTransform='uppercase'
          // textAlign='center'
          fontWeight='bold'>Login</Text>
        <Flex
          gap='10px 0'
          flexDirection='column'

        >
          <FormControl>
            <FormLabel>User</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
export default Login