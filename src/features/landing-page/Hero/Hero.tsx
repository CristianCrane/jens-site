import { Link } from '@tanstack/react-router'
import { Button, Container, Grid, Group, Image } from '@mantine/core'
import { IconGift } from '@tabler/icons-react'
import classes from './Hero.module.css'

export default function Hero() {
  return (
    <Container size="responsive" w="100%">
      <Grid className={classes.hero}>
        <Grid.Col span={{ base: 12, xl: 6 }}>
          <h1>Professional Cleaning Services for Your Home and Business</h1>
          <p>
            Get in touch today, and let us make your world a cleaner, healthier
            place.
          </p>
          <Group>
            <Button
              leftSection={<IconGift size={28} />}
              component={Link}
              to="/quotes/request"
            >
              Get Free Quote
            </Button>
            <Button variant="outline" component={Link} to="/auth/sign-in">
              Sign in
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 6 }}>
          <div className={classes.imgContainer}>
            <Image src="/empire-hero.svg" alt="" />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
