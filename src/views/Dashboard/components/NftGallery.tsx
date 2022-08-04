import { Box, HStack, Image } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { IdToMetadataMap, Metadata, Nfts } from 'types'

const key = '9_w25dPpnMio1K3JY9FifDnL1U7rlaP2'
const BASE_URL = `https:/polygon-mumbai.g.alchemy.com/nft/v2/${key}/getNFTs`

const fallbackUrl =
  'https://ipfs.io/ipfs/QmPxu4fisBPSiVeGYVNoyYQzXoT7dGB2qoN5HH689QG7Dg'

interface Props {
  account: string
}

const NftGallery: React.FC<Props> = ({ account }) => {
  const [metadata, setMetadata] = useState<IdToMetadataMap>({})
  const [userNfts, setUserNfts] = useState<Nfts[]>([])

  const handleFetchNfts = useCallback(async () => {
    const res = await fetch(`${BASE_URL}?owner=${account}&withMetadata=true`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    setUserNfts(res.ownedNfts as Nfts[])
  }, [account])

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

  useEffect(() => {
    handleFetchMetadata()
  }, [handleFetchMetadata])

  useEffect(() => {
    handleFetchNfts()
  }, [handleFetchNfts])

  return (
    <Box overflowX="auto" whiteSpace="nowrap">
      <HStack spacing="25px">
        {Object.values(metadata).map((metadata) => (
          <Image src={metadata.image || fallbackUrl} alt={metadata.name} />
        ))}
      </HStack>
    </Box>
  )
}

export default NftGallery
