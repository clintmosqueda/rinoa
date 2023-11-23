'use client'

import { Modal } from "./Modal"
import { Button, Icon, Box, Text, Flex, Input, useDisclosure, useToast } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addProduct, updateProduct, getProduct } from "@/lib/product";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProductForm = ({ handleRefresh, isUpdate = false, dataRow }) => {
  const toast = useToast()
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
        price: dataRow.price
      })
    }
  }, [])

  const submitAdd = async (formData) => {
    const data = {
      name: formData.name,
      price: parseFloat(formData.price),
      type: 'product'
    }
    const response = await addProduct(data)

    if (response.status === 201) {
      handleRefresh()
      onClose()
      reset({
        name: '',
        price: ''
      })
      toast({
        title: "Added New Product",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } else {
      onClose()
    }
  }

  const submitUpdate = async (formData) => {
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      type: 'product'
    }
    const response = await updateProduct(dataRow.id, productData)
    if (response.status === 200) {
      handleRefresh()
      onClose()
      reset({
        name: '',
        price: ''
      })
      toast({
        title: "Updated Product",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
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
                  required: true
                  // validate: {
                  //   required: (val) => {
                  //     let notEmpty = val?.trim().length > 0
                  //     return notEmpty
                  //   },
                  // },
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
