import { toCurrencyFormat } from '#/utils'
import { Column, Heading, Row, Section, Text } from '@react-email/components'
import type { Quote, QuoteFormValues } from '@features/quotes'
import ContactFooter from './ContactFooter.tsx'
import EmailLayout from './EmailLayout.tsx'
import Logo from './Logo.tsx'

// if you need a button to link back to the app
// const appBaseUrl = process.env.APP_BASE_URL
const nospace = {
  margin: 0,
  padding: 0,
}
const itemText = {
  ...nospace,
  fontSize: '1rem',
}
const itemQty = {
  ...itemText,
}
const itemName = {
  ...itemText,
}
const itemDescription = {
  ...itemText,
  color: 'gray',
}
const itemPrice = {
  ...itemText,
}
const quoteItem = {
  ...nospace,
  padding: '1rem 0',
}
const qtyCell = {
  width: '2rem',
}
const bottomBorder = {
  borderBottom: '1px solid #ccc',
}

function QuoteItem({
  item,
  divider,
}: {
  item: Quote['items'][number]
  divider?: boolean
}) {
  const rowStyles = divider
    ? {
        ...quoteItem,
        ...bottomBorder,
      }
    : quoteItem

  return (
    <Row style={rowStyles}>
      <Column align="left" valign="top" style={qtyCell}>
        <Text style={itemQty}>{item.qty}</Text>
      </Column>
      <Column align="left" valign="top" style={nospace}>
        <Text style={itemName}>{item.name}</Text>
        {item.description ? (
          <Text style={itemDescription}>{item.description}</Text>
        ) : null}
      </Column>
      <Column align="right" valign="top" style={nospace}>
        <Text style={itemPrice}>{toCurrencyFormat(item.price)}</Text>
      </Column>
    </Row>
  )
}

type QuoteEmailProps = {
  formValues: QuoteFormValues
  quote: Quote
  quoteNumber: number
}

const QuoteEmail = ({ formValues, quote, quoteNumber }: QuoteEmailProps) => {
  const { firstName, jobType } = formValues

  return (
    <EmailLayout>
      <Logo />
      <Row>
        <Column valign="top">
          <Text>Hi {firstName},</Text>
          <Text>
            Here's your quote for the {jobType} service you requested.
          </Text>
        </Column>
      </Row>
      <Section style={quotecontainer}>
        <Row>
          <Column style={quoteheader}>
            <Heading style={quoteHeaderText}>Quote # {quoteNumber}</Heading>
          </Column>
        </Row>
        <Row>
          <Column style={quotebody}>
            {quote.items.map((item, index) => (
              <QuoteItem
                key={`quote-item-${index}`}
                item={item}
                divider={index < quote.items.length - 1}
              />
            ))}
          </Column>
        </Row>
        <Row>
          <Column style={quotefooter}>
            <Row>
              <Column>
                <Text style={quoteFooterText}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={quoteFooterText}>
                  {toCurrencyFormat(quote.subtotal)}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={quoteFooterText}>Taxes</Text>
              </Column>
              <Column align="right">
                <Text style={quoteFooterText}>
                  {toCurrencyFormat(quote.taxes)}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={quoteTotalText}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={quoteTotalText}>
                  {toCurrencyFormat(quote.total)}
                </Text>
              </Column>
            </Row>
          </Column>
        </Row>
      </Section>
      <ContactFooter />
    </EmailLayout>
  )
}

QuoteEmail.PreviewProps = {
  quoteNumber: 1001,
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
    sqft: 0,
    rooms: [],
    addons: [],
  },
  quote: {
    items: [
      {
        description: undefined,
        name: 'Test no description',
        price: 80.5,
        qty: 1,
      },
      {
        description: 'Large',
        name: 'With Size',
        price: 50.2,
        qty: 2,
      },
      {
        description: undefined,
        name: 'Test no description',
        price: 120.99,
        qty: 3,
      },
    ],
    subtotal: 0,
    taxes: 0,
    total: 0,
  },
} as QuoteEmailProps

const quotecontainer = {
  border: '1px solid gray',
  borderRadius: '12px',
}

const quoteheader = {
  padding: '1rem',
  borderBottom: '1px solid gray',
}

const quotebody = {
  padding: '1rem',
}

const quotefooter = {
  padding: '1rem',
  borderTop: '1px solid gray',
}

const quoteHeaderText = {
  margin: 0,
  padding: 0,
  fontSize: '1.2rem',
}

const quoteFooterText = {
  margin: 0,
  padding: 0,
}

const quoteTotalText = {
  fontWeight: 'bold',
  margin: 0,
  padding: 0,
}

export default QuoteEmail
