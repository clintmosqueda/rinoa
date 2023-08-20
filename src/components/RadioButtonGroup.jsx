'use client'
import { Box, HStack, useRadioGroup, useRadio } from "@chakra-ui/react"

export const RadioButtonGroup = ({ options, ...rest }) => {
  const { getRootProps, getRadioProps, isDisabled } = useRadioGroup({ ...rest })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioButton key={value} {...radio}>
            {value}
          </RadioButton>
        )
      })}
    </HStack>
  )
}

export const RadioButton = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} hidden />
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


