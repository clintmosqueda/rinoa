'use client'
import { Menu, MenuItem } from "@/components/Menu"
import { Box, Flex, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { links } from '@/utils/sideLinks'
import Link from "next/link"


export const Sidebar = () => {
  const pathname = usePathname()
  return (
    <Flex flexDirection='column' gap='37px 0'>

      <Link
        href='/'
      >
        <Box position='relative' w='139px' h='50px'>
          <Image
            priority
            fill
            sizes='139px'
            src='/images/logo.png'
            alt="Company Logo"
            style={{
              objectFit: 'cover'
            }}
          />
        </Box>
      </Link>

      <Flex direction='column' gap='20px 0'>
        {links.map((link) => (
          <Menu key={link.id} text={link.menu}>
            {link.menuItems.map((item, index) => (
              <MenuItem
                key={index}
                active={pathname === item.path ? true : false}
                text={item.text}
                menuIcon={item.icon}
                link={item.path} />
            ))}
          </Menu>
        ))}
      </Flex>
    </Flex >
  )
}
