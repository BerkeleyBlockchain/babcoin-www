import { useEffect } from 'react'

import { Box, Flex, Stack, Heading, Text, Spacer } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import useDatabase from 'contexts/database/useDatabase'

const Leaderboard = () => {
  const { scores, onFetchScores } = useDatabase()
  const navigate = useNavigate()

  useEffect(() => {
    onFetchScores()
  }, [onFetchScores])

  return (
    <>
      <Flex
        flexDirection="column"
        left="16px"
        position="absolute"
        right="16px"
        top="84px"
        minHeight="calc(100vh - 84px)"
      >
        <Flex
          flexDirection="column"
          height="calc(100vh - 84px - 92px - 16px)"
          width="100%"
          overflow="auto"
          justifyContent="space-between"
        >
          <Heading size="3xl" marginBottom="15px">
            Leaderboard
          </Heading>

          <Stack gap="6px">
            {scores.map((user: any) => (
              <Flex
                alignItems="center"
                // onClick={() => navigate(`/peek/${user.address}`)}
              >
                <div>
                  <Text color="#fecb33" fontSize="large" fontWeight="semibold">
                    {user.name}
                  </Text>
                </div>
                <Spacer />
                <Text color="#7C7C7C" fontWeight="semibold">
                  {user.score}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Flex>
    </>
  )
}

export default Leaderboard
