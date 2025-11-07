export default function LogoGridBlock({ data }: { data: any }) {
  const { title, logos = [], layout = 'grid-4' } = data
  
  const gridColsMap: Record<string, string> = {
    'grid-3': 'grid-cols-3',
    'grid-4': 'grid-cols-4',
    'grid-6': 'grid-cols-6'
  }
  const gridCols = gridColsMap[layout] || 'grid-cols-4'

  return (
    <section className="py-12">
      {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}
      <div className={`grid ${gridCols} gap-8 max-w-6xl mx-auto`}>
        {logos.map((logo: any, i: number) => (
          <div key={i} className="flex items-center justify-center p-4">
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer">
                {logo.image?.asset && (
                  <img src={logo.image.asset.url} alt={logo.name} className="max-h-16 grayscale hover:grayscale-0 transition" />
                )}
              </a>
            ) : (
              logo.image?.asset && (
                <img src={logo.image.asset.url} alt={logo.name} className="max-h-16" />
              )
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
