import { Button, Column, Heading, Row, Text } from '@react-email/components'
import EmailLayout from './EmailLayout.tsx'
import Logo from './Logo.tsx'
import { button, heroTitle } from './styles.ts'

type PasswordResetProps = {
  url: string
}

const PasswordResetEmail = ({ url }: PasswordResetProps) => {
  return (
    <EmailLayout>
      <Logo />
      <Row>
        <Column>
          <Heading style={heroTitle}>Reset password</Heading>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text>Click the link below to reset your password.</Text>
        </Column>
      </Row>
      <Row>
        <Column align="center">
          <Button href={url} style={button}>
            Reset password
          </Button>
        </Column>
      </Row>
    </EmailLayout>
  )
}

PasswordResetEmail.PreviewProps = {
  url: '',
  name: 'Cristian',
}

export default PasswordResetEmail
