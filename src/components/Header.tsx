import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';


interface HeaderProps {
  onOpenSheetsModal?: () => void;
  registrationsCount?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E5DFD5]/80 py-2.5'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white shadow-xs p-1 border border-[#E8E1D5] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0">
            {!logoError ? (
              <img
                src="https://i.ibb.co/Y7QbSxBB/logo.png"
                alt="Fabrine Fernandes Logo"
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#68C9EA] via-[#56C45F] to-[#FA4E74] flex items-center justify-center text-white font-bold text-xs">
                FF
              </div>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#2B2825] leading-tight flex items-center gap-1.5">
              Fabrine Fernandes
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#56C45F]"></span>
            </span>
            <span className="text-[11px] sm:text-xs text-[#606060] font-normal tracking-wide">
              Neuropsicopedagoga
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#606060]">
          <a
            href="#sobre-evento"
            className="hover:text-[#2B2825] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#C59E41] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Sobre a Oficina
          </a>
          <a
            href="#conteudo"
            className="hover:text-[#2B2825] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#56C45F] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            O que você vai levar
          </a>
          <a
            href="#palestrante"
            className="hover:text-[#2B2825] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#FA4E74] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Sobre a Fabrine
          </a>
          <a
            href="#investimento"
            className="hover:text-[#2B2825] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#68C9EA] after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Investimento
          </a>
        </nav>


        {/* Action Controls & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#inscricao"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2B2825] hover:bg-[#1A1816] rounded-xl shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Garantir Vaga</span>
            <span className="text-[11px] font-normal text-[#F9DC3F] bg-white/10 px-1.5 py-0.5 rounded-md">
              R$ 97
            </span>
          </a>

          {/* Mobile Menu Button on the top right */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#E5DFD5] text-[#2B2825] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-xs">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#FAF7F2] border-b border-[#E5DFD5] shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#2B2825]">
            <a
              href="#sobre-evento"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              Sobre a Oficina
            </a>
            <a
              href="#conteudo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              O que você vai levar
            </a>
            <a
              href="#palestrante"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              Sobre a Fabrine
            </a>
            <a
              href="#investimento"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              Investimento (R$ 97,00)
            </a>
            <a
              href="#inscricao"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#2B2825] text-white text-center font-semibold text-sm shadow-md"
            >
              Garantir Minha Vaga (Lote 1)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
