import {
  Flex,
  Spacer,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Text,
} from '@chakra-ui/react'
import {useAccount} from 'wagmi';
import {useNavigate}from 'react-router-dom';


type Props = {}
const testEventId = "62cfb76c640c79f63b74e8b9";

const Events = (props: Props) => {
  const navigate = useNavigate();
  const address = useAccount().address;

  const handleMint = async () => {
    const response = await fetch('https://babcoin-backend.herokuapp.com/v1/user/attendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "address": address,
        "eventId": testEventId
      })});
    const data = await response.json();
    console.log(data);
    navigate('/dashboard');
    }

  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      alignItems="center"
      minH="100vh"
    >
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

      <Button colorScheme="gray" size="md" w="90%" mb="10" onClick = {handleMint}>
        Mint
      </Button>
    </Flex>
  )
}

export default Events
