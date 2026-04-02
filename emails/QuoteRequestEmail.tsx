import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Row,
  Text,
} from '@react-email/components'
import type { FormValues } from '#/components/QuoteForm/utils.tsx'

const baseUrl = process.env.EMAIL_ASSETS_BASE_URL
const appBaseUrl = process.env.APP_BASE_URL

type QuoteRequestEmailProps = {
  data: FormValues
  id: string
}

const QuoteRequestEmail = ({ data, id }: QuoteRequestEmailProps) => {
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
      </Head>
      <Body>
        <Container style={body}>
          <Row>
            <Column>
              <Img
                src={`${baseUrl}/empire-cleaning-and-pro-services-logo-transparent.png`}
                alt="Empire Cleaning and Pro Services Logo"
                width="150"
                style={{ marginBottom: '2rem' }}
              />
            </Column>
          </Row>
          <Row>
            <Column valign="top">
              <Heading as="h1">New Quote Request</Heading>
              <Heading as="h3" style={title}>
                Who
              </Heading>
              <Text style={text}>
                {data.firstName} {data.lastName}
              </Text>
              <Text style={text}>{data.phoneNumber}</Text>
              <Text style={text}>{data.email}</Text>
              <Heading as="h3" style={title}>
                Where
              </Heading>
              <Text style={text}>
                {data.address}
                {data.address2 ? `, ${data.address2}` : ''}
              </Text>
              <Text style={text}>
                {data.city}, {data.zip}
              </Text>
              <Heading as="h3" style={title}>
                Job Details
              </Heading>
              <Text style={text}>{data.jobDescription}</Text>
            </Column>
            <Column>
              <Img
                src={`${baseUrl}/empire-girl.png`}
                alt="Empire Cleaning Girl"
                height="200"
              />
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Button href={`${appBaseUrl}/quote-calc?id=${id}`} style={button}>
                Build Quote
              </Button>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  )
}

QuoteRequestEmail.PreviewProps = {
  data: {
    address: '154-36 20th Rd.',
    address2: '1st FL',
    city: 'Whitestone',
    email: 'cristiandcrane@gmail.com',
    firstName: 'Cristian',
    images: undefined,
    jobDescription: '2br apartment looking for deep clean',
    jobType: 'Deep Cleaning',
    lastName: 'Crane',
    phoneNumber: '917-445-2596',
    zip: '11357',
  },
} as QuoteRequestEmailProps

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
  padding: '2rem',
  margin: '0 auto',
  fontFamily: '"Nunito", sans-serif',
}

const title = {
  margin: '1.5rem 0 .25rem 0',
}

const text = {
  margin: '.25rem 0',
}

const button = {
  color: '#fff',
  backgroundColor: '#057f37',
  padding: '1rem 3rem',
  borderRadius: '8px',
  margin: '4rem 0 2rem 0',
}

export default QuoteRequestEmail
