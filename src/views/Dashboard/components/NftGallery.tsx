import { Box, HStack, Image } from '@chakra-ui/react'

// HACK ALERT: This babCardUrl is just from a facebook cdn so this is not a permanent solution
const babCardUrl =
  'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/281900172_1076868666294387_2286252289936678529_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=MYnwVeVq1FcAX-DiNfd&_nc_ht=scontent-sjc3-1.xx&oh=03_AVKuMwDXZUdEfIjut9UevkGod41ytG7JAtZMdvjYBNDADw&oe=62E399AF'

const NftGallery = () => {
  return (
    <Box
      overflowX="auto"
      whiteSpace="nowrap"
      sx={{
        '::-webkit-scrollbar': {
          borderRadius: '10',
          bg: `gray.200`,
        },
      }}
    >
      <HStack spacing="25px">
        <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
        <Image boxSize="400px" objectFit="cover" src={babCardUrl} />
      </HStack>
    </Box>
  )
}

export default NftGallery
