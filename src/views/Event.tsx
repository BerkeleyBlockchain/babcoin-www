import {
  Flex,
  Spacer,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Text,
} from '@chakra-ui/react'

type Props = {}

const Events = (props: Props) => {
  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      alignItems="center"
      minH="100vh"
    >
      <Button />
      <Box pl="3">
        <Box w="90%" mt="50%" pl="3">
          <Heading as="h2" size="4xl">
            Club Census #1
          </Heading>
          <Flex flexDirection="row" my="2">
            <Text fontSize="sm" color="BlackAlpha">
              8/11
            </Text>
            <Text fontSize="sm">&nbsp;|&nbsp;</Text>
            <Text fontSize="sm">5:30pm</Text>
            <Text fontSize="sm">&nbsp;|&nbsp;</Text>
            <Text fontSize="sm">SCET</Text>
          </Flex>
          <Text fontSize="m">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed
            sem condimentum, tincidunt erat vitae, auctor mauris.{' '}
          </Text>
        </Box>
      </Box>

      <Spacer />

      <Button colorScheme="gray" size="md" w="90%" mb="10">
        Mint
      </Button>
    </Flex>
  )
}

export default Events
