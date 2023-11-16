'use client'
import { Box, Text, VStack, Flex } from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import Link from "next/link"
import { MdSettings } from 'react-icons/md'
import { TbLayoutDashboard, TbUserPlus, TbLogin, TbTypography } from 'react-icons/tb'

const ICONS = {
  dashboard: {
    icon: <Icon fontSize='18px' as={TbLayoutDashboard} />
  },
  login: {
    icon: <Icon fontSize='18px' as={TbLogin} />
  },
  typography: {
    icon: <Icon fontSize='18px' as={TbTypography} />
  },
  user: {
    icon: <Icon fontSize='18px' as={TbUserPlus} />
  },
}

export const Menu = ({ text, children }) => {
  return (
    <Flex
      rowGap='8px'
      flexDirection="column"
      alignItems='left'>
      <Text
        fontSize='12px'
        padding='0 10px'
        fontWeight='bold'
      >{text}</Text>
      <Flex flexDirection="column" rowGap='4px'>
        {children}
      </Flex>
    </Flex>

  )
}

export const MenuItem = ({ text, link = '/', active, menuIcon }) => {
  return (
    <Box
      cursor='pointer'
      borderRadius='8px'
      bg={active ? 'brand.purple' : ''}
      color={active ? 'brand.white' : 'inherit'}
    >
      <a
        href={link}
      >
        <Flex
          alignItems='center'
          padding='10px'
          gap='0 15px'
        >
          {ICONS[menuIcon].icon}
          <Text fontSize='14px'>
            {text}
          </Text>

        </Flex>
      </a>
    </Box>
  )
}