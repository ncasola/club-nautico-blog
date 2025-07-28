import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white rounded-full p-2 border border-gray-200">
                <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={24} height={24} className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold">Club Náutico</span>
                <span className="text-sm text-slate-300 block">Puertito de Güímar</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Contigo desde 1970. Fomentando la hermandad, el respeto y la pasión por el deporte y el mar.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <div className="space-y-2">
              <a href="https://nauticoguimar.com/" className="block text-slate-300 hover:text-white transition-colors">
                Club Náutico Puertito de Güímar
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Club Náutico Puertito de Güímar. Todos los derechos reservados.</p>
          <p>Desarrollado por <a href="https://ncasolajimenez.es" className="text-slate-300 hover:text-white transition-colors">Nestor Casola Jiménez</a></p>
        </div>
      </div>
    </footer>
  )
}
