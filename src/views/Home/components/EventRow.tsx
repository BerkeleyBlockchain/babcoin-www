import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export type EventProps = {
  id: number
  location: string
  name: string
  timestamp: number
}

const EventRow: React.FC<EventProps> = ({ location, name, id, timestamp }) => {
  const navigate = useNavigate()

  const date = new Date(timestamp)
  const dateString = `${date.getMonth() + 1}/${date.getDate()}`
  const timeString = `${date.getHours()}:${date.getMinutes()}`
  const pm = date.getHours() >= 12

  return (
    <div onClick={() => navigate(`/events/${id}`)}>
      <Text color="#fecb33" fontSize="large" fontWeight="semibold">
        {name}
      </Text>
      <Text color="#7C7C7C" fontWeight="semibold">
        {`${dateString} | ${timeString} ${pm ? 'pm' : 'am'} | ${location}`}
      </Text>
    </div>
  )
}

export default EventRow
