import { useCallback, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAccount, useSignMessage } from 'wagmi'

import { useToast } from '@chakra-ui/react'
import { AttendEventRequest, CreateUserRequest } from './types'
import UserContext from './UserContext'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const UserProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [jwt, setJWT] = useState('')
  const [nonce, setNonce] = useState(-1)
  const toast = useToast()
  const [error, setError] = useState('')
  const { signMessageAsync } = useSignMessage({
    message: '',
  })

  const address = useAccount({
    onConnect: async ({ address, connector, isReconnected }) => {
      console.log('fetching user', address)
      const res = await fetch(`${BASE_URL}/user/?address=${address}`).then(
        (res) => res.json(),
      )

      const jwt = localStorage.getItem('jwt')

      console.log(res)
      if (res.error) {
        setError(res.error)
      } else if (res.length < 1) {
        navigate('/onboarding')
      } else if (jwt) {
        setJWT(jwt)
      } else {
        setNonce(res[0].nonce)
      }
    },
    onDisconnect: async () => {
      console.log('Disconnected')
      const res = await fetch(`${BASE_URL}/user/attend-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      }).then((res) => res.json())
      localStorage.setItem('jwt', '')
    },
  }).address

  const handleAttendEvent = useCallback(
    async (eventId: string) => {
      console.log(jwt)

      console.log('Attending event')
      const res = await fetch(`${BASE_URL}/user/attend-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
        body: JSON.stringify({
          address: address?.toLowerCase(),
          eventId,
        } as AttendEventRequest),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err)
          setError(err.message)
        })
      console.log(res)
      window.location.reload()
    },
    [address, jwt],
  )

  const handleCreateUser = useCallback(
    async (name: string, email: string) => {
      const res = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address: address?.toLowerCase(),
          role: 'admin',
        } as CreateUserRequest),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err)
          setError(err.message)
        })

      setNonce(res.nonce)
    },
    [address],
  )

  // User has logged in and we need to get the JWT
  const handleLogInUser = useCallback(async () => {
    if (!nonce || nonce < 0) {
      return
    }

    try {
      const signature = await signMessageAsync()
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address?.toLowerCase(),
          signature,
        }),
      }).then((res) => res.json())

      console.log(res.token)
      localStorage.setItem('jwt', JSON.stringify(res.token))

      setJWT(res.token)
    } catch (err: any) {
      setError(err.message as string)
    }
  }, [address, nonce, signMessageAsync])

  // useEffect(() => {
  //   handleLogInUser()
  // }, [handleLogInUser])

  // useEffect(() => {
  //   setMessage(`I am signing my one-time nonce: ${nonce}`)
  // }, [nonce])

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        status: 'error',
        description: error,
        isClosable: true,
      })
    }
  }, [error, toast])

  return (
    <UserContext.Provider
      value={{
        jwt,
        onAttendEvent: handleAttendEvent,
        onCreateUser: handleCreateUser,
        onLogInUser: handleLogInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
