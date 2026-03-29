import classes from './CTA.module.css'
import { Button, Container } from '@mantine/core'
import { IconGift } from '@tabler/icons-react'

export default function CTA() {
  return (
    <Container size="responsive">
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
        >
          Get Free Quote
        </Button>
      </div>
    </Container>
  )
}
