import { createContext } from 'react'

interface UserContextValue {
  jwt: string | null
  isAdmin: boolean | null
  onAttendEvent: (eventId: string) => void
  onCreateUser: (name: string, email: string) => void
  onLogInUser: () => void
}

const UserContext = createContext<UserContextValue>({
  jwt: '',
  isAdmin: false,
  onAttendEvent: () => {},
  onCreateUser: () => {},
  onLogInUser: () => {},
})

export default UserContext
