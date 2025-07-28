import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl p-12 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100/80 rounded-full p-4">
              <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={64} height={64} className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Página no encontrada</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida. Te invitamos a explorar nuestras últimas
            noticias y actividades.
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
