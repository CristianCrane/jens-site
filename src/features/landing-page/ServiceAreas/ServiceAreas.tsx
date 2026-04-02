import Section from '#/components/Section/Section.tsx'
import { Text } from '@mantine/core'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const defaultCenter = {
  lat: 40.751685264975706,
  lng: -73.7815204634284,
}

const mapStyles = {
  width: '100%',
  height: '400px',
  borderRadius: '1.8rem',
}

function Map() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  )
}

export default function ServiceAreas() {
  return (
    <Section title="Service Areas">
      <Text c="gray" pb="md">
        We provide professional cleaning services throughout Queens and Long
        Island, with extended coverage available across Brooklyn and NYC.
      </Text>
      <Map />
    </Section>
  )
}
