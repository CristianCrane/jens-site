import { UnstyledButton } from '@mantine/core'
import classes from './Header.module.css'
import type { PropsWithChildren } from 'react'

export default function NavButton({ children }: PropsWithChildren) {
  return (
    <UnstyledButton className={classes.navButton}>{children}</UnstyledButton>
  )
}
