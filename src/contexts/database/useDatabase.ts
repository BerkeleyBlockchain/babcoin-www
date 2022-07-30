import { useContext } from 'react'
import DatabaseContext from './DatabaseContext'

const useDatabase = () => {
  const context = useContext(DatabaseContext)
  return context
}

export default useDatabase
