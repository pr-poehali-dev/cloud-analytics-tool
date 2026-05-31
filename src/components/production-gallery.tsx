const photos = [
  {
    url: "https://cdn.poehali.dev/projects/6f691d2a-edcd-41eb-89ca-287319fe4ba9/bucket/c00822bf-f953-49a1-bc26-7003cb708ae0.jpg",
    alt: "Команда Контракт Кофе",
    caption: "Наша команда",
    wide: true,
  },
  {
    url: "https://cdn.poehali.dev/projects/6f691d2a-edcd-41eb-89ca-287319fe4ba9/bucket/9cde25e6-a621-4e59-9f7e-1e8f859e2040.jpg",
    alt: "Цех обжарки кофе",
    caption: "Цех обжарки",
    wide: false,
  },
  {
    url: "https://cdn.poehali.dev/projects/6f691d2a-edcd-41eb-89ca-287319fe4ba9/bucket/5610638a-2ed7-4a04-9eda-ee4614fe1be3.jpg",
    alt: "Склад зелёного кофе",
    caption: "Склад зерна",
    wide: false,
  },
  {
    url: "https://cdn.poehali.dev/projects/6f691d2a-edcd-41eb-89ca-287319fe4ba9/bucket/4c53bebd-3f20-486e-9e9e-62be2d30180e.jpg",
    alt: "Посещение кофейной плантации",
    caption: "Прямые поставки с плантаций",
    wide: false,
  },
]

export function ProductionGallery() {
  return (
    <section className="w-full px-5 py-8 md:py-16">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 pb-4">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight">
            Наше производство
          </h2>
          <p className="text-center text-muted-foreground text-base md:text-lg font-medium max-w-[580px]">
            Современное оборудование, опытная команда и прямые контракты с плантациями — гарантия стабильного качества
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wide photo — full width */}
          <div className="md:col-span-2 relative overflow-hidden rounded-2xl group">
            <img
              src={photos[0].url}
              alt={photos[0].alt}
              className="w-full h-[320px] md:h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
            <span className="absolute bottom-5 left-6 text-white text-base font-medium">{photos[0].caption}</span>
          </div>

          {/* Three smaller photos */}
          {photos.slice(1).map((photo) => (
            <div key={photo.alt} className="relative overflow-hidden rounded-2xl group">
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-[220px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
              <span className="absolute bottom-4 left-5 text-white text-sm font-medium">{photo.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
