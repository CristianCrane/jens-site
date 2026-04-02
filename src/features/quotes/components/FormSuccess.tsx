import {
  Card,
  Center,
  Container,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconConfetti } from '@tabler/icons-react'
import classes from './QuoteForm.module.css'

export default function FormSuccess() {
  return (
    <Container size="sm" my="xl">
      <Card radius="xl" classNames={{ root: classes.card }}>
        <Center>
          <Stack align="center">
            <ThemeIcon variant="light" radius="xl" size="5rem">
              <IconConfetti style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <Title>Yay! We can’t wait to get started.</Title>
            <Text c="gray">
              Your request just landed on our desks, and we’re already prepping
              the supplies. Sit tight—we’ll send your custom quote over before
              you know it.
            </Text>
          </Stack>
        </Center>
      </Card>
    </Container>
  )
}
