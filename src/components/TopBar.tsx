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
  Button,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { useAccount } from 'wagmi'

// @ts-ignore
import { ReactComponent as Logo } from 'assets/logo.svg'
import useUser from 'contexts/user/useUser'
import useDatabase from 'contexts/database/useDatabase'

const TopBar = () => {
  const { status } = useAccount()
  const { isAdmin } = useUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { semester, onSetSemester } = useDatabase()

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
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  aria-label="Options"
                  rightIcon={<FiChevronDown />}
                  variant="ghost"
                >
                  {semester}
                </MenuButton>
                <MenuList bg="#fecb33" color="black">
                  {['Sp23', 'Fa22'].map((semester) => (
                    <MenuItem onClick={() => onSetSemester(semester)} bg="none">
                      {semester}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
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
                  <MenuItem onClick={() => navigate('/leaderboard')} bg="none">
                    Leaderboard
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => navigate('/newevent')} bg="none">
                      Create New Event
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </>
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
