import { Epilogue } from '@/components/home/epilogue'
import { Hero } from '@/components/home/hero'
import { Prologue } from '@/components/home/prologue'
import { Scene } from '@/components/home/scene'
import { ScrollDriver } from '@/components/home/scroll-driver'
import { destinations } from '@/lib/data/destinations'

export default function Page() {
  return (
    <>
      <ScrollDriver />
      <main>
        <Hero />
        <Prologue destinations={destinations} />
        {destinations.map((destination, index) => (
          <Scene
            key={destination.id}
            destination={destination}
            index={index}
            total={destinations.length}
          />
        ))}
        <Epilogue />
      </main>
    </>
  )
}
