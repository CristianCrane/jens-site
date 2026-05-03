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
        <Column valign="top">
          <Heading style={heroTitle}>We got your quote request!</Heading>
          <Text>Hi {data.firstName},</Text>
          <Text>
            We're reviewing the details of your quote and will get back to you
            shortly.
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
