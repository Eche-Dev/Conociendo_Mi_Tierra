export type Destination = {
  id: string
  name: string
  tagline: string
  region: string
  coords: string
  image: string
  alt: string
  description: string
  facts: { label: string; value: string }[]
  history: string[]
}
