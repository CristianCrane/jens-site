import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Text,
} from '@react-email/components'
import type { FormValues } from '@features/quotes'

const baseUrl = process.env.EMAIL_ASSETS_BASE_URL

type QuoteConfirmationProps = {
  data: FormValues
}

const QuoteConfirmationEmail = ({ data }: QuoteConfirmationProps) => {
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
              <Heading as="h1">We got your quote request!</Heading>
              <Text>
                Hi {data.firstName}, we're reviewing the details of your quote
                and will get back to you shortly. In the meantime, please
                contact us if you have any questions.
              </Text>
            </Column>
            <Column>
              <Img
                src={`${baseUrl}/empire-girl.png`}
                alt="Empire Cleaning Girl"
                height="200"
              />
            </Column>
          </Row>
          <Hr style={{ borderTop: '1px solid #999', margin: '2rem 0 0 0' }} />
          <Row>
            <Column align="center">
              <Text style={footerText}>
                <strong>Questions?</strong> Contact us at{' '}
                <Link style={link} href="tel:+16463209076">
                  (646) 320-9076
                </Link>{' '}
                or{' '}
                <Link
                  style={link}
                  href="mailto:contact@empirecleaningandpro.com"
                >
                  contact@empirecleaningandpro.com
                </Link>
              </Text>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  )
}

QuoteConfirmationEmail.PreviewProps = {
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
} as QuoteConfirmationProps

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

const footerText = {
  fontSize: '0.8rem',
  color: '#555',
}

const link = {
  color: '#057f37',
}

export default QuoteConfirmationEmail
