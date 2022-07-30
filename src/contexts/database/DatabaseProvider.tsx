import { useCallback, useEffect, useState } from 'react'
import DatabaseContext from './DatabaseContext'
import { IdToMetadataMap, Metadata, Nfts } from './types'

interface Props {
  children: React.ReactNode
}

const key = '9_w25dPpnMio1K3JY9FifDnL1U7rlaP2'
const BASE_URL = `https:/polygon-mumbai.g.alchemy.com/nft/v2/${key}/getNFTs`

const DatabaseProvider: React.FC<Props> = ({ children }) => {
  // 1. Create a state variable
  const [metadata, setMetadata] = useState<IdToMetadataMap>({})
  const [userNfts, setUserNfts] = useState<Nfts[]>([])
  const address = '0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f'

  // 2. Create a memoized (useCallback) function to fetch
  const handleFetchNfts = useCallback(async () => {
    const res = await fetch(`${BASE_URL}?owner=${address}&withMetadata=true`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    setUserNfts(res.ownedNfts as Nfts[])
  }, [])

  const handleFetchMetadata = useCallback(async () => {
    if (!userNfts) return
    const promises: Promise<void>[] = []
    for (const nft of Object.values(userNfts)) {
      const id = parseInt(nft.id.tokenId, 16)
      const url = userNfts[id - 1].tokenUri.raw.replace('{id}', id.toString())

      promises.push(
        fetch(url, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((res) =>
            setMetadata((m) => ({
              ...m,
              [id - 1]: res as Metadata,
            })),
          )
          .catch((err) => console.log(err)),
      )
    }

    await Promise.all(promises)
  }, [userNfts])

  // 3. Call fetch function on page load
  useEffect(() => {
    handleFetchMetadata()
  }, [handleFetchMetadata])

  useEffect(() => {
    handleFetchNfts()
  }, [handleFetchNfts])

  return (
    // 4. Pass the state variable to the context
    // 5. Look at Home to see how to use the context
    <DatabaseContext.Provider value={{ metadata, userNfts }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider
