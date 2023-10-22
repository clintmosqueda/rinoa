'use client'
import { ProfitForm } from "@/components/Dialog/ProfitForm"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const ProfitContent = ({ expenses, sales }) => {
  console.log('expenses', expenses)
  const [profit, setProfit] = useState()
  const router = useRouter()

  const handleDelete = async (id) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      router.refresh()
      console.log('Item has been deleted')
    }
  }

  useEffect(() => {
    handleProfit()
  }, [expenses, sales])

  const handleProfit = () => {
    let totalExpense = expenses.reduce((acc, cur) => (acc + cur.cost), 0)
    setProfit(sales - totalExpense)
  }

  const tableHeading = [
    {
      text: 'Name',
      accessor: 'name',
    },
    {
      text: 'Cost',
      accessor: 'cost',
    },
    {
      text: '',
      accessor: 'action',
      render: (row, index) => (
        <>
          {index > 1 && (
            <Box
              display='inline-block'
              position='relative'
              width='auto'
              css={{
                '&:hover .action': {
                  opacity: '1',
                  pointerEvents: 'auto'
                }
              }}
            >
              <Icon cursor='pointer' fontSize='18px' as={TbDots} />
              <Flex
                className="action"
                opacity='0'
                pointerEvents='none'
                width='100px'
                boxShadow='0px 2px 8px -1px rgba(0, 0, 0, 0.25)'
                padding='10px'
                direction='column'
                alignItems='center'
                gap='10px 0'
                bg='brand.white'
                top='18px'
                left='0'
                zIndex='1'
                borderRadius='5px'
                position='absolute'>
                <ProfitForm isUpdate data={row} />
                <Box
                  h='1px'
                  w='100%'
                  bg='brand.lighterGray'></Box>
                <Text
                  onClick={() => handleDelete(row.id)}
                  textAlign='center'
                  width='100%'
                  cursor='pointer'
                  color='brand.red'>
                  削除
                </Text>
              </Flex>
            </Box>
          )}
        </>
      )
    }
  ]

  return (
    <Box>
      <PageTitle title='Profit' />
      <Table
        tableHeading={tableHeading}
        tableData={expenses} />
      <Box>
        <ProfitForm />
      </Box>
      <Flex
        w='100%'
        gap='0 20px'
        mt='40px'
      >
        <Box
          w='50%'
        >
          <Text
            fontSize='20px'
            fontWeight='bold'
            mb='15px'
          >Total Sales</Text>
          <Box
            padding='27px 0'
            bgColor='brand.purple'
            color='white'
            display='flex'
            alignItems='baseline'
            justifyContent='center'
            fontWeight='bold'
            borderRadius='10px'
          >
            <Text fontSize='54px' >{sales}</Text>
            <Text fontSize='24px' as='span'>PHP</Text>
          </Box>
        </Box>
        <Box
          width='50%'
        >
          <Text
            fontSize='20px'
            fontWeight='bold'
            mb='15px'
          >Profit</Text>
          <Box
            padding='27px 0'
            bgColor='brand.gold'
            color='white'
            display='flex'
            alignItems='baseline'
            justifyContent='center'
            fontWeight='bold'
            borderRadius='10px'
          >
            <Text fontSize='54px' >{profit}</Text>
            <Text fontSize='24px' as='span'>PHP</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
