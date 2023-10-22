'use client'
import { Box, Text, Flex, Input, Button, RadioGroup, Icon } from "@chakra-ui/react"
import { TbMinus } from 'react-icons/tb'
import { SectionLabel } from "@/components/SectionLabel"
import { useEffect, useState } from "react";
import { RegisterCustomer } from "@/components/Dialog/RegisterCustomer";
import { AddBtn } from "@/components/AddBtn";
import { CustomRadio } from "@/components/CustomRadio";
import { addOrder } from "@/lib/order";
import Select from 'react-select'
import { useRouter } from "next/navigation";
import { useToast } from '@chakra-ui/react'

const inputStyle = () => ({
  // backgroundColor: 'red'
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

export const OrderContent = ({
  paymentMethods,
  customers,
  productList,
  menuList,
  employees
}) => {
  const toast = useToast()
  const router = useRouter()
  const [menus, setMenus] = useState([{
    menuId: null,
    price: 0,
    menuEmployeeId: null,
    discount: 0,
    total: 0,
    defaultPrice: 0,
    type: 'Menu'
  }])
  const [products, setProducts] = useState([{
    productId: null,
    price: 0,
    productEmployeeId: null,
    quantity: 1,
    discount: 0,
    total: 0,
    defaultPrice: 0,
    type: 'Product'
  }])
  const [merchantId, setMerchantId] = useState(null)
  const [accountantId, setAccountantId] = useState(null)
  const [customerId, setCustomerId] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const menuSubtotal = menus.map(menu => {
      let price = parseFloat(menu.price)
      let discount = parseFloat(menu.discount)
      return price - (price * discount / 100)
    }).reduce((acc, curr) => acc + curr)

    const productSubtotal = products.map(product => {
      let price = parseFloat(product.price)
      let discount = parseFloat(product.discount)
      let quantity = parseFloat(product.quantity)
      return (price - (price * discount / 100)) * quantity
    }).reduce((acc, curr) => acc + curr)
    let grandTotal = menuSubtotal + productSubtotal
    setTotal(grandTotal)
  }, [menus, products])

  const merchants = paymentMethods.map(merchant => {
    return {
      id: merchant.id,
      name: merchant.name
    }
  })

  const handleChange = (e, type, index) => {
    const target = e.target
    switch (type) {
      case 'menu':
        const menu = [...menus]
        menu[index][target.name] = target.value
        if (target.name === 'discount' || target.name === 'price') {
          if (target.value === '' || target.value === null) {
            menu[index][target.name] = 0
          } else {
            menu[index][target.name] = target.value
          }
        }
        setMenus(menu)
        break;

      case 'product':
        const product = [...products]
        product[index][target.name] = target.value
        if (target.name === 'discount' || target.name === 'price') {
          if (target.value === '' || target.value === null) {
            product[index][target.name] = 0
          } else {
            product[index][target.name] = target.value
          }
        }
        setProducts(product)
        break;

      default:
        break;
    }
  }

  const handleRadioChange = (value, type, index) => {
    switch (type) {
      case 'menu':
        const menu = [...menus]
        menu[index].menuEmployeeId = value
        setMenus(menu)
        break;

      case 'product':
        const product = [...products]
        product[index].productEmployeeId = value
        setProducts(product)
        break;

      default:
        break;
    }
  }

  const handleSelectChange = (select, type, index) => {
    switch (type) {
      case 'customer':
        setCustomerId(select.value)
        break;

      case 'menu':
        const menu = [...menus]
        menu[index].price = select.price
        menu[index].defaultPrice = select.price
        menu[index].menuId = select.id
        setMenus(menu)
        break;

      case 'product':
        const product = [...products]
        product[index].price = select.price
        product[index].defaultPrice = select.price
        product[index].productId = select.id
        setProducts(product)
        break;

      default:
        break;
    }
  }

  const handleSubmit = () => {

    const menuData = menus.map(menu => {
      return {
        product_id: parseInt(menu.menuId),
        price: parseFloat(menu.price),
        employee_id: parseInt(menu.menuEmployeeId),
        discount: parseInt(menu.discount),
        type: menu.type,
        quantity: null,
      }
    })
    const productData = products.map(product => {
      return {
        product_id: parseInt(product.productId),
        price: parseFloat(product.price),
        employee_id: parseInt(product.productEmployeeId),
        discount: parseInt(product.discount),
        type: product.type,
        quantity: parseInt(product.quantity),
      }
    })
    const orderProducts = [...menuData, ...productData]

    const data = {
      order: {
        grand_total: total,
        payment_method_id: parseInt(merchantId),
        employee_id: parseInt(accountantId),
        customer_id: customerId,
      },
      order_products: orderProducts
    }
    addOrder(data)
    location.reload();

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
                placeholder="select customer"
                onChange={(val) => handleSelectChange(val, 'customer')}
                getOptionLabel={option => {
                  return option.name;
                }}
                options={customers}
                styles={customStyles}
              />
            </Box>
            <RegisterCustomer />
          </Flex>
        </Box>
      </SectionLabel>

      <SectionLabel
        step='2'
        totalSteps='5'
        label='施術内容入力'
      >
        <Flex flexDirection='column' rowGap='20px'>
          {menus.map((mnu, index) => (
            <Box
              key={index}
              border='1px solid'
              borderColor='#c4c4c4'
              borderRadius='5px'
              padding='46px 54px 35px'
              position='relative'
            >
              {/* {index > 0 && (
                <Box 
                  as="span"
                  position="absolute"
                  right="-15px"
                  top="-15px"
                  width='30px'
                  height='30px'
                  borderRadius='50%'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  bgColor='#c4c4c4'
                  cursor='pointer'
                  onClick={() => setMenus(menus.filter(item => item.menuId !== mnu.menuId))}
                >
                  <Icon
                  fontSize='25px' 
                  as={TbMinus} />
                </Box>
              )} */}

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
                        <Select
                          placeholder="select menu"
                          onChange={(val) => handleSelectChange(val, 'menu', index)}
                          getOptionLabel={option => {
                            return option.name;
                          }}
                          options={menuList}
                          styles={customStyles}
                        />
                      </Box>
                      <Flex alignItems='center' columnGap='20px'>
                        <Box width='100px' flexShrink='0'>
                          <Input
                            width='100%'
                            name="price"
                            type="number"
                            value={mnu.price}
                            isDisabled={mnu.menuId ? false : true}
                            onChange={(e) => handleChange(e, 'menu', index)}
                          />
                        </Box>
                        <Text>PHP</Text>
                        <Button
                          isDisabled={mnu.menuId ? false : true}
                          onClick={() => {
                            const menu = [...menus]
                            menu[index].price = mnu.defaultPrice
                            setMenus(menu)
                          }}
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
                      <Input
                        textAlign='center'
                        padding='0 5px'
                        width='100%'
                        name='discount'
                        type="number"
                        value={mnu.discount}
                        isDisabled={mnu.menuId ? false : true}
                        onChange={(e) => handleChange(e, 'menu', index)}
                      />
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
                    <RadioGroup
                      name="menuEmployeeId"
                      onChange={(val) => handleRadioChange(val, 'menu', index)}
                      value={parseInt(mnu.menuEmployeeId)}
                    >
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
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={() => setMenus(prev => [...prev, {
            menuId: null,
            price: 0,
            menuEmployeeId: null,
            discount: 0,
            total: 0,
            defaultPrice: 0,
            type: 'Menu'
          }])}
        />
      </SectionLabel>

      <SectionLabel
        step='3'
        totalSteps='5'
        label='店販商品'
      >
        <Flex flexDirection='column' rowGap='20px'>
          {products.map((prodct, index) => (
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
                          {/* <Input
                            width='100%'
                            name='name'
                            onChange={(e) => handleChange(e, 'product', index)}
                          /> */}
                          <Select
                            placeholder="select product"
                            onChange={(val) => handleSelectChange(val, 'product', index)}
                            getOptionLabel={option => {
                              return option.name;
                            }}
                            options={productList}
                            styles={customStyles}
                          />
                        </Box>
                        <Flex alignItems='center' columnGap='10px'>
                          <Box width='41px' flexShrink='0'>
                            <Input
                              textAlign='center'
                              padding='0 5px'
                              width='100%'
                              name='quantity'
                              type="number"
                              value={prodct.quantity}
                              isDisabled={prodct.productId ? false : true}
                              onChange={(e) => handleChange(e, 'product', index)}
                            />
                          </Box>
                          <Text fontSize='14px'>
                            個
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex alignItems='center' columnGap='20px'>
                        <Box width='100px' flexShrink='0'>
                          <Input
                            width='100%'
                            name='price'
                            type="number"
                            value={prodct.price}
                            isDisabled={prodct.productId ? false : true}
                            onChange={(e) => handleChange(e, 'product', index)}
                          />
                        </Box>
                        <Text>PHP</Text>
                        <Button
                          isDisabled={prodct.productId ? false : true}
                          onClick={() => {
                            const product = [...products]
                            product[index].price = prodct.defaultPrice
                            setProducts(product)
                          }}
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
                      <Input
                        textAlign='center'
                        padding='0 5px'
                        width='100%'
                        name='discount'
                        type="number"
                        value={prodct.discount}
                        isDisabled={prodct.productId ? false : true}
                        onChange={(e) => handleChange(e, 'product', index)}
                      />
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
                    <RadioGroup
                      name="productsIncharge"
                      onChange={(val) => handleRadioChange(val, 'product', index)}
                      value={parseInt(prodct.productEmployeeId)}
                    >
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
                  </Flex>
                </Flex>
              </Flex>

            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={() => setProducts(prev => [...prev, {
            productId: null,
            price: 0,
            productEmployeeId: null,
            quantity: 1,
            discount: 0,
            total: 0,
            defaultPrice: 0,
            type: 'Product'
          }])}
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
          <RadioGroup name="employeeIncharge" onChange={(val) => setMerchantId(val)} value={parseInt(merchantId)}>
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {merchants.map(merchant => (
                <CustomRadio
                  key={merchant.id}
                  value={merchant.id}
                  name={merchant.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
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
          <RadioGroup name="employeeIncharge" onChange={(val) => setAccountantId(val)} value={parseInt(accountantId)}>
            <Flex direction="row" flexWrap='wrap' gap='10px'>
              {employees.map(employee => (
                <CustomRadio
                  key={employee.id}
                  value={employee.id}
                  name={employee.name}
                />
              )
              )}
            </Flex>
          </RadioGroup>
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
