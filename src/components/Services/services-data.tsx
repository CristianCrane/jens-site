import type { ReactNode } from 'react'
import {
  IconBuilding,
  IconBulldozer,
  IconHome,
  IconHomeMove,
  IconSparkles,
  IconWiperWash,
} from '@tabler/icons-react'

type ServiceData = {
  icon: ReactNode
  title: string
  description: string
}

const services: ServiceData[] = [
  {
    icon: <IconHome />,
    title: 'Residential Cleaning',
    description:
      'Transform your living spaces with our professional residential cleaning services, delivering meticulous care for a spotless and refreshing home environment.',
  },
  {
    icon: <IconBuilding />,
    title: 'Commercial Cleaning',
    description:
      'Enhance workplace hygiene and presentation with our expert commercial cleaning services, ensuring your business environment reflects the highest standards of cleanliness and professionalism.',
  },
  {
    icon: <IconBulldozer />,
    title: 'Post Construction Cleaning',
    description:
      'Our professional cleaning services ensure a pristine and safe environment after construction, leaving your space ready for occupancy.',
  },
  {
    icon: <IconHomeMove />,
    title: 'Move in & Move out Cleaning',
    description:
      'Seamless transitions start with our move-in and move-out cleaning services. We ensure a spotless space, setting the stage for a fresh start or a smooth departure.',
  },
  {
    icon: <IconSparkles />,
    title: 'Deep Cleaning',
    description:
      'Take your cleanliness to the next level with our professional Deep Cleaning services, leaving no corner or crevice untouched.',
  },
  {
    icon: <IconWiperWash />,
    title: 'Power Washing',
    description:
      'Restore surfaces to their prime with our professional power washing services. We bring a high-pressure touch to eliminate grime, mold, and dirt, renewing the beauty of your property.',
  },
]

export default services
