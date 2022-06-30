import {
  Flex,
  Heading,
  Box,
  Stack,
  Text,
  Image,
  HStack,
  Progress,
  extendTheme,
} from '@chakra-ui/react'

type Props = {}

const babCardUrl =
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/281900172_1076868666294387_2286252289936678529_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=MYnwVeVq1FcAX-DiNfd&_nc_ht=scontent-sjc3-1.xx&oh=03_AVKuMwDXZUdEfIjut9UevkGod41ytG7JAtZMdvjYBNDADw&oe=62E399AF'

const Dashboard = (props: Props) => {
  return (
    <Flex flexDirection="column" left="16px" position="absolute" right="16px">
      <Box py={4}>
        <Heading as="h1" size="xl" textAlign="center">
          Membership
        </Heading>
      </Box>
      {/* Create a progress bar with title Clubcensus */}
      <Box textAlign="center" py={4}>
        <Text fontSize="sm">Clubcensus</Text>
        <Progress colorScheme="yellow" value={80} />
      </Box>
      <Box textAlign="center" py={4}>
        <Text fontSize="sm">Clubcensus 2 </Text>
        <Progress colorScheme="yellow" value={50} />
      </Box>
      <Box textAlign="center" py={4}>
        <Text fontSize="sm">Clubcensus 3</Text>
        <Progress colorScheme="yellow" value={30} />
      </Box>

      <Box py={4}>
        <Heading as="h1" size="xl" textAlign="center">
          Attendance
        </Heading>
      </Box>
      <HStack spacing="24px" py={4}>
        <Image boxSize="200px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="200px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="200px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="200px" objectFit="cover" src={babCardUrl} />
      </HStack>
      <Stack
        justify="space-between"
        direction={{ base: 'column-reverse', md: 'row' }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          Made with ❤️ by {'B@B'}
        </Text>
      </Stack>
    </Flex>
  )
}

export default Dashboard
