'use client'
import { AddBtn } from "@/components/AddBtn"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex, Button } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'

const tableHeading = [
  {
    text: 'メニュー名',
    accessor: 'name',
  },
  {
    text: '価格',
    accessor: 'price',
  },
  {
    text: '',
    accessor: 'action',
    render: () => {
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
            <Text
              textAlign='center'
              width='100%'
              cursor='pointer'>
              編集
            </Text>
            <Box
              h='1px'
              w='100%'
              bg='brand.lighterGray'></Box>
            <Text
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

const tableData = [
  {
    id: 1,
    name: 'haircut',
    price: '700'
  },
  {
    id: 2,
    name: 'rebonds',
    price: '1200'
  }
]

export const MenuContent = ({ data }) => {
  return (
    <Box>
      <PageTitle title='メニュー情報管理' />
      <Table
        tableHeading={tableHeading}
        tableData={data} />
      <Box>
        <AddBtn />
      </Box>
    </Box>
  )
}
