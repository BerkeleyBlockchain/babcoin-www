import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import DatabaseContext from './DatabaseContext'
import { AttendedEvents, Event } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const address = useAccount().address
  // 1. Create a state variable
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const navigate = useNavigate()

  // 2. Create a memoized (useCallback) function to fetch
  const handleFetchEvents = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/event`).then((res) => res.json())
    setEvents(res as Event[])
  }, [])

  const handleFetchAttendedEvents = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/events?address=${address}`).then(
      (res) => res.json(),
    )
    setAttendedEvents(res as AttendedEvents[])
  }, [address])

  const handleSubmit = useCallback(
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
      navigate('/dashboard')
    },
    [address, navigate],
  )

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

  // 3. Call fetch function on page load
  useEffect(() => {
    handleFetchEvents()
    handleFetchAttendedEvents()
  }, [handleFetchEvents, handleFetchAttendedEvents])

  return (
    // 4. Pass the state variable to the context
    // 5. Look at Home to see how to use the context
    <DatabaseContext.Provider
      value={{
        attendedEvents,
        events,
        onMint: handleMint,
        onSubmit: handleSubmit,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
