'use client'

import { Modal } from "./Modal"
import { Button, Icon, Box, Text, Flex, Input, useDisclosure } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addMerch, updateMerch } from "@/lib/merch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const MerchForm = ({ isUpdate = false, data }) => {
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
    if (data) {
      reset({
        name: data.name,
        price: data.price
      })
    }
  }, [data])

  const submitAdd = async (formData) => {
    addMerch(formData)
    onClose()
    router.refresh()
    reset({
      name: '',
      price: ''
    })
  }

  const submitUpdate = async (formData) => {
    console.log('formData', formData)
    updateMerch(data.id, formData)
    onClose()
    router.refresh()
    reset({
      name: '',
      price: ''
    })

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
      heading='メニュー入力'
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      tigger={isUpdate ? <UpdateBtn /> : <AddBtn />}
    >
      <Flex direction='column' gap='36px 0'>
        <FormRowInput
          label='メニュー'
          error={!!errors?.name}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('name', {
              validate: {
                required: (val) => {
                  let notEmpty = val?.trim().length > 0
                  return notEmpty
                },
              },
            })}
          />
        </FormRowInput>
        <FormRowInput
          label='価格'
          error={!!errors?.price}
        >
          <Flex alignItems='center' gap='0 15px'>
            <Box>
              <Input
                type="number"
                borderColor="brand.lighterGray"
                {...register('price', {
                  validate: {
                    required: (val) => {
                      let notEmpty = val?.trim().length > 0
                      return notEmpty
                    },
                  },
                })}
              />
            </Box>
            <Text>PHP</Text>
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
