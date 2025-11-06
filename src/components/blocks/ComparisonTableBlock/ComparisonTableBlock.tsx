export default function ComparisonTableBlock({ data }: { data: any }) {
  const { title, description } = data || {}

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {description && <p className="text-lg text-center text-gray-600">{description}</p>}
      </div>
    </section>
  )
}
