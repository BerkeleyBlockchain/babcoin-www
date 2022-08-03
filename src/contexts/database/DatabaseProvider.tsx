import { useCallback, useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import DatabaseContext from './DatabaseContext'
import { AttendedEvents, Event } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const address = useAccount().address
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<Event[]>([])

  const handleCreateUser = useCallback(
    async (name: string, email: string) => {
      const res = await fetch(`${BASE_URL}/user/newUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address,
        }),
      }).then((res) => res.json())
      console.log(res)
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
    const res = await fetch(`${BASE_URL}/event`).then((res) => res.json())
    setEvents(res as Event[])
  }, [])

  const handleMint = useCallback(
    async (eventId: string) => {
      const res = await fetch(`${BASE_URL}/user/attendEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          eventId,
        }),
      }).then((res) => res.json())
      console.log(res)
    },
    [address],
  )

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
        onMint: handleMint,
        onCreateUser: handleCreateUser,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
