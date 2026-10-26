import { Gastronomy } from '@/components/home/gastronomy'
import { BackLink } from '@/components/sections/back-link'

export default function GastronomiaPage() {
  return (
    <div className="relative">
      <BackLink />
      <Gastronomy />
    </div>
  )
}
