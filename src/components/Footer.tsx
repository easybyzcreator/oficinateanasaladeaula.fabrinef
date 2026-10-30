import React, { useState } from 'react';
import { Instagram, MapPin, Calendar, Heart, Shield, ArrowUp, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#23201D] text-white pt-14 pb-8 border-t border-[#38332E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shrink-0">
                {!logoError ? (
                  <img
                    src="https://i.ibb.co/Y7QbSxBB/logo.png"
                    alt="Logo Fabrine Fernandes"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-[#23201D] font-bold text-xs">FF</span>
                )}
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">
                  Fabrine Fernandes
                </span>
                <span className="text-xs text-[#FA4E74] block">
                  Neuropsicopedagoga Clínica e Institucional
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A196] leading-relaxed max-w-sm">
              Mais de 24 anos de experiência na educação, dedicados ao desenvolvimento humano e ao suporte acolhedor e fundamentado na ciência para professores e famílias.
            </p>

            {/* Social & Website Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/psicofabrinefernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#FA4E74] text-xs font-semibold text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@psicofabrinefernandes</span>
              </a>

              <a
                href="https://links-fabrinefernandes.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#56C45F] text-xs font-semibold text-white transition-colors"
                title="Acessar links da Fabrine Fernandes"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>links-fabrinefernandes.vercel.app</span>
              </a>
            </div>
          </div>

          {/* Event Quick Summary */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F9DC3F]">
              Oficina Presencial
            </h4>
            <div className="space-y-2 text-xs text-[#C5BDB2]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#56C45F] shrink-0" />
                <span>14/11 · Sábado das 8h30 às 12h30</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#68C9EA] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Rua Belém, 242 - Jd Nossa Senhora de Fátima</span>
                  <span className="text-[#A8A196]">Americana / SP (Presencial 4h)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#FA4E74] shrink-0" />
                <span>Certificado de participação de 4 horas incluso</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F9DC3F] mb-3">
                Navegação
              </h4>
              <ul className="space-y-2 text-xs text-[#C5BDB2]">
                <li>
                  <a href="#sobre-evento" className="hover:text-white transition-colors">Sobre a Oficina</a>
                </li>
                <li>
                  <a href="#conteudo" className="hover:text-white transition-colors">O que você vai levar</a>
                </li>
                <li>
                  <a href="#palestrante" className="hover:text-white transition-colors">Sobre a Fabrine</a>
                </li>
                <li>
                  <a href="#inscricao" className="hover:text-[#56C45F] transition-colors font-semibold">Formulário de Inscrição</a>
                </li>
              </ul>
            </div>

            <div className="pt-4 md:pt-0">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-[#A8A196] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Voltar ao topo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desenvolvido por Section (as in Imagem 1) */}
        <div className="py-6 flex flex-col items-center justify-center text-center border-b border-white/10">
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#8C857B] mb-2">
            DESENVOLVIDO POR
          </span>
          <a
            href="https://www.easybyzcreator.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center group transition-transform hover:scale-105"
            title="Easy Byz Creator - www.easybyzcreator.com"
          >
            <img
              src="https://raw.githubusercontent.com/easybyzcreator/imagens/c7b535d4591af80294baeedd0b16e87bc4b3e315/logo%20easy%20byz%20-%20fundo%20transparente.png"
              alt="Logo Easy Byz Creator"
              className="h-16 sm:h-20 w-auto object-contain transition-all group-hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C857B]">
          <div>
            © {new Date().getFullYear()} Fabrine Fernandes · Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-[#8C857B]">
            <span>Desenvolvido com carinho para educadores</span>
            <Heart className="w-3 h-3 text-[#FA4E74] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
