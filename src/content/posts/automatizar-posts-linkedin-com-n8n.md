---
title: "Como automatizar posts no LinkedIn com n8n (guia passo a passo)"
description: "Aprenda a automatizar posts no LinkedIn com n8n passo a passo. Guia gratuito para empreendedores que querem economizar tempo e aumentar consistência sem precisar programar."
cluster: "ferramentas"
formato: "como fazer/automatizar"
pubDate: 2026-08-18
image: "https://www.automacao.art.br/images/posts/automatizar-posts-linkedin-com-n8n.jpg"
imageAlt: "LinkedIn Developer Portal configuração de aplicativo para API"
draft: false
---

<p>Automatizar a publicação de posts no LinkedIn com n8n resolve dois problemas-chave: você não precisa mais perder horas semanais clicando em "Publicar" manualmente, e garante consistência mesmo quando está ocupado. Com um fluxo simples, você agenda posts com antecedência, padroniza mensagens e integra fontes de conteúdo como planilhas ou RSS, tudo sem escrever código.</p>

<p>O n8n é a ferramenta ideal porque é <strong>open-source, self-hosted gratuito</strong> (ou cloud a partir de US$ 20/mês) e permite conectar APIs complexas como a do LinkedIn sem depender de intermediários caros. Enquanto Zapier e Make cobram por conexões específicas, no n8n você usa nós HTTP Request para interagir diretamente com a API, com controle total sobre cada etapa do fluxo.</p>

<h2>Por que automatizar posts no LinkedIn com n8n pode mudar seu negócio</h2>
<p>Publicar manualmente no LinkedIn consome tempo que você não tem: 80% dos empreendedores brasileiros desistem de postar por falta de tempo ou disciplina. Automatizar resolve isso ao escalar sua presença com posts consistentes, sem depender de inspiração diária ou de ferramentas pagas que limitam você.</p>

<p>Abaixo, uma comparação direta entre as opções mais usadas:</p>
<table>
  <tr>
    <th>Ferramenta</th>
    <th>Custo (plano mínimo)</th>
    <th>Flexibilidade</th>
    <th>Self-hosted</th>
    <th>Conexões LinkedIn</th>
  </tr>
  <tr>
    <td><strong>n8n</strong></td>
    <td>Gratuito (self-hosted) / US$ 20 (cloud)</td>
    <td>Total (nós personalizados)</td>
    <td>Sim</td>
    <td>Direto via API</td>
  </tr>
  <tr>
    <td><strong>Zapier</strong></td>
    <td>US$ 29/mês</td>
    <td>Limitada (apps pré-definidos)</td>
    <td>Não</td>
    <td>Apenas via "LinkedIn" oficial</td>
  </tr>
  <tr>
    <td><strong>Make (ex-Integromat)</strong></td>
    <td>US$ 16/mês</td>
    <td>Média (roteiros visuais)</td>
    <td>Não</td>
    <td>Apenas via "LinkedIn" oficial</td>
  </tr>
</table>

<p><strong>Curiosidade técnica:</strong> O n8n permite manipular o payload JSON da API do LinkedIn livremente, coisa que Zapier e Make não deixam — por exemplo, você pode adicionar campos customizados como <code>author</code> ou <code>distribution</code> sem depender de templates fixos.</p>

<h2>Requisitos básicos: o que você precisa antes de começar</h2>
<p>Para montar seu fluxo no n8n, você vai precisar de três coisas básicas:</p>
<ul>
  <li><strong>Conta no LinkedIn:</strong> Pode ser pessoal ou de empresa, mas ative o modo "Criador de Conteúdo" nas configurações para ter acesso às APIs.</li>
  <li><strong>n8n instalado:</strong> Self-hosted (recomendado para controle total) ou na nuvem via <a href="https://n8n.io/pricing" target="_blank" rel="noopener noreferrer">plano gratuito</a>.</li>
  <li><strong>Credenciais da API do LinkedIn:</strong> Você precisa criar um aplicativo no LinkedIn Developer Portal para obter client ID, secret e definir as permissões corretas.</li>
</ul>

<p><strong>Dica rápida:</strong> Se seus posts incluírem imagens, use uma IA como o <a href="/melhores-ias-para-gerar-imagem-gratis">DALL-E gratuito</a> para criá-las automaticamente e envie o link para o nó de mídia do n8n.</p>

<h2>Passo 1: Configurar a autenticação com a API do LinkedIn no n8n</h2>
<p>O primeiro passo é criar um aplicativo no LinkedIn Developer Portal para obter as credenciais que o n8n vai usar. Acesse <a href="https://www.linkedin.com/developers/" target="_blank" rel="noopener noreferrer">LinkedIn Developer Portal</a>, clique em "Create App", preencha os dados básicos e selecione as permissões <code>r_liteprofile</code> (leitura) e <code>w_member_social</code> (escrita).</p>

<p>Copie o <strong>Client ID</strong> e <strong>Client Secret</strong> gerados e vá ao n8n. No menu lateral, clique em <strong>Credentials</strong>, depois em <strong>Add Credential</strong>. Escolha <strong>LinkedIn OAuth2 API</strong> e cole os dados. Configure o <strong>Redirect URL</strong> como <code>https://seu-dominio.com/rest/oauth2-credential/callback</code> (substitua pelo seu domínio).</p>

<p><strong>Aviso importante:</strong> A API gratuita do LinkedIn tem um <strong>rate limit de 50 chamadas por usuário por dia</strong>. Se você publicar 3 posts por semana, isso não será problema, mas evite loops automáticos excessivos. Para mais limites, considere a API Enterprise (paga).</p>

<h2>Passo 2: Criar o fluxo principal para publicar posts no LinkedIn</h2>
<p>No n8n, crie um novo fluxo com três nós essenciais: <strong>Schedule Trigger</strong> (para agendar), <strong>Set</strong> (para preparar o payload) e <strong>HTTP Request</strong> (para publicar). Comece com o Schedule Trigger configurado para, por exemplo, "segunda, quarta e sexta às 9h".</p>

<p>No nó <strong>Set</strong>, crie um JSON com os campos obrigatórios da API do LinkedIn. Exemplo mínimo:</p>
<pre>{
  "author": "urn:li:person:123456789",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "Automatizar posts no LinkedIn com n8n é mais fácil do que parece. 🚀"
      },
      "shareMediaCategory": "NONE"
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}</pre>

<p>No nó <strong>HTTP Request</strong>, configure:</p>
<ul>
  <li><strong>URL:</strong> <code>https://api.linkedin.com/v2/ugcPosts</code></li>
  <li><strong>Method:</strong> POST</li>
  <li><strong>Authentication:</strong> Selecione a credencial LinkedIn que você criou</li>
  <li><strong>Headers:</strong> Adicione <code>Content-Type: application/json</code> e <code>X-Restli-Protocol-Version: 2.0.0</code></li>
  <li><strong>Body:</strong> Cole o JSON do nó Set</li>
</ul>

<p><strong>Exemplo real com OpenGraph:</strong> Se quiser que o post inclua uma prévia de link, adicione ao payload:</p>
<pre>"source": "https://seusite.com/artigo",
"content": {
  "title": "Como automatizar posts no LinkedIn",
  "description": "Guia passo a passo para empreendedores",
  "thumbnails": [{
    "url": "https://seusite.com/imagem.jpg",
    "alt": "Automação no LinkedIn"
  }]
}</pre>



<h2>Passo 3: Integrar fontes de conteúdo para automatizar posts</h2>
<p>Você pode puxar posts de três fontes principais: <strong>Google Sheets, RSS Feed ou Notion</strong>. Cada opção tem prós e contras conforme tabela abaixo.</p>

<table>
  <tr>
    <th>Fonte</th>
    <th>Prós</th>
    <th>Contras</th>
    <th>Melhor para</th>
  </tr>
  <tr>
    <td><strong>Google Sheets</strong></td>
    <td>Fácil edição colaborativa, filtros por colunas, integração nativa com Google Drive</td>
    <td>Requer manutenção manual da planilha, sem atualização automática de links</td>
    <td>Posts pré-redigidos em batch, equipes que já usam Google Workspace</td>
  </tr>
  <tr>
    <td><strong>RSS Feed</strong></td>
    <td>Automatiza posts de blogs sem redigir novo conteúdo, atualiza sozinho</td>
    <td>Limita-se a artigos existentes, não permite personalização avançada</td>
    <td>Blogs ativos, empresas que publicam conteúdo frequente</td>
  </tr>
  <tr>
    <td><strong>Notion</strong></td>
    <td>Estrutura flexível com databases, tags e relacionamentos, ideal para workflows complexos</td>
    <td>Curva de aprendizado para configurar, sincronização pode ser lenta</td>
    <td>Equipes que já usam Notion para gestão de conteúdo</td>
  </tr>
</table>

<p>Para conectar ao Google Sheets, use o nó <strong>Google Sheets</strong> no n8n: autorize a conta, selecione a planilha e a aba. Configure o intervalo como <code>A2:A100</code> (pula cabeçalho) e mapeie colunas como <code>title</code> e <code>text</code> para o payload do LinkedIn.</p>

<p><strong>Dica de ouro:</strong> Se seus posts forem baseados em vídeos ou áudios, use uma <a href="/ia-para-transcrever-audio-em-texto-gratis">IA gratuita para transcrever áudio</a> e converta o texto em posts no Google Sheets automaticamente.</p>

<h2>Passo 4: Adicionar imagens e vídeos nos posts automaticamente</h2>
<p>A API do LinkedIn aceita mídia via <strong>multipart/form-data</strong>, mas exige que você converta imagens em base64 ou envie URLs públicas. Use o nó <strong>Function</strong> no n8n para processar a imagem antes de publicá-la.</p>

<p>Exemplo de fluxo para imagem:</p>
<ol>
  <li>No nó <strong>Function</strong>, adicione:
  <pre>const fs = require('fs');
const imageBuffer = fs.readFileSync('/caminho/imagem.jpg');
const base64Image = imageBuffer.toString('base64');
return { base64Image };</pre>
  </li>
  <li>No nó <strong>HTTP Request</strong>, configure o body como:
  <pre>{
  "author": "urn:li:person:123456789",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": { "text": "Post com imagem automática! 📸" },
      "shareMediaCategory": "IMAGE",
      "media": [{
        "status": "READY",
        "description": { "text": "Imagem gerada automaticamente" },
        "media": "data:image/jpeg;base64," + items[0].json.base64Image,
        "title": { "text": "Título da imagem" }
      }]
    }
  },
  "visibility": { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
}</pre>
  </li>
  <li>Limite de tamanho: <strong>5MB por imagem</strong> (JPEG/PNG). Vídeos devem ser URLs (máx 10min).</li>
</ol>

<p><strong>Para vídeos:</strong> Gere miniaturas com uma <a href="/melhores-ias-para-gerar-video">IA para criar vídeos</a> e envie o link no campo <code>source</code> do payload. O LinkedIn processa vídeos externos automaticamente.</p>

<p><strong>Curiosidade técnica:</strong> O nó <strong>HTTP Request</strong> do n8n aceita headers customizados como <code>LinkedIn-Version: 202304</code> para forçar versões específicas da API, útil quando a documentação muda.</p>

<h2>Passo 5: Lidar com erros e otimizar seu fluxo de automação</h2>
<p>Três erros são comuns ao publicar no LinkedIn via API: <strong>429 (Rate Limit), 403 (Permissão negada) e 400 (Payload inválido)</strong>. Use o nó <strong>Error Trigger</strong> para capturá-los e aplicar retry policies.</p>

<p>Exemplo de tratamento de erros:</p>
<ul>
  <li><strong>429 Rate Limit:</strong> Atrasar o retry em 1 hora (LinkedIn volta a aceitar após 24h).</li>
  <li><strong>403 Permissão:</strong> Verificar se o app no Developer Portal tem <code>w_member_social</code> ativado.</li>
  <li><strong>400 Payload:</strong> Validar JSON com <a href="https://jsonlint.com/" target="_blank" rel="noopener noreferrer">JSONLint</a> antes de enviar.</li>
</ul>

<p>Para debug, ative os logs detalhados no n8n (<strong>Settings > Logs</strong>) e teste o fluxo com <strong>Postman</strong> antes de colocar em produção. Lembre-se: automação não substitui engajamento. Use os posts para direcionar tráfego para <a href="/como-medir-taxa-de-conversao-ga4">ferramentas de análise</a> como GA4.</p>

<p><strong>Dica avançada:</strong> Adicione um nó <strong>Wait</strong> de 5 segundos entre publicações para evitar falsos 429, já que a API conta chamadas por segundo, não por dia.</p>

<h2>Exemplo prático: fluxo completo para publicar 3 posts por semana</h2>
<p>Abaixo, um fluxo funcional que você pode replicar: posts são puxados da Google Sheets, imagens são geradas automaticamente por IA, e a publicação acontece às segundas, quartas e sextas às 9h.</p>

<p><strong>Estrutura do fluxo:</strong></p>
<ol>
  <li><strong>Schedule Trigger:</strong> Dispara às 9h na segunda, quarta e sexta.</li>
  <li><strong>Google Sheets:</strong> Lê a linha 2 da planilha <code>posts-linkedin</code> (colunas: title, text, image_url).</li>
  <li><strong>Function:</strong> Se <code>image_url</code> existir, baixa a imagem e converte para base64.</li>
  <li><strong>HTTP Request:</strong> Publica o post com a imagem (se houver) ou apenas texto.</li>
  <li><strong>Slack (opcional):</strong> Envia notificação para um canal quando o post for publicado.</li>
</ol>

<p><strong>Screenshot do fluxo:</strong> Imagine um fluxo linear com os nós conectados conforme a descrição acima. O Schedule Trigger está no topo, seguido pelo Google Sheets, Function, HTTP Request e, por fim, um nó para registrar o sucesso no banco de dados.</p>

<p><strong>Planilha de exemplo (Google Sheets):</strong></p>
<table>
  <tr>
    <th>title</th>
    <th>text</th>
    <th>image_url</th>
    <th>publish_date</th>
  </tr>
  <tr>
    <td>Automação com n8n</td>
    <td>Veja como automatizar seus posts no LinkedIn sem gastar nada.</td>
    <td>https://cdn.seusite.com/automacao-n8n.jpg</td>
    <td>2024-05-06</td>
  </tr>
  <tr>
    <td>Dicas de IA</td>
    <td>As melhores IAs para gerar conteúdo em 2024.</td>
    <td></td>
    <td>2024-05-08</td>
  </tr>
</table>

<p><strong>Resultado esperado:</strong> Todos os posts são publicados automaticamente nas datas e horários definidos, com imagens incluídas quando especificadas. Você pode monitorar os logs do n8n para confirmar o sucesso ou ajustar payloads.</p>



<h2>Perguntas frequentes sobre automatizar publicação de posts no LinkedIn com n8n</h2><h3>Quanto custa automatizar posts no LinkedIn com n8n?</h3><p>O n8n oferece um plano gratuito self-hosted (você mesmo hospeda) e planos pagos a partir de US$ 20/mês na nuvem. A API do LinkedIn é gratuita para até 50 chamadas por usuário por dia, suficiente para 3 posts semanais.</p><h3>Preciso saber programar para usar n8n no LinkedIn?</h3><p>Não é necessário saber programar. O n8n usa nós visuais (como blocos de Lego) para conectar APIs. Apenas siga os passos do guia e configure os nós HTTP Request e Schedule Trigger corretamente.</p><h3>Posso agendar posts no LinkedIn com n8n?</h3><p>Sim. O nó Schedule Trigger permite agendar posts para qualquer data e horário específico (ex: segunda, quarta e sexta às 9h). Você define o cronograma uma vez e o fluxo roda automaticamente.</p><h3>Como conectar n8n à API do LinkedIn?</h3><p>Crie um aplicativo no LinkedIn Developer Portal para obter Client ID e Secret. No n8n, adicione uma credencial OAuth2 LinkedIn e configure o Redirect URL. Pronto! Agora você pode usar nós HTTP Request para interagir com a API.</p><h3>Quais são os limites da API do LinkedIn para automação?</h3><p>A API gratuita permite 50 chamadas por usuário por dia. Se publicar 3 posts por semana, isso não será problema. Para mais limites, considere a API Enterprise (paga). Evite loops automáticos excessivos para não atingir o rate limit.</p><h3>Dá para publicar imagens e vídeos no LinkedIn com n8n?</h3><p>Sim. Use o nó Function para converter imagens em base64 ou envie URLs públicas. Vídeos devem ser links externos (máx 10min). O payload deve incluir o campo shareMediaCategory com IMAGE ou VIDEO.</p><h3>Como lidar com erros de autenticação na API do LinkedIn?</h3><p>Verifique se o aplicativo no Developer Portal tem as permissões r_liteprofile e w_member_social. No n8n, revise a credencial OAuth2 e o Redirect URL. Erros 403 geralmente indicam falta de permissão ou token expirado.</p><h3>Posso usar n8n gratuito para automatizar posts no LinkedIn?</h3><p>Sim. O plano gratuito self-hosted do n8n é suficiente para publicar posts no LinkedIn. A limitação está na API do LinkedIn (50 chamadas/dia), não no n8n. Para mais recursos, considere planos pagos na nuvem.

<h2>Automação que transforma sua presença no LinkedIn: o futuro já começou</h2><p>Automatizar posts no LinkedIn com n8n não é apenas sobre ganhar tempo — é sobre escalar sua autoridade digital com consistência e estratégia. Ao eliminar a barreira manual, você foca no que realmente importa: criar conteúdo de valor e engajar sua audiência. O fluxo que você construiu hoje pode ser replicado para qualquer tipo de conteúdo, seja artigos, dicas rápidas ou até mesmo vídeos transcritos. Lembre-se: a automação é sua aliada, mas o engajamento humano é insubstituível. Monitore os resultados, ajuste os horários e, acima de tudo, mantenha a autenticidade em cada post.</p><ul><li>Comece com o plano gratuito do n8n e self-hosted para controle total</li><li>Integre fontes como Google Sheets, RSS ou Notion para diversificar seu conteúdo</li><li>Use imagens e vídeos para aumentar o engajamento (limite: 5MB por imagem)</li><li>Monitore erros com logs detalhados e políticas de retry para evitar bloqueios</li><li>Automatize, mas não esqueça de interagir com comentários e mensagens</li></ul><p>Pronto para levar sua estratégia de conteúdo a outro nível? <a href="/automacao-com-n8n">Explore mais tutoriais de automação com n8n</a> e descubra como otimizar outros processos do seu negócio. O futuro da produtividade não espera — comece hoje mesmo!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto custa automatizar posts no LinkedIn com n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O n8n oferece um plano gratuito self-hosted e planos pagos a partir de US$ 20/mês na nuvem. A API do LinkedIn é gratuita para até 50 chamadas por usuário por dia, suficiente para 3 posts semanais."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso saber programar para usar n8n no LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não é necessário saber programar. O n8n usa nós visuais para conectar APIs. Basta seguir os passos do guia e configurar os nós HTTP Request e Schedule Trigger."
          }
        },
        {
          "@type": "Question",
          "name": "Posso agendar posts no LinkedIn com n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O nó Schedule Trigger permite agendar posts para qualquer data e horário específico, como segunda, quarta e sexta às 9h."
          }
        },
        {
          "@type": "Question",
          "name": "Como conectar n8n à API do LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crie um aplicativo no LinkedIn Developer Portal para obter Client ID e Secret. No n8n, adicione uma credencial OAuth2 LinkedIn e configure o Redirect URL."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os limites da API do LinkedIn para automação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A API gratuita permite 50 chamadas por usuário por dia. Se publicar 3 posts por semana, isso não será problema. Para mais limites, considere a API Enterprise."
          }
        },
        {
          "@type": "Question",
          "name": "Dá para publicar imagens e vídeos no LinkedIn com n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Use o nó Function para converter imagens em base64 ou envie URLs públicas. Vídeos devem ser links externos (máx 10min)."
          }
        },
        {
          "@type": "Question",
          "name": "Como lidar com erros de autenticação na API do LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Verifique se o aplicativo no Developer Portal tem as permissões r_liteprofile e w_member_social. Revise a credencial OAuth2 e o Redirect URL."
          }
        },
        {
          "@type": "Question",
          "name": "Posso usar n8n gratuito para automatizar posts no LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O plano gratuito self-hosted do n8n é suficiente para publicar posts no LinkedIn. A limitação está na API do LinkedIn (50 chamadas/dia)."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Automatize posts no LinkedIn com n8n: fluxo completo para iniciantes",
      "description": "Aprenda a automatizar publicação de posts no LinkedIn com n8n do zero. Guia prático para iniciantes com fluxo completo e dicas de otimização.",
      "inLanguage": "pt-BR",
      "author": {
        "@type": "Organization",
        "name": "Automação.Art"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automação.Art",
        "logo": {
          "@type": "ImageObject",
          "url": "https://automacao.art/wp-content/uploads/2023/10/logo-automacao-art.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art/automatizar-posts-linkedin-com-n8n"
      }
    },
    {
      "@type": "HowTo",
      "name": "Como automatizar posts no LinkedIn com n8n",
      "description": "Passo a passo para automatizar publicação de posts no LinkedIn usando n8n, sem programação.",
      "inLanguage": "pt-BR",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "totalTime": "PT30M",
      "tool": [
        {
          "@type": "HowToTool",
          "name": "n8n"
        },
        {
          "@type": "HowToTool",
          "name": "LinkedIn Developer Portal"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Configurar autenticação com a API do LinkedIn",
          "text": "Crie um aplicativo no LinkedIn Developer Portal para obter Client ID e Secret. Configure a credencial OAuth2 no n8n com o Redirect URL."
        },
        {
          "@type": "HowToStep",
          "name": "Criar fluxo principal para publicar posts",
          "text": "Use nós Schedule Trigger, Set e HTTP Request. Configure o payload JSON com campos obrigatórios como author, lifecycleState e specificContent."
        },
        {
          "@type": "HowToStep",
          "name": "Integrar fontes de conteúdo",
          "text": "Conecte Google Sheets, RSS Feed ou Notion ao n8n. Mapeie colunas como title e text para o payload do LinkedIn."
        },
        {
          "@type": "HowToStep",
          "name": "Adicionar imagens e vídeos nos posts",
          "text": "Use o nó Function para converter imagens em base64 ou envie URLs públicas. Configure o payload com shareMediaCategory IMAGE ou VIDEO."
        },
        {
          "@type": "HowToStep",
          "name": "Lidar com erros e otimizar o fluxo",
          "text": "Trate erros 429 (Rate Limit), 403 (Permissão) e 400 (Payload) com nós Error Trigger e políticas de retry. Monitore logs para debugging."
        }
      ]
    }
  ]
}
</script>