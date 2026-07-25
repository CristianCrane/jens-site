import { Column, Img, Row } from 'react-email'

const baseUrl = process.env.EMAIL_ASSETS_BASE_URL

export default function Logo() {
  return (
    <Row>
      <Column align="center">
        <Img
          src={`${baseUrl}/empire-cleaning-and-pro-services-logo-transparent.png`}
          alt="Empire Cleaning and Pro Services Logo"
          width="200"
          style={{ marginBottom: '2rem' }}
        />
      </Column>
    </Row>
  )
}
