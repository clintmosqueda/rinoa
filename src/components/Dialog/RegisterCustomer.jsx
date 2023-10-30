'use client'
import { Modal } from "./Modal"
import { TbUserPlus } from 'react-icons/tb'
import {
  Button,
  Icon,
  Box,
  Text,
  Flex,
  Input,
  useDisclosure,
  RadioGroup,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'
import { FormRowInput } from "../FormRowInput";
import { useState } from "react";
import { CustomRadio } from "@/components/CustomRadio";

export const RegisterCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [values, setValues] = useState({
    name: '',
    phone: '',
    age: null,
    gender: '',
    birthdate: null,
    nationality: '',
    occupation: ''
  })
  const [error, setError] = useState(
    {
      nameError: false,
      phoneError: false
    }
  )

  const sexes = [
    {
      id: 1,
      value: 'male',
      name: 'Male'
    },
    {
      id: 2,
      value: 'female',
      name: 'Female'
    },
  ]

  const handleChange = (e) => {
    let target = e.target
    const inputs = { ...values }
    inputs[target.name] = target.value
    setValues(inputs)

    if (target.name === 'name') {
      setError({ ...error, nameError: false })
    }

    if (target.name === 'phone') {
      setError({ ...error, phoneError: false })
    }
  }

  const handleGender = (val) => {
    const inputs = { ...values }
    inputs.gender = val
    setValues(inputs)
  }

  const handleSubmit = async () => {
    console.log('values', values)
    if (!values.name) {
      setError({ ...error, nameError: true })
      return
    }
    if (!values.phone) {
      setError({ ...error, phoneError: true })
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/customer`, {
        method: 'POST',
        body: JSON.stringify(values)
      })
      if (res.status === 201) {
        onClose()
        location.reload();
      } else {
        console.log(res)
      }

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleCloseModal = () => {
    setError(
      {
        nameError: false,
        phoneError: false
      }
    )
    onClose()
  }

  return (
    <Modal
      heading='新規顧客登録'
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleCloseModal}

      tigger={
        <Button
          leftIcon={<Icon fontSize='18px' as={TbUserPlus} />}
          bg='brand.purple'
          color='brand.white'
          fontSize='11px'
          fontWeight='bold'
          padding='0 25px 0 10px'
        >
          {/* 顧客追加 */}
          add customer
        </Button>
      }
    >
      <Flex direction='column' gap='36px 0'>
        <FormRowInput label='顧客名'>
          <Input required onChange={(e) => handleChange(e)} name="name" />
          {error.nameError && (
            <Text as='span' fontSize='12px' color='red'>name is required</Text>
          )}
        </FormRowInput>
        <FormRowInput label='性別'>
          <RadioGroup onChange={(val) => handleGender(val)} value={values.gender}>
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {sexes.map(gender => (
                <CustomRadio
                  key={gender.id}
                  value={gender.value}
                  name={gender.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
        </FormRowInput>
        <FormRowInput label='電話番号'>
          <Input
            type="text"
            inputMode="numeric"
            required
            pattern="[0-9\s]{13,19}"
            // min='1'
            maxLength="12"
            onChange={(e) => handleChange(e)}
            name="phone"
          />
          {error.phoneError && (
            <Text as='span' fontSize='12px' color='red'>phone is required</Text>
          )}
        </FormRowInput>
        <FormRowInput label='年齢'>
          <NumberInput>
            <NumberInputField
              onChange={(e) => handleChange(e)}
              pattern="^[0-9]"
              name="age" />
          </NumberInput>
        </FormRowInput>
        <FormRowInput label='誕生日'>
          <Input onChange={(e) => handleChange(e)} name="birthdate" type="date" />
        </FormRowInput>
        <FormRowInput label='職業'>
          <Input onChange={(e) => handleChange(e)} name="occupation" />
        </FormRowInput>
        <Box width='100%'>
          <Button
            onClick={handleSubmit}
            // onClick={onClose}
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


