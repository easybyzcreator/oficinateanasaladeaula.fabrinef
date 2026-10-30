import React, { useState } from 'react';
import { Award, Instagram, ShieldCheck, Users, Heart } from 'lucide-react';

export const AboutFabrine: React.FC = () => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="palestrante" className="py-10 sm:py-14 bg-[#FAF7F2] relative border-y border-[#EAE3D5]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Compact 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Photo & Credential Badge (Compact) */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[260px] bg-white p-2.5 rounded-2xl border border-[#E5DFD5] shadow-md">
              <div className="relative rounded-xl overflow-hidden aspect-[4/4.8] bg-[#FAF7F2]">
                <img
                  src={photoError ? '/public/assets/aistudio/image_a998c685.png' : 'https://i.ibb.co/Xv162dT/fabrine.png'}
                  alt="Fabrine Fernandes - Neuropsicopedagoga"
                  className="w-full h-full object-cover object-top"
                  onError={() => setPhotoError(true)}
                />
              </div>

              <div className="mt-2.5 p-2 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C59E41]/15 text-[#C59E41] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#23201D] leading-tight">
                    Fabrine Fernandes
                  </h4>
                  <p className="text-[10px] text-[#606060]">
                    Neuropsicopedagoga · ABPp 1242
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/psicofabrinefernandes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E5DFD5] text-[#FA4E74] hover:text-white hover:bg-[#FA4E74] text-[11px] font-semibold transition-all shadow-2xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@psicofabrinefernandes</span>
            </a>
          </div>

          {/* Bio & Pillars (Concise & Conversion-focused) */}
          <div className="md:col-span-8 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C59E41] bg-[#C59E41]/10 px-2.5 py-1 rounded-full inline-block">
              Ministrante da Oficina
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#23201D] font-display">
              Uma trajetória dedicada ao desenvolvimento humano <span className="italic font-normal text-[#C59E41]">e à aprendizagem</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#505050] leading-relaxed">
              Mãe coruja da Júlia e do Júlio, palestrante e Neuropsicopedagoga Clínica e Institucional com mais de <strong className="text-[#23201D]">24 anos de experiência em educação</strong>. Acredita que, mais do que rótulos ou diagnósticos, a missão é com pessoas e com o potencial de cada aluno em sala de aula.
            </p>

            <p className="text-xs sm:text-sm text-[#606060] leading-relaxed">
              Ampla formação em <strong className="text-[#23201D]">Educação Inclusiva, AEE, ABA, TDAH, Dislexia</strong> e Sistema de Avaliação/Rastreio Padronizado do TEA (Autismo), com prática clínica e institucional contínua.
            </p>

            {/* 2 Compact Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-[#E5DFD5] shadow-2xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#C59E41] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#23201D]">Ciência e Evidências</div>
                  <div className="text-[11px] text-[#606060]">Intervenções baseadas na neurociência</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E5DFD5] shadow-2xs flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#0288D1] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#23201D]">Olhar Multidisciplinar</div>
                  <div className="text-[11px] text-[#606060]">Conexão com escola e família</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
