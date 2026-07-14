// ÚNICO arquivo a configurar — nome, domínio e tags refletem no site inteiro (logo, SEO, schema, sitemap, robots).
export const SITE = {
  name: 'automacao.art.br',
  logo: { base: 'automacao', suffix: '.art.br' }, // wordmark do header
  url: 'https://automacao.art.br', // sem barra no fim; configurar redirect www -> apex no Vercel
  tagline: 'Automação e IA na prática',
  description:
    'Tutoriais de automação e n8n, guias de ChatGPT e agentes de IA, e a história das máquinas e invenções que criaram o mundo automatizado — tudo em português, testado de verdade.',
  locale: 'pt-BR',
  email: 'contato@automacao.art.br',

  // Tags (deixar '' desativa a tag — o site builda normal sem elas)
  // GTM injeta o dataLayer + GA4 em TODAS as páginas (existentes e novas) via 1 único snippet no BaseLayout.
  // Para adicionar Google Ads, remarketing, AdSense (verificação), etc: fazer direto no GTM (tagmanager.google.com),
  // sem precisar editar nenhuma página do site — é exatamente pra isso que o GTM existe aqui.
  gtm: 'GTM-MW92GFJ4',                     // conta GTM "automação" (accountId 6365906750, container 258243185)
  ga4: 'G-M5MW4G428P',                     // propriedade GA4 "automacao.art.br" (properties/545461812) — configurada DENTRO do GTM (tag GA4 Configuration), não injetada direto
  adsensePub: '',                          // <<< PREENCHER SÓ AO APLICAR ao AdSense (ca-pub-...). Antes da aprovação: sem anúncio no site.
  adsenseSlot: '',                         // <<< slot criado após aprovação

  // Comentários (Giscus / GitHub Discussions) — engajamento real, moderável, grátis.
  // Deixar giscus: null desativa a seção inteira (nenhum script carrega). Ativar:
  // 1) github.com/apps/giscus -> instalar no repo visualmkt/site-ia
  // 2) Repo -> Settings -> Features -> marcar "Discussions"
  // 3) https://giscus.app -> preencher repo, gerar repoId/categoryId -> colar abaixo
  giscus: null,
  // giscus: { repo: 'visualmkt/site-ia', repoId: '', category: 'Comentários', categoryId: '' },

  // Clusters = categorias = silos de URL (/{cluster}/{slug}/). Mesmos slugs do backlog do n8n.
  // Só aparecem no menu/home os clusters que já têm artigo publicado (evita "em construção" — critério AdSense).
  // "color" = acento visual da categoria (badge, borda da capa) — identidade consistente por assunto, como portais editoriais grandes.
  clusters: {
    n8n: {
      label: 'n8n',
      title: 'n8n: tutoriais e automações prontas',
      description: 'Como instalar, criar fluxos e automatizar WhatsApp, planilhas e atendimento com n8n — em português.',
      color: '#4f46e5'
    },
    chatgpt: {
      label: 'ChatGPT & LLMs',
      title: 'ChatGPT e LLMs: guias e prompts prontos',
      description: 'Guias de uso, comparativos e prompts prontos por profissão para ChatGPT, Gemini, Claude e outros modelos.',
      color: '#a855f7'
    },
    agentes: {
      label: 'Agentes de IA',
      title: 'Agentes de IA: conceitos e como criar',
      description: 'RAG, MCP, multiagentes e como criar agentes de IA para atendimento e vendas — explicado simples.',
      color: '#0d9488'
    },
    historia: {
      label: 'História & Marcos',
      title: 'História da automação e da IA',
      description: 'As invenções, máquinas, empresas e pessoas que criaram a automação e a inteligência artificial — linhas do tempo, biografias e feitos marcantes.',
      color: '#b45309'
    },
    negocios: {
      label: 'Automação p/ Negócios',
      title: 'Automação para negócios',
      description: 'Como automatizar WhatsApp, planilhas, cobrança e atendimento na sua empresa, com ou sem programação.',
      color: '#2563eb'
    },
    ferramentas: {
      label: 'Ferramentas de IA',
      title: 'Ferramentas de IA: listas e comparativos',
      description: 'As melhores IAs para imagem, vídeo, áudio e texto — testadas, comparadas e com alternativas grátis.',
      color: '#db2777'
    },
    make: {
      label: 'Make & Zapier',
      title: 'Make, Zapier e alternativas',
      description: 'Comparativos, preços e migração entre plataformas de automação no-code.',
      color: '#ea580c'
    },
    dev: {
      label: 'APIs & Dev',
      title: 'APIs e dev para quem está começando',
      description: 'API do ChatGPT e do Gemini, VPS, Docker e conceitos técnicos explicados para não-programadores.',
      color: '#475569'
    }
  }
};
