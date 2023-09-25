'use client'
import { ExpenseForm } from "@/components/Dialog/ExpenseForm"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'
import { useRouter } from "next/navigation"
import { assignedEmployee } from "@/utils/assignedEmployee"
import { ymdFormat } from "@/utils/timeHelper"

export const ExpenseContent = ({ data, employees }) => {
  const router = useRouter()

  const handleDelete = async (id) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/expense/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      router.refresh()
      console.log('Expense has been deleted')
    }

  }

  const tableHeading = [
    {
      text: 'Name',
      accessor: 'name',
    },
    {
      text: 'Description',
      accessor: 'description',
    },
    {
      text: 'Cost',
      accessor: 'cost',
    },
    {
      text: 'EIC',
      accessor: 'employee_id',
      render: (row) => {
        return (
          <>
            {assignedEmployee(row.employee_id, employees)}
          </>
        )
      }
    },
    {
      text: 'Date',
      accessor: 'updated_at',
      render: (row) => {
        return (
          <>{ymdFormat(row.updated_at)}</>
        )
      }
    },
    {
      text: '',
      accessor: 'action',
      render: (row) => {
        return (
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
              <ExpenseForm isUpdate data={row} />
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
        )
      }
    }
  ]

  return (
    <Box>
      <PageTitle title='メニュー情報管理' />
      <Table
        tableHeading={tableHeading}
        tableData={data} />
      <Box>
        <ExpenseForm />
      </Box>
    </Box>
  )
}
