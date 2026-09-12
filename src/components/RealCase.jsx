import VideoCase from "./VideoCase"

export default function RealCase() {
  return (
    <section id="real-case" className="bg-meadow py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl">
          <h2 className="font-display font-800 text-cream text-3xl sm:text-4xl leading-tight">Реальний кейс</h2>
          <p className="mt-4 font-body text-cream/90 text-xl leading-relaxed">
            Один із роликів студії — для замовника.
          </p>
        </div>

        <VideoCase />
      </div>
    </section>
  )
}
