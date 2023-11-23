'use client'
import { Box, Icon, Text, Flex, RadioGroup, Select } from "@chakra-ui/react"
import { PageTitle } from "@/components/PageTitle"
import { CustomRadio } from "@/components/CustomRadio";
import { useEffect, useState } from "react";
import { getOrderProductsByEmployeeId } from "@/lib/sales";
import { Calendar } from "@/utils/months";

export const SalesContent = ({ employeeList }) => {
  const d = new Date();
  const [sales, setSales] = useState(null)
  const [query, setQuery] = useState({
    employeeId: 0,
    month: d.getMonth() + 1
  })
  const [serviceTotal, setServiceTotal] = useState(0)
  const [productTotal, setProductTotal] = useState(0)
  const employees = employeeList.map(employee => {
    return {
      id: employee.id,
      name: employee.name
    }
  })

  const months = [
    {
      name: '今月',
      id: d.getMonth() + 1
    },
    {
      name: '先月',
      id: d.getMonth()
    }
  ]

  const inchargeList = [{ id: 0, name: '全体' }, ...employees]

  useEffect(() => {
    const handleGetData = async () => {
      let fetchRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/sales?employeeId=${query.employeeId}&month=${query.month}`)
        .then(response => response.json())
        .then(data => data)
      setSales(fetchRes)
      handleTotal(fetchRes)
    }

    handleGetData()
  }, [])



  const handleTotal = (data) => {
    const serviceSum = data.reduce((acc, cur) => (cur.type === 'Menu' ? acc + (cur.price - (cur.price * cur.discount / 100)) : acc), 0)

    const productSum = data.reduce((acc, cur) => (cur.type === 'Product' ? acc + ((cur.price - (cur.price * cur.discount / 100)) * cur.quantity) : acc), 0)

    setServiceTotal(serviceSum)
    setProductTotal(productSum)
  }

  const handleChangeEmployee = async (id) => {
    setQuery(prev => ({ ...prev, employeeId: id }))
    let fetchRes
    fetchRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/sales?employeeId=${id}&month=${query.month}`)
      .then(response => response.json())
      .then(data => data)
    handleTotal(fetchRes)
  }

  const handleChangeMonth = async (id) => {
    setQuery(prev => ({ ...prev, month: id }))
    let fetchRes
    fetchRes = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/sales?employeeId=${query.employeeId}&month=${id}`)
      .then(response => response.json())
      .then(data => data)

    handleTotal(fetchRes)
  }

  return (
    <Box>
      <PageTitle title='売り上げ確認' />
      <Box>
        <SaleRow
          label='期間選択'
          childrenStyle={{
            display: 'flex',
            alignItems: 'center',
            gap: '0 12px'
          }}
        >
          <RadioGroup
            flexShrink='0'
            name="month"
            onChange={(val) => handleChangeMonth(val)}
            value={parseInt(query.month)}
          >
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {months.map(month => (
                <CustomRadio
                  key={month.id}
                  value={month.id}
                  name={month.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
          <Select placeholder="Select Month" onChange={e => handleChangeMonth(e.target.value)}>
            {Calendar.map(month => (
              <option key={month.id} value={month.id} disabled={d.getMonth() < month.id ? true : false}>{month.name}</option>
            ))}
          </Select>
        </SaleRow>
        <SaleRow label='担当者選択'>
          <RadioGroup name="employeeIncharge" onChange={(val) => handleChangeEmployee(val)} value={parseInt(query.employeeId)}>
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {inchargeList.map(employee => (
                <CustomRadio
                  key={employee.id}
                  value={employee.id}
                  name={employee.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
        </SaleRow>

        <Flex
          gap='0 50px'
        >
          <SaleRow
            label='技術売り上げ'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            childrenStyle={{
              width: '100%',
              marginTop: '10px'
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              width='100%'
              backgroundColor='#EBAC72'
              height='185px'
              color='white'
            >
              <Box display='flex' alignItems='baseline'>
                <Text
                  fontWeight='bold'
                  fontSize='54px'
                >
                  {serviceTotal}
                </Text>
                <Text fontSize='24px'>
                  PHP
                </Text>
              </Box>
            </Box>
          </SaleRow>

          <SaleRow
            label='店販売り上げ'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            childrenStyle={{
              width: '100%',
              marginTop: '10px'
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              width='100%'
              backgroundColor='#EBAC72'
              height='185px'
              color='white'
            >
              <Box display='flex' alignItems='baseline'>
                <Text
                  fontWeight='bold'
                  fontSize='54px'
                >
                  {productTotal}
                </Text>
                <Text fontSize='24px'>
                  PHP
                </Text>
              </Box>
            </Box>
          </SaleRow>
        </Flex>

      </Box>
    </Box>
  )
}

export const SaleRow = ({ label, children, childrenStyle, ...rest }) => {
  return (
    <Flex
      alignItems='center'
      mt='50px'
      {...rest}
    >
      <Box
        minW='150px'
      >
        <Text
          fontSize='24px'
          fontWeight='bold'
          color='brand.gray'
        >
          {label}
        </Text>
      </Box>
      <Box
        {...childrenStyle}
      >
        {children}
      </Box>
    </Flex>
  )
}