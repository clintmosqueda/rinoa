'use client'

import { Modal } from "./Modal"
import { Button, Icon, Box, Text, Flex, Input, useDisclosure, useToast } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addEmployee, updateEmployee } from "@/lib/employee";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const EmployeeForm = ({ handleRefresh, isUpdate = false, dataRow }) => {
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
        phone: dataRow.phone,
        address: dataRow.address,
        position: dataRow.position,
        salary: dataRow.salary,
      })
    }
  }, [dataRow])

  const submitAdd = async (formData) => {
    const response = await addEmployee(formData)
    if (response.status === 201) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        price: '',
        address: '',
        position: '',
        salary: '',
      })
      toast({
        title: "Added New Employee",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const submitUpdate = async (formData) => {
    const response = await updateEmployee(dataRow.id, formData)
    if (response.status === 200) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        phone: '',
        address: '',
        position: '',
        salary: '',
      })
      toast({
        title: "Updated Employee Details",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
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
          label='Name'
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
          label='Phone'
          error={!!errors?.phone}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('phone', {
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
          label='Address'
          error={!!errors?.address}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('address', {
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
          label='Position'
          error={!!errors?.position}
        >
          <Input
            borderColor="brand.lighterGray"
            {...register('position', {
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
          label='Salary'
          error={!!errors?.salary}
        >
          <Input
            type="number"
            borderColor="brand.lighterGray"
            {...register('salary', {
              valueAsNumber: true,
              validate: (value) => value > 0
            })}
          />
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
