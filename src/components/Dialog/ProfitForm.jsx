'use client'

import { Modal } from "./Modal"
import { Button, Box, Text, Flex, Input, useDisclosure, RadioGroup } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addExpense, updateExpense } from "@/lib/expense";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProfitForm = ({ isUpdate = false, data }) => {
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
      console.log('data', data)
      reset({
        name: data.name,
        cost: data.cost,
        description: data.description
      })
    }
  }, [data])

  const submitAdd = async (formData) => {
    const data = {
      name: formData.name,
      description: formData.description,
      cost: parseFloat(formData.cost),
      type: 'admin'
    }
    addExpense(data)
    onClose()
    router.refresh()
    reset({
      name: '',
      cost: '',
      description: '',
    })
  }

  const submitUpdate = async (inputs) => {
    console.log('inputs', inputs)
    const formData = {
      id: data.id,
      name: inputs.name,
      description: inputs.description,
      cost: parseFloat(inputs.cost),
      type: 'admin'
    }

    updateExpense(formData)
    onClose()
    router.refresh()
    reset({
      name: '',
      cost: '',
      description: '',
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
      heading='経費入力'
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      tigger={isUpdate ? <UpdateBtn /> : <AddBtn />}
    >
      <Flex direction='column' gap='36px 0'>
        <FormRowInput
          label='経費名'
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
          label='詳細'
          error={!!errors?.description}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('description')}
          />
        </FormRowInput>

        <FormRowInput
          label='価格'
          error={!!errors?.cost}
        >
          <Flex alignItems='center' gap='0 15px'>
            <Box>
              <Input
                type="number"
                borderColor="brand.lighterGray"
                {...register('cost', {
                  required: true
                  // validate: {
                  //   required: (val) => {
                  //     console.log('val cost', val)
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
