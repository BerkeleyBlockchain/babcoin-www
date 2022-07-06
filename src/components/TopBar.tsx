
import React from 'react'
import { Outlet } from 'react-router-dom'

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
} from '@chakra-ui/react';

import { createIcon } from '@chakra-ui/icons'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

type Props = {}

const TopBar = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  

  const HalfCircle = () => (
    <Icon viewBox='0 0 200 200' color='#FECB33'>
      <path
        d="M147.5 724.5C60.4724 665.774 13 583 0.363159 499.5V0H472V758.322C407.988 771.319 253.115 795.768 147.5 724.5Z"
        fill="#FECB33" />
    </Icon>
  )


  const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

  return (
      <>
      <Box bg='black' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>B@B</Box>
            
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme='black'
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                bg='black'
                borderColor='black'
                color='white'
              >
            
                <IconButton
                color='white'
                bg = 'black'
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                />
              </MenuButton>
              <MenuList>
                
                <MenuItem>Home</MenuItem>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem>Admin</MenuItem>
                <MenuItem>Requirements</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

       
      </Box>
      <Outlet/>
    </>
  );
}
  

export default TopBar
