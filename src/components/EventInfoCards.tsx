import React from 'react';
import { Award, MapPin, Clock, Tag, CheckCircle2 } from 'lucide-react';

export const EventInfoCards: React.FC = () => {
  return (
    <section id="sobre-evento" className="py-12 sm:py-16 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#56C45F] bg-[#56C45F]/10 px-3 py-1 rounded-full">
            Informações Oficiais do Evento
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#23201D]">
            Tudo o que você precisa saber para participar
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#606060]">
            Uma manhã inteira de imersão prática para transformar sua conduta pedagógica com alunos no espectro autista.
          </p>
        </div>

        {/* 3 Prominent Event Cards matching the flyer design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Lote 1 / Valor */}
          <div className="relative group bg-[#E8F8EC] border-2 border-[#56C45F]/40 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#56C45F] text-white flex items-center justify-center shadow-sm">
                <Tag className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] bg-white/80 px-2.5 py-1 rounded-full border border-[#56C45F]/30">
                1º Lote Aberto
              </span>
            </div>
            
            <div className="text-sm font-semibold text-[#606060] line-through">
              De R$ 397,00
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-[#2E7D32]">Por</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1B5E20] tracking-tight">
                R$ 97,00
              </span>
            </div>
            <div className="mt-2 text-xs font-medium text-[#2E7D32] bg-[#56C45F]/15 rounded-lg px-2.5 py-1.5 flex items-center justify-between">
              <span>Economia de R$ 300,00 no 1° lote</span>
              <span className="text-[10px] font-bold text-[#FA4E74]">APENAS 20 VAGAS</span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#405643] leading-relaxed">
              Valor promocional de lançamento com vaga garantida na turma presencial e acesso aos materiais práticos. Pagamento via cartão de crédito.
            </p>
          </div>

          {/* Card 2: Certificado 4h + Checklists */}
          <div className="relative group bg-[#FFFBEA] border-2 border-[#F9DC3F]/70 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C59E41] text-white flex items-center justify-center shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#855D1E] bg-white/80 px-2.5 py-1 rounded-full border border-[#F9DC3F]">
                Incluso
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#423113] tracking-tight leading-snug">
              Certificado 4h + Checklists Práticos
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#664E24]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59E41] shrink-0 mt-0.5" />
                <span>Certificado oficial de participação de 4 horas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59E41] shrink-0 mt-0.5" />
                <span>Checklists de observação do comportamento</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59E41] shrink-0 mt-0.5" />
                <span>Checklists práticos de itens avaliados em sala</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Data, Horário e Endereço Oficial */}
          <div className="relative group bg-[#EBF7FC] border-2 border-[#68C9EA]/50 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0288D1] text-white flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0277BD] bg-white/80 px-2.5 py-1 rounded-full border border-[#68C9EA]/40">
                Presencial
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0D47A1] tracking-tight leading-snug">
              14/11 · Sábado
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#01579B]">
              <Clock className="w-4 h-4 text-[#0288D1]" />
              <span>8h30 às 12h30 (4h imersivas)</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#68C9EA]/30 text-xs sm:text-sm text-[#0D47A1]">
              <div className="font-bold text-[#0D47A1] uppercase tracking-wide text-[11px]">Endereço da Oficina:</div>
              <div className="font-semibold text-[#01579B] text-sm mt-1">
                Rua Belém, 242 - Jd Nossa Senhora de Fátima
              </div>
              <div className="text-[12px] text-[#0277BD] mt-0.5">
                Americana / SP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
