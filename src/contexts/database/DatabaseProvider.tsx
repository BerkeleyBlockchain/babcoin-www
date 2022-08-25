import { useCallback, useEffect, useState } from 'react'

import { useAccount } from 'wagmi'

import DatabaseContext from './DatabaseContext'
import { AttendedEvents, Event, IdToEventMap } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<IdToEventMap>({})

  const address = useAccount().address

  const handleFetchAttendedEvents = useCallback(async () => {
    if (!address) {
      return
    }
    const res = await fetch(`${BASE_URL}/user/events?address=${address}`).then(
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
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
