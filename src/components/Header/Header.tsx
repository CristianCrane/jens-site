import { Container } from '@mantine/core'
import Logo from '#/features/landing-page/Logo/Logo.tsx'
import classes from './Header.module.css'
import PhoneLink from '#/components/Header/PhoneLink.tsx'

export default function Header() {
  return (
    <Container size="responsive" w="100%">
      <header className={classes.header}>
        <Logo />
        <PhoneLink />
      </header>
    </Container>
  )
}
