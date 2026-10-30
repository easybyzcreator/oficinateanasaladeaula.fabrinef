---
name: scroll-morph-hero
description: "Cria uma animação de herói (hero) controlada pela rolagem da página, que avança quadro a quadro conforme o usuário rola — estilo Apple/AirPods. A imagem A se transforma na imagem B (ex.: ingredientes espalhados → refeição montada, prato cru → prato pronto, logo em rascunho → logo colorido, dia → noite). ESTA SKILL NÃO GERA IMAGEM NEM VÍDEO. Você já chega com a imagem e o vídeo de transição prontos (feitos em qualquer ferramenta de IA de imagem/vídeo). A skill cuida só de montar a animação de rolagem dentro do projeto. Use quando alguém: subir um vídeo de transição e disser que quer 'animação no scroll', 'vídeo que avança ao rolar', 'hero que se transforma', 'animação estilo Apple', 'vídeo travado que roda conforme rolo a página', ou 'morph A para B'."
metadata:
  version: 2.0.0
  origin: "Derivada da scroll-morph-hero original (projeto Ferrari SF90 XX, comprovada em produção). Versão sem geração de imagem/vídeo, adaptada para Lovable / React."
  language: pt-BR
---

# Skill · Hero com Animação no Scroll (Scroll-Morph Hero)

Você é especialista em montar aquele hero estilo Apple onde um vídeo **avança quadro a quadro conforme o usuário rola a página**. A imagem **A** vira a imagem **B** enquanto a pessoa desce a tela.

Esta skill assume que **a imagem e o vídeo de transição já estão prontos**. Ela cuida apenas da parte de **montar a animação** dentro do projeto (no Lovable). Não gere imagem. Não gere vídeo. Esses arquivos chegam prontos com o usuário.

---

## O que esta skill NÃO faz (importante)

- ❌ **Não gera as imagens.** A imagem inicial (A) e a final (B) já vêm prontas.
- ❌ **Não gera o vídeo.** O vídeo de transição (A → B) já vem pronto, feito fora daqui.
- ✅ **Faz só a animação.** Pega o vídeo pronto e monta o efeito de rolagem no site.

Se o usuário ainda **não tem** o vídeo, esta skill não é o lugar — ele precisa primeiro criar o vídeo de transição numa ferramenta de IA de vídeo e depois voltar aqui.

---

## O que você precisa ter em mãos antes de começar

1. **O vídeo de transição** — um `.mp4` curto (uns 5 segundos) que mostra a imagem A virando a imagem B, com câmera, luz e fundo iguais do começo ao fim. **É este vídeo que será "rolado" quadro a quadro.**
2. **(Opcional) Uma imagem** — caso queira uma imagem de capa/poster antes do vídeo carregar. Não é obrigatória.

Se o vídeo "pula", troca de cena ou muda de enquadramento no meio, a animação vai parecer quebrada. Nesse caso, o problema está no vídeo (refazer o vídeo), não no código.

---

## Passo 1 — Subir e preparar o vídeo

1. **Suba o vídeo** para o projeto. No Lovable, envie o arquivo e coloque-o na pasta pública (`public`) com o nome **`hero-video.mp4`**. O componente vai procurar o vídeo no caminho `/hero-video.mp4`.
2. **Deixe o vídeo leve (recomendado).** Vídeo pesado faz a barra de carregamento demorar muito na primeira visita. Antes de subir, deixe o arquivo **abaixo de ~3 MB** se possível (use qualquer compressor de vídeo online ou o ffmpeg, se tiver). Dica de tamanho: largura máxima de 1920px, sem áudio.

> Observação: a animação **não usa o som** do vídeo. Pode subir mudo.

---

## Passo 2 — Montar o componente da animação

A ideia (o "truque") é simples:
- A seção é **mais alta que a tela** (cria uma "pista" de rolagem).
- O vídeo fica **fixo (sticky)** no meio da tela enquanto você rola.
- Quanto mais você rola (de 0% a 100%), mais o vídeo avança (do primeiro ao último quadro).
- Os quadros são **extraídos do vídeo no carregamento** (porque "passar" o vídeo direto trava em alguns navegadores).

### Como pedir ao Lovable

Cole um pedido assim no Lovable (e anexe / aponte o componente de referência abaixo):

> "Quero um hero no topo da página com animação controlada pela rolagem. Já subi um vídeo em `/hero-video.mp4`. Conforme eu rolo a página, o vídeo deve avançar quadro a quadro (efeito estilo Apple), com o vídeo fixo na tela durante a rolagem. Use o componente `HeroSection` de referência que estou fornecendo. Troque o título para '<SEU TÍTULO>' e o subtítulo para '<SEU SUBTÍTULO>'."

### O componente de referência

Use o arquivo **`references/HeroSection.tsx`** desta skill — é o componente comprovado, pronto para colar. Ele já faz toda a lógica de extrair os quadros e sincronizar com a rolagem. **Não reescreva do zero; reaproveite.**

Depois de colocar o componente, importe e use na página principal:

```tsx
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* resto da página aqui */}
    </main>
  );
}
```

---

## Passo 3 — Ajustar (os botões de regulagem)

No topo do `HeroSection.tsx` existem ajustes fáceis:

```ts
const SCROLL_HEIGHT_MULTIPLIER = 2;  // altura da seção = N × a tela. 2 = uma tela de rolagem. Aumente p/ rolagem mais longa/lenta.
const TARGET_FPS = 30;               // quadros extraídos por segundo de vídeo. Menor = usa menos memória, fica menos suave.
const LERP_SPEED = 0.08;             // 0.05 desliza devagar → 0.15 mais rápido → 0.3 quase instantâneo.
const VIDEO_PATH = "/hero-video.mp4";// caminho do vídeo que você subiu.
```

Quando mexer em cada um:
- `SCROLL_HEIGHT_MULTIPLIER`: suba para 3 se quiser uma rolagem mais longa/lenta; baixe para 1.5 se quiser mais rápida.
- `TARGET_FPS`: baixe para 24 se travar/faltar memória (vídeo longo); deixe em 30 na maioria dos casos.
- `LERP_SPEED`: baixe (ex.: 0.06) se a rolagem ficar "tremida"; suba (ex.: 0.12) se ficar lenta demais.

### Quando o título aparece

```ts
const TITLE_REVEAL_AT_PROGRESS = 0.85;          // título surge nos últimos 15% da rolagem
const SCROLL_INDICATOR_HIDE_AT_PROGRESS = 0.05; // a setinha some quase de imediato
```

### O degradê no rodapé do hero

O componente tem um degradê embaixo que mistura com a próxima seção. Por padrão ele vai **para branco** (`from-white`). Se a sua próxima seção for escura, troque `from-white` por `from-black` (ou a cor de fundo da seção seguinte) para não ficar uma linha dura.

---

## Passo 4 — Testar no preview

Abra o preview e confira:
1. **A barra de carregamento aparece e enche** na primeira vez (a extração dos quadros está funcionando).
2. **A rolagem move a animação de forma suave** — sem travar, sem pular.
3. **O primeiro quadro (imagem A) aparece no topo** e **o último (imagem B) aparece embaixo.**
4. **O título aparece no fim** e a setinha some logo no começo.
5. **O degradê de baixo combina** com a próxima seção (sem linha dura).
6. **No celular** — reduza para largura de telefone; o recorte das laterais é normal (o vídeo usa `object-cover`).

Se a rolagem estiver tremida, baixe o `LERP_SPEED` (tente 0.06). Se a barra de carregamento demorar muito, o vídeo está pesado demais — comprima e suba de novo mais leve.

---

## Problemas comuns e soluções

### "As duas pontas não combinam — a animação parece quebrada"
Causa: o vídeo muda câmera/luz/fundo do começo ao fim. Solução: o problema está no vídeo. Refaça o vídeo mantendo câmera, luz, fundo e enquadramento iguais — só o objeto muda de estado.

### "A rolagem fica tremida / aos solavancos"
Causa: `LERP_SPEED` alto demais. Solução: baixe para 0.06. Garanta que o canvas tem `style={{ willChange: "transform" }}` (já vem no componente).

### "A barra de carregamento demora 20+ segundos na primeira visita"
Causa: o vídeo está pesado. Solução: comprima para menos de 3 MB (largura máx. 1920px, sem áudio) e suba de novo.

### "Trava / fecha a aba no celular"
Causa: muitos quadros guardados na memória (vídeo grande em alta resolução). Solução: baixe `TARGET_FPS` para 24 e use vídeo de no máximo 1280×720. Vídeos mais curtos (3s) também ajudam.

### "O vídeo começa a tocar sozinho em vez de avançar com a rolagem"
Causa: alguém removeu o `muted` ou a lógica do canvas. Solução: o componente nunca chama `.play()` — o `<video>` fica escondido só para extrair os quadros e é removido depois. Mantenha como está.

### "A próxima seção encosta estranho no hero"
Causa: a cor do degradê de baixo não bate com o fundo da próxima seção. Solução: troque `from-white` pela cor de fundo da seção seguinte.

---

## Variação: mais de dois estados (A → B → C)

Se quiser uma transformação em três etapas:
1. Junte dois vídeos (A→B e B→C) em um só (qualquer editor de vídeo) e aponte o `VIDEO_PATH` para o vídeo juntado, ou
2. Use dois heros em sequência.

Para o caso comum (só A → B), não complique.

---

## Arquivo de referência

- `references/HeroSection.tsx` — o componente comprovado, pronto para colar (versão React/Vite, para Lovable).

---

## Resumo rápido

```
1. Suba o vídeo pronto em /hero-video.mp4 (leve, < 3 MB, sem som)
2. Use o componente de referência HeroSection.tsx no projeto
3. Importe <HeroSection /> no topo da página
4. Ajuste título, SCROLL_HEIGHT_MULTIPLIER e LERP_SPEED a gosto
5. Teste no preview (barra carrega → rolagem move a animação → título no fim)
```

Lembrete: esta skill **não cria** a imagem nem o vídeo. Ela só monta a animação com o vídeo que você já trouxe pronto.
