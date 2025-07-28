"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home } from "lucide-react"
import Image from "next/image"
import { ThemeSwitch } from "@/components/theme-switch"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
  ]

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-background rounded-full p-2 border border-border">
              <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={24} height={24} className="w-6 h-6" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-foreground">Club Náutico</span>
              <span className="text-sm text-muted-foreground block">Puertito de Güímar</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <ThemeSwitch />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-md">
              <div className="flex items-center space-x-2 mb-8">
                <div className="bg-background rounded-full p-2 border border-border">
                  <Image src="/logotipo.png" alt="Club Náutico Puertito de Güímar" width={24} height={24} className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-bold text-foreground">Club Náutico</span>
                  <span className="text-sm text-muted-foreground block">Puertito de Güímar</span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="flex items-center space-x-3 py-2">
                  <ThemeSwitch />
                  <span className="text-foreground font-medium">Cambiar tema</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
