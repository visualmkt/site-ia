# Site IA — Astro (automação, LLMs e agentes de IA)

Site 100% estático (Astro 5). Conteúdo em Markdown (`src/content/posts/`), publicado pelo n8n via commit no GitHub → deploy automático no Vercel.

## Configurar (1 arquivo)
Tudo em **`src/site.config.mjs`**: nome do site (reflete no logo/título/schema), domínio, tagline, e-mail, GA4, AdSense (pub + slot), clusters. Tags vazias (`''`) ficam desativadas — o site builda normal sem elas.

## Comandos
```bash
npm run dev       # localhost:4321 — drafts VISÍVEIS (revisão)
npm run build     # produção — drafts EXCLUÍDOS
npm run preview   # servir o build local
```

## Estrutura de URL (silos = clusters do plano editorial)
- `/{cluster}/` — página hub da categoria
- `/{cluster}/{slug}/` — artigo
- `/sobre/`, `/contato/`, `/politica-de-privacidade/`, `/termos-de-uso/` (AdSense exige a política)
- `/sitemap-index.xml`, `/rss.xml`, `/robots.txt` — automáticos

## Formato do post (o que o n8n gera)
```markdown
---
title: "Título SEO"
description: "Meta description <=155 chars"
cluster: "n8n"            # precisa existir em site.config.mjs
formato: "tutorial"
pubDate: 2026-07-03
updatedDate: 2026-08-01   # opcional (refresh)
image: "/images/slug.webp" # opcional (colocar o arquivo em public/images/)
imageAlt: "alt com keyword"
draft: true               # true = não vai pro ar; publicar = trocar para false
---

<p>Corpo em HTML puro (h2, h3, p, ol, ul, table, pre/code, a, strong)...</p>
```
- O **H1, Article schema, BreadcrumbList, canonical, OG e meta** são gerados pelo layout — o corpo NÃO deve ter `<h1>` nem schema Article (FAQPage/HowTo embutidos no corpo são bem-vindos).
- Blocos `<ins class="adsbygoogle">` dentro do corpo funcionam (o script do AdSense carrega no layout). Além deles, o layout insere 1 anúncio automático no fim do artigo.
- Ver exemplos: `src/content/posts/o-que-e-n8n.md` (publicado) e `como-usar-o-chatgpt-de-graca.md` (draft).

## Deploy (Vercel)
1. Criar repo no GitHub e subir: `git init && git add . && git commit -m "site inicial" && gh repo create SEU_USUARIO/site-ia --private --source . --push`
2. Vercel → Add New Project → importar o repo (framework Astro detectado sozinho) → Deploy.
3. Apontar o domínio no Vercel (Settings → Domains) e ajustar `url` no `site.config.mjs`.
4. Todo commit na main = deploy automático (~1 min). É assim que o n8n publica.

## Publicar um draft
Trocar `draft: true` → `false` no arquivo (GitHub web editor resolve) — o commit dispara o deploy.

## Pós-deploy (uma vez)
- Search Console: adicionar propriedade + enviar `/sitemap-index.xml`.
- AdSense: adicionar o domínio na conta, criar slot novo, colar em `site.config.mjs` (`adsenseSlot`) e no Config do WF2 do n8n (`adsIns`); criar `public/ads.txt` com a linha do AdSense.
- GA4: criar propriedade e colar o `G-...` no config.
