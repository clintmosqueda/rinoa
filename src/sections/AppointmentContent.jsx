'use client'
import { Box, Text, Flex, Input, Button, Icon, HStack } from "@chakra-ui/react"
import { SectionLabel } from "@/components/SectionLabel"
import { useState } from "react";
// import { Search } from 'chakra-ui-search'
import { TbUserPlus } from 'react-icons/tb'
import { RadioButtonGroup } from "@/components/RadioButtonGroup";
import { RegisterCustomer } from "@/components/Dialog/RegisterCustomer";
import { AddBtn } from "@/components/AddBtn";
import Select from 'react-select'

const options = [
  { name: 'Swedish', value: 'sv' },
  { name: 'English', value: 'en' },
  { name: 'Spanish', value: 'es' },
  { name: 'Tagalog', value: 'ph' },
];

const inputStyle = () => ({
  // backgroundColor: 'red'
})

const optionStyle = () => ({

})

const customStyles = {
  // option: (provided) => ({
  //   ...provided,
  //   color: 'black',
  //   padding: 5
  // }),
  control: (styles) => {
    return {
      ...styles,
      width: '100%'
    }
  },
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  indicatorContainer: (styles) => ({ ...styles, display: 'none' }),
  input: (styles) => ({ ...styles, ...inputStyle() }),
  option: (styles, { data, isFocused, isSelected, isDisabled }) => {
    return {
      ...styles,
      backgroundColor: isFocused
        ? 'transparent'
        : isSelected
          ? 'transparent'
          : 'transparent',
      color: 'black'
    }
  }

}


export const AppointmentContent = ({ customers }) => {
  // console.log('customer', customers)
  const [menus, setMenus] = useState([
    { name: '', price: 0, employeeId: '', discount: 0, }
  ])
  const [products, setProducts] = useState([
    { name: '', price: 0, employeeId: '', quantity: '', discount: 0, }
  ])
  const [total, setTotal] = useState(0)
  const employees = [
    { id: 1, name: 'Shoya Kagawa' },
    { id: 2, name: 'Rena Hashizume' },
    { id: 3, name: 'Chiaki Tanaka' },
    { id: 4, name: 'Ken Katanishi' },
  ]

  const mop = [
    { id: 1, name: '現金' },
    { id: 2, name: 'カード支払い' },
    { id: 3, name: 'G Cash' },
    { id: 4, name: 'paymaya' },
    { id: 5, name: '銀行送金' },
  ]


  const handleChange = (e) => {

  }

  const handleAddField = (type) => {
    if (type === 'menu') {
      setMenus([
        ...menus,
        { name: '', price: 0, employeeId: '', discount: 0, }
      ])
    } else {
      setProducts([
        ...products,
        { name: '', price: 0, employeeId: '', quantity: '', discount: 0, }
      ])
    }
  }

  const handleRemoveField = (type, index) => {
    if (type === 'menu') {
      setMenus([
        ...menus,
        { name: '', price: 0, employeeId: '', discount: 0, }
      ])
    } else {
      setProducts([
        ...products,
        { name: '', price: 0, employeeId: '', quantity: '', discount: 0, }
      ])
    }
  }

  const handleRadioChange = (value) => {
    console.log('radio change', value)
  }

  const handleSubmit = () => {
    console.log('menus', menus)
  }

  return (
    <Flex
      flexDirection='column'
      gap='50px 0'
      paddingBottom='30px'
    >
      <SectionLabel
        step='1'
        totalSteps='5'
        label='顧客選択'
      >
        <Box
          border='1px solid'
          borderColor='#c4c4c4'
          borderRadius='5px'
          padding='46px 54px 35px'
        >
          <Flex
            alignItems='center'
            gap='0 20px'
          >
            <Box
              marginBottom='0'
              width='315px'
              flexShrink='0'
              position='relative'
              zIndex='2'
            >
              <Select
                placeholder="customer"
                onChange={handleChange}
                getOptionLabel={option => {
                  return option.name;
                }}
                getOptionValue={option => {
                  return option.code;
                }}
                options={customers}
                styles={customStyles}
              />
            </Box>
            <RegisterCustomer />
            {/* <Button
              leftIcon={<Icon fontSize='18px' as={TbUserPlus} />}
              bg='brand.purple'
              color='brand.white'
              fontSize='11px'
              fontWeight='bold'
              padding='0 25px 0 10px'
            >
              顧客追加
            </Button> */}
          </Flex>
        </Box>
      </SectionLabel>

      <SectionLabel
        step='2'
        totalSteps='5'
        label='施術内容入力'
      >
        <Flex flexDirection='column' rowGap='20px'>
          {menus.map((menu, index) => (
            <Box
              key={index}
              border='1px solid'
              borderColor='#c4c4c4'
              borderRadius='5px'
              padding='46px 54px 35px'
            >
              <Flex flexDirection='column' rowGap='50px'>
                <Flex justifyContent='space-between' alignItems='flex-start'>
                  <Flex columnGap='50px'>
                    <Text
                      color='brand.gray'
                      fontSize='20px'
                      fontWeight='700'
                      width='120px'
                      flexShrink='0'>
                      技術メニュー
                    </Text>
                    <Flex flexDirection='column' rowGap='20px'>
                      <Box width='315px' flexShrink='0'>
                        <Input width='100%' name='name' value={menu.name} />
                      </Box>
                      <Flex alignItems='center' columnGap='20px'>
                        <Box width='100px' flexShrink='0'>
                          <Input width='100%' name="price" value={menu.price} />
                        </Box>
                        <Text>PHP</Text>
                        <Button
                          display='block'
                          padding='0 30px'
                          fontSize='11px'
                          bg='brand.gold'
                          color='brand.white'>
                          元に戻す
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex alignItems='center' columnGap='10px'>
                    <Box width='47px' flexShrink='0'>
                      <Input width='100%' name='discount' value={menu.discount} />
                    </Box>
                    <Text whiteSpace='nowrap'>％ 割引</Text>
                  </Flex>
                </Flex>
                <Flex columnGap='50px' alignItems='center'>
                  <Text
                    color='brand.gray'
                    fontSize='20px'
                    fontWeight='700'
                    width='120px'
                    flexShrink='0'>
                    担当者選択
                  </Text>
                  <Flex>
                    <RadioButtonGroup
                      handleChange={() => handleRadioChange()}
                      options={employees}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={() => handleAddField('menu')}
        />
      </SectionLabel>

      <SectionLabel
        step='3'
        totalSteps='5'
        label='店販商品'
      >
        <Flex flexDirection='column' rowGap='20px'>
          {products.map((product, index) => (
            <Box
              key={index}
              border='1px solid'
              borderColor='#c4c4c4'
              borderRadius='5px'
              padding='46px 54px 35px'
            >
              <Flex flexDirection='column' rowGap='50px'>
                <Flex justifyContent='space-between' alignItems='flex-start'>
                  <Flex>
                    <Flex flexDirection='column' rowGap='20px'>
                      <Flex columnGap='20px'>
                        <Box width='315px' flexShrink='0'>
                          <Input />
                        </Box>
                        <Flex alignItems='center' columnGap='10px'>
                          <Box width='41px' flexShrink='0'>
                            <Input />
                          </Box>
                          <Text fontSize='14px'>
                            個
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex alignItems='center' columnGap='20px'>
                        <Box width='100px' flexShrink='0'>
                          <Input width='100%' />
                        </Box>
                        <Text>PHP</Text>
                        <Button
                          display='block'
                          padding='0 30px'
                          fontSize='11px'
                          bg='brand.gold'
                          color='brand.white'>
                          元に戻す
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex alignItems='center' columnGap='10px'>
                    <Box width='47px' flexShrink='0'>
                      <Input />
                    </Box>
                    <Text whiteSpace='nowrap'>％ 割引</Text>
                  </Flex>
                </Flex>
                <Flex columnGap='50px' alignItems='center'>
                  <Text
                    color='brand.gray'
                    fontSize='20px'
                    fontWeight='700'
                    width='120px'
                    flexShrink='0'>
                    担当者選択
                  </Text>
                  <Flex>
                    <RadioButtonGroup
                      handleChange={() => handleRadioChange()}
                      options={employees}
                    />
                  </Flex>
                </Flex>
              </Flex>

            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={() => handleAddField('product')}
        />
      </SectionLabel>

      <Box
        fontWeight='bold'
      >
        <Text
          color='brand.gray'
          mb='11px'
          fontSize='24px'>
          合計金額
        </Text>
        <Flex
          bg='brand.gold'
          padding='13px 33px'
          borderRadius='5px'
          color='brand.white'
          alignItems='center'
          columnGap='15px'
        >
          <Text
            textAlign='right'
            fontSize='61px'>
            {total}
          </Text>
          <Text
            fontSize='24px'>
            PHP
          </Text>
        </Flex>
      </Box>

      <SectionLabel
        step='4'
        totalSteps='5'
        label='支払い方法選択'
      >
        <Box
          border='1px solid'
          borderColor='#c4c4c4'
          borderRadius='5px'
          padding='46px 54px 35px'
        >
          <RadioButtonGroup
            handleChange={() => handleRadioChange()}
            options={mop}
          />
        </Box>
      </SectionLabel>

      <SectionLabel
        step='5'
        totalSteps='5'
        label='会計担当者選択'
      >
        <Box
          border='1px solid'
          borderColor='#c4c4c4'
          borderRadius='5px'
          padding='46px 54px 35px'
        >
          <RadioButtonGroup
            handleChange={() => handleRadioChange()}
            options={employees}
          />
        </Box>
      </SectionLabel>

      <Button
        onClick={() => handleSubmit()}
        display='block'
        bg='brand.green'
        color='brand.white'
        fontSize='36px'
        padding='30px 0'
        lineHeight='100%'
        height='auto'
      >
        会計を完了する
      </Button>
    </Flex>
  )
}

const SearchResult = ({ book }) => {
  console.log('book', book)
  return (
    <span>{book}</span>
  )
}
