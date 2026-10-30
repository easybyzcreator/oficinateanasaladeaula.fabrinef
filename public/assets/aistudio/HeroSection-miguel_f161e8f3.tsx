// Hero com animação no scroll (Scroll-Morph). Comprovado no projeto Ferrari SF90 XX.
// Versão React/Vite — pronta para Lovable.
//
// PRECISA DE: um vídeo em /public/hero-video.mp4 (ou mude o caminho em VIDEO_PATH abaixo).
// PRINCÍPIO: a seção é mais alta que a tela; o canvas fica fixo (sticky) dentro dela;
// o progresso da rolagem (0→1) vira, de forma linear, um quadro do vídeo. Os quadros são
// extraídos do vídeo no carregamento porque "passar" o <video> pelo currentTime é instável
// entre navegadores.

import { useRef, useEffect, useState } from "react";

// === BOTÕES DE REGULAGEM ===
const SCROLL_HEIGHT_MULTIPLIER = 2;  // altura da seção = N × a tela. 2 = uma tela de rolagem. Aumente p/ rolagem mais lenta.
const TARGET_FPS = 30;               // quadros extraídos por segundo de vídeo. Menor = menos memória, menos suave.
const LERP_SPEED = 0.08;             // 0.05 desliza devagar → 0.15 mais rápido → 0.3 quase instantâneo. Ajuste para a sensação.
const VIDEO_PATH = "/hero-video.mp4";

// === TÍTULO SOBRE O VÍDEO (apague este bloco + o JSX abaixo se não quiser título) ===
const TITLE = "Seu título aqui";
const SUBTITLE = "Seu subtítulo";
const TITLE_REVEAL_AT_PROGRESS = 0.85;          // título surge nos últimos 15% da rolagem
const SCROLL_INDICATOR_HIDE_AT_PROGRESS = 0.05; // a setinha some quase de imediato

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  // Extrai todos os quadros do vídeo ao montar o componente.
  useEffect(() => {
    let cancelled = false;

    async function extractFrames() {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = VIDEO_PATH;

      await new Promise<void>((resolve) => {
        video.onloadeddata = () => resolve();
        video.load();
      });
      if (cancelled) return;

      const duration = video.duration;
      const totalFrames = Math.ceil(duration * TARGET_FPS);
      const offscreen = document.createElement("canvas");
      offscreen.width = video.videoWidth;
      offscreen.height = video.videoHeight;
      const ctx = offscreen.getContext("2d", { willReadFrequently: false })!;
      const frames: ImageBitmap[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) return;

        const time = (i / totalFrames) * duration;
        video.currentTime = time;

        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve();
        });

        ctx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
        const bitmap = await createImageBitmap(offscreen);
        frames.push(bitmap);

        setLoadingProgress(Math.round(((i + 1) / totalFrames) * 100));
      }

      if (cancelled) return;
      framesRef.current = frames;

      // Desenha o primeiro quadro para o canvas não ficar em branco.
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const drawCtx = canvas.getContext("2d")!;
        drawCtx.drawImage(frames[0], 0, 0);
      }

      video.remove();
      setReady(true);
    }

    extractFrames();
    return () => {
      cancelled = true;
    };
  }, []);

  // Loop de animação: aproxima (lerp) o quadro atual do quadro-alvo definido pela rolagem.
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const totalFrames = framesRef.current.length;

    let running = true;

    function animate() {
      if (!running) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.1) {
        currentFrameRef.current += diff * LERP_SPEED;
      } else {
        currentFrameRef.current = target;
      }

      const frameIndex = Math.min(
        Math.max(Math.round(currentFrameRef.current), 0),
        totalFrames - 1
      );

      const frame = framesRef.current[frameIndex];
      if (frame) {
        ctx.drawImage(frame, 0, 0);
      }

      requestAnimationFrame(animate);
    }

    animate();
    return () => {
      running = false;
    };
  }, [ready]);

  // Converte a posição da rolagem no quadro-alvo.
  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    if (!section) return;
    const totalFrames = framesRef.current.length;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const sectionHeight = section!.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableDistance = sectionHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
      targetFrameRef.current = progress * (totalFrames - 1);

      setTitleVisible(progress > TITLE_REVEAL_AT_PROGRESS);
      setScrollIndicatorVisible(progress < SCROLL_INDICATOR_HIDE_AT_PROGRESS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh` }}
      className="relative"
    >
      {/* Container fixo (sticky) — é o truque que prende o canvas na tela enquanto você rola. */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
        />

        {/* Indicador de carregamento — aparece até todos os quadros serem extraídos. */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  transition: "width 0.15s linear",
                }}
              />
            </div>
            <span className="text-xs text-white/30 mt-3 font-mono tracking-wider">
              {loadingProgress}%
            </span>
          </div>
        )}

        {/* Título — aparece no fim da animação. Apague este bloco se não quiser título. */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            opacity: titleVisible ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="text-center px-6">
            <h1
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white"
              style={{
                transform: titleVisible ? "translateY(0)" : "translateY(30px)",
                transition:
                  "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                textShadow: "0 4px 40px rgba(0,0,0,0.5)",
              }}
            >
              {TITLE}
            </h1>
            <p
              className="mt-3 text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/70"
              style={{
                transform: titleVisible ? "translateY(0)" : "translateY(20px)",
                opacity: titleVisible ? 1 : 0,
                transition:
                  "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              {SUBTITLE}
            </p>
          </div>
        </div>

        {/* Degradê de baixo — troque `from-white` pela cor de fundo da próxima seção. */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        {/* Indicador de rolagem. */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{
            opacity: scrollIndicatorVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-white/50">
            Role para explorar
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div
              className="w-1 h-1.5 rounded-full bg-white/50"
              style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Keyframe da setinha. Em React/Vite use <style> normal (sem "jsx"). */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
