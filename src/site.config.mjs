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
  ga4: '',                                 // <<< ex: 'G-XXXXXXXXXX'
  adsensePub: '',                          // <<< PREENCHER SÓ AO APLICAR ao AdSense (ca-pub-...). Antes da aprovação: sem anúncio no site.
  adsenseSlot: '',                         // <<< slot criado após aprovação

  // Clusters = categorias = silos de URL (/{cluster}/{slug}/). Mesmos slugs do backlog do n8n.
  // Só aparecem no menu/home os clusters que já têm artigo publicado (evita "em construção" — critério AdSense).
  clusters: {
    n8n: {
      label: 'n8n',
      title: 'n8n: tutoriais e automações prontas',
      description: 'Como instalar, criar fluxos e automatizar WhatsApp, planilhas e atendimento com n8n — em português.'
    },
    chatgpt: {
      label: 'ChatGPT & LLMs',
      title: 'ChatGPT e LLMs: guias e prompts prontos',
      description: 'Guias de uso, comparativos e prompts prontos por profissão para ChatGPT, Gemini, Claude e outros modelos.'
    },
    agentes: {
      label: 'Agentes de IA',
      title: 'Agentes de IA: conceitos e como criar',
      description: 'RAG, MCP, multiagentes e como criar agentes de IA para atendimento e vendas — explicado simples.'
    },
    historia: {
      label: 'História & Marcos',
      title: 'História da automação e da IA',
      description: 'As invenções, máquinas, empresas e pessoas que criaram a automação e a inteligência artificial — linhas do tempo, biografias e feitos marcantes.'
    },
    negocios: {
      label: 'Automação p/ Negócios',
      title: 'Automação para negócios',
      description: 'Como automatizar WhatsApp, planilhas, cobrança e atendimento na sua empresa, com ou sem programação.'
    },
    ferramentas: {
      label: 'Ferramentas de IA',
      title: 'Ferramentas de IA: listas e comparativos',
      description: 'As melhores IAs para imagem, vídeo, áudio e texto — testadas, comparadas e com alternativas grátis.'
    },
    make: {
      label: 'Make & Zapier',
      title: 'Make, Zapier e alternativas',
      description: 'Comparativos, preços e migração entre plataformas de automação no-code.'
    },
    dev: {
      label: 'APIs & Dev',
      title: 'APIs e dev para quem está começando',
      description: 'API do ChatGPT e do Gemini, VPS, Docker e conceitos técnicos explicados para não-programadores.'
    }
  }
};
