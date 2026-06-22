import { Link } from '@tanstack/react-router'
import {
  Button,
  Card,
  Center,
  Container,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconConfetti } from '@tabler/icons-react'
import classes from './QuoteRequestForm.module.css'

export default function FormSuccess() {
  return (
    <Container size="sm" display="flex" flex={1}>
      <Card radius="xl" my="auto" classNames={{ root: classes.card }}>
        <Center>
          <Stack align="center">
            <ThemeIcon variant="outline" radius="xl" size="5rem">
              <IconConfetti style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <Title>Yay! We can’t wait to get started.</Title>
            <Text c="gray">
              Your request just landed on our desks, and we’re already prepping
              the supplies. Sit tight—we’ll send your custom quote over before
              you know it.
            </Text>
            <Button variant="outline" component={Link} to="/">
              Back to home
            </Button>
          </Stack>
        </Center>
      </Card>
    </Container>
  )
}
