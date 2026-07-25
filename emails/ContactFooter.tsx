import { Column, Hr, Link, Row, Text } from 'react-email'
import { link } from './styles.ts'

const footerText = {
  fontSize: '0.8rem',
  color: '#555',
}

export default function ContactFooter() {
  return (
    <>
      <Hr style={{ borderTop: '1px solid #999', margin: '2rem 0 0 0' }} />
      <Row>
        <Column align="center">
          <Text style={footerText}>
            <strong>Questions?</strong> Contact us at{' '}
            <Link style={link} href="tel:+16463209076">
              (646) 320-9076
            </Link>{' '}
            or{' '}
            <Link style={link} href="mailto:contact@empirecleaningandpro.com">
              contact@empirecleaningandpro.com
            </Link>
          </Text>
        </Column>
      </Row>
    </>
  )
}
