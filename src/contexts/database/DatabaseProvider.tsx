import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import DatabaseContext from './DatabaseContext'
import { AttendedEvents, Event, IdToEventMap, Requirement } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<IdToEventMap>({})
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [scores, setScores] = useState([])

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

  const handleFetchRequirements = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/requirement`)
      .then((res) => res.json())
      .then((res) => res as Requirement[])
    setRequirements(res)
  }, [])

  const handleFetchScores = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/user/scores`).then((res) => res.json())
    setScores(res)
  }, [])

  useEffect(() => {
    handleFetchAttendedEvents()
  }, [handleFetchAttendedEvents])

  useEffect(() => {
    handleFetchEvents()
  }, [handleFetchEvents])

  useEffect(() => {
    handleFetchRequirements()
  }, [handleFetchRequirements])

  return (
    <DatabaseContext.Provider
      value={{
        attendedEvents,
        events,
        requirements,
        scores,
        onFetchAttendedEvents: handleFetchAttendedEvents,
        onFetchScores: handleFetchScores,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
