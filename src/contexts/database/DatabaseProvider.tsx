import { useCallback, useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

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

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const address = useAccount().address
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<IdToEventMap>({})

  const handleAttendEvent = useCallback(
    async (eventId: string) => {
      const res = await fetch(`${BASE_URL}/user/attend-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address?.toLowerCase(),
          eventId,
        } as AttendEventRequest),
      }).then((res) => res.json())
    },
    [address],
  )

  const handleCreateUser = useCallback(
    async (name: string, email: string) => {
      const res = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: name,
          lastName: 'Last Name',
          email,
          address: address?.toLowerCase(),
          role: 'admin',
        } as CreateUserRequest),
      }).then((res) => res.json())
    },
    [address],
  )

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

  return (
    <DatabaseContext.Provider
      value={{
        attendedEvents,
        events,
        onAttendEvent: handleAttendEvent,
        onCreateUser: handleCreateUser,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
