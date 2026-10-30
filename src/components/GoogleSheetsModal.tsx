import React, { useState, useEffect } from 'react';
import { X, Database, Download, Check, Copy, ExternalLink, RefreshCw, AlertCircle, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { getSavedRegistrations, getGoogleSheetsConfig, saveGoogleSheetsConfig, exportToCSV, syncToGoogleSheets } from '../utils/storage';
import { Registration } from '../types';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({ isOpen, onClose, onDataChanged }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRegistrations(getSavedRegistrations());
      const config = getGoogleSheetsConfig();
      setWebhookUrl(config.webhookUrl);
      setSavedSuccess(false);
      setSyncResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    saveGoogleSheetsConfig({
      webhookUrl: webhookUrl.trim(),
      sheetName: 'Inscricoes_TEA',
      autoSync: true
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportCSV = () => {
    exportToCSV(registrations);
  };

  const handleSyncAll = async () => {
    if (!webhookUrl.trim()) {
      setSyncResult('Por favor, salve a URL do Google Sheets primeiro.');
      return;
    }
    setSyncing(true);
    setSyncResult(null);

    let count = 0;
    for (const reg of registrations) {
      const res = await syncToGoogleSheets(reg, webhookUrl.trim());
      if (res.success) count++;
    }

    setRegistrations(getSavedRegistrations());
    setSyncing(false);
    setSyncResult(`${count} inscrição(ões) enviada(s) para a planilha com sucesso!`);
    if (onDataChanged) onDataChanged();
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // Se a planilha estiver vazia, cria os cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data/Hora", "Nome", "WhatsApp", "E-mail", "Profissão", "Turma", "Valor", "Status"]);
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("pt-BR"),
      data.nome || "",
      data.whatsapp || "",
      data.email || "",
      data.profissao || "",
      data.turma || "",
      data.valor || "R$ 97,00",
      data.status || "pendente"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-[#E5DFD5] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5DFD5] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#56C45F]/20 text-[#2E7D32] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#23201D] leading-tight">
                Integração Google Sheets & Inscrições
              </h3>
              <p className="text-xs text-[#606060]">
                {registrations.length} participante(s) registrado(s) localmente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E5DFD5] text-[#606060] hover:text-[#23201D] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Quick Action: Export directly to CSV */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#23201D] flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#56C45F]" />
                <span>Exportar Dados Agora</span>
              </h4>
              <p className="text-xs text-[#606060] mt-0.5">
                Baixe um arquivo CSV compatível diretamente com Google Sheets ou Excel.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={registrations.length === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Planilha CSV ({registrations.length})</span>
            </button>
          </div>

          {/* Webhook Connection Setup */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#23201D]">
                URL do Webhook (Google Apps Script)
              </label>
              {savedSuccess && (
                <span className="text-xs text-[#2E7D32] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded-xl text-xs sm:text-sm text-[#23201D] focus:bg-white focus:outline-none focus:border-[#56C45F]"
              />
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2.5 rounded-xl bg-[#23201D] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Salvar URL
              </button>
            </div>

            <p className="text-[11px] text-[#80776D]">
              Quando configurada, cada nova inscrição feita na landing page será enviada automaticamente para sua planilha em tempo real.
            </p>
          </div>

          {/* Sync Button */}
          {webhookUrl && registrations.length > 0 && (
            <div className="p-3 bg-[#E8F8EC] border border-[#56C45F]/30 rounded-xl flex items-center justify-between gap-3">
              <div className="text-xs text-[#1B5E20]">
                {syncResult || 'Você tem inscrições salvas prontas para sincronizar.'}
              </div>
              <button
                onClick={handleSyncAll}
                disabled={syncing}
                className="px-3.5 py-1.5 rounded-lg bg-[#56C45F] hover:bg-[#48B051] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Sincronizando...' : 'Enviar para Sheets'}</span>
              </button>
            </div>
          )}

          {/* How to setup Google Sheets guide */}
          <div className="border border-[#E5DFD5] rounded-2xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#23201D] uppercase tracking-wide">
                Como configurar seu Google Sheets em 2 minutos:
              </span>
              <button
                onClick={copyScriptToClipboard}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#EDE7DC] text-[#606060] text-[11px] font-medium border border-[#E5DFD5] cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copiado!' : 'Copiar Script'}</span>
              </button>
            </div>

            <ol className="text-xs text-[#606060] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Abra uma planilha nova no <strong>Google Planilhas</strong>.</li>
              <li>No menu superior, clique em <strong>Extensões &gt; Apps Script</strong>.</li>
              <li>Substitua o código pelo script copiado acima.</li>
              <li>Clique em <strong>Implantar &gt; Nova implantação</strong>.</li>
              <li>Selecione tipo <strong>App da Web</strong> e em "Quem tem acesso" escolha <strong>Qualquer pessoa</strong>.</li>
              <li>Copie a URL fornecida e cole no campo acima!</li>
            </ol>
          </div>

          {/* Recent Registrations Table preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#23201D]">
                Inscrições Registradas ({registrations.length})
              </span>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-[#E5DFD5] rounded-2xl text-xs text-[#80776D]">
                Nenhuma inscrição realizada ainda. Faça um teste pelo formulário da página!
              </div>
            ) : (
              <div className="border border-[#E5DFD5] rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E5DFD5] text-[#606060] font-semibold">
                    <tr>
                      <th className="p-2.5">Nome</th>
                      <th className="p-2.5">WhatsApp</th>
                      <th className="p-2.5">Profissão</th>
                      <th className="p-2.5">Turma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DFD5]">
                    {registrations.map((r) => (
                      <tr key={r.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-2.5 font-medium text-[#23201D]">{r.fullName}</td>
                        <td className="p-2.5 text-[#606060]">{r.whatsapp}</td>
                        <td className="p-2.5 text-[#606060]">
                          {r.profession === 'outra' && r.professionCustom ? r.professionCustom : r.profession}
                        </td>
                        <td className="p-2.5 text-[#606060]">
                          {r.schoolGrade === 'outros' && r.schoolGradeCustom ? r.schoolGradeCustom : r.schoolGrade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E5DFD5] bg-[#FAF7F2] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#23201D] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
