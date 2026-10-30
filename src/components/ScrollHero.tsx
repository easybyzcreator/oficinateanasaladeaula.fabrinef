import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Award, ArrowRight } from 'lucide-react';

interface ScrollHeroProps {
  onReserveClick: () => void;
}

export const ScrollHero: React.FC<ScrollHeroProps> = ({ onReserveClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive scroll-driven motion for the girl's colorful hands & body
  const scrollParallax = Math.min(scrollY * 0.18, 70);
  const handWobble = Math.sin(scrollY * 0.012) * 5;
  const handScale = 1 + Math.min(scrollY * 0.0004, 0.06);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-20 sm:pt-28 pb-10 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#F7F2E8] via-[#FAF7F2] to-[#FAF7F2]"
    >
      {/* Ambient decorative background brand glows */}
      <div className="absolute top-10 left-10 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#68C9EA]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#F9DC3F]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#FA4E74]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-[#56C45F]/15 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* DESKTOP LAYOUT (2 Columns) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Column Left: Text Content & Actions */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5DFD5] shadow-2xs mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56C45F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#56C45F]"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#606060]">
                Oficina Presencial Exclusiva · 4 Horas Imersivas
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#23201D] leading-[1.12]">
              TEA na Sala de Aula:
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#23201D] via-[#855D1E] to-[#C59E41] font-display italic font-normal">
                E agora, professor?
              </span>
            </h1>

            {/* Sub-headline Pill */}
            <div className="mt-3 sm:mt-4 inline-block">
              <span className="text-base lg:text-lg font-semibold text-[#FA4E74] bg-[#FA4E74]/10 px-3.5 py-1.5 rounded-xl border border-[#FA4E74]/20">
                Primeiros passos: o que fazer primeiro
              </span>
            </div>

            {/* Core Hook Description */}
            <p className="mt-5 text-base lg:text-lg text-[#606060] leading-relaxed max-w-xl">
              Você tem um aluno com características de TEA e não sabe por onde começar?
              Essa oficina presencial foi criada para professores e profissionais da educação que querem agir com mais segurança nos primeiros dias, sem travar o restante da turma.
            </p>

            {/* Key Event Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F8EC] border border-[#56C45F]/30 text-[#1B5E20] font-semibold">
                <span>🗓️ Lote 1: R$ 97,00</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF7FC] border border-[#68C9EA]/40 text-[#0277BD] font-medium">
                <span>📍 Americana/SP · Presencial</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBEA] border border-[#F9DC3F]/70 text-[#855D1E] font-medium">
                <span>📜 Certificado 4h Incluso</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-8 flex items-center gap-3 w-auto">
              <button
                onClick={onReserveClick}
                className="px-7 py-4 rounded-xl bg-[#2B2825] hover:bg-[#1A1816] text-white font-semibold text-base shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Quero Garantir Minha Vaga</span>
                <ArrowRight className="w-4 h-4 text-[#F9DC3F] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#conteudo"
                className="px-5 py-4 rounded-xl bg-white/90 hover:bg-white text-[#2B2825] border border-[#E5DFD5] font-medium text-sm transition-all hover:border-[#C59E41] flex items-center justify-center gap-1.5"
              >
                <span>Ver Conteúdo</span>
                <ChevronDown className="w-4 h-4 text-[#606060]" />
              </a>
            </div>

            {/* Scarcity Note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#855D1E]">
              <span className="w-2 h-2 rounded-full bg-[#FA4E74]"></span>
              <span><strong>Apenas 20 vagas</strong> para garantir atendimento personalizado e dinâmicas práticas.</span>
            </div>
          </div>

          {/* Column Right: Full Drawing of the Girl +30% size with lively hand movement */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Atmospheric light behind girl illustration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#68C9EA]/25 via-[#F9DC3F]/20 to-[#FA4E74]/20 rounded-full blur-3xl transform scale-110 pointer-events-none" />

            {/* Container with dynamic scroll transform */}
            <div
              className="relative w-full flex flex-col items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `translateY(${-scrollParallax}px) rotate(${handWobble}deg) scale(${handScale})`,
              }}
            >
              {/* Full transparent image without any rectangle box or cropping, enlarged +30% */}
              <div className="relative w-full flex items-center justify-center animate-lively-float">
                <img
                  src={imageError ? '/public/assets/aistudio/image_e442d6e2.png' : 'https://i.ibb.co/FPRR9BM/patitour-2026-10-21-T105003-907.png'}
                  alt="Menina com mãozinhas coloridas - TEA na Sala de Aula"
                  className="w-full max-h-[640px] xl:max-h-[700px] object-contain drop-shadow-2xl select-none scale-120 transform origin-bottom"
                  onError={() => setImageError(true)}
                />

                {/* Floating Badge 1 - Top Left */}
                <div className="absolute top-4 -left-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5DFD5] shadow-lg flex items-center gap-2.5 animate-subtle-bounce">
                  <div className="w-8 h-8 rounded-xl bg-[#56C45F]/20 flex items-center justify-center text-[#2E7D32]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#23201D]">Certificado 4h</div>
                    <div className="text-[10px] text-[#606060]">Participação</div>
                  </div>
                </div>

                {/* Floating Badge 2 - Bottom Right */}
                <div className="absolute -bottom-4 right-0 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5DFD5] shadow-lg flex items-center gap-2.5 animate-subtle-bounce-delayed">
                  <div className="w-8 h-8 rounded-xl bg-[#FA4E74]/20 flex items-center justify-center text-[#D81B60]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#23201D]">Checklists Práticos</div>
                    <div className="text-[10px] text-[#606060]">Observação de conduta</div>
                  </div>
                </div>

                {/* Floating Pill - Top Right */}
                <div className="absolute top-12 -right-4 px-3 py-1 bg-[#23201D] text-white rounded-full text-xs font-bold shadow-md tracking-wider uppercase border border-white/20">
                  Apenas 20 Vagas
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (Ordered exactly as requested in Imagem 10-14) */}
        <div className="lg:hidden flex flex-col items-center text-center">
          
          {/* 1. Header Text at the Top */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DFD5] shadow-2xs mb-3 text-[11px] font-semibold text-[#606060] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#56C45F]"></span>
            <span>Oficina Presencial · 4 Horas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#23201D] leading-tight">
            TEA na Sala de Aula:
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#23201D] via-[#855D1E] to-[#C59E41] font-display italic font-normal">
              E agora, professor?
            </span>
          </h1>

          <div className="mt-2.5 inline-block">
            <span className="text-xs sm:text-sm font-semibold text-[#FA4E74] bg-[#FA4E74]/10 px-3 py-1 rounded-lg border border-[#FA4E74]/20">
              Primeiros passos: o que fazer primeiro
            </span>
          </div>

          {/* 2. Image of the Girl (Imagem 12) +30% size, centered and unboxed */}
          <div className="my-5 relative w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#68C9EA]/20 via-[#F9DC3F]/15 to-[#FA4E74]/20 rounded-full blur-2xl pointer-events-none transform scale-90" />
            
            <div
              className="relative w-full max-w-[340px] sm:max-w-[420px] transition-transform duration-200 ease-out"
              style={{
                transform: `translateY(${-scrollParallax * 0.7}px) rotate(${handWobble * 0.8}deg)`,
              }}
            >
              <img
                src={imageError ? '/public/assets/aistudio/image_e442d6e2.png' : 'https://i.ibb.co/FPRR9BM/patitour-2026-10-21-T105003-907.png'}
                alt="Menina com mãozinhas coloridas"
                className="w-full max-h-[460px] sm:max-h-[520px] object-contain drop-shadow-xl select-none"
                onError={() => setImageError(true)}
              />

              {/* Discrete mobile badge on image */}
              <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-[#23201D]/90 text-white rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20">
                Apenas 20 Vagas
              </div>
            </div>
          </div>

          {/* 3. Subtitle paragraph (Imagem 13 content) */}
          <p className="text-xs sm:text-sm text-[#606060] leading-relaxed max-w-md px-2">
            Você tem um aluno com características de TEA e não sabe por onde começar? Essa oficina presencial foi criada para professores e profissionais da educação que querem agir com mais segurança nos primeiros dias, sem travar o restante da turma.
          </p>

          {/* 4. Badges (Imagem 13) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-[#E8F8EC] border border-[#56C45F]/30 text-[#1B5E20] font-semibold">
              🗓️ Lote 1: R$ 97,00
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#EBF7FC] border border-[#68C9EA]/40 text-[#0277BD] font-medium">
              📍 Americana/SP
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#FFFBEA] border border-[#F9DC3F]/70 text-[#855D1E] font-medium">
              📜 Certificado 4h
            </span>
          </div>

          {/* 5. Primary CTA Button */}
          <div className="mt-5 w-full max-w-sm px-2">
            <button
              onClick={onReserveClick}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2B2825] active:bg-black text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Quero Garantir Minha Vaga</span>
              <ArrowRight className="w-4 h-4 text-[#F9DC3F] group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-2.5 text-[11px] text-[#855D1E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FA4E74] inline-block mr-1.5"></span>
              <strong>Apenas 20 vagas</strong> disponíveis no Lote 1.
            </div>
          </div>

        </div>

      </div>

      {/* Floating Keyframe Styles */}
      <style>{`
        @keyframes livelyFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes subtleBounceDelayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .animate-lively-float {
          animation: livelyFloat 4.5s ease-in-out infinite;
        }
        .animate-subtle-bounce {
          animation: subtleBounce 4s ease-in-out infinite;
        }
        .animate-subtle-bounce-delayed {
          animation: subtleBounceDelayed 4.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
