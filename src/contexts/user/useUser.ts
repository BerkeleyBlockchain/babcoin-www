import { useContext } from 'react'
import UserContext from './UserContext'

const useUser = () => {
  const context = useContext(UserContext)
  return context
}

export default useUser
