import { useCallback, useEffect, useMemo, useState } from 'react'

import { Box, Center, HStack, Image, Text } from '@chakra-ui/react'

import { IdToMetadataMap, Metadata, Nfts } from 'types'
import { useContractRead } from 'wagmi'
import BabCoinContract from '../../../contracts/BabCoinContract.json'
import useDatabase from 'contexts/database/useDatabase'

const key = '9_w25dPpnMio1K3JY9FifDnL1U7rlaP2'
const BASE_URL = `https:/polygon-mumbai.g.alchemy.com/nft/v2/${key}/getNFTs`

const fallbackUrl =
  'https://ipfs.io/ipfs/QmPxu4fisBPSiVeGYVNoyYQzXoT7dGB2qoN5HH689QG7Dg'

interface Props {
  account?: string
}

const NftGallery: React.FC<Props> = ({ account }) => {
  const [metadata, setMetadata] = useState<IdToMetadataMap>({})
  console.log('🚀 ~ metadata', metadata)
  const [userNfts, setUserNfts] = useState<Nfts[]>([])
  const { attendedEvents } = useDatabase()

  const handleFetchNfts = useCallback(async () => {
    console.log('fetching')
    const res = await fetch(`${BASE_URL}?owner=${account}&withMetadata=true`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    console.log(res)
    setUserNfts(res.ownedNfts as Nfts[])
  }, [account])

  // const data = useContractRead({
  //   addressOrName: '0x5147E15E6a37D346E0142492c63D6f660b5C9bd3',
  //   contractInterface: BabCoinContract.abi,
  //   functionName: 'uri',
  //   args: 1, //[account, 0],
  //   onSettled(data, error) {
  //     console.log('Settled', { data, error })
  //   },
  // })
  // console.log(data)

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

  // useEffect(() => {
  //   handleFetchMetadata()
  // }, [handleFetchMetadata])

  // useEffect(() => {
  //   handleFetchNfts()
  // }, [handleFetchNfts])

  console.log(attendedEvents)

  console.log()

  const Gallery = useMemo(() => {
    if (!attendedEvents.length) {
      return (
        <Center paddingTop="12">
          <Text>View your NFTs here!</Text>
        </Center>
      )
    }
    return (
      <HStack spacing="25px">
        {/* {Object.values(metadata).map((metadata) => (
          <Image
            alt={metadata.name}
            key={metadata.image}
            src={metadata.image || fallbackUrl}
          />
        ))} */}

        {attendedEvents.map((event) => (
          <Image
            alt={event.name}
            key={event.nftArtUrl}
            src={event.nftArtUrl || fallbackUrl}
            style={{ width: '80vw', margin: '10vw 15vw 10vw 5vw' }}
          />
        ))}
      </HStack>
    )
  }, [attendedEvents])

  return (
    <Box overflowX="auto" whiteSpace="nowrap">
      {Gallery}
    </Box>
  )
}

export default NftGallery
