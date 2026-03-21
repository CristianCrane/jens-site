import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/Header/Header.tsx'
import Hero from '#/components/Hero/Hero.tsx'
import Services from '#/components/Services/Services.tsx'
import Reviews from '#/components/Reviews/Reviews.tsx'
import { Box } from '@mantine/core'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Reviews />
      <Box h="20rem" />
    </>
  )
}
