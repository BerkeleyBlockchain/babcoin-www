import { createContext } from 'react'
import { OwnedNfts, Nfts, Address, Id, TokenUris, Metadata, IdToMetadataMap } from './types'

interface DatabaseContextValue {
  ownedNfts: OwnedNfts[]
  metadata: IdToMetadataMap[]
}

const DatabaseContext = createContext<DatabaseContextValue>({
  ownedNfts: [], metadata: []
})

export default DatabaseContext