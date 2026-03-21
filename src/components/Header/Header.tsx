import { Burger, Container, Drawer } from '@mantine/core'
import Logo from '#/components/Logo/Logo.tsx'
import NavButton from '#/components/Header/NavButton.tsx'
import { useDisclosure } from '@mantine/hooks'
import classes from './Header.module.css'
import PhoneLink from '#/components/Header/PhoneLink.tsx'

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure()

  return (
    <Container size="responsive">
      <div className={classes.header}>
        <Logo />
        <div className={classes.desktopNav}>
          <NavButton>Services</NavButton>
          <NavButton>Reviews</NavButton>
          <NavButton>Service Areas</NavButton>
          <NavButton>Contact</NavButton>
        </div>
        <PhoneLink />
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" />
      </div>

      {/* mobile menu */}
      <Drawer opened={opened} onClose={close} title={<Logo />}>
        <NavButton>Services</NavButton>
        <NavButton>Reviews</NavButton>
        <NavButton>Service Areas</NavButton>
        <NavButton>Contact</NavButton>
      </Drawer>
    </Container>
  )
}
