import { Anchor, ThemeIcon } from '@mantine/core'
import { IconPhone } from '@tabler/icons-react'
import classes from './Header.module.css'

export default function PhoneLink() {
  return (
    <div className={classes.phoneLink}>
      <ThemeIcon variant="light" radius="xl" size="xl">
        <IconPhone />
      </ThemeIcon>
      <Anchor href="tel:+16463209076" size="xl">
        (646) 320-9076
      </Anchor>
    </div>
  )
}
