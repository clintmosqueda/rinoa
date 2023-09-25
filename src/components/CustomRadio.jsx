'use client'
import { Box, Radio, useRadio } from "@chakra-ui/react"

export const CustomRadio = ({ value, name, ...rest }) => {

  return (
    <Box
      {...rest}
      css={{
        '& .chakra-radio': {
          width: '100%',
          padding: '9px 10px',
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: '#EEE',
          '&[data-checked]': {
            backgroundColor: '#5D87FF',
            color: '#fff'
          },
          '& .chakra-radio__control': {
            display: 'none'
          },
          '& .chakra-radio__label': {
            marginInlineStart: '0',
            width: '100%'
          },

        },
      }}
    >
      <Radio
        value={value}>
        {name}
      </Radio>
    </Box>
  )
}
