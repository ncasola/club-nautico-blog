import Image from "next/image"
import { getRandomSeaImage } from "@/lib/random_image"

export default async function Hero() {
  const backgroundImage = await getRandomSeaImage()

  return (
    <div className="relative overflow-hidden h-[60vh] md:h-[70vh] lg:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "https://placehold.co/600x400"}
          alt="Mar y océano"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-slate-800/80"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-blue-600/10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 shadow-lg">
              <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={64} height={64} className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">Club Náutico</h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100 mb-6 drop-shadow-xl">
            Puertito de Güímar
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Contigo desde 1970 • Fomentando la hermandad, el respeto y la pasión por el deporte y el mar
          </p>

          {/* Decorative wave */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </div>
  )
}
