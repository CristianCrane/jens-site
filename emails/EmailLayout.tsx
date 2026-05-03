import type { PropsWithChildren } from 'react'
import { Body, Container, Head, Html } from '@react-email/components'

const body = {
  borderRadius: '1.8rem',
  maxWidth: '600px',
  backgroundColor: '#f2f2f2',
  backgroundImage: `radial-gradient(
            circle at 0% 0%, 
            rgba(5, 127, 55, 0.2) 0%, 
            rgba(242, 242, 242, 0) 50%
          )`,
  backgroundAttachment: 'fixed',
  padding: '3rem 4rem',
  margin: '0 auto',
  fontFamily: '"Nunito", sans-serif',
}

export default function EmailLayout({ children }: PropsWithChildren) {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        />
        <style>
          {`
            @media only screen and (max-width: 600px) {
              .mobile-only-padding { padding: 1rem !important; }
            }
          `}
        </style>
      </Head>
      <Body>
        <Container style={body} className="mobile-only-padding">
          {children}
        </Container>
      </Body>
    </Html>
  )
}
