'use client'
import { ExpenseForm } from "@/components/Dialog/ExpenseForm"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex, useToast } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'
import { useRouter } from "next/navigation"
import { assignedEmployee } from "@/utils/assignedEmployee"
import { ymdFormat } from "@/utils/timeHelper"
import { useEffect, useState } from "react"

export const ExpenseContent = () => {
  const toast = useToast()
  const router = useRouter()
  const [employeeExpenses, setExployeeExpenses] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    handleGetData()
  }, [])

  const handleGetData = () => {
    Promise.all([
      fetch(`/api/expense`),
      fetch(`/api/employee`),
    ])
      .then(async ([getExpense, getEmployee]) => {
        const expense = await getExpense.json()
        const employees = await getEmployee.json()
        return {
          expenses: expense,
          employees: employees
        }
      })
      .then(res => {
        const { expenses, employees } = res
        setExployeeExpenses(expenses.filter(f => f.type === 'employee'))
        setEmployees(employees)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/expense/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      handleRefresh()
      toast({
        title: "Expense has been deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleRefresh = () => {
    handleGetData()
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
              <ExpenseForm isUpdate dataRow={row} handleRefresh={handleRefresh} />
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
      <PageTitle title='経費入力' />
      <Table
        tableHeading={tableHeading}
        tableData={employeeExpenses} />
      <Box>
        <ExpenseForm handleRefresh={handleRefresh} />
      </Box>
    </Box>
  )
}
