# Identidade Visual — automacao.art.br

> Definida ANTES de ir ao ar para evitar retrabalho. Tudo já implementado no código; trocar qualquer decisão = editar `src/site.config.mjs` + `src/styles/global.css` (variáveis no `:root`).

## Marca
- **Nome/wordmark: `automacao.art.br`** — o próprio domínio é a marca (minúsculas, sem espaço). "automacao" em cor de texto, "**.art.br**" em índigo (implementado no header).
- Por quê: domínio exato-match memorável; dizer o nome já entrega o endereço; estilo dev/tech (lowercase) conversa com o público.
- Alternativas consideradas (se quiser trocar depois, é 1 linha no config):
  1. **Automação na Prática** — nome editorial + domínio como endereço. Mais "revista", menos tech.
  2. **AutomaBR** — curto, mas não casa com o domínio (usuário digita errado).

## Símbolo (logo)
- **Mark**: 4 nós conectados por linhas dentro de um quadrado arredondado — representa um fluxo de automação (nodes do n8n). Gradiente índigo→violeta.
- Arquivos: inline em `src/components/Logo.astro` e `public/favicon.svg` (mesmo desenho — manter sempre iguais).
- Uso: favicon, avatar de redes sociais, marca d'água de screenshots.
- Pendente (fazer antes do lançamento): **imagem OG padrão 1200×630** (mark + wordmark sobre fundo gradiente) em `public/og-default.png` para compartilhamentos.

## Paleta
| Papel | Cor | Uso |
|---|---|---|
| Primária | `#4f46e5` (índigo) | links, acentos, sufixo do logo, marcadores |
| Primária escura | `#3730a3` | hover |
| Gradiente da marca | `#6366f1 → #a855f7` | símbolo, hero opcional |
| Texto | `#1a2233` | corpo |
| Texto suave | `#5a6478` | metas, descrições |
| Fundo | `#ffffff` / `#f6f7fb` | páginas / seções alternadas |
| Código | fundo `#0f172a`, texto `#e2e8f0` | blocos `<pre>` |

Regra: **tema claro** no conteúdo (legibilidade e RPM de anúncio); escuro só nos blocos de código.

## Tipografia
- **System font stack** (implementado): zero download de fonte = PageSpeed máximo (fator de ranking e critério de UX do AdSense).
- Títulos: peso 800, tracking negativo. Corpo: 17px, line-height 1.65, parágrafos curtos.
- Se um dia quiser personalidade tipográfica: Inter (self-hosted, `font-display: swap`) — nunca Google Fonts via CDN (CLS + requisição externa).

## Tom de voz
Especialista que constrói o que ensina. Direto, brasileiro, sem hype ("revolucionário", "game changer" = proibidos). Admite custo e limitação das ferramentas. Passo a passo sempre testável.

## Não fazer
- Não usar imagens genéricas de "robô futurista" de banco/IA como capa — screenshots reais e diagramas próprios.
- Não misturar outra cor de acento além da paleta.
- Não colocar anúncio antes da aprovação do AdSense (site limpo na revisão).
