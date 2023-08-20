'use client'
import { Box, Text, Flex, Input, Button, Icon, HStack } from "@chakra-ui/react"
import { SectionLabel } from "@/components/SectionLabel"
import { useState } from "react";
// import { Search } from 'chakra-ui-search'
import { TbUserPlus } from 'react-icons/tb'
import { RadioButtonGroup } from "@/components/RadioButtonGroup";
import { RegisterCustomer } from "@/components/Dialog/RegisterCustomer";
import { AddBtn } from "@/components/AddBtn";


export default function Home() {
  const employees = ['Shoya Kagawa', 'Rena Hashizume', 'Chiaki Tanaka', 'Ken Katanishi']
  const mop = ['現金', 'カード支払い', 'G Cash', 'Maya Pay', '銀行送金']

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
              css={{
                '& .chakra-input__group': {
                  marginBottom: '0'
                }
              }}
            >
              <Input />
              {/* <Search
              placeholder=""
              value={value}
              isLoading={loading}
              input={{ iconPosition: 'left' }}
              onSearchChange={onValueChange}
              searchResults={results}
              resultRenderer={book => <SearchResult book={book} />}
              onResultSelect={handleResultSelect}
              height='100%'
              marginBottom='0'
            /> */}
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
          <Box
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
                      <Input />
                    </Box>
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
                        color='brand.white'>元に戻す</Button>
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
                    options={employees}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Box
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
                      <Input />
                    </Box>
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
                        color='brand.white'>元に戻す</Button>
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
                    options={employees}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <AddBtn />
      </SectionLabel>

      <SectionLabel
        step='3'
        totalSteps='5'
        label='店販商品'
      >
        <Box
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
                      <Text fontSize='14px'>個</Text>
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
                      color='brand.white'>元に戻す</Button>
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
                  options={employees}
                />
              </Flex>
            </Flex>
          </Flex>

        </Box>
        <AddBtn />
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
            fontSize='61px'>
            13000
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
            options={employees}
          />
        </Box>
      </SectionLabel>

      <Button
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