import { ChapterNav } from '@/components/home/chapter-nav'
import { Epilogue } from '@/components/home/epilogue'
import { Hero } from '@/components/home/hero'
import { Prologue } from '@/components/home/prologue'
import { Scene } from '@/components/home/scene'
import { ScrollDriver } from '@/components/home/scroll-driver'
import { Spirituality } from '@/components/home/spirituality'
import { destinations } from '@/lib/data/destinations'

export default function Page() {
  const chapters = destinations.map(({ id, name }) => ({ id, name }))

  return (
    <>
      <ScrollDriver />
      <ChapterNav chapters={chapters} />
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
        <Spirituality />
        <Epilogue />
      </main>
    </>
  )
}
