import React from 'react';
import { Check, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="investimento" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Eyebrow */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#56C45F] bg-[#56C45F]/10 px-3 py-1 rounded-full inline-block">
              Investimento Acessível
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA4E74] bg-[#FA4E74]/10 border border-[#FA4E74]/20 px-3 py-1 rounded-full inline-block">
              APENAS 20 VAGAS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#23201D]">
            Garanta sua vaga no Lote 1 Promocional
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#606060] max-w-xl mx-auto">
            Criamos uma condição especial para que nenhum educador de Americana e região fique sem ferramentas para o ano letivo.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE2] border-2 border-[#E5DFD5] p-6 sm:p-10 shadow-xl overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-[#56C45F] to-[#48B051] text-white text-xs font-bold px-6 py-2 rounded-bl-2xl shadow-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>75% de Desconto no Lote 1</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 md:pt-0">
            {/* Left: Value & Price */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#606060]">
                  Ingresso Individual · Presencial
                </span>
                <span className="text-[10px] font-bold text-[#FA4E74] bg-[#FA4E74]/15 px-2 py-0.5 rounded-md">
                  APENAS 20 VAGAS
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-base sm:text-lg text-[#606060] line-through font-semibold">
                  De R$ 397,00
                </span>
                <span className="text-xs font-bold text-[#E53935] bg-[#FFEBEE] px-2 py-0.5 rounded-md">
                  Economize R$ 300
                </span>
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm sm:text-base font-bold text-[#606060]">por apenas</span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#23201D] tracking-tight">
                  R$ 97
                  <span className="text-2xl font-bold text-[#606060]">,00</span>
                </span>
              </div>

              <p className="mt-2 text-xs font-medium text-[#2E7D32] bg-[#E8F8EC] border border-[#56C45F]/30 px-3 py-1.5 rounded-lg inline-block">
                Pagamento via cartão de crédito.
              </p>

              {/* Urgency indicator */}
              <div className="mt-6 flex items-center gap-2 p-3 bg-white/80 border border-[#E5DFD5] rounded-xl text-xs text-[#855D1E]">
                <AlertCircle className="w-4 h-4 text-[#C59E41] shrink-0" />
                <span>
                  <strong>Apenas 20 vagas disponíveis no Lote 1</strong> para garantir dinâmicas práticas e atenção individualizada.
                </span>
              </div>
            </div>

            {/* Right: What's included checklist */}
            <div className="md:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DFD5] shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201D] mb-4">
                O que está 100% incluso:
              </h4>

              <ul className="space-y-3 text-xs sm:text-sm text-[#4A4A4A]">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#56C45F]/20 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>4 horas de imersão presencial</strong> (8h30 às 12h30)</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#56C45F]/20 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Certificado de participação de 4 horas</strong></span>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#56C45F]/20 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Checklists de observação do comportamento</strong></span>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#56C45F]/20 text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Checklists práticos de itens avaliados</strong> para sala de aula</span>
                </li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={onSelectPlan}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2B2825] hover:bg-[#1A1816] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Preencher Formulário de Reserva</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#F9DC3F]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
