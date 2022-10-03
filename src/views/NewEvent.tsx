import { Icon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { FiHome } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'

import useDatabase from 'contexts/database/useDatabase'
import useUser from 'contexts/user/useUser'

const BASE_URL = 'https://babcoin-backend.herokuapp.com/v1'
// const BASE_URL = 'http://localhost:4000/v1'

const NewEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { isAdmin } = useUser()

  const renderTextBox = (name: string, label: string) => {
    return (
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel>{label}</FormLabel>
            <Input {...field} placeholder="" />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    )
  }

  const renderDateTime = (name: string, label: string) => {
    return (
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel>{label}</FormLabel>
            <Input {...field} type="datetime-local" placeholder="" />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    )
  }

  const renderEventTypes = (name: string, label: string) => {
    return (
      <Field name={name}>
        {({ field, form }: { field: any; form: any }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel>{label}</FormLabel>
            <Select {...field} placeholder="Select option">
              {['clubcensus', 'allhands', 'social', 'external', 'other'].map(
                (type) => (
                  <option value={type}>
                    {type.slice(0, 1).toUpperCase() + type.slice(1)}
                  </option>
                ),
              )}
            </Select>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    )
  }

  return (
    <Flex
      flexDirection="column"
      left="16px"
      position="absolute"
      right="16px"
      minHeight="calc(100vh - 84px)"
    >
      <Box height="108px" />
      <Stack spacing="12px">
        <Heading size="3xl">Create New Event</Heading>

        <Formik
          initialValues={{
            name: '',
            description: '',
            location: '',
            nftArtUrl: '',
            type: '',
            startTimestamp: '',
            endTimestamp: '',
          }}
          onSubmit={async (values) => {
            if (!isAdmin) {
              return false
            }
            await fetch(`${BASE_URL}/event`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...values,
                startTimestamp: Date.parse(values.startTimestamp),
                endTimestamp: Date.parse(values.endTimestamp),
                password: 'abc',
              }),
            }).then((res) => res.json())
          }}
        >
          {(props) => (
            <Form>
              {renderTextBox('name', 'Name')}
              {renderTextBox('description', 'Description')}
              {renderTextBox('location', 'Location')}
              {renderTextBox('nftArtUrl', 'NFT Art URL')}
              {renderEventTypes('type', 'Event Type')}
              {renderDateTime('startTimestamp', 'Starting Time')}
              {renderDateTime('endTimestamp', 'Ending Time')}

              <Button
                backgroundColor="white"
                borderRadius="12px"
                color="black"
                flex={1}
                type="submit"
                mt={4}
                isLoading={props.isSubmitting}
              >
                Create Event
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
      <Spacer />
      <Flex gap="16px">
        <IconButton
          aria-label=""
          icon={<Icon as={FiHome} />}
          onClick={() => navigate('/')}
        />
      </Flex>
      <Box height="16px" />
    </Flex>
  )
}

export default NewEvent
