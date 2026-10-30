import { Registration, GoogleSheetsConfig } from '../types';

const STORAGE_KEY = 'fabrine_tea_registrations';
const CONFIG_KEY = 'fabrine_tea_sheets_config';

export const getSavedRegistrations = (): Registration[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler inscrições locais:', e);
    return [];
  }
};

export const saveRegistration = (reg: Omit<Registration, 'id' | 'createdAt' | 'status'>): Registration => {
  const current = getSavedRegistrations();
  const newRecord: Registration = {
    ...reg,
    id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'pendente',
    syncedToSheets: false
  };

  const updated = [newRecord, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newRecord;
};

export const updateRegistration = (id: string, updates: Partial<Registration>): void => {
  const current = getSavedRegistrations();
  const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzJVTeEt9BZDGDa3oNbWbz2DYD8AiZXo5qEe81r0YkdemQ88CLZJqBmNwz2BB_6cOlJ/exec';

export const getGoogleSheetsConfig = (): GoogleSheetsConfig => {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) {
      return {
        webhookUrl: DEFAULT_WEBHOOK_URL,
        sheetName: 'Inscricoes_TEA',
        autoSync: true
      };
    }
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      webhookUrl: parsed.webhookUrl || DEFAULT_WEBHOOK_URL
    };
  } catch (e) {
    return {
      webhookUrl: DEFAULT_WEBHOOK_URL,
      sheetName: 'Inscricoes_TEA',
      autoSync: true
    };
  }
};

export const saveGoogleSheetsConfig = (cfg: GoogleSheetsConfig): void => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
};

const getProfessionLabel = (p: string, custom?: string) => {
  if (p === 'outra' && custom) return `Outra: ${custom}`;
  const map: Record<string, string> = {
    profissional_apoio: 'Profissional de apoio',
    aee: 'AEE',
    psicopedagoga: 'Psicopedagoga',
    professora: 'Professora'
  };
  return map[p] || p;
};

const getSchoolGradeLabel = (g: string, custom?: string) => {
  if (g === 'outros' && custom) return `Outros: ${custom}`;
  const map: Record<string, string> = {
    infantil: 'Educação Infantil',
    fundamental_1: 'Fundamental 1',
    fundamental_2: 'Fundamental 2'
  };
  return map[g] || g;
};

export const syncToGoogleSheets = async (registration: Registration, webhookUrl?: string): Promise<{ success: boolean; message: string }> => {
  const url = webhookUrl || getGoogleSheetsConfig().webhookUrl || DEFAULT_WEBHOOK_URL;
  
  if (!url) {
    return {
      success: false,
      message: 'URL do Google Sheets não configurada.'
    };
  }

  try {
    const payload = {
      id: registration.id,
      timestamp: new Date(registration.createdAt).toLocaleString('pt-BR'),
      nome: registration.fullName,
      whatsapp: registration.whatsapp,
      email: registration.email,
      profissao: getProfessionLabel(registration.profession, registration.professionCustom),
      turma: getSchoolGradeLabel(registration.schoolGrade, registration.schoolGradeCustom),
      status: registration.status,
      evento: 'Oficina Presencial TEA na Sala de Aula',
      valor: 'R$ 97,00'
    };

    // Google Apps Script requires text/plain and mode: no-cors for direct cross-origin browser POST
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    updateRegistration(registration.id, { syncedToSheets: true });
    return { success: true, message: 'Dados enviados com sucesso para a planilha do Google!' };
  } catch (err: any) {
    console.error('Falha ao sincronizar com Google Sheets:', err);
    return {
      success: false,
      message: err?.message || 'Não foi possível conectar ao Google Sheets.'
    };
  }
};

export const exportToCSV = (registrations: Registration[]): void => {
  if (registrations.length === 0) return;

  const headers = ['Data/Hora', 'Nome Completo', 'WhatsApp', 'E-mail', 'Profissão', 'Turma de Atuação', 'Status'];
  const rows = registrations.map(r => [
    `"${new Date(r.createdAt).toLocaleString('pt-BR')}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.whatsapp}"`,
    `"${r.email}"`,
    `"${(r.profession === 'outra' && r.professionCustom ? r.professionCustom : r.profession).replace(/"/g, '""')}"`,
    `"${(r.schoolGrade === 'outros' && r.schoolGradeCustom ? r.schoolGradeCustom : r.schoolGrade).replace(/"/g, '""')}"`,
    `"${r.status}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `inscricoes_oficina_tea_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
