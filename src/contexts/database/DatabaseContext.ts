import { createContext } from 'react'
import {
  OwnedNfts,
  Nfts,
  Address,
  Id,
  TokenUris,
  Metadata,
  IdToMetadataMap,
} from './types'

interface DatabaseContextValue {
  userNfts: Nfts[]
  metadata: IdToMetadataMap
}

const DatabaseContext = createContext<DatabaseContextValue>({
  userNfts: [],
  metadata: {},
})

export default DatabaseContext
