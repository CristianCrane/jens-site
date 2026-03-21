import type { PropsWithChildren } from 'react'
import classes from './SectionTitle.module.css'

export default function SectionTitle({ children }: PropsWithChildren) {
  return <h2 className={classes.title}>{children}</h2>
}
