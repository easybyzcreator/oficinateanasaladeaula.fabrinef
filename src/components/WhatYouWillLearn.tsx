import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const WhatYouWillLearn: React.FC = () => {
  const topics = [
    {
      title: 'Características que mais aparecem na escola',
      desc: 'Como identificar os sinais centrais do TEA no ambiente escolar sem rotular, compreendendo as particularidades cognitivas e socioemocionais do aluno.',
      color: 'border-[#68C9EA]/40 bg-[#F0F9FD]',
      badge: 'Identificação Precoce'
    },
    {
      title: 'Diferença entre birra, desregulação e sobrecarga sensorial',
      desc: 'O divisor de águas na prática pedagógica: como distinguir crises sensoriais de comportamentos oposicionais e qual a conduta imediata para cada situação.',
      color: 'border-[#FA4E74]/40 bg-[#FFF0F3]',
      badge: 'Manejo de Crise'
    },
    {
      title: 'Estratégias práticas de rotina visual e manejo',
      desc: 'Ferramentas táteis e visuais testadas na prática que trazem previsibilidade, reduzem a ansiedade do aluno e mantêm o ritmo harmonioso da turma inteira.',
      color: 'border-[#56C45F]/40 bg-[#F0FAF1]',
      badge: 'Prática de Sala'
    },
    {
      title: 'Estudo de caso: o que é e para que serve?',
      desc: 'Análise de situações reais vivenciadas no cotidiano escolar. Como documentar, compartilhar com a equipe e desenhar intervenções sob medida.',
      color: 'border-[#F9DC3F]/70 bg-[#FFFDF0]',
      badge: 'Aplicação Real'
    },
    {
      title: 'Checklist de observação de comportamentos',
      desc: 'Instrumento prático e pronto para você levar para a sua escola, facilitando o diálogo com a coordenação, família e profissionais de suporte.',
      color: 'border-[#C59E41]/50 bg-[#FBF7EE]',
      badge: 'Material Exclusivo'
    }
  ];

  return (
    <section id="conteudo" className="py-14 sm:py-20 bg-white relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9DC3F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#68C9EA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4E74]/10 text-[#FA4E74] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Conteúdo 100% Prático e Aplicável</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#23201D] leading-tight">
            O que você vai levar daqui:
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#606060]">
            Sem teorias distantes da realidade da sala de aula. Saia da oficina com segurança e clareza sobre os primeiros passos.
          </p>
        </div>

        {/* Text-focused Cards Grid (No numbers, No icons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-7 border-2 ${topic.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="mb-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#606060]">
                    {topic.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#23201D] tracking-tight leading-snug mb-3">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#505050] leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 text-[11px] font-medium text-[#707070]">
                <span>Foco em aplicação imediata na escola</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Call to Action Card in the grid */}
          <div className="relative rounded-3xl p-6 sm:p-7 bg-[#23201D] text-white flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FA4E74] text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                Apenas 20 Vagas
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Chega de se sentir inseguro diante de um novo aluno com TEA
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed">
                Aprenda a conduzir sua turma com acolhimento, estrutura e resultados visíveis no desenvolvimento das crianças.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="#inscricao"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#56C45F] hover:bg-[#48B051] text-white font-semibold text-sm transition-all shadow-md group"
              >
                <span>Inscrever-se no Lote 1</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
