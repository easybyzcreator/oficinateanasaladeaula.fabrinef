# Scroll Morph Hero — versão para Lovable

Skill que ensina a montar uma **animação de herói controlada pela rolagem** (a imagem A vira a imagem B conforme você rola a página, estilo Apple).

**Importante:** esta versão **não gera imagem nem vídeo**. Ela assume que você já tem o **vídeo de transição pronto** (feito em qualquer ferramenta de IA de imagem/vídeo) e cuida só de montar a animação.

## Arquivos
- `SKILL.md` — o passo a passo completo (em português).
- `references/HeroSection.tsx` — o componente pronto (React/Vite), é só colar no projeto.

## Como usar no Lovable
1. Crie/gere o **vídeo de transição** (A → B) numa ferramenta de IA de vídeo.
2. Suba o vídeo no projeto como `/hero-video.mp4` (pasta `public`), de preferência leve (< 3 MB, sem som).
3. Adicione o componente `HeroSection.tsx` ao projeto e use `<HeroSection />` no topo da página.
4. Ajuste o título e os "botões de regulagem" no topo do arquivo (ver `SKILL.md`).
