---
title: "Node HTTP request no n8n: guia completo passo a passo"
description: "Aprenda passo a passo a usar o node HTTP Request no n8n, com exemplos, autenticação, tratamento de erros e integração com APIs como ChatGPT."
cluster: "n8n"
formato: "tutorial"
pubDate: 2026-07-16
image: "https://image.pollinations.ai/prompt/Fluxo%20visual%20do%20node%20HTTP%20Request%20conectado%20a%20um%20webhook%20no%20n8n%2C%20low%20poly%203D%20colorido%2C%20alto%20contraste%20preto%20e%20dourado%2C%20luz%20difusa%20de%20est%C3%BAdio%2C%20sem%20texto%2C%20sem%20letras%2C%20sem%20marca%20dagua%2C%20composi%C3%A7%C3%A3o%2016%3A9?width=1200&height=675&nologo=true&seed=608533"
imageAlt: "node HTTP Request no n8n fluxo de automação"
draft: false
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Node HTTP request do n8n: guia completo</title>
<meta name="description" content="Aprenda passo a passo como usar o node HTTP Request do n8n, configurando URLs, autenticação, tratamento de erros e integração com APIs como ChatGPT.">
<meta name="slug" content="node-http-request-do-n8n-guia-completo">
<link rel="canonical" href="https://automacao.art.br/n8n/node-http-request-do-n8n-guia-completo">
</head>
<body>
<img src="https://automacao.art.br/images/node-http-request-n8n.jpg" alt="node http request do n8n guia completo" style="max-width:100%;height:auto;">
<p>Para fazer requisições HTTP com Node.js dentro do n8n, basta usar o node “HTTP Request”. Ele aceita URL, método, cabeçalhos e corpo, tudo configurável via expressões. Assim você consome APIs externas sem sair da interface visual. Este guia completo mostra como usar o <strong>node HTTP request do n8n</strong> de forma prática.</p>
<p>O fluxo fica mais rápido porque o n8n executa o código Node.js nativamente, sem precisar de plugins adicionais. Você controla timeout, retries e tratamento de erros direto no node.</p>
<p>Com esse guia passo a passo você monta a chamada, adiciona autenticação e depura problemas como quem programa em código puro.</p>

<h2>Node HTTP request do n8n: guia completo passo a passo</h2>
<p>O node HTTP Request permite que você envie chamadas REST usando o runtime Node.js do n8n. Use‑o quando precisar de flexibilidade de cabeçalhos ou de manipular o payload antes de enviar.</p>
<p>Node.js traz suporte a streams e a bibliotecas nativas como <code>https</code>, garantindo performance igual a scripts locais. <a href="https://automacao.art.br/n8n/instalar-n8n-de-graca/">Instale o n8n gratuitamente</a> e comece a testar.</p>
<p>Para detalhes de cada campo, consulte a <a href="https://docs.n8n.io/nodes/n8n-nodes-base.httpRequest/" target="_blank" rel="noopener noreferrer">documentação oficial do n8n</a>.</p>
<p><strong>Curiosidade:</strong> o node HTTP Request reutiliza conexões TCP por até 5 min, reduzindo latência em chamadas frequentes.</p>

<h2>Configurando o node HTTP Request: primeiros passos</h2>
<p>Crie um novo node “HTTP Request” e preencha os campos essenciais: URL, método, headers e body. Use expressões como <code>{{ $json["id"] }}</code> para inserir valores dinâmicos.</p>
<ol>
<li>Arraste o node para o canvas e clique em “Add Node”.</li>
<li>Em “URL”, cole o endpoint da API (ex.: <code>https://api.exemplo.com/v1/resource</code>).</li>
<li>Selecione o método (GET, POST, PUT, DELETE).</li>
<li>Em “Headers”, adicione pares chave‑valor; use <code>Content-Type: application/json</code> para JSON.</li>
<li>Se precisar enviar corpo, escolha “JSON” em “Body Parameters” e preencha os campos.</li>
</ol>
<p>Parâmetros mais usados:</p>
<ul>
<li>queryString – parâmetros na URL.</li>
<li>json – objeto JSON no corpo.</li>
<li>binaryData – arquivos binários.</li>
<li>options – timeout, followRedirects.</li>
</ul>
<p><strong>Curiosidade:</strong> ao usar “{{ $now }}</code> em um header, o n8n injeta a data/hora atual no formato ISO 8601.</p>

<h2>Autenticação e segurança nas requisições</h2>
<p>Você pode proteger a chamada adicionando Bearer Token, Basic Auth ou API Key diretamente nos headers ou usando credenciais armazenadas no n8n.</p>
<p>Para credenciais, crie um “Credential” do tipo “HTTP Basic Auth” ou “OAuth2” e selecione‑lo no campo “Authentication” do node.</p>
<table>
<tr><th>Tipo</th><th>Como aplicar</th><th>Onde armazenar</th></tr>
<tr><td>Bearer Token</td><td>Header <code>Authorization: Bearer {{ $credentials.token }}</code></td><td>Credential “OAuth2 Access Token”</td></tr>
<tr><td>Basic Auth</td><td>Campo “Authentication” → “Basic Auth”</td><td>Credential “HTTP Basic Auth”</td></tr>
<tr><td>API Key</td><td>Header ou queryString definido manualmente</td><td>Credential “API Key” (custom)</td></tr>
</table>
<p>Exemplo: <code>Authorization: Bearer {{ $credentials.openaiApiKey }}</code> usando a credencial “OpenAI API Key”.</p>
<p><strong>Curiosidade:</strong> o n8n criptografa credenciais em repouso, mas recomenda‑se usar variáveis de ambiente para chaves sensíveis.</p>

<h2>Tratamento de erros e debug</h2>
<p>Capture códigos de status usando a expressão <code>{{$node["HTTP Request"].json["statusCode"]}}</code> e configure “Continue on Fail” para evitar interrupções.</p>
<p>Para timeout, ajuste “Options → Timeout (ms)” e use “Retry On Fail” para tentativas automáticas. Adicione um node “Error Trigger” após o HTTP Request para centralizar falhas.</p>
<p>Para depurar, insira um node “Set” com <code>console.log($json)</code> ou use o painel “Execution” para visualizar logs detalhados.</p>
<p>Veja mais sobre erros comuns em <a href="https://automacao.art.br/n8n/erros-comuns-n8n/">nosso artigo de erros no n8n</a>.</p>
<p><strong>Curiosidade:</strong> ao habilitar “Response Format → Full Response”, o n8n devolve cabeçalhos, status e body em um único objeto, facilitando inspeções avançadas.</p>

<h2>Integração ChatGPT com node HTTP Request no n8n</h2>
<p>Você pode chamar a API ChatGPT usando o node “HTTP Request” e receber a resposta em JSON. Basta montar o payload, inserir a chave da OpenAI nos headers e tratar o retorno no fluxo.</p>
<ol>
<li>Crie um node “Set” chamado <strong>Prompt</strong> e defina <code>prompt</code> com <code>{{ $json["texto"] }}</code> ou texto fixo.</li>
<li>Adicione o node “HTTP Request”:
<ul>
<li>URL: <code>https://api.openai.com/v1/chat/completions</code></li>
<li>Método: <code>POST</code></li>
<li>Headers:
<table>
<tr><th>Header</th><th>Valor</th></tr>
<tr><td>Content-Type</td><td>application/json</td></tr>
<tr><td>Authorization</td><td>Bearer {{ $credentials.openaiApiKey }}</td></tr>
</table>
</li>
<li>Body (JSON):
<pre><code>{
  "model": "gpt-3.5-turbo",
  "messages": [
    { "role": "user", "content": "{{ $node[\"Prompt\"].json[\"prompt\"] }}" }
  ],
  "temperature": 0.7
}</code></pre>
</li>
</ul>
</li>
<li>Conecte um node “Set” chamado <strong>Resposta</strong> e extraia <code>{{$json["choices"][0]["message"]["content"]}}</code> do output do HTTP Request.</li>
<li>Opcional: use “Response Format → Full Response” para debugar cabeçalhos e status.</li>
</ol>
<p><strong>Curiosidade:</strong> o campo <code>model</code> aceita “gpt-4” se sua conta tiver acesso, trazendo respostas mais detalhadas.</p>

<h2>Boas práticas e otimizações para produção</h2>
<p>Em produção você deve garantir segurança, performance e controle de custos. Siga estas recomendações para evitar gargalos.</p>
<ul>
<li><strong>Limpeza de dados:</strong> valide o <code>prompt</code> antes de enviar; remova caracteres inesperados.</li>
<li><strong>Credenciais reutilizáveis:</strong> armazene a API Key em um “Credential” do tipo “OAuth2 Access Token” e referencie‑a nos headers.</li>
<li><strong>Limites de taxa:</strong> respeite o rate‑limit da OpenAI (120 req/min). Use “Retry On Fail” com back‑off exponencial.</li>
<li><strong>Caching opcional:</strong> guarde respostas em um node “Cache” (Redis) quando o prompt for repetido.</li>
<li><strong>Hospedagem:</strong> em self‑hosted ajuste <code>maxSockets</code> no <code>http.globalAgent</code> para 50 conexões simultâneas; na cloud, habilite autoscaling para picos de carga.</li>
</ul>
<p><strong>Curiosidade:</strong> o n8n permite definir “Rate Limit” no node “HTTP Request” para throttling automático, evitando bloqueios da OpenAI.</p>

<h2>Recursos avançados: combinando com outros nodes e IA</h2>
<p>Depois de obter a resposta do ChatGPT, encadeie nodes de transformação ou chame outras APIs de IA para enriquecer o fluxo.</p>
<ul>
<li><strong>Node “Function”:</strong> formate a resposta em markdown ou extraia palavras‑chave.</li>
<li><strong>Node “SplitInBatches”:</strong> processe múltiplos prompts em paralelo, respeitando limites de taxa.</li>
<li><strong>Integração Gemini:</strong> use outro “HTTP Request” apontando para <code>https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent</code> e combine as respostas.</li>
<li><strong>Perplexity AI:</strong> chame <code>https://api.perplexity.ai/chat/completions</code> para buscas contextuais.</li>
<li><strong>WhatsApp automático:</strong> encadeie o node “ChatGPT” com o node “Twilio” ou <a href="https://automacao.art.br/n8n/usar-ia-para-responder-whatsapp-automaticamente/">artigo sobre IA no WhatsApp</a> para enviar respostas em tempo real.</li>
</ul>
<p><strong>Curiosidade:</strong> ao ativar “Execute Once” em um node “Set”, você pode gerar um prompt estático que serve como “system prompt” para todas as chamadas subsequentes.</p>

<h2>Perguntas frequentes sobre node http request do n8n guia completo</h2>
<h3>O que é o node http request no n8n?</h3>
<p>É um node que permite enviar requisições HTTP/HTTPS usando o runtime Node.js do n8n, configurando URL, método, cabeçalhos e corpo.</p>
<h3>Como configurar um node HTTP Request no n8n?</h3>
<p>Arraste o node, preencha URL, método, headers e body; use expressões como {{ $json["id"] }} para inserir valores dinâmicos.</p>
<h3>É possível usar autenticação bearer token no node HTTP Request?</h3>
<p>Sim, basta adicionar o header <code>Authorization: Bearer {{ $credentials.token }}</code> ou usar credenciais OAuth2 armazenadas no n8n.</p>
<h3>Qual a diferença entre o node HTTP Request e o node HTTP Trigger?</h3>
<p>HTTP Request envia chamadas para APIs externas, enquanto HTTP Trigger aguarda chamadas inbound para iniciar um fluxo.</p>
<h3>Como tratar erros de timeout nas requisições HTTP do n8n?</h3>
<p>Configure o campo Options → Timeout (ms) e habilite Retry On Fail; use um node Error Trigger para capturar falhas.</p>
<h3>Posso usar variáveis de ambiente no node HTTP Request?</h3>
<p>Sim, referencie variáveis com {{ $env.VAR_NAME }} nos campos de URL, headers ou body.</p>
<h3>Como depurar uma chamada API que falhou no n8n?</h3>
<p>Ative “Response Format → Full Response”, adicione um node Set com <code>console.log($json)</code> ou use o painel Execution para ver logs detalhados.</p>
<h3>É necessário instalar dependências adicionais para usar Node.js no n8n?</h3>
<p>Não. O n8n já inclui o runtime Node.js e as bibliotecas padrão; basta usar o node HTTP Request.</p>

<h2>Domine as requisições HTTP no n8n e leve sua automação ao próximo nível</h2>
<p>Com este guia você aprendeu a criar, configurar e depurar o node HTTP Request, aplicar autenticação segura e integrar APIs avançadas como a do ChatGPT. Agora, suas automações podem conversar com qualquer serviço externo de forma confiável e escalável.</p>
<ul>
  <li>Configure URLs e métodos rapidamente.</li>
  <li>Use credenciais e variáveis de ambiente para segurança.</li>
  <li>Trate erros de timeout e retries de forma automática.</li>
  <li>Combine o node com IA e outros nodes para fluxos poderosos.</li>
</ul>
<p>Quer aprofundar ainda mais? Explore a categoria <a href="https://automacao.art.br/n8n/">n8n</a> e descubra tutoriais, casos de uso e dicas avançadas.</p>

<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Node HTTP request do n8n: guia completo passo a passo","description":"Aprenda passo a passo como usar o node HTTP Request do n8n, configurando URLs, autenticação, tratamento de erros e integração com APIs como ChatGPT.","author":{"@type":"Person","name":"Automação ART"},"publisher":{"@type":"Organization","name":"automacao.art.br","url":"https://automacao.art.br"},"inLanguage":"pt-BR"},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é o node http request no n8n?","acceptedAnswer":{"@type":"Answer","text":"É um node que permite enviar requisições HTTP/HTTPS usando o runtime Node.js do n8n, configurando URL, método, cabeçalhos e corpo."}},{"@type":"Question","name":"Como configurar um node HTTP Request no n8n?","acceptedAnswer":{"@type":"Answer","text":"Arraste o node, preencha URL, método, headers e body; use expressões como {{ $json[\"id\"] }} para inserir valores dinâmicos."}},{"@type":"Question","name":"É possível usar autenticação bearer token no node HTTP Request?","acceptedAnswer":{"@type":"Answer","text":"Sim, basta adicionar o header Authorization: Bearer {{ $credentials.token }} ou usar credenciais OAuth2 armazenadas no n8n."}},{"@type":"Question","name":"Qual a diferença entre o node HTTP Request e o node HTTP Trigger?","acceptedAnswer":{"@type":"Answer","text":"HTTP Request envia chamadas para APIs externas, enquanto HTTP Trigger aguarda chamadas inbound para iniciar um fluxo."}},{"@type":"Question","name":"Como tratar erros de timeout nas requisições HTTP do n8n?","acceptedAnswer":{"@type":"Answer","text":"Configure o campo Options → Timeout (ms) e habilite Retry On Fail; use um node Error Trigger para capturar falhas."}},{"@type":"Question","name":"Posso usar variáveis de ambiente no node HTTP Request?","acceptedAnswer":{"@type":"Answer","text":"Sim, referencie variáveis com {{ $env.VAR_NAME }} nos campos de URL, headers ou body."}},{"@type":"Question","name":"Como depurar uma chamada API que falhou no n8n?","acceptedAnswer":{"@type":"Answer","text":"Ative “Response Format → Full Response”, adicione um node Set com console.log($json) ou use o painel Execution para ver logs detalhados."}},{"@type":"Question","name":"É necessário instalar dependências adicionais para usar Node.js no n8n?","acceptedAnswer":{"@type":"Answer","text":"Não. O n8n já inclui o runtime Node.js e as bibliotecas padrão; basta usar o node HTTP Request."}}]} ,{"@type":"HowTo","name":"Como fazer requisições HTTP usando Node.js no n8n","description":"Passo a passo para criar, configurar e depurar um node HTTP Request no n8n, incluindo autenticação e integração com a API do ChatGPT.","step":[{"@type":"HowToStep","name":"Adicionar o node HTTP Request","text":"Arraste o node HTTP Request para o canvas e abra as configurações."},{"@type":"HowToStep","name":"Configurar URL e método","text":"Preencha a URL da API e selecione GET, POST, PUT ou DELETE."},{"@type":"HowToStep","name":"Definir cabeçalhos e corpo","text":"Adicione headers como Content-Type e Authorization; insira o payload JSON no campo Body."},{"@type":"HowToStep","name":"Adicionar autenticação","text":"Crie credenciais OAuth2 ou API Key e referencie-as nos headers."},{"@type":"HowToStep","name":"Tratar erros e testar","text":"Configure timeout, retries e use um node Error Trigger para capturar falhas; execute o fluxo e verifique os logs."}]}] }</script>
</body>
</html>