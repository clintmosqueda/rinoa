'use client'
import {
  Modal as Mdal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  useDisclosure,
  Button,
  Text
} from '@chakra-ui/react'

export const Modal = ({ heading, tigger, children, isOpen, onOpen, onClose }) => {
  return (
    <>
      <Box onClick={onOpen}>{tigger}</Box>

      <Mdal isOpen={isOpen} onClose={onClose} size='2xl' >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Box padding='65px 80px'>
            <Box textAlign='center' mb='60px'>
              <Text
                fontSize='37px'
                fontWeight='bold'
                color='brand.gray'>
                {heading}
              </Text>
            </Box>
            {children}
          </Box>

        </ModalContent>
      </Mdal>
    </>
  )
}
