import { useCallback, useEffect, useState } from 'react'

import { useAccount, useSignMessage } from 'wagmi'
import { useNavigate } from 'react-router-dom'

import DatabaseContext from './DatabaseContext'
import {
  AttendedEvents,
  AttendEventRequest,
  CreateUserRequest,
  Event,
  IdToEventMap,
} from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<IdToEventMap>({})
  const [jwt, setJWT] = useState('???????????????????????????????????????????')
  const [nonce, setNonce] = useState(-1)
  const [message, setMessage] = useState('')
  const { signMessageAsync } = useSignMessage({
    message,
  })

  const address = useAccount({
    onConnect: async ({ address, connector, isReconnected }) => {
      console.log('fetching user', address)
      const res = await fetch(`${BASE_URL}/user/?address=${address}`).then(
        (res) => res.json(),
      )
      console.log(res)
      if (res.error || res.length < 1) {
        navigate('/onboarding')
      } else {
        // console.log('user found')
        setNonce(res[0].nonce)
      }
    },
    onDisconnect() {
      console.log('Disconnected')
      // Kill the JWT stuff
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
      }).then((res) => res.json())
      console.log(res)
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
      }).then((res) => res.json())

      setNonce(res.nonce)
    },
    [address],
  )

  // User has logged in and we need to get the JWT
  const handleLogInUser = useCallback(async () => {
    if (!nonce || nonce < 0) {
      return
    }

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
    if (!res.error) {
      console.log(res.token)
      setJWT(res.token)
    }
  }, [address, signMessageAsync, message])

  const handleFetchAttendedEvents = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/events?address=${address}`).then(
      (res) => res.json(),
    )
    setAttendedEvents(res as AttendedEvents[])
  }, [address])

  const handleFetchEvents = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/event`)
      .then((res) => res.json())
      .then((res) => res as Event[])
      .then((res) =>
        res.reduce((acc: IdToEventMap, curr) => {
          acc[curr._id] = curr
          return acc
        }, {}),
      )
    setEvents(res)
  }, [])

  useEffect(() => {
    handleFetchAttendedEvents()
  }, [handleFetchAttendedEvents])

  useEffect(() => {
    handleFetchEvents()
  }, [handleFetchEvents])

  useEffect(() => {
    handleLogInUser()
  }, [handleLogInUser, nonce])

  useEffect(() => {
    setMessage(`I am signing my one-time nonce: ${nonce}`)
  }, [nonce])

  return (
    <DatabaseContext.Provider
      value={{
        attendedEvents,
        events,
        jwt,
        onAttendEvent: handleAttendEvent,
        onCreateUser: handleCreateUser,
        onLogInUser: handleLogInUser,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
