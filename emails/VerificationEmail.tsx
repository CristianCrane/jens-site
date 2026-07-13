import { Button, Column, Heading, Row, Text } from '@react-email/components'
import EmailLayout from './EmailLayout.tsx'
import Logo from './Logo.tsx'
import { button, heroTitle } from './styles.ts'

type VerificationEmailProps = {
  url: string
}

const VerificationEmail = ({ url }: VerificationEmailProps) => {
  return (
    <EmailLayout>
      <Logo />
      <Row>
        <Column>
          <Heading style={heroTitle}>You're signed up!</Heading>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text>
            We just need to make sure this email address is squeaky clean. Click
            below to verify your account, and let’s get rolling:
          </Text>
        </Column>
      </Row>
      <Row>
        <Column align="center">
          <Button href={url} style={button}>
            Verify Email
          </Button>
        </Column>
      </Row>
    </EmailLayout>
  )
}

VerificationEmail.PreviewProps = {
  url: '',
  name: 'Cristian',
}

export default VerificationEmail
