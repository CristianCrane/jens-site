import type { PropsWithChildren, ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Anchor,
  Breadcrumbs,
  Container,
  Group,
  Text,
  Title,
} from '@mantine/core'

type PageLayoutProps = {
  title: ReactNode
  action?: ReactNode
} & PropsWithChildren

function useDynamicBreadcrumbs() {
  const location = useLocation()

  const pathParts = location.pathname.split('/')

  return pathParts.reduce(
    (parts, part, index) => {
      if (index === 0) {
        parts.push({
          href: '/',
          title: 'Home',
        })
      } else if (index === 1) {
        parts.push({
          href: `/${part}`,
          title: part,
        })
      } else if (index === pathParts.length - 1) {
        parts.push({
          href: null,
          title: part,
        })
      } else {
        parts.push({
          href: `${parts[index - 1].href}/${part}`,
          title: part,
        })
      }

      return parts
    },
    [] as { href: string | null; title: string }[],
  )
}

export default function PageLayout({
  children,
  title,
  action,
}: PageLayoutProps) {
  const crumbs = useDynamicBreadcrumbs()

  return (
    <Container size="responsive" w="100%" my={{ base: '2rem' }}>
      <Breadcrumbs mb="md">
        {crumbs.map((crumb) =>
          crumb.href ? (
            <Anchor component={Link} to={crumb.href}>
              {crumb.title}
            </Anchor>
          ) : (
            <Text>{crumb.title}</Text>
          ),
        )}
      </Breadcrumbs>
      <Group align="start" justify="space-between">
        <Title mb="md">{title}</Title>
        {action}
      </Group>
      {children}
    </Container>
  )
}
