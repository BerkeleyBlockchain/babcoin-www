import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import DatabaseContext from './DatabaseContext'
import { AttendedEvents, Event, IdToEventMap, Requirement } from './types'

interface Props {
  children: React.ReactNode
}

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const semesterToTime = {
  Sp23: ['1673328222000', '3000000000000'],
  Fa22: ['0', '1673328221000'],
}

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  const [attendedEvents, setAttendedEvents] = useState<AttendedEvents[]>([])
  const [events, setEvents] = useState<IdToEventMap>({})
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [scores, setScores] = useState([])
  const [semester, setSemester] = useState('Sp23')

  const address = useAccount().address

  const onSetSemester = (semester: string) => {
    setSemester(semester)
  }

  const handleFetchAttendedEvents = useCallback(async () => {
    if (!address) {
      return
    }
    const res = await fetch(
      `${BASE_URL}/user/events?address=${address}&startTime=${
        semesterToTime[semester as keyof typeof semesterToTime][0]
      }&endTime=${semesterToTime[semester as keyof typeof semesterToTime][1]}`,
    ).then((res) => res.json())
    setAttendedEvents(res as AttendedEvents[])
  }, [address, semester])

  const handleFetchEvents = useCallback(async () => {
    console.log('fetching events')
    console.log(semester)
    const res = await fetch(
      `${BASE_URL}/event?startTime=${
        semesterToTime[semester as keyof typeof semesterToTime][0]
      }&endTime=${semesterToTime[semester as keyof typeof semesterToTime][1]}`,
    )
      .then((res) => res.json())
      .then((res) => res as Event[])
      .then((res) =>
        res.reduce((acc: IdToEventMap, curr) => {
          acc[curr._id] = curr
          return acc
        }, {}),
      )
    console.log(
      `${BASE_URL}/event?startTime=${
        semesterToTime[semester as keyof typeof semesterToTime][0]
      }&endTime=${semesterToTime[semester as keyof typeof semesterToTime][1]}`,
    )
    console.log(res)

    setEvents(res)
  }, [semester])

  const handleFetchRequirements = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/requirement`)
      .then((res) => res.json())
      .then((res) => res as Requirement[])
    setRequirements(res)
  }, [])

  const handleFetchScores = useCallback(async () => {
    const res = await fetch(
      `${BASE_URL}/user/scores?startTime=${
        semesterToTime[semester as keyof typeof semesterToTime][0]
      }&endTime=${semesterToTime[semester as keyof typeof semesterToTime][1]}`,
    ).then((res) => res.json())
    setScores(res)
  }, [semester])

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
        semester,
        onFetchAttendedEvents: handleFetchAttendedEvents,
        onFetchScores: handleFetchScores,
        onSetSemester,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
