
'use client'
import { Modal } from "./Modal"
import { TbUserPlus } from 'react-icons/tb'
import { Button, Icon, Box, Text, Flex, Input, useDisclosure } from '@chakra-ui/react'
import { RadioButtonGroup } from "@/components/RadioButtonGroup";

export const RegisterCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal
      heading='新規顧客登録'
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}

      tigger={
        <Button
          leftIcon={<Icon fontSize='18px' as={TbUserPlus} />}
          bg='brand.purple'
          color='brand.white'
          fontSize='11px'
          fontWeight='bold'
          padding='0 25px 0 10px'
        >
          顧客追加
        </Button>
      }
    >
      <Flex direction='column' gap='36px 0'>
        <RowInput label='顧客名'>
          <Input />
        </RowInput>
        <RowInput label='性別'>
          <RadioButtonGroup
            options={['男性', '女性']}
          />
        </RowInput>
        <RowInput label='電話番号'>
          <Input />
        </RowInput>
        <RowInput label='年齢'>
          <Input />
        </RowInput>
        <RowInput label='誕生日'>
          <Input type="date" />
        </RowInput>
        <RowInput label='職業'>
          <Input />
        </RowInput>
        <Box width='100%'>
          <Button
            onClick={onClose}
            height='auto'
            fontSize='32px'
            padding='20px 0'
            color='brand.white'
            width='100%'
            bg='brand.green'>
            登録
          </Button>
        </Box>
      </Flex>
    </Modal>
  )
}

const RowInput = ({ label, children }) => {
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
      <Box width='100%'>
        {children}
      </Box>
    </Flex>
  )
}
