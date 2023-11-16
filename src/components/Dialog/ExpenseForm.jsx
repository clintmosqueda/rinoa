'use client'

import { Modal } from "./Modal"
import { Button, Box, Text, Flex, Input, useDisclosure, RadioGroup, useToast } from '@chakra-ui/react'
import { AddBtn } from "@/components/AddBtn"
import { FormRowInput } from "../FormRowInput";
import { useForm } from 'react-hook-form'
import { addExpense, updateExpense } from "@/lib/expense";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ValueContext } from '@/context/ValueContext'
import { CustomRadio } from "../CustomRadio";

export const ExpenseForm = ({ handleRefresh, isUpdate = false, dataRow }) => {
  const toast = useToast()
  const { employees } = useContext(ValueContext)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [employeeId, setEmployeeId] = useState(null)
  const [employeeError, setEmployeeError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (dataRow) {
      console.log('dataRow', dataRow)
      reset({
        name: dataRow.name,
        cost: dataRow.cost,
        description: dataRow.description
      })
      setEmployeeId(dataRow.employee_id)
    }
  }, [dataRow])

  const submitAdd = async (formData) => {
    if (!employeeId) {
      setEmployeeError(true)
      return
    }
    const data = {
      name: formData.name,
      description: formData.description,
      cost: parseFloat(formData.cost),
      employeeId: parseInt(employeeId),
      type: 'employee'
    }
    const res = await addExpense(data)
    if (res.status === 201) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        cost: '',
        description: '',
      })
      setEmployeeId(null)
      toast({
        title: "Added New Expenses",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }

  }

  const submitUpdate = async (inputs) => {
    const formData = {
      id: dataRow.id,
      name: inputs.name,
      description: inputs.description,
      cost: parseFloat(inputs.cost),
      employeeId: parseInt(employeeId),
      type: 'employee'
    }

    const res = await updateExpense(formData)
    if (res.status === 200) {
      onClose()
      handleRefresh()
      reset({
        name: '',
        cost: '',
        description: '',
      })
      setEmployeeId(null)
      toast({
        title: "Updated Expense",
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

  const handleRadioChange = (value) => {
    console.log('value', value)
    setEmployeeId(value)
  }

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

        <FormRowInput
          label='担当者'
          error={!!employeeError}
        >
          <RadioGroup name="employeeIncharge" onChange={(val) => handleRadioChange(val)} value={parseInt(employeeId)}>
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {employees.map(staff => (
                <CustomRadio
                  key={staff.id}
                  value={staff.id}
                  name={staff.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
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
