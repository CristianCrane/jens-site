import { Anchor, Container, Group } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import SectionTitle from '#/components/SectionTitle/SectionTitle.tsx'
import Review from '#/components/Reviews/Review.tsx'
import { Carousel } from '@mantine/carousel'
import classes from './Reviews.module.css'
import reviewData from '#/components/Reviews/reviews-data.ts'

export default function Reviews() {
  return (
    <div className={classes.wrapper}>
      <Container size="responsive">
        <Group align="center" justify="space-between" py="2rem">
          <SectionTitle>What our customers say</SectionTitle>
          <Anchor
            visibleFrom="xs"
            href="https://www.google.com/search?q=Empire+Cleaning+%26+Pro+Services&stick=H4sIAAAAAAAA_-NgU1I1qLBINTZNSU40N020MDAzMk6xMqhIM7E0TkmyNDM0S7UwSTNOXMQq55pbkFmUquCck5qYl5mXrqCmEFCUrxCcWlSWmZxaDABu36wKSgAAAA&hl=en&mat=Cac20Dnfz4XNElcBTVDHntEkSH02QeVndzdZggxKLgsmEe7A3R-LgZMOw5VDE9s5ag4c49FjlqGxmrh9LfBOeXIBScDSIp1AIYFTG6W1_TD_jzyqzTF9ygJG12A1k1MECYg&authuser=0&zx=1765135502737&no_sw_cr=1#lrd=0x8e35dca75a80623d:0xf493db9616e84f3a,1,,,,"
            target="_blank"
          >
            <Group>
              More reviews
              <IconExternalLink />
            </Group>
          </Anchor>
        </Group>
        <Carousel
          withIndicators
          withControls={false}
          slideSize={{ base: '100%', sm: '50%' }}
          slideGap="xl"
          emblaOptions={{ align: 'start' }}
          classNames={{
            indicators: classes.indicators,
            indicator: classes.indicator,
          }}
        >
          {reviewData.map((review) => (
            <Carousel.Slide key={`review-${review.name}`}>
              <Review
                img={review.imgUrl}
                name={review.name}
                review={review.review}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </div>
  )
}
