import { Link } from '@tanstack/react-router'
import { Image } from '@mantine/core'

export default function Logo() {
  return (
    <Link to="/">
      <Image
        src="/empire-cleaning-and-pro-services-logo-transparent.png"
        alt="Empire Cleaning & Pro Services Inc. Logo"
        h={60}
      />
    </Link>
  )
}
