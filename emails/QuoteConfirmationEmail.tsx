import { Column, Heading, Img, Row, Text } from '@react-email/components'
import type { QuoteRequestFormValues } from '@features/quotes'
import ContactFooter from './ContactFooter.tsx'
import EmailLayout from './EmailLayout.tsx'
import Logo from './Logo.tsx'
import { heroTitle } from './styles.ts'

const baseUrl = process.env.EMAIL_ASSETS_BASE_URL

type QuoteConfirmationProps = {
  data: QuoteRequestFormValues
}

const QuoteConfirmationEmail = ({ data }: QuoteConfirmationProps) => {
  return (
    <EmailLayout>
      <Logo />
      <Row>
        <Column>
          <Heading style={heroTitle}>We got your request!</Heading>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text>Hi {data.firstName},</Text>
          <Text>
            We're currently tidying up your quote and will have a clean estimate
            in your inbox shortly.
          </Text>
        </Column>
        <Column>
          <Img
            src={`${baseUrl}/empire-girl.png`}
            alt="Empire Cleaning Girl"
            height="150"
            style={{ paddingLeft: '1rem' }}
          />
        </Column>
      </Row>
      <ContactFooter />
    </EmailLayout>
  )
}

QuoteConfirmationEmail.PreviewProps = {
  data: {
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
} as QuoteConfirmationProps

export default QuoteConfirmationEmail
