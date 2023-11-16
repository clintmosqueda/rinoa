'use client'

import { Modal } from "./Modal"
import { Button, Icon, Box, Text, Flex, Input, useDisclosure } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addPaymentMethod, updatePaymentMethod } from "@/lib/paymentMethod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const PaymentMethodForm = ({ handleRefresh, isUpdate = false, dataRow }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (dataRow) {
      reset({
        name: dataRow.name,
        interest: dataRow.interest
      })
    }
  }, [dataRow])

  const submitAdd = async (formData) => {
    const response = await addPaymentMethod(formData)
    if (response.status === 201) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        interest: ''
      })
    }
  }

  const submitUpdate = async (formData) => {
    const response = await updatePaymentMethod(dataRow.id, formData)
    if (response.status === 200) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        interest: ''
      })
    } else {
      onClose()
    }
  }

  const UpdateBtn = () => (
    <Text
      textAlign='center'
      width='100%'
      cursor='pointer'>
      編集
    </Text>
  )

  return (
    <Modal
      heading='支払い方法登録'
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      tigger={isUpdate ? <UpdateBtn /> : <AddBtn />}
    >
      <Flex direction='column' gap='36px 0'>
        <FormRowInput
          label='支払い方法名'
          error={!!errors?.name}
          labelStyle={{
            minW: '190px'
          }}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('name', {
              required: true
            })}
          />
        </FormRowInput>

        <FormRowInput
          label='手数料'
          error={!!errors?.interest}
          labelStyle={{
            minW: '190px'
          }}
        >
          <Flex alignItems='center' gap='0 15px'>
            <Box>
              <Input
                type="number"
                borderColor="brand.lighterGray"
                {...register('interest', {
                  required: true
                })}
              />
            </Box>
            <Text>%</Text>
          </Flex>
        </FormRowInput>

        <Box width='100%'>
          <Button
            onClick={handleSubmit(isUpdate ? submitUpdate : submitAdd)}
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
