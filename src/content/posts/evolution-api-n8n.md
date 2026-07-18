---
title: "Evolution API: o que é e como usar com n8n passo a passo"
description: "Aprenda o que é Evolution API e veja passo a passo como integrá‑la ao n8n para automatizar processos de forma econômica e rápida."
cluster: "n8n"
formato: "tutorial"
pubDate: 2026-07-18
image: "https://image.pollinations.ai/prompt/Diagrama%20do%20fluxo%20n8n%20integrando%20Evolution%20API%2C%20arte%20de%20quadrinhos%20com%20tra%C3%A7o%20forte%2C%20cores%20neon%20sobre%20fundo%20escuro%2C%20contraluz%20dram%C3%A1tico%2C%20sem%20texto%2C%20sem%20letras%2C%20sem%20marca%20dagua%2C%20composi%C3%A7%C3%A3o%2016%3A9?width=1200&height=675&nologo=true&seed=193283"
imageAlt: "Workflow n8n com Evolution API"
draft: false
---

<h2>Evolution API: o que é e como usar com n8n</h2>
<p>A <strong>Evolution API</strong> é uma API aberta para integração com modelos de linguagem e IA, focada em custo baixo e latência reduzida para aplicações brasileiras. Ela permite enviar prompts e receber respostas estruturadas via HTTP, semelhante ao funcionamento da OpenAI, mas com preços até 90% menores em alguns casos. Para usá-la no n8n, você configura um <strong>node HTTP Request</strong> com a URL da API e autenticação via token ou OAuth2.</p>
<p>Se você já usa n8n para automações, integrar a Evolution API é direto: basta substituir a URL do endpoint da OpenAI (por exemplo) pela da Evolution, ajustar o payload e pronto. A API é ideal para quem busca alternativas locais ou open-source sem abrir mão de performance. <a href="https://evolutionapi.com/docs" target="_blank" rel="noopener noreferrer">A documentação oficial</a> detalha todos os endpoints e exemplos de requisições.</p>

<h2>Por que usar Evolution API no n8n? Benefícios e casos de uso</h2>
<p>A Evolution API se destaca por três vantagens principais no n8n: <strong>custo 80-90% menor</strong> que APIs como OpenAI ou Gemini em requisições de alto volume, <strong>latência baixa</strong> (geralmente <500ms) por servidores brasileiros, e <strong>personalização</strong> de modelos para contextos locais. Isso é ideal para automações em negócios pequenos que não podem pagar por APIs premium.</p>
<p>Exemplos de uso no n8n:</p>
<ul>
<li>Atendimento automatizado via WhatsApp com respostas em português natural.</li>
<li>Análise de sentimentos em comentários de redes sociais em tempo real.</li>
<li>Geração de relatórios personalizados com dados de bancos ou planilhas.</li>
</ul>
<p>Para comparar com outras plataformas de automação, veja como o n8n se sai frente ao Make ou Zapier: <a href="https://automacao.art.br/n8n/n8n-vs-make-vs-zapier/">n8n vs Make vs Zapier</a>.</p>

<h2>Pré‑requisitos: configurando seu ambiente n8n</h2>
<p>Antes de integrar a Evolution API, seu n8n precisa estar atualizado (versão 1.0+). Se você usa n8n auto-hosted, verifique os requisitos: Node.js 18+, Docker (opcional), e 2GB de RAM para workloads leves. Para instalação gratuita, siga os guias oficiais:</p>
<table>
<tr><th>Método</th><th>Recursos</th><th>Link</th></tr>
<tr><td>Instalação local (Windows/macOS/Linux)</td><td>Node.js + npm, 1GB RAM</td><td><a href="https://automacao.art.br/n8n/instalar-n8n-de-graca/">Instalar n8n de graça</a></td></tr>
<tr><td>VPS com Docker</td><td>Ubuntu 22.04, 2GB RAM, 10GB SSD</td><td><a href="https://automacao.art.br/n8n/instalar-n8n-na-vps-com-docker/">Instalar n8n na VPS com Docker</a></td></tr>
</table>
<p>Curiosidade: o n8n auto-hosted permite usar credenciais seguras para tokens da Evolution API, sem expor chaves no código ou em serviços terceiros.</p>

<h2>Passo a passo: criando o workflow com Evolution API</h2>
<p>Para criar um workflow no n8n que use a Evolution API, siga estes passos. O coração do processo é o <strong>node HTTP Request</strong>, que envia prompts e recebe respostas. Abaixo, uma tabela com os campos obrigatórios:</p>

<ol>
<li><p><strong>Crie um novo workflow</strong> no n8n e adicione um node <strong>HTTP Request</strong>.</p></li>
<li><p><strong>Configure o método e URL</strong>: Use <code>POST</code> e a URL base da Evolution API (ex.: <code>https://api.evolutionapi.com/v1/chat/completions</code>).</p></li>
<li><p><strong>Adicione o cabeçalho de autenticação</strong>: Insira <code>Authorization: Bearer SEU_TOKEN</code> nos headers.</p></li>
<li><p><strong>Defina o payload</strong> no corpo da requisição (exemplo para texto):</p>
<pre>{
  "model": "gpt-4o-mini",
  "messages": [
    {"role": "user", "content": "Olá, como posso ajudar?"}
  ]
}</pre>
</li>
<li><p><strong>Teste e execute</strong>: Clique em "Execute" e confira a resposta no node seguinte (ex.: <strong>Set</strong> ou <strong>Function</strong>).</p></li>
</ol>

<table>
<tr><th>Campo</th><th>Valor obrigatório</th><th>Exemplo</th></tr>
<tr><td>URL</td><td>Endpoint da Evolution API</td><td><code>https://api.evolutionapi.com/v1/chat/completions</code></td></tr>
<tr><td>Método</td><td><code>POST</code></td><td><code>POST</code></td></tr>
<tr><td>Authorization</td><td><code>Bearer SEU_TOKEN</code></td><td><code>Bearer abc123...</code></td></tr>
<tr><td>Body (raw JSON)</td><td>Payload com model e messages</td><td><code>{"model": "gpt-4o-mini", "messages": [...]}</code></td></tr>
<tr><td>Headers</td><td><code>Content-Type: application/json</code></td><td><code>application/json</code></td></tr>
</table>
<p>Resultado esperado: uma resposta JSON com a mensagem gerada pela IA, pronta para ser usada em nodes subsequentes. Para mais detalhes sobre o node HTTP Request, confira o <a href="https://automacao.art.br/n8n/node-http-request-n8n-guia-completo/">guia completo</a>.</p>
<p>Curiosidade: a Evolution API aceita requisições em lote (batch), ideal para processar múltiplos prompts em um único request e reduzir custos.</p>



<h2>Trabalhando com autenticação e tokens na Evolution API</h2>
<p>Você deve usar credenciais do tipo <strong>OAuth2</strong> ou <strong>JWT</strong> para acessar a Evolution API. No n8n, crie uma credencial “API Key” segura e referencie‑a nos nodes HTTP Request.</p>
<p>Passo a passo para criar a credencial:</p>
<ol>
<li>Abra <strong>Credentials</strong> > <strong>New Credential</strong> > <strong>API Key</strong>.</li>
<li>Insira <code>Authorization</code> como nome e cole <code>Bearer SEU_TOKEN</code> no campo “API Key”.</li>
<li>Marque “Encrypt” para que o token seja armazenado criptografado.</li>
<li>Salve e selecione a credencial no node HTTP Request → “Authentication”.</li>
</ol>
<table>
<tr><th>Campo</th><th>Valor esperado</th><th>Exemplo</th></tr>
<tr><td>Tipo</td><td>OAuth2 ou JWT</td><td>Bearer</td></tr>
<tr><td>Header</td><td>Authorization</td><td>Bearer abc123def456</td></tr>
<tr><td>Expiração</td><td>Segundos</td><td>3600</td></tr>
<tr><td>Refresh URL</td><td>Opcional</td><td>https://api.evolutionapi.com/oauth/token</td></tr>
</table>
<p>Curiosidade: ao usar “OAuth2 Client Credentials”, o n8n renova o token automaticamente antes da expiração, evitando falhas inesperadas.</p>

<h2>Tratando erros e depurando chamadas HTTP no n8n</h2>
<p>Quando a Evolution API devolve erro, o n8n captura o código e permite retry ou fallback. Use o recurso “Error Workflow” para redirecionar falhas e registrar logs detalhados.</p>
<p>Configure tratamento de erro:</p>
<ol>
<li>Arraste um node <strong>Set</strong> após o HTTP Request.</li>
<li>Ative a opção “Continue On Fail”.</li>
<li>Adicione um node <strong>Function</strong> que verifica <code>items[0].json.error?.code</code>.</li>
<li>Use <strong>Retry</strong> (max 3 tentativas) no HTTP Request se o código for 429 ou 500.</li>
</ol>
<table>
<tr><th>Código</th><th>Significado</th><th>Ação recomendada</th></tr>
<tr><td>400</td><td>Bad Request</td><td>Verifique payload JSON.</td></tr>
<tr><td>401</td><td>Unauthorized</td><td>Renove token ou credencial.</td></tr>
<tr><td>429</td><td>Too Many Requests</td><td>Aplicar backoff e retry.</td></tr>
<tr><td>500</td><td>Internal Server Error</td><td>Retry após 2 s.</td></tr>
<tr><td>503</td><td>Service Unavailable</td><td>Verificar disponibilidade da API.</td></tr>
</table>
<p>Para detalhes completos dos códigos, veja a <a href="https://evolutionapi.com/docs/errors" target="_blank" rel="noopener noreferrer">documentação oficial de erros</a>.</p>
<p>Curiosidade: o node HTTP Request permite habilitar “Response Size Limit” para evitar gargalos quando a API devolve respostas gigantes.</p>

<h2>Melhores práticas e otimizações avançadas</h2>
<p>Para escalar seu workflow, cache respostas, paralelize requisições e respeite limites de taxa. Essas táticas reduzem custos e melhoram a latência.</p>
<p>Estratégias recomendadas:</p>
<ul>
<li><strong>Cache de respostas</strong>: use o node <strong>Cache</strong> (Redis ou memória) para armazenar resultados por chave de prompt.</li>
<li><strong>Paralelismo</strong>: divida lotes de prompts em múltiplos nodes HTTP Request com “Execute Once” desativado.</li>
<li><strong>Rate limiting</strong>: configure “Throttle” (ex.: 20 req/s) antes de enviar ao endpoint.</li>
<li><strong>Escala na VPS</strong>: reserve 4 GB RAM e CPU 2 cores para workloads intensos; ajuste o parâmetro “MAX_CONCURRENCY”.</li>
</ul>
<table>
<tr><th>Otimização</th><th>Configuração</th><th>Benefício</th></tr>
<tr><td>Cache (Redis)</td><td>TTL 300 s</td><td>Reduz chamadas em 40 %.</td></tr>
<tr><td>Paralelismo</td><td>5 workers simultâneos</td><td>Acelera processamento em lote.</td></tr>
<tr><td>Throttle</td><td>20 req/s</td><td>Evita 429.</td></tr>
<tr><td>Docker Swarm</td><td>Replicas 3</td><td>Alta disponibilidade.</td></tr>
</table>
<p>Para aprofundar, veja o <a href="https://automacao.art.br/n8n/n8n-guia-completo/">n8n guia completo</a> com exemplos de cache e paralelismo.</p>
<p>Curiosidade: a Evolution API aceita o parâmetro <code>stream</code> que devolve tokens em tempo real; combinar isso com “WebSocket” no n8n permite respostas instantâneas em dashboards.</p>



<h2>Perguntas frequentes sobre Evolution API e como usar com n8n</h2><h3>O que é Evolution API?</h3><p>Evolution API é uma API de inteligência artificial que disponibiliza modelos de linguagem com foco em baixo custo e latência para o Brasil, permitindo enviar prompts e receber respostas estruturadas via HTTP.</p><h3>É necessário pagar para usar Evolution API?</h3><p>Sim, a Evolution API possui planos pagos, mas oferece preços significativamente menores que concorrentes como OpenAI, além de um plano gratuito com limites de uso mensais.</p><h3>Qual a diferença entre Evolution API e outras APIs de IA?</h3><p>Além do custo reduzido, a Evolution API oferece servidores localizados no Brasil, menor latência e a possibilidade de personalizar modelos para contextos regionais, algo menos comum em APIs como OpenAI ou Gemini.</p><h3>Posso usar Evolution API em um workflow n8n auto‑hosted?</h3><p>Sim, a API pode ser consumida em qualquer ambiente n8n, inclusive auto‑hosted, bastando configurar o node HTTP Request com a URL e autenticação adequadas.</p><h3>Como configurar autenticação na Evolution API dentro do n8n?</h3><p>Crie uma credencial do tipo API Key ou OAuth2 no n8n, armazenando o token (ex.: Bearer SEU_TOKEN) de forma criptografada e selecione‑a no node HTTP Request na seção “Authentication”.</p><h3>Quais limites de taxa (rate limits) a Evolution API impõe?</h3><p>A Evolution API geralmente permite até 20 requisições por segundo por chave, retornando código 429 quando o limite é excedido; recomenda‑se usar throttling ou retry exponencial.</p><h3>É possível depurar chamadas da Evolution API no n8n?</h3><p>Sim, o n8n captura o código de status e o corpo da resposta, permitindo visualizar logs, usar nodes “Set” com “Continue On Fail” e criar workflows de erro para inspeção detalhada.</p><h3>Existe suporte oficial para Evolution API no n8n?</h3><p>Não há um plugin oficial, mas a comunidade n8n fornece exemplos e o próprio node HTTP Request cobre todas as necessidades de integração.</p>

<h2>Desbrave a Automação com Evolution API e n8n</h2><p>Integrar a Evolution API ao n8n permite criar fluxos de trabalho inteligentes, econômicos e de baixa latência, aproveitando o poder da IA localmente. Com as etapas apresentadas, você já pode enviar prompts, tratar respostas e escalar suas automações com segurança.</p><ul><li>Configuração rápida usando o node HTTP Request.</li><li>Autenticação segura via credenciais n8n.</li><li>Tratamento de erros e retry automático.</li><li>Otimizações como cache, paralelismo e controle de taxa.</li></ul><p>Explore mais artigos sobre automação no n8n e descubra novas possibilidades na nossa categoria de <a href="https://automacao.art.br/n8n/">automação n8n</a>.</p>

<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"Article\",\"headline\":\"Evolution API: o que é e como usar com n8n passo a passo\",\"description\":\"Descubra o que é Evolution API e aprenda passo a passo como integrá‑la ao n8n para automatizar seus processos.\",\"author\":{\"@type\":\"Person\",\"name\":\"Automação.art\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"automacao.art.br\",\"url\":\"https://automacao.art.br\"},\"inLanguage\":\"pt-BR\",\"url\":\"https://automacao.art.br/evolution-api-n8n\",\"datePublished\":\"2024-10-01\"},{\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"O que é Evolution API?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Evolution API é uma API de IA que oferece modelos de linguagem com baixo custo e latência, focada no mercado brasileiro.\"}},{\"@type\":\"Question\",\"name\":\"É necessário pagar para usar Evolution API?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, a Evolution API possui planos pagos, mas oferece preços significativamente menores que concorrentes como OpenAI, além de um plano gratuito com limites mensais.\"}},{\"@type\":\"Question\",\"name\":\"Qual a diferença entre Evolution API e outras APIs de IA?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Além do custo reduzido, a Evolution API tem servidores no Brasil, menor latência e permite personalizar modelos para contextos regionais, algo menos comum em APIs como OpenAI ou Gemini.\"}},{\"@type\":\"Question\",\"name\":\"Posso usar Evolution API em um workflow n8n auto‑hosted?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, basta configurar o node HTTP Request com a URL e autenticação corretas; o n8n auto‑hosted suporta a integração sem restrições.\"}},{\"@type\":\"Question\",\"name\":\"Como configurar autenticação na Evolution API dentro do n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Crie uma credencial API Key ou OAuth2 no n8n, armazene o token criptografado e selecione‑a no node HTTP Request na seção Authentication.\"}},{\"@type\":\"Question\",\"name\":\"Quais limites de taxa (rate limits) a Evolution API impõe?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"A API permite até 20 requisições por segundo por chave; ao exceder, retorna código 429, sendo recomendável usar throttling ou retry exponencial.\"}},{\"@type\":\"Question\",\"name\":\"É possível depurar chamadas da Evolution API no n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, o n8n captura status e corpo da resposta, permitindo logs, nodes Set com Continue On Fail e workflows de erro para inspeção detalhada.\"}},{\"@type\":\"Question\",\"name\":\"Existe suporte oficial para Evolution API no n8n?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Não há plugin oficial, mas a comunidade n8n fornece exemplos e o node HTTP Request cobre todas as necessidades de integração.\"}}]},{\"@type\":\"HowTo\",\"name\":\"Integrar Evolution API ao n8n passo a passo\",\"description\":\"Tutorial para criar um workflow no n8n que envia prompts à Evolution API e trata a resposta.\",\"step\":[{\"@type\":\"HowToStep\",\"name\":\"Criar workflow e adicionar node HTTP Request\",\"text\":\"No n8n, crie um novo workflow e insira um node HTTP Request.\"},{\"@type\":\"HowToStep\",\"name\":\"Configurar URL e método\",\"text\":\"Defina o método POST e a URL https://api.evolutionapi.com/v1/chat/completions.\"},{\"@type\":\"HowToStep\",\"name\":\"Adicionar cabeçalho de autenticação\",\"text\":\"Inclua o header Authorization: Bearer SEU_TOKEN.\"},{\"@type\":\"HowToStep\",\"name\":\"Definir payload JSON\",\"text\":\"Insira o JSON com model e messages conforme a documentação.\"},{\"@type\":\"HowToStep\",\"name\":\"Testar e usar a resposta\",\"text\":\"Execute o node e encaminhe a resposta para os próximos nodes, como Set ou Function.\"}] }]}\</script\>