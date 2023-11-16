'use client'
import { ProductForm } from "@/components/Dialog/ProductForm"
import { PageTitle } from "@/components/PageTitle"
import { Table } from "@/components/Table"
import { Box, Icon, Text, Flex, useDisclosure, useToast } from "@chakra-ui/react"
import { TbDots } from 'react-icons/tb'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const ProductContent = ({ data }) => {
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [product, setProduct] = useState([])

  useEffect(() => {
    handleGetProduct()
  }, [])

  const handleGetProduct = async () => {
    try {
      const res = await fetch(`/api/product`)
      const data = await res.json()
      setProduct(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/product/${id}`, {
      method: 'DELETE'
    })

    if (res.status === 200) {
      handleGetProduct()
      toast({
        title: "Product has been deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const handleRefresh = () => {
    handleGetProduct()
  }

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
              <ProductForm isUpdate dataRow={row} handleRefresh={handleRefresh} />
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
      <PageTitle title='店販商品登録' />
      <Table
        tableHeading={tableHeading}
        tableData={product} />
      <Box>
        <ProductForm handleRefresh={handleRefresh} />
      </Box>
    </Box>
  )
}
