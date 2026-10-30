import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Preciso ter conhecimento prévio ou especialização para participar?',
      a: 'Não! O curso foi desenhado exatamente com foco nos "Primeiros Passos: O que fazer primeiro". A linguagem é clara, acolhedora e 100% prática, feita para quem está em sala de aula hoje e precisa de estratégias que funcionem imediatamente.'
    },
    {
      q: 'Vai ter certificação?',
      a: 'Sim, terá um certificado de participação com carga horária de 4 horas.'
    },
    {
      q: 'Qual o endereço e horário exato do evento em Americana/SP?',
      a: 'A oficina acontecerá no sábado, dia 14/11 (14 de novembro), das 8h30 às 12h30 (4 horas presenciais intensivas) na Rua Belém, 242 - Jd Nossa Senhora de Fátima, Americana/SP. O endereço e orientações são enviados para o seu WhatsApp logo após a reserva.'
    },
    {
      q: 'Como realizo o pagamento do valor promocional de R$ 97,00?',
      a: 'Não precisa aguardar! Basta preencher seus dados no formulário aqui mesmo na página e clicar no botão: você já será direcionado automaticamente para a página de pagamento seguro. Lembrando que são apenas 20 vagas disponíveis no 1° lote.'
    },
    {
      q: 'Vou receber material durante o evento?',
      a: 'Sim! Você receberá checklists práticos de observação do comportamento e de itens avaliados para utilizar diretamente na sua escola.'
    },
    {
      q: 'Sou profissional de apoio / cuidador / estagiário. Essa oficina é para mim?',
      a: 'Totalmente! Profissionais de apoio escolar e mediadores são um dos pilares mais importantes na inclusão do aluno com TEA. A oficina trará ferramentas práticas para lidar com desregulações, rotina e autonomia do estudante.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#68C9EA] bg-[#68C9EA]/15 text-[#0277BD] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dúvidas Frequentes</span>
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#23201D]">
            Perguntas & Respostas
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#606060]">
            Tudo o que você precisa esclarecer antes de confirmar sua inscrição.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="border border-[#E5DFD5] rounded-2xl bg-[#FAF7F2] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                >
                  <span className="font-semibold text-xs sm:text-sm text-[#23201D] leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#56C45F] text-white'
                        : 'bg-white border border-[#E5DFD5] text-[#606060]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#606060] leading-relaxed border-t border-[#E5DFD5]/50 bg-white/70">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
