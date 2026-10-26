export function InfoCard({ title, text, image }: { title: string; text: string; image?: string }) {
  return (
    <article className="overflow-hidden border border-foreground/15 bg-card/50">
      {image && (
        <img
          src={image}
          alt={`Paisaje relacionado con ${title}`}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-6 md:p-8">
        <h2 className="font-display text-3xl uppercase text-primary">{title}</h2>
        <p className="mt-4 leading-relaxed text-foreground/70">{text}</p>
      </div>
    </article>
  )
}
