import { Avatar, Card, Rating } from '@mantine/core'
import classes from './Reviews.module.css'

type ReviewProps = {
  name: string
  img?: string
  review: string
}

export default function Review({ name, img, review }: ReviewProps) {
  return (
    <Card
      radius="xl"
      classNames={{
        root: classes.card,
      }}
    >
      <figure>
        <div className={classes.reviewer}>
          <Avatar classNames={{ root: classes.avatar }} src={img} alt={name} />
          <figcaption>
            <cite>{name}</cite>
          </figcaption>
          <Avatar src="/reviews/google_logo.png" alt="Google logo" size="sm" />
        </div>
        <Rating defaultValue={5} readOnly py="md" />
        <blockquote cite="https://source-of-review.com">{review}</blockquote>
      </figure>
    </Card>
  )
}
