'use client'
import { EmployeeForm } from "@/components/Dialog/EmployeeForm"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex, useToast } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const EmployeeContent = () => {
  const toast = useToast()
  const router = useRouter()
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    handleGetEmployees()
  }, [])

  const handleGetEmployees = async () => {
    try {
      const res = await fetch(`/api/employee`)
      const data = await res.json()
      setEmployees(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/employee/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      handleGetEmployees()
      toast({
        title: "Employee has been deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }
  const handleRefresh = async () => {
    await handleGetEmployees()
  }

  const tableHeading = [
    {
      text: 'name',
      accessor: 'name',
    },
    {
      text: 'phone',
      accessor: 'phone',
    },
    {
      text: 'address',
      accessor: 'address',
    },
    {
      text: 'position',
      accessor: 'position',
    },
    {
      text: 'salary',
      accessor: 'salary',
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
              <EmployeeForm
                isUpdate
                dataRow={row}
                handleRefresh={handleRefresh} />
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
      <PageTitle title='従業員登録' />
      <Table
        tableHeading={tableHeading}
        tableData={employees || []} />
      <Box>
        <EmployeeForm handleRefresh={handleRefresh} />
      </Box>
    </Box>
  )
}
