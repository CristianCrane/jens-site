import CTA from './CTA/CTA.tsx'
import Hero from './Hero/Hero.tsx'
import Reviews from './Reviews/Reviews.tsx'
import ServiceAreas from './ServiceAreas/ServiceAreas.tsx'
import Services from './Services/Services.tsx'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Reviews />
      <ServiceAreas />
      <CTA />
    </>
  )
}
