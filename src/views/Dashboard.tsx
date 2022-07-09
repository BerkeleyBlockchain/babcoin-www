import {
  Flex,
  Heading,
  Box,
  Stack,
  Text,
  Image,
  HStack,
  Progress,
} from '@chakra-ui/react'

type Props = {}

// HACK ALERT: This babCardUrl is just from a facebook cdn so this is not a permanent solution
const babCardUrl =
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/281900172_1076868666294387_2286252289936678529_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=MYnwVeVq1FcAX-DiNfd&_nc_ht=scontent-sjc3-1.xx&oh=03_AVKuMwDXZUdEfIjut9UevkGod41ytG7JAtZMdvjYBNDADw&oe=62E399AF'

const Dashboard = (props: Props) => {
  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      sx={{
        'max-width': '100%',
        'overflow-x': 'hidden',
      }}
    >
      <Box py={4}>
        <Heading as="h1" size="4xl" textAlign="center">
          Membership
        </Heading>
      </Box>
      {/* Create a progress bar with title Clubcensus */}
      <Box textAlign="center" py={4} mx={4}>
        <Text fontSize="sm" mb={2} textAlign="left">
          Clubcensus
        </Text>
        <Progress colorScheme="merkleMango" value={80} borderRadius={7.5} />
      </Box>
      <Box textAlign="center" py={4} mx={4}>
        <Text fontSize="sm" mb={2} textAlign="left">
          Clubcensus 2
        </Text>
        <Progress colorScheme="merkleMango" value={50} borderRadius={7.5} />
      </Box>
      <Box textAlign="center" py={4} mx={4}>
        <Text fontSize="sm" mb={2} textAlign="left">
          Clubcensus 3
        </Text>
        <Progress colorScheme="merkleMango" value={30} borderRadius={7.5} />
      </Box>
      <Box py={4}>
        <Heading as="h1" size="4xl" textAlign="center">
          Attendance
        </Heading>
      </Box>
      {/* Horizontally scrollable component - reference: https://stackoverflow.com/questions/65042380/how-to-add-webkit-scrollbar-pseudo-element-in-chakra-ui-element-react */}
      <Box
        overflowX="auto"
        maxW="100vw"
        h="100%"
        whiteSpace="nowrap"
        pb="17px"
        color="white"
        px="32px"
        sx={{
          '::-webkit-scrollbar': {
            borderRadius: '10',
            bg: `gray.200`,
          },
        }}
      >
        <HStack spacing="24px" py={4} mx={4}>
          <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
          <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
          <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
          <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
        </HStack>
      </Box>
      <Stack
        justify="space-between"
        direction={{ base: 'column-reverse', md: 'row' }}
        align="center"
        backgroundColor="black"
      >
        <Text fontSize="sm" color="subtle">
          Made with ❤️ by {'B@B'}
        </Text>
      </Stack>
    </Flex>
  )
}

export default Dashboard
