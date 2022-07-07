
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  CloseButton,
  Text,
  Image,
  UnorderedList,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Global } from "@emotion/react"
import { extendTheme } from "@chakra-ui/react"



import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { createIcon } from '@chakra-ui/icons'

// using `path`
export const CircleIcon = createIcon({
  displayName: 'circleIcon',
  viewBox: '0 0 428 774',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M147.5 724.5C60.4724 665.774 13 583 0.363159 499.5V0H472V758.322C407.988 771.319 253.115 795.768 147.5 724.5Z"
      fill="#FECB33" />
  ),
})

export const SmallCircleIcon = createIcon({
  displayName: 'SmallCircleIcon',
  viewBox: '0 0 68 68',
  path: (
    <circle cx="34" cy="34" r="34" fill="#FECB33"/>
  ),
})
/** 
export const BabLogo = createIcon({
  displayName: 'BabLogo',
  viewBox: '0 0 68 68',
  path: (
    <circle cx="34" cy="34" r="34" fill="#FECB33"/>
  ),
})
*/

type Props = {}

const TopBar = (props: Props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
      <>
      <Box bg='black' px="15px" pt = "19px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            {!isOpen ? <Image 
              src="./logo.png"
              alt='B@B'
              zIndex={2}
              px="15px"
  
          /> : <></>}
          
          </HStack>
          <Flex alignItems={'center'}>
            <IconButton
              size = {'lg'}
                color='white'
              bg='black'
              colorScheme = 'blackAlpha'
                
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                />
            
          </Flex>
        </Flex>
      </Box>
     
        <Box>
        {isOpen ? (<CircleIcon
          boxSize={750}
          position="fixed"
          top={0}
          width= "100%">
          
        </CircleIcon>) : <></>}
        </Box>
        
    
      <Box>
        {isOpen ? <SmallCircleIcon
          boxSize={50}
          position="fixed"
          bottom="45px"
          width="100%"
        /> : <></>
        }
      </Box>

      <Box>
        {isOpen ? <CloseButton
          size='lg'
          color='#FDFDFD'
          onClick={isOpen ? onClose : onOpen}
          position="fixed"
          bottom="50px"
          width="100%"
          zIndex={1}
        /> : <></>}
      </Box>
      
      <Box>
        {isOpen ? <UnorderedList listStyleType = "none"
          zIndex={1}
          position = "fixed"
          top="150px"
          right = "60px"
          color="black"
          fontWeight = '600'
          fontSize = "45px"
          lineHeight="80px"
          textAlign="right"
          fontFamily="Inter"
          maxW="300px"
        
        >
          <Link to = "Event" ><ListItem>Home</ListItem></Link>
          <Link to = "Dashboard" ><ListItem>Dashboard</ListItem></Link>
          <Link to = "TopBarLoggedIn" ><ListItem>Admin</ListItem></Link>
          <Link to = "Requirements" ><ListItem>Requirements</ListItem></Link>
        </UnorderedList>: <></>}
      </Box>
        
      <Outlet/>
    </>
  );
}
  

export default TopBar
