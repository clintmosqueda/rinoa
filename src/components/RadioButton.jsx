'use client'
import { Box, useRadio } from "@chakra-ui/react"

export const RadioButton = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        minWidth='119px'
        textAlign='center'
        fontSize='11px'
        fontWeight='bold'
        bg='brand.lightGray'
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'brand.purple',
          color: 'white',
        }}
        // _focus={{
        //   boxShadow: 'outline',
        // }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
