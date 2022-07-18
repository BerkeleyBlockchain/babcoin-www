import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

type Props = {
  location: string
  name: string
  id?: string
  timestamp?: number
}

const EventRow: React.FC<Props> = ({
  location,
  name,
  id = '312',
  timestamp = 1657628971211,
}) => {
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
