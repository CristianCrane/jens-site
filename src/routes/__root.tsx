import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/carousel/styles.css'

import { cssVariablesResolver, theme } from '#/app-theme.ts'
import Header from '#/components/Header/Header.tsx'
import Footer from '#/components/Footer/Footer.tsx'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Empire Cleaning & Pro Services Inc.',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#f2f2f2', // Base background color
          backgroundImage: `radial-gradient(
            circle at 0% 0%, 
            rgba(5, 127, 55, 0.2) 0%, 
            rgba(242, 242, 242, 0) 50%
          )`,
          backgroundAttachment: 'fixed',
        }}
      >
        <MantineProvider
          theme={theme}
          cssVariablesResolver={cssVariablesResolver}
        >
          <Header />
          {children}
          <Footer />
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  )
}
