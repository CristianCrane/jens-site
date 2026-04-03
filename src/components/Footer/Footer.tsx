import type { ReactNode } from 'react'
import {
  ActionIcon,
  Anchor,
  Container,
  Group,
  Image,
  Text,
  ThemeIcon,
} from '@mantine/core'
import {
  IconAt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconLocation,
  IconPhone,
} from '@tabler/icons-react'
import classes from './Footer.module.css'

type ContactInfoProps = {
  icon: ReactNode
  href?: string
  info: string
}

function ContactInfo({ icon, href, info }: ContactInfoProps) {
  return (
    <Group gap="sm" wrap="nowrap">
      <ThemeIcon variant="light" radius="xl" size="xl">
        {icon}
      </ThemeIcon>
      {href ? (
        <Anchor href={href} c="gray">
          {info}
        </Anchor>
      ) : (
        <Text c="gray">{info}</Text>
      )}
    </Group>
  )
}

type SocialLinkProps = {
  href: string
  icon: ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <ActionIcon size="xl" radius="xl" component="a" href={href} target="_blank">
      {icon}
    </ActionIcon>
  )
}

export default function Footer() {
  return (
    <div className={classes.background}>
      <Container size="responsive">
        <footer className={classes.footer}>
          <div className={classes.contact}>
            <Image
              src="/empire-cleaning-and-pro-services-logo-transparent.png"
              alt="Empire Cleaning & Pro Services Inc. Logo"
              className={classes.logo}
            />
            <div className={classes.details}>
              <h3>Contact</h3>
              <address>
                <ContactInfo
                  icon={<IconPhone />}
                  href="tel:+6463209076"
                  info="(646) 320-9076"
                />
                <ContactInfo
                  icon={<IconAt />}
                  href="mailto:contact@empirecleaningandpro.com"
                  info="contact@empirecleaningandpro.com"
                />
                <ContactInfo
                  icon={<IconLocation />}
                  info="47-51 198th St, Flushing, NY 11358"
                />
              </address>
            </div>
            <div className={classes.follow}>
              <Group gap="lg" justify="center" wrap="nowrap">
                <SocialLink
                  href="https://www.facebook.com/empirecleaningsvcs3"
                  icon={<IconBrandFacebook />}
                />
                <SocialLink
                  href="https://www.instagram.com/empirecleaningsvcs3"
                  icon={<IconBrandInstagram />}
                />
                <SocialLink
                  href="https://www.yelp.com/biz/empire-cleaning-and-pro-services-queens"
                  icon={<Image src="/yelp-logo.png" alt="Yelp Logo" />}
                />
              </Group>
            </div>
          </div>
          <div className={classes.copy}>
            <small>
              © {new Date().getFullYear()} Empire Cleaning & Pro Services Inc.
              <br /> All rights reserved.
            </small>
          </div>
        </footer>
      </Container>
    </div>
  )
}
