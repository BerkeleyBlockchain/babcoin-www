import React from 'react'

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  Spinner,
} from '@chakra-ui/react'

const FullPageLoading = () => (
  <Flex
    flexDirection="column"
    left="16px"
    position="absolute"
    right="16px"
    minHeight="calc(100vh - 84px)"
  >
    <Box height="108px" />
    <Box height="16px" />
  </Flex>
)

export default FullPageLoading
