import { Link } from '@tanstack/react-router'
import { Button, Container } from '@mantine/core'
import { IconGift } from '@tabler/icons-react'
import classes from './CTA.module.css'

export default function CTA() {
  return (
    <Container size="responsive" w="100%">
      <div className={classes.cta}>
        <div>
          <h3>Your Home, Only Happier.</h3>
          <p>
            <strong>Love your space again.</strong> We handle the cleaning so
            you can enjoy the living.
          </p>
        </div>
        <Button
          size="xl"
          variant="white"
          leftSection={<IconGift size={28} />}
          radius="lg"
          component={Link}
          to="/quote"
        >
          Get Free Quote
        </Button>
      </div>
    </Container>
  )
}
