import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        title="Instalar aplicativo Oficina TEA"
        className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all cursor-pointer shadow-xs ${
          compact
            ? 'px-3 py-1.5 text-xs bg-[#F9DC3F] hover:bg-[#ebd038] text-[#332a03]'
            : 'px-3.5 py-2 text-xs sm:text-sm bg-[#2B2825] hover:bg-[#1A1816] text-white'
        }`}
      >
        <Download className="w-3.5 h-3.5 text-[#C59E41]" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          title="Instalar no iPhone / iPad"
          className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all cursor-pointer border border-[#E5DFD5] ${
            compact
              ? 'px-2.5 py-1 text-xs bg-white text-[#4A443E] hover:bg-[#FAF7F2]'
              : 'px-3 py-1.5 text-xs bg-white text-[#4A443E] hover:bg-[#FAF7F2]'
          }`}
        >
          <Download className="w-3.5 h-3.5 text-[#C59E41]" />
          <span>Instalar App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-[#E5DFD5] relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-[#8C857B] hover:text-[#23201D]"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/pwa-icon.png"
                  alt="Oficina TEA"
                  className="w-12 h-12 rounded-xl shadow-xs"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#23201D]">
                    Oficina TEA na sala de aula
                  </h3>
                  <p className="text-xs text-[#606060]">Fabrine Fernandes</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-[#4A443E] bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD5]">
                <p className="flex items-center gap-2">
                  <Share className="w-4 h-4 text-[#0288D1] shrink-0" />
                  <span>1. Toque no botão <strong>Compartilhar</strong> na barra do Safari.</span>
                </p>
                <p className="flex items-center gap-2">
                  <PlusSquare className="w-4 h-4 text-[#56C45F] shrink-0" />
                  <span>2. Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.</span>
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-[#2B2825] py-2.5 text-xs font-semibold text-white hover:bg-[#1A1816]"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
