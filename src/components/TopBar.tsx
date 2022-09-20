import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FiMenu } from 'react-icons/fi'
import { useAccount } from 'wagmi'

// @ts-ignore
import { ReactComponent as Logo } from 'assets/logo.svg'

const TopBar = () => {
  const { status } = useAccount()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const shouldRender = pathname === '/onboarding' || status === 'connected'

  return (
    <>
      <Box bg="black" px="16px" pt="16px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems="center" onClick={() => navigate('/')}>
            <Logo height="36px" width="36px" />
            <Box width="8px" />
            <Heading>
              B@B
              <Text as="span" color="#fecb33">
                Coin
              </Text>
            </Heading>
          </Flex>
          {pathname !== '/onboarding' ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FiMenu} />}
                variant="ghost"
              />
              <MenuList bg="#fecb33" color="black">
                <MenuItem onClick={() => navigate('/')} bg="none">
                  Home
                </MenuItem>
                <MenuItem onClick={() => navigate('/dashboard')} bg="none">
                  Dashboard
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Flex>
      </Box>
      {shouldRender ? (
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
    </>
  )
}

export default TopBar
