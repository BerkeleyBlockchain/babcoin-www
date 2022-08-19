import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react'

type Props = {
  current: number
  max: number
  title: string
}

const ProgressBox: React.FC<Props> = ({ current, max, title }) => {
  return (
    <Flex
      alignItems="center"
      border="2px solid RGBA(255, 255, 255, 0.48)"
      borderRadius="24px"
      flexDirection="column"
      height="204px"
      justifyContent="space-between"
      padding="12px 0 24px 0"
      width="168px"
      flex={1}
    >
      <Text fontWeight="bold" textTransform="capitalize">
        {title}
      </Text>
      <CircularProgress
        capIsRound
        color="merkleMango.200"
        trackColor="merkleMango.800"
        value={current}
        max={max}
        size="120px"
      >
        <CircularProgressLabel fontSize="md" fontWeight="semibold">
          {current} / {max}
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  )
}

export default ProgressBox
