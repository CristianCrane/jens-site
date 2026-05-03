import {
  Button,
  Column,
  Heading,
  Img,
  Row,
  Text,
} from '@react-email/components'
import type { QuoteRequestFormValues } from '@features/quotes'
import EmailLayout from './EmailLayout.tsx'
import Logo from './Logo.tsx'
import { heroTitle } from './styles.ts'

const baseUrl = process.env.EMAIL_ASSETS_BASE_URL
const appBaseUrl = process.env.APP_BASE_URL

type QuoteRequestEmailProps = {
  formValues: QuoteRequestFormValues
  quoteId: string
}

const QuoteRequestEmail = ({ formValues, quoteId }: QuoteRequestEmailProps) => {
  return (
    <EmailLayout>
      <Logo />
      <Row>
        <Column valign="top">
          <Heading style={heroTitle}>New Quote Request</Heading>
          <Heading as="h3" style={title}>
            Who
          </Heading>
          <Text style={text}>
            {formValues.firstName} {formValues.lastName}
          </Text>
          <Text style={text}>{formValues.phoneNumber}</Text>
          <Text style={text}>{formValues.email}</Text>
          <Heading as="h3" style={title}>
            Where
          </Heading>
          <Text style={text}>
            {formValues.address}
            {formValues.address2 ? `, ${formValues.address2}` : ''}
          </Text>
          <Text style={text}>
            {formValues.city}, {formValues.zip}
          </Text>
          <Heading as="h3" style={title}>
            Job Details
          </Heading>
          <Text style={text}>{formValues.jobDescription}</Text>
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
          <Button href={`${appBaseUrl}/quotes/${quoteId}/edit`} style={button}>
            Build Quote
          </Button>
        </Column>
      </Row>
    </EmailLayout>
  )
}

QuoteRequestEmail.PreviewProps = {
  formValues: {
    address: '154-36 20th Rd.',
    address2: '1st FL',
    city: 'Whitestone',
    email: 'cristiandcrane@gmail.com',
    firstName: 'Cristian',
    jobDescription: '2br apartment looking for deep clean',
    jobType: 'Deep Cleaning',
    lastName: 'Crane',
    phoneNumber: '917-445-2596',
    zip: '11357',
  },
  quoteId: '12345',
} as QuoteRequestEmailProps

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
