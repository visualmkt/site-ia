---
title: "Prompts prontos para automação de marketing com n8n"
description: "Encontre prompts prontos para n8n e automatize email, redes sociais e geração de leads com IA. Guia passo a passo e exemplos."
cluster: "ferramentas"
formato: "prompts prontos"
pubDate: 2026-08-17
image: "null"
imageAlt: "Workflow n8n automatizando marketing com prompts prontos"
draft: false
---

<h2>Introdução</h2>
<p>Você pode acelerar suas campanhas de marketing usando prompts prontos no n8n. Eles já vêm configurados para capturar leads, enviar e‑mails e publicar posts nas redes sociais.</p>
<p>Com essas receitas, você conecta o n8n a APIs como OpenAI ou Google Gemini sem escrever código complexo. Basta copiar o snippet, colar no nó <strong>Code</strong> ou <strong>ChatGPT</strong> e ativar.</p>

<h2>Prompts prontos para automação de marketing com n8n</h2>
<p>Esta lista contém os prompts mais usados para marketing: captura de leads, envio de e‑mail e postagem em redes sociais. Cada item inclui descrição curta e código pronto para colar no nó <strong>Code</strong>.</p>
<ul>
<li><strong>Captura de Leads</strong> – Recebe dados via webhook e salva em Google Sheets.<br>
<pre><code>const data = $json;
await $node["Google Sheets"].execute({
  operation: "append",
  sheetId: "1A2b3C4d5E6f7G8h9I0j",
  range: "Leads!A2",
  values: [[data.email, data.name, new Date()]]
});
</code></pre>
</li>
<li><strong>Envio de E‑mail</strong> – Usa o nó <strong>Send Email</strong> com template dinâmico.<br>
<pre><code>await $node["Send Email"].execute({
  to: $json.email,
  subject: `Olá ${$json.name}, sua oferta!`,
  html: `<p>Confira a promoção: ${$json.offer}</p>`
});
</code></pre>
</li>
<li><strong>Postagem em Redes Sociais</strong> – Publica no Twitter via API.<br>
<pre><code>await $node["HTTP Request"].execute({
  method: "POST",
  url: "https://api.twitter.com/2/tweets",
  headers: { Authorization: `Bearer ${$env.TWITTER_TOKEN}` },
  body: { text: $json.message }
});
</code></pre>
</li>
</ul>

<table>
<tr><th>Nome</th><th>Objetivo</th><th>IA Utilizada</th></tr>
<tr><td>Captura de Leads</td><td>Armazenar contato em planilha</td><td>None</td></tr>
<tr><td>Envio de E‑mail</td><td>Disparar campanha personalizada</td><td>OpenAI (para gerar texto)</td></tr>
<tr><td>Postagem em Redes Sociais</td><td>Divulgar conteúdo automaticamente</td><td>Google Gemini (geração de copy)</td></tr>
</table>

<p><strong>Curiosidade:</strong> ao usar o nó <strong>Code</strong>, o n8n executa o script em um sandbox Docker, garantindo isolamento total do seu ambiente.</p>

<h2>Como criar e configurar um workflow no n8n usando prompts</h2>
<p>Para usar um prompt pronto, crie um workflow, adicione um nó <strong>Code</strong> ou <strong>ChatGPT</strong> e cole o snippet. O fluxo ficará pronto para disparar em segundos.</p>
<ol>
<li>Abra o n8n e clique em “New Workflow”.<br><strong>Resultado:</strong> tela de edição em branco.</li>
<li>Arraste um nó <strong>Webhook</strong> como gatilho.<br><strong>Resultado:</strong> URL gerado para receber dados.</li>
<li>Adicione o nó <strong>Code</strong> (ou <strong>ChatGPT</strong>) logo após o webhook.<br><strong>Resultado:</strong> campo de script pronto para colar o prompt.</li>
<li>Cole o código do prompt desejado.<br><strong>Resultado:</strong> lógica de automação implementada.</li>
<li>Conecte um nó de ação (e.g., <strong>Send Email</strong>, <strong>HTTP Request</strong>).<br><strong>Resultado:</strong> tarefa final executada.</li>
<li>Salve e ative o workflow.<br><strong>Resultado:</strong> o fluxo começa a operar em produção.</li>
</ol>
<p>Consulte a <a href="https://n8n.io/docs" target="_blank" rel="noopener noreferrer">documentação oficial do n8n</a> para detalhes avançados.</p>
<p><strong>Curiosidade:</strong> o n8n armazena credenciais em criptografia AES‑256, permitindo usar tokens de API sem expô‑los no código.</p>

<h2>Principais casos de uso: email, redes sociais e geração de leads</h2>
<p>Os três fluxos mais comuns são: disparo de e‑mail, publicação automática em redes sociais e captura de leads via webhook. Cada um adapta o prompt ao seu contexto usando parâmetros dinâmicos.</p>

<h3>Disparo de e‑mail</h3>
<p>Use o nó <strong>ChatGPT** para gerar o corpo do e‑mail com base no nome do contato.</p>
<pre><code>{
  "prompt": "Crie um texto de 50 palavras para {{ $json.name }} sobre a oferta {{ $json.offer }}.",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7
}
</code></pre>
<p>Parâmetro dinâmico: <code>{{ $json.name }}</code> e <code>{{ $json.offer }}</code>.</p>

<h3>Postagem em redes sociais</h3>
<p>O nó <strong>HTTP Request</strong> recebe a mensagem gerada pelo Gemini.</p>
<pre><code>{
  "prompt": "Escreva um tweet de até 280 caracteres sobre {{ $json.title }}.",
  "model": "gemini-1.0",
  "temperature": 0.6
}
</code></pre>
<p>Parâmetro dinâmico: <code>{{ $json.title }}</code>.</p>

<h3>Geração de leads</h3>
<p>O webhook captura o formulário e o nó <strong>Code</strong> salva o lead no CRM.</p>
<pre><code>await $node["HubSpot"].execute({
  operation: "create",
  object: "contact",
  properties: {
    email: $json.email,
    firstname: $json.name,
    source: "n8n webhook"
  }
});
</code></pre>
<p>Parâmetro dinâmico: <code>{{ $json.email }}</code> e <code>{{ $json.name }}</code>.</p>

<p><strong>Curiosidade:</strong> ao combinar o nó <strong>Set</strong> com expressões JSONata, você pode gerar URLs de rastreamento UTM em tempo real sem scripts externos.</p>



<h2>Integrações avançadas: ChatGPT, Google Gemini e outras IA</h2>
<p>Você conecta n8n a LLMs usando o nó <strong>HTTP Request</strong> com credenciais de API. Basta definir o <code>Authorization</code> como <code>Bearer YOUR_API_KEY</code> e enviar o <code>prompt</code> em JSON. Cada provedor tem limite de tokens diferente, então ajuste o tamanho da entrada.</p>
<ol>
<li>Crie uma conta no <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">OpenAI</a> ou Google Gemini e copie a chave de API.</li>
<li>Em n8n, vá em “Credenciais” → “Adicionar credencial” → escolha “API Key”. Cole a chave e salve.</li>
<li>Adicione um nó <strong>HTTP Request</strong> após o gatilho.</li>
<li>No campo “Headers”, insira <code>{"Authorization":"Bearer {{$credentials.apiKey}}","Content-Type":"application/json"}</code>.</li>
<li>No corpo, inclua <code>{"model":"gpt-4o","messages":[{"role":"user","content":"{{$json.text}}"}],"max_tokens":1024}</code> para OpenAI ou ajuste <code>"model":"gemini-1.0"</code> para Gemini.</li>
<li>Monitore o campo “usage” na resposta para evitar ultrapassar os limites de tokens.</li>
</ol>
<table>
<tr><th>Provedor</th><th>Limite de tokens</th><th>Endpoint</th><th>Preço (R$ / 1 k tokens)</th></tr>
<tr><td>OpenAI (GPT‑4o)</td><td>8 192</td><td>https://api.openai.com/v1/chat/completions</td><td>R$ 120</td></tr>
<tr><td>Google Gemini</td><td>30 720</td><td>https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0:generateContent</td><td>R$ 80</td></tr>
</table>
<p><strong>Curiosidade:</strong> n8n registra o consumo de tokens em <code>execution.data</code>, permitindo criar alertas automáticos quando a cota está próxima do limite.</p>

<h2>Dicas de otimização para SEO e IA: melhorar a performance dos seus prompts</h2>
<p>Você otimiza prompts focando em clareza, temperatura baixa e cache de respostas. Use palavras‑chave estratégicas e limite o contexto a 500 tokens para acelerar a geração. Monitorar logs ajuda a identificar gargalos.</p>
<ul>
<li><strong>Prompt claro</strong>: inicie com “Escreva um título SEO‑friendly para…” e inclua a palavra‑chave principal.</li>
<li><strong>Temperatura</strong>: valores entre 0.2 e 0.4 produzem textos consistentes e menos variações.</li>
<li><strong>Cache</strong>: adicione o nó <strong>Cache</strong> antes do LLM; armazene resultados por 24 h para reduzir chamadas.</li>
<li><strong>Log</strong>: habilite “Execution Logs” e filtre por “error” ou “slow” para ajustes rápidos.</li>
</ul>
<p><strong>Curiosidade:</strong> ao usar a variável <code>{{$now.format("YYYY-MM-DD")}}</code> no prompt, você gera conteúdos datados automaticamente, melhorando a relevância temporal.</p>

<h2>Ferramentas complementares de IA para enriquecer seus fluxos</h2>
<p>Você amplia seus workflows com IAs que geram imagens, vídeos, logos e transcrições. Cada serviço tem um nó dedicado ou pode ser chamado via <strong>HTTP Request</strong>. Integre-os para criar campanhas completas sem sair do n8n.</p>
<ul>
<li><strong>Geração de imagens</strong>: <a href="/artigos/melhores-ias-para-gerar-imagem-gratis">Melhores IAs para gerar imagem grátis</a>. Use o nó <strong>HTTP Request** para chamar a API do Stable Diffusion.</li>
<li><strong>Criação de vídeos</strong>: <a href="/artigos/melhores-ias-para-gerar-video">Melhores IAs para gerar vídeo</a>. Combine <strong>Execute Command** com ffmpeg para montar clipes.</li>
<li><strong>Design de logos</strong>: <a href="/artigos/melhores-ias-para-criar-logo">Melhores IAs para criar logo</a>. Receba o SVG e salve direto no Google Drive.</li>
<li><strong>Transcrição de áudio</strong>: <a href="/artigos/ia-para-transcrever-audio-em-texto-gratis">IA para transcrever áudio em texto grátis</a>. Envie o arquivo ao Whisper via <strong>HTTP Request**.</li>
<li><strong>Apresentações prontas</strong>: <a href="/artigos/ia-para-criar-apresentacoes-prontas">IA para criar apresentações prontas</a>. Exporta PPTX e envia por e‑mail.</li>
<li><strong>Remoção de fundo</strong>: <a href="/artigos/ia-para-remover-fundo-de-imagem-gratis">IA para remover fundo de imagem grátis</a>. Integre o <strong>Remove.bg** API** no fluxo.</li>
</ul>
<p><strong>Curiosidade:</strong> o nó <strong>Set** com expressões JSONata permite gerar URLs de assets dinamicamente, eliminando a necessidade de scripts externos.</p>



<h2>Perguntas frequentes sobre prompts prontos para automação de marketing com n8n</h2><h3>O que são prompts prontos para n8n?</h3><p>São snippets de código e prompts de IA já configurados para tarefas de marketing no n8n, prontos para copiar e colar nos nós Code ou ChatGPT.</p><h3>Como importar um prompt pronto no n8n?</h3><p>Copie o snippet do prompt, abra o nó Code ou ChatGPT dentro do seu workflow e cole o código. Salve o nó e ative o fluxo para que a automação comece a rodar.</p><h3>É possível usar prompts do ChatGPT dentro de um workflow n8n?</h3><p>Sim. O n8n possui um nó nativo chamado ChatGPT que permite enviar prompts diretamente para a API da OpenAI e receber a resposta dentro do fluxo.</p><h3>Quais são os melhores casos de uso de prompts para marketing?</h3><p>Os casos mais comuns incluem captura de leads, geração de textos para e‑mail, criação de copies para redes sociais, segmentação de anúncios e personalização de landing pages.</p><h3>Preciso de conhecimento avançado em programação para usar esses prompts?</h3><p>Não. Os prompts são entregues como blocos de código já prontos; basta colar nos nós Code ou ChatGPT e ajustar parâmetros simples como variáveis JSON.</p><h3>Como medir o ROI das automações criadas com prompts n8n?</h3><p>Integre métricas de conversão (por exemplo, leads gerados ou cliques em e‑mail) a ferramentas de analytics como Google Analytics ou HubSpot e compare com o custo das chamadas de API.</p><h3>Existe risco de bloqueio ao usar IA em fluxos de automação?</h3><p>O risco é baixo se você respeitar os limites de taxa das APIs e evitar gerar conteúdo que viole as políticas de uso. Sempre monitore logs e configure limites de taxa nos nós HTTP Request.</p>

<h2>Desperte o Poder da Automação: Leve seu Marketing ao Próximo Nível</h2><p>Com os prompts prontos para n8n você transforma tarefas manuais em fluxos automáticos, economizando tempo e garantindo consistência nas campanhas. Basta escolher o snippet, adaptar as variáveis e ativar o workflow – a IA cuida do resto.</p><ul><li>Captura de leads em segundos</li><li>E‑mail marketing personalizado</li><li>Postagens automáticas em redes sociais</li><li>Integração com ChatGPT, Gemini e outras IA</li><li>Otimização de SEO e controle de custos</li></ul><p>Explore mais templates e tutoriais na nossa categoria de automação de marketing com n8n e descubra como acelerar ainda mais seus resultados.</p>

<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"headline\":\"Prompts prontos para automação de marketing com n8n\",\"description\":\"Descubra prompts prontos para automatizar seu marketing com n8n, incluindo exemplos, integração com IA e dicas de implementação passo a passo.\",\"author\":{\"@type\":\"Person\",\"name\":\"automacao.art.br\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"automacao.art.br\"},\"inLanguage\":\"pt-BR\"},{\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"O que são prompts prontos para n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"São snippets de código e prompts de IA já configurados para tarefas de marketing no n8n, prontos para copiar e colar nos nós Code ou ChatGPT.\"}},{\"@type\":\"Question\",\"name\":\"Como importar um prompt pronto no n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Copie o snippet do prompt, abra o nó Code ou ChatGPT dentro do seu workflow e cole o código. Salve o nó e ative o fluxo para que a automação comece a rodar.\"}},{\"@type\":\"Question\",\"name\":\"É possível usar prompts do ChatGPT dentro de um workflow n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim. O n8n possui um nó nativo chamado ChatGPT que permite enviar prompts diretamente para a API da OpenAI e receber a resposta dentro do fluxo.\"}},{\"@type\":\"Question\",\"name\":\"Quais são os melhores casos de uso de prompts para marketing?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Os casos mais comuns incluem captura de leads, geração de textos para e‑mail, criação de copies para redes sociais, segmentação de anúncios e personalização de landing pages.\"}},{\"@type\":\"Question\",\"name\":\"Preciso de conhecimento avançado em programação para usar esses prompts?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Não. Os prompts são entregues como blocos de código já prontos; basta colar nos nós Code ou ChatGPT e ajustar parâmetros simples como variáveis JSON.\"}},{\"@type\":\"Question\",\"name\":\"Como medir o ROI das automações criadas com prompts n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Integre métricas de conversão a ferramentas de analytics como Google Analytics ou HubSpot e compare com o custo das chamadas de API.\"}},{\"@type\":\"Question\",\"name\":\"Existe risco de bloqueio ao usar IA em fluxos de automação?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"O risco é baixo se você respeitar os limites de taxa das APIs e evitar gerar conteúdo que viole as políticas de uso. Sempre monitore logs e configure limites de taxa nos nós HTTP Request.\"}}]},{\"@type\":\"HowTo\",\"name\":\"Como criar e configurar um workflow no n8n usando prompts\",\"description\":\"Passo a passo para montar um fluxo de automação no n8n utilizando prompts prontos.\",\"step\":[{\"@type\":\"HowToStep\",\"name\":\"Criar novo workflow\",\"text\":\"Abra o n8n e clique em “New Workflow” para abrir a tela de edição em branco.\"},{\"@type\":\"HowToStep\",\"name\":\"Adicionar nó Webhook\",\"text\":\"Arraste um nó Webhook como gatilho, gerando uma URL para receber dados.\"},{\"@type\":\"HowToStep\",\"name\":\"Inserir nó Code ou ChatGPT\",\"text\":\"Adicione o nó Code (ou ChatGPT) e cole o snippet do prompt desejado.\"},{\"@type\":\"HowToStep\",\"name\":\"Conectar nó de ação\",\"text\":\"Conecte um nó de ação, como Send Email ou HTTP Request, para executar a tarefa final.\"},{\"@type\":\"HowToStep\",\"name\":\"Salvar e ativar\",\"text\":\"Salve o workflow e ative-o; ele começará a operar em produção.\"}]}]}\</script\>