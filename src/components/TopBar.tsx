import { Outlet, useNavigate } from 'react-router-dom'

import { createIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
// @ts-ignore
import { ReactComponent as Logo } from 'assets/logo.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
  const { status } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <>
      {/* {!isOpen ? ( */}
      <Box bg="black" px="15px" pt="19px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* <Image src="./logo.png" alt="B@B" zIndex={2} px="15px" /> */}
          {/* <IconButton
            size={'lg'}
            color="white"
            bg="black"
            colorScheme="blackAlpha"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <Flex alignItems="center">
            <Logo height="36px" width="36px" />
            <Box width="8px" />
            <Heading>
              B@B
              <Text as="span" color="#fecb33">
                Coin
              </Text>
            </Heading>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList bg="#fecb33" color="black">
              <MenuItem onClick={() => navigate('/')} bg="none">
                Home
              </MenuItem>
              <MenuItem onClick={() => navigate('/dashboard')} bg="none">
                Dashboard
              </MenuItem>
              {/* <MenuItem onClick={() => navigate('/')} bg="none">
              Admin
              </MenuItem>
              <MenuItem onClick={() => navigate('/')} bg="none">
              Requirements
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      {status === 'connected' ? (
        <Outlet />
      ) : (
        <Flex
          alignItems="center"
          minHeight="calc(100vh - 84px)"
          justifyContent="center"
        >
          <ConnectButton label="Connect Wallet to Check In" />
        </Flex>
      )}
      {/* ) : null} */}

      {/* <motion.nav
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
      </motion.nav> */}
    </>
  )
}

export default TopBar
