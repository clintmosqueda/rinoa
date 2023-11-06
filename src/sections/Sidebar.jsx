'use client'
import { Menu, MenuItem } from "@/components/Menu"
import { Box, Flex, VStack, Icon, Text } from "@chakra-ui/react"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { links, adminLinks } from '@/utils/sideLinks'
import Link from "next/link"
import { TbLayoutDashboard } from 'react-icons/tb'
import { useSession, signOut } from "next-auth/react"

export const Sidebar = () => {
  const pathname = usePathname()
  const { status } = useSession()

  const handleLogout = async () => {
    await signOut()
  }
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
        {status === 'authenticated' && adminLinks.map((link, index) => (
          <Menu key={`${link.id}-${index}`} text={link.menu}>
            {link.menuItems.map((item, index) => (
              <MenuItem
                key={index + 20}
                active={pathname === item.path ? true : false}
                text={item.text}
                menuIcon={item.icon}
                link={item.path} />
            ))}
          </Menu>
        ))}
        {status === 'authenticated' && (
          <Flex
            cursor='pointer'
            alignItems='center'
            padding='10px'
            gap='0 15px'
            onClick={handleLogout}
          >
            <Icon fontSize='18px' as={TbLayoutDashboard} />
            <Text fontSize='14px'>Logout</Text>
          </Flex>
        )}

      </Flex>
    </Flex >
  )
}
