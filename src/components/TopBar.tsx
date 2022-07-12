import { Link, Outlet } from 'react-router-dom'

import {
  Box,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Image,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon, createIcon, HamburgerIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

// using `path`
export const CircleIcon = createIcon({
  displayName: 'circleIcon',
  viewBox: '0 0 428 774',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M147.5 724.5C60.4724 665.774 13 583 0.363159 499.5V0H472V758.322C407.988 771.319 253.115 795.768 147.5 724.5Z"
      fill="#FECB33"
    />
  ),
})

export const SmallCircleIcon = createIcon({
  displayName: 'SmallCircleIcon',
  viewBox: '0 0 68 68',
  path: <circle cx="34" cy="34" r="34" fill="#FECB33" />,
})

const variants = {
  open: { scale: 1, opacity: 1, x: 0 },
  closed: { scale: 0, opacity: 0, x: 0 },
}

type Props = {}

const TopBar = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {!isOpen ? (
        <Box bg="black" px="15px" pt="19px">
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Image src="./logo.png" alt="B@B" zIndex={2} px="15px" />
            <IconButton
              size={'lg'}
              color="white"
              bg="black"
              colorScheme="blackAlpha"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Box>
      ) : null}

      <motion.nav
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'Tween', stiffness: 40 }}
        variants={variants}
      >
        <CircleIcon
          boxSize={750}
          position="absolute"
          top={0}
          width="100%"
        ></CircleIcon>

        <UnorderedList
          listStyleType="none"
          zIndex={3}
          position="fixed"
          top="150px"
          right="60px"
          color="black"
          fontWeight="600"
          fontSize="45px"
          lineHeight="80px"
          textAlign="right"
          fontFamily="Inter"
          maxW="300px"
        >
          <Link to="Event">
            <ListItem>Home</ListItem>
          </Link>
          <Link to="Dashboard">
            <ListItem>Dashboard</ListItem>
          </Link>
          <Link to="Admin">
            <ListItem>Admin</ListItem>
          </Link>
          <Link to="Requirements">
            <ListItem>Requirements</ListItem>
          </Link>
        </UnorderedList>

        {isOpen && (
          <>
            <SmallCircleIcon
              boxSize={50}
              position="fixed"
              bottom="45px"
              width="100%"
            />
            <CloseButton
              size="lg"
              color="#FDFDFD"
              onClick={isOpen ? onClose : onOpen}
              position="fixed"
              bottom="50px"
              width="100%"
              zIndex={1}
            />
          </>
        )}
      </motion.nav>

      <Outlet />
    </>
  )
}

export default TopBar
