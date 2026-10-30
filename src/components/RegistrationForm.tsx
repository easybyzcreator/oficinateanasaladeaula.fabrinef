import React, { useState } from 'react';
import { CheckCircle2, User, Phone, Mail, Briefcase, GraduationCap, ArrowRight, Loader2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { ProfessionType, SchoolGradeType, Registration } from '../types';
import { saveRegistration, syncToGoogleSheets } from '../utils/storage';

const ASAAS_PAYMENT_URL = 'https://www.asaas.com/000/c/c773p6iyru0t8rbn';

interface RegistrationFormProps {
  onSuccess: (newRegistration: Registration) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState<ProfessionType | ''>('');
  const [professionCustom, setProfessionCustom] = useState('');
  const [schoolGrade, setSchoolGrade] = useState<SchoolGradeType | ''>('');
  const [schoolGradeCustom, setSchoolGradeCustom] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Phone masking for Brazilian WhatsApp: (99) 99999-9999
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)$/, '($1');
    }
    setWhatsapp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fullName.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) {
      setError('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido para envio do material e certificado.');
      return;
    }
    if (!profession) {
      setError('Por favor, selecione sua profissão.');
      return;
    }
    if (profession === 'outra' && !professionCustom.trim()) {
      setError('Por favor, especifique sua profissão no campo adicional.');
      return;
    }
    if (!schoolGrade) {
      setError('Por favor, selecione a turma em que você trabalha.');
      return;
    }
    if (schoolGrade === 'outros' && !schoolGradeCustom.trim()) {
      setError('Por favor, informe qual a outra turma ou segmento em que você atua.');
      return;
    }

    setLoading(true);

    try {
      // 1. Save locally
      const newReg = saveRegistration({
        fullName: fullName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        profession,
        professionCustom: profession === 'outra' ? professionCustom.trim() : undefined,
        schoolGrade,
        schoolGradeCustom: schoolGrade === 'outros' ? schoolGradeCustom.trim() : undefined
      });

      // 2. Google Sheets sync via configured Apps Script Webhook
      await syncToGoogleSheets(newReg);

      setSubmitted(newReg);
      onSuccess(newReg);

      // 3. Redirect immediately to Asaas Payment URL
      window.location.href = ASAAS_PAYMENT_URL;
    } catch (err: any) {
      console.error(err);
      setError('Ocorreu um erro ao salvar a inscrição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setWhatsapp('');
    setEmail('');
    setProfession('');
    setProfessionCustom('');
    setSchoolGrade('');
    setSchoolGradeCustom('');
    setSubmitted(null);
    setError(null);
  };

  // WhatsApp quick contact message
  const whatsappNumber = '5519971242720'; // Fabrine Fernandes (19) 97124-2720
  const professionLabel = submitted
    ? submitted.profession === 'outra' && submitted.professionCustom
      ? submitted.professionCustom
      : {
          profissional_apoio: 'Profissional de apoio',
          aee: 'AEE',
          psicopedagoga: 'Psicopedagoga',
          professora: 'Professora'
        }[submitted.profession] || submitted.profession
    : '';

  const gradeLabel = submitted
    ? submitted.schoolGrade === 'outros' && submitted.schoolGradeCustom
      ? submitted.schoolGradeCustom
      : {
          infantil: 'Educação Infantil',
          fundamental_1: 'Fundamental 1',
          fundamental_2: 'Fundamental 2'
        }[submitted.schoolGrade] || submitted.schoolGrade
    : '';

  const whatsappUrl = submitted
    ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        `Olá Fabrine! Realizei minha inscrição na Oficina Presencial TEA na Sala de Aula.\n\nNome: ${submitted.fullName}\nWhatsApp: ${submitted.whatsapp}\nE-mail: ${submitted.email}\nProfissão: ${professionLabel}\nTurma: ${gradeLabel}\n\nQual o próximo passo agora para concluir a reserva da minha vaga?`
      )}`
    : '';

  return (
    <section id="inscricao" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#FA4E74] bg-[#FA4E74]/10 px-3.5 py-1.5 rounded-full inline-block">
            Formulário Oficial
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#23201D]">
            Reserva de Vaga · Oficina Presencial
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#606060]">
            Preencha seus dados abaixo para garantir o valor promocional do <strong className="text-[#23201D]">Lote 1 (R$ 97,00)</strong>.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E5DFD5] shadow-xl relative overflow-hidden">
          {submitted ? (
            /* Success confirmation state */
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#56C45F]/20 text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#23201D]">
                  Inscrição Registrada com Sucesso!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#606060] max-w-md mx-auto">
                  Olá, <strong className="text-[#23201D]">{submitted.fullName}</strong>! Seus dados foram guardados com segurança e encaminhados para a lista oficial de reserva de vagas.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9DC3F]/25 text-[#735A0F] text-xs font-semibold rounded-full">
                  <span>Redirecionando para a página de pagamento seguro...</span>
                </div>
              </div>

              {/* Summary box */}
              <div className="bg-[#FAF7F2] border border-[#E5DFD5] rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#E5DFD5] pb-2">
                  <span className="text-[#606060]">Evento:</span>
                  <span className="font-semibold text-[#23201D] text-right">Oficina Presencial TEA na Sala de Aula</span>
                </div>
                <div className="flex justify-between border-b border-[#E5DFD5] pb-2">
                  <span className="text-[#606060]">Data & Horário:</span>
                  <span className="font-semibold text-[#23201D]">14/11 · Sábado 8h30</span>
                </div>
                <div className="flex justify-between border-b border-[#E5DFD5] pb-2">
                  <span className="text-[#606060]">Local:</span>
                  <span className="font-semibold text-[#23201D] text-right">
                    Rua Belém, 242 - Jd N. Sra de Fátima, Americana/SP
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E5DFD5] pb-2">
                  <span className="text-[#606060]">Valor Reservado:</span>
                  <span className="font-bold text-[#2E7D32]">R$ 97,00 (Lote 1)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#606060]">WhatsApp:</span>
                  <span className="font-semibold text-[#23201D]">{submitted.whatsapp}</span>
                </div>
              </div>

              {/* Direct Payment Action */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <a
                  href={ASAAS_PAYMENT_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2B2825] hover:bg-[#1A1816] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Ir para o Pagamento Seguro (R$ 97,00)</span>
                  <ArrowRight className="w-5 h-5 text-[#F9DC3F]" />
                </a>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirmar via WhatsApp</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white border border-[#E5DFD5] text-[#606060] hover:text-[#23201D] text-xs sm:text-sm font-medium transition-all"
                  >
                    Nova Inscrição
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Field 1: Nome Completo */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#23201D] mb-1.5">
                  Nome Completo <span className="text-[#FA4E74]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#606060]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Carolina da Silva"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl text-xs sm:text-sm text-[#23201D] placeholder-[#A0988E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59E41]/50 focus:border-[#C59E41] transition-all"
                  />
                </div>
              </div>

              {/* Field 2 & 3: WhatsApp e E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#23201D] mb-1.5">
                    WhatsApp <span className="text-[#FA4E74]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#606060]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="(19) 99999-9999"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl text-xs sm:text-sm text-[#23201D] placeholder-[#A0988E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59E41]/50 focus:border-[#C59E41] transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-[#80776D] mt-1 block">
                    Usaremos para enviar o endereço completo e detalhes.
                  </span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#23201D] mb-1.5">
                    E-mail <span className="text-[#FA4E74]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#606060]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@escola.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl text-xs sm:text-sm text-[#23201D] placeholder-[#A0988E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59E41]/50 focus:border-[#C59E41] transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-[#80776D] mt-1 block">
                    Para emissão do certificado de participação de 4 horas.
                  </span>
                </div>
              </div>

              {/* Field 4: Profissão */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#23201D] mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#56C45F]" />
                  <span>Profissão <span className="text-[#FA4E74]">*</span></span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'profissional_apoio', label: 'Profissional de apoio' },
                    { id: 'aee', label: 'AEE' },
                    { id: 'psicopedagoga', label: 'Psicopedagoga' },
                    { id: 'professora', label: 'Professora' }
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => {
                        setProfession(p.id as ProfessionType);
                      }}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${
                        profession === p.id
                          ? 'bg-[#56C45F]/15 border-[#56C45F] text-[#1B5E20] font-semibold shadow-2xs'
                          : 'bg-[#FAF7F2] border-[#E5DFD5] text-[#606060] hover:bg-white hover:border-[#C59E41]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Option for custom other profession */}
                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={() => setProfession('outra')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                      profession === 'outra'
                        ? 'bg-[#56C45F]/15 border-[#56C45F] text-[#1B5E20] font-semibold'
                        : 'bg-[#FAF7F2] border-[#E5DFD5] text-[#606060] hover:bg-white'
                    }`}
                  >
                    + Outra profissão
                  </button>

                  {profession === 'outra' && (
                    <input
                      type="text"
                      placeholder="Digite sua profissão ou especialidade..."
                      value={professionCustom}
                      onChange={(e) => setProfessionCustom(e.target.value)}
                      className="mt-2 w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#56C45F] rounded-xl text-xs sm:text-sm text-[#23201D] focus:bg-white focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Field 5: Turma que trabalha */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#23201D] mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#68C9EA]" />
                  <span>Turma que você trabalha <span className="text-[#FA4E74]">*</span></span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'infantil', label: 'Educação Infantil' },
                    { id: 'fundamental_1', label: 'Fundamental 1' },
                    { id: 'fundamental_2', label: 'Fundamental 2' },
                    { id: 'outros', label: 'Outros' }
                  ].map((grade) => (
                    <button
                      type="button"
                      key={grade.id}
                      onClick={() => setSchoolGrade(grade.id as SchoolGradeType)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center cursor-pointer ${
                        schoolGrade === grade.id
                          ? 'bg-[#68C9EA]/20 border-[#68C9EA] text-[#0277BD] font-semibold shadow-2xs'
                          : 'bg-[#FAF7F2] border-[#E5DFD5] text-[#606060] hover:bg-white hover:border-[#68C9EA]'
                      }`}
                    >
                      {grade.label}
                    </button>
                  ))}
                </div>

                {schoolGrade === 'outros' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      placeholder="Qual turma ou segmento você atende? (Ex: Ensino Médio, Gestão, Clínica...)"
                      value={schoolGradeCustom}
                      onChange={(e) => setSchoolGradeCustom(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#68C9EA] rounded-xl text-xs sm:text-sm text-[#23201D] focus:bg-white focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Notice & Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-[#2B2825] hover:bg-[#1A1816] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processando reserva...</span>
                    </>
                  ) : (
                    <>
                      <span>Garantir Reserva de Vaga · Lote 1 (R$ 97,00)</span>
                      <ArrowRight className="w-5 h-5 text-[#F9DC3F]" />
                    </>
                  )}
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#736B63]">
                  <Sparkles className="w-3.5 h-3.5 text-[#56C45F]" />
                  <span>Seus dados serão transmitidos com segurança e integrados à lista oficial.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
