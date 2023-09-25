'use client'
import { Text, Box, HStack, useRadioGroup, useRadio } from "@chakra-ui/react"

export const RadioButtonGroup = ({ options, handleChange, ...rest }) => {

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  })

  return (
    <HStack
      {...rest}
      {...getRootProps()}>
      {options.map((option) => {
        return (
          <RadioButton
            key={option.id}
            {...getRadioProps({ value: option.id })}>
            {option.name}
          </RadioButton>
        )
      })}
    </HStack>
  )

  // https://chakra-ui.com/docs/hooks/use-radio-group
  // https://www.youtube.com/watch?v=zgKH12s_95A&t=366s
}

export const RadioButton = (props) => {
  const { ...radioProps } = props
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps)
  // console.log('getLabelProps', getLabelProps)

  return (
    <Box cursor='pointer'>
      <input {...getInputProps({})} hidden />
      <Box
        {...getRadioProps()}
        minWidth='119px'
        textAlign='center'
        fontSize='11px'
        fontWeight='bold'
        // bg='brand.lightGray'
        bg={state.isChecked ? 'brand.purple' : 'brand.lightGray'}
        color={state.isChecked ? 'white' : 'black'}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        // _checked={{
        //   bg: 'brand.purple',
        //   color: 'white',
        // }}
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


