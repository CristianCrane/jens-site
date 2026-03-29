import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/Header/Header.tsx'
import Hero from '#/components/Hero/Hero.tsx'
import Services from '#/components/Services/Services.tsx'
import Reviews from '#/components/Reviews/Reviews.tsx'
import ServiceAreas from '#/components/ServiceAreas/ServiceAreas.tsx'
import Footer from '#/components/Footer/Footer.tsx'
import CTA from '#/components/CTA/CTA.tsx'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Reviews />
      <ServiceAreas />
      <CTA />
      <Footer />
    </>
  )
}
