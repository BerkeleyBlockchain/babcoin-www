import { useMemo } from 'react'

import { Flex, Spacer, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import useDatabase from 'contexts/database/useDatabase'

export type EventProps = {
  id: number
  location: string
  name: string
  timestamp: number
}

const EventRow: React.FC<EventProps> = ({ location, name, id, timestamp }) => {
  const { attendedEvents } = useDatabase()
  const navigate = useNavigate()

  const date = new Date(timestamp)
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`
  const timeString = `${date.getHours()}:${date.getMinutes()}`
  const pm = date.getHours() >= 12

  const attended = useMemo(() => {
    if (!attendedEvents.length) return
    return (
      attendedEvents.filter((record) => record._id.toString() === id.toString())
        .length > 0
    )
  }, [attendedEvents, id])

  return (
    <Flex alignItems="center" onClick={() => navigate(`/events/${id}`)}>
      <div>
        <Text color="#fecb33" fontSize="large" fontWeight="semibold">
          {name}
        </Text>
        <Text color="#7C7C7C" fontWeight="semibold">
          {`${dateString} | ${timeString} ${pm ? 'pm' : 'am'} | ${location}`}
        </Text>
      </div>
      <Spacer />
      {attended ? <CheckIcon /> : null}
    </Flex>
  )
}

export default EventRow
