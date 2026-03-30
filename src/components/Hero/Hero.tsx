import { Button, Container, Grid, Image } from '@mantine/core'
import { IconGift } from '@tabler/icons-react'
import classes from './Hero.module.css'
import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <Container size="responsive">
      <Grid className={classes.hero}>
        <Grid.Col span={{ base: 12, xl: 6 }}>
          <h1>Professional Cleaning Services for Your Home and Business</h1>
          <p>
            Get in touch today, and let us make your world a cleaner, healthier
            place.
          </p>
          <Button
            leftSection={<IconGift size={28} />}
            size="lg"
            component={Link}
            to="/quote"
          >
            Get Free Quote
          </Button>
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
