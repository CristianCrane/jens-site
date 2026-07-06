import type { ReactNode } from 'react'
import {
  ActionIcon,
  Anchor,
  Container,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
  Title,
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
    <Group gap="sm">
      <ThemeIcon radius="xl" variant="outline">
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
    <ActionIcon size="lg" radius="xl" component="a" href={href} target="_blank">
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
            <Stack gap="xs">
              <Title order={4}>Stay fresh with us!</Title>
              <Text size="sm" c="gray">
                Follow our socials for cleaning tips, sparkling updates, and
                occasional squeaky-clean deals.
              </Text>
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
            </Stack>
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
