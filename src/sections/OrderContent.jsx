'use client'
import { Box, Text, Flex, Input, Button, RadioGroup, Icon, Spinner } from "@chakra-ui/react"
import { TbMinus } from 'react-icons/tb'
import { SectionLabel } from "@/components/SectionLabel"
import { useEffect, useState } from "react";
import { RegisterCustomer } from "@/components/Dialog/RegisterCustomer";
import { AddBtn } from "@/components/AddBtn";
import { CustomRadio } from "@/components/CustomRadio";
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
  const [loading, setLoading] = useState(false)
  const [menus, setMenus] = useState([{
    id: 1,
    menuId: '',
    price: 0,
    menuEmployeeId: null,
    discount: 0,
    total: 0,
    defaultPrice: 0,
    type: 'Menu'
  }])
  const [products, setProducts] = useState([{
    id: 1,
    productId: '',
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
  const [error, setError] = useState({
    customerError: false,
    menuError: false,
    menuIncharge: false,
    productError: false,
    productIncharge: false,
    merchantError: false,
    accountantError: false,
  })

  useEffect(() => {
    console.log('menus', menus)
    const menuSubtotal = menus.map(menu => {
      let price = parseFloat(menu.price)
      let discount = parseFloat(menu.discount)
      return price - (price * discount / 100)
    }).reduce((acc, curr) => (acc + curr), 0)

    const productSubtotal = products.map(product => {
      let price = parseFloat(product.price)
      let discount = parseFloat(product.discount)
      let quantity = parseFloat(product.quantity)
      return (price - (price * discount / 100)) * quantity
    }).reduce((acc, curr) => (acc + curr), 0)
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
        setError({ ...error, menuIncharge: false })
        const menu = [...menus]
        menu[index].menuEmployeeId = value
        setMenus(menu)
        break;

      case 'product':
        setError({ ...error, productIncharge: false })
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
        setError({ ...error, customerError: false })
        break;

      case 'menu':
        const menu = [...menus]
        menu[index].price = select.price
        menu[index].defaultPrice = select.price
        menu[index].menuId = select.id
        setMenus(menu)
        setError({ ...error, menuError: false })
        break;

      case 'product':
        const product = [...products]
        product[index].price = select.price
        product[index].defaultPrice = select.price
        product[index].productId = select.id
        setProducts(product)
        setError({ ...error, productError: false })
        break;

      default:
        break;
    }
  }

  const handleSubmit = async () => {
    if (!customerId) {
      setError({ ...error, customerError: true })
      return
    }

    if (error.menuIncharge) {
      return
    }

    if (menus[0].menuId === '') {
      setError({ ...error, menuError: true })
      return
    }

    if (menus[0].menuEmployeeId === null) {
      setError({ ...error, menuIncharge: true })
      return
    }

    if (!merchantId) {
      setError({ ...error, merchantError: true })
      return
    }

    if (!accountantId) {
      setError({ ...error, accountantError: true })
      return
    }

    setLoading(true)

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
    const productData = products.filter(f => f.productId).map(product => {
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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_LINK}/api/order`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        setLoading(false)
        location.reload();
      } else {
        setLoading(false)
        console.log(res)
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleChangeAccountant = (val) => {
    setAccountantId(val)
    setError({ ...error, accountantError: false })
  }

  const handleChangeMerchant = (val) => {
    setMerchantId(val)
    setError({ ...error, merchantError: false })
  }

  const handleAddMenu = () => {
    const lastItem = menus[menus.length - 1]

    if (lastItem.menuId === '') {
      setError({ ...error, menuError: true })
      return
    }

    if (!lastItem.menuEmployeeId) {
      setError({ ...error, menuIncharge: true })
      return
    }

    setMenus(prev => [...prev, {
      id: menus.length + 1,
      menuId: '',
      price: 0,
      menuEmployeeId: null,
      discount: 0,
      total: 0,
      defaultPrice: 0,
      type: 'Menu'
    }])
  }

  const handleAddProduct = () => {
    const lastItem = products[products.length - 1]

    if (lastItem.productId === '') {
      setError({ ...error, productError: true })
      return
    }

    if (!lastItem.productEmployeeId) {
      setError({ ...error, productIncharge: true })
      return
    }

    setProducts(prev => [...prev, {
      id: products.length + 1,
      productId: '',
      price: 0,
      productEmployeeId: null,
      quantity: 1,
      discount: 0,
      total: 0,
      defaultPrice: 0,
      type: 'Product'
    }])
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
          {error.customerError && (
            <Text fontSize='12px' color='red' mt='10px' as='p'>顧客選択 is required</Text>
          )}
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
              {(index > 0 && menus.length - 1 === index) && (
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
                  onClick={() => setMenus(menus.filter(item => item.id !== mnu.id))}
                >
                  <Icon
                    fontSize='25px'
                    as={TbMinus} />
                </Box>
              )}

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
                          // value={menus[index].menuId}
                          placeholder="select menu"
                          onChange={(val) => handleSelectChange(val, 'menu', index)}
                          getOptionLabel={option => {
                            return option.name;
                          }}
                          options={menuList}
                          styles={customStyles}
                        />
                        {(error.menuError && mnu.menuId === '') && (
                          <Text color='red' fontSize='12px' mt='10px'>技術メニュー is required</Text>
                        )}

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
                  <Flex flexDirection='column'>
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
                    {(error.menuIncharge && mnu.menuEmployeeId === null) && (
                      <Text color='red' fontSize='12px' mt='10px'>担当者選択 is required</Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={handleAddMenu}
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
              pos='relative'
            >
              {(index > 0 && products.length - 1 === index) && (
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
                  onClick={() => setProducts(products.filter(item => item.id !== prodct.id))}
                >
                  <Icon
                    fontSize='25px'
                    as={TbMinus} />
                </Box>
              )}
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
                          {(error.productError && prodct.productId === '') && (
                            <Text color='red' fontSize='12px' mt='10px'>product is required</Text>
                          )}

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
                  <Flex flexDirection='column' >
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
                    {(error.productIncharge && prodct.productEmployeeId === null) && (
                      <Text color='red' fontSize='12px' mt='10px'>担当者選択 is required</Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>

            </Box>
          ))}
        </Flex>
        <AddBtn
          onClick={handleAddProduct}
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
          <RadioGroup name="employeeIncharge" onChange={(val) => handleChangeMerchant(val)} value={parseInt(merchantId)}>
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
          {error.merchantError && (
            <Text fontSize='12px' color='red' mt='10px' as='p'>支払い方法選択 is required</Text>
          )}
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
          <RadioGroup name="employeeIncharge" onChange={(val) => handleChangeAccountant(val)} value={parseInt(accountantId)}>
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
          {error.accountantError && (
            <Text fontSize='12px' color='red' mt='10px' as='p'>会計担当者選択 is required</Text>
          )}
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
        {loading ?
          (
            <Spinner />
          ) : (
            <Text>会計を完了する</Text>
          )}

      </Button>
    </Flex>
  )
}
