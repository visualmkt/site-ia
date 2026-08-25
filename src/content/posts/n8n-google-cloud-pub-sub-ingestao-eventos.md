---
title: "Como usar n8n com Google Cloud Pub/Sub para ingestão de eventos"
description: "Aprenda a integrar n8n com Google Cloud Pub/Sub para receber eventos em tempo real e automatizar fluxos sem código. Guia completo com passo a passo e dicas de performance."
cluster: "ferramentas"
formato: "como fazer/automatizar"
pubDate: 2026-08-25
image: "https://www.automacao.art.br/images/posts/n8n-google-cloud-pub-sub-ingestao-eventos.jpg"
imageAlt: "Fluxograma de integração n8n com Google Cloud Pub/Sub para ingestão de eventos"
draft: false
---

<h2>Como usar n8n com Google Cloud Pub/Sub para ingestão de eventos: guia completo</h2>
<p>Aprenda a integrar <strong>n8n com Google Cloud Pub/Sub</strong> para receber eventos em tempo real e automatizar fluxos sem complicação. Este guia passo a passo cobre desde a configuração do ambiente no Google Cloud até a construção de fluxos robustos no n8n, incluindo tratamento de erros, otimização de performance e boas práticas de segurança.</p>

<h2>O que é Google Cloud Pub/Sub e por que usá-lo com n8n?</h2>
<p>O <strong>Google Cloud Pub/Sub</strong> é um serviço de mensageria assíncrona que desacopla produtores e consumidores de eventos, ideal para sistemas que precisam escalar sem bloqueios. Diferente de webhooks tradicionais, ele garante entrega de mensagens mesmo em picos de tráfego, retendo eventos até que o consumidor esteja disponível. Use-o para automações como notificações em tempo real, processamento de logs ou disparo de ações após eventos externos.</p>
<p>No n8n, o Pub/Sub substitui APIs REST polling ou webhooks instáveis, pois recebe mensagens via HTTP push assim que chegam ao tópico. Um exemplo prático: uma compra no seu site gera um evento no Pub/Sub, que o n8n processa para enviar um e-mail de confirmação e registrar no <a href="https://automacao.art.br/melhores-ias-para-gerar-imagem-gratis" target="_blank" rel="noopener noreferrer">Google Sheets</a> — tudo sem código.</p>
<p><strong>Curiosidade técnica:</strong> O Pub/Sub usa um modelo de "assinatura" (subscription) que permite múltiplos consumidores lerem o mesmo tópico sem conflitos, algo impossível com webhooks diretos.</p>

<h2>Pré-requisitos: configurando o ambiente no Google Cloud</h2>
<p>Você precisa de um projeto no Google Cloud com a API Pub/Sub ativada e uma <strong>Service Account</strong> com permissões mínimas. Siga os passos abaixo para liberar o acesso:</p>

<ol>
  <li>
    <strong>Crie um projeto no Google Cloud</strong>:
    Acesse <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>, clique em "Criar Projeto" e nomeie-o (ex: "n8n-pubsub-automacao").
  </li>
  <li>
    <strong>Habilite a API Pub/Sub</strong>:
    No console, vá em "APIs e Serviços" > "Biblioteca", pesquise por "Pub/Sub" e clique em "Habilitar".
  </li>
  <li>
    <strong>Crie uma Service Account</strong>:
    Em "IAM e administração" > "Service Accounts", clique em "Criar conta de serviço". Digite um nome (ex: "n8n-pubsub-reader") e atribua a role "Pub/Sub Subscriber".
  </li>
  <li>
    <strong>Gere e baixe a chave JSON</strong>:
    Na Service Account, vá em "Chaves" > "Adicionar Chave" > "Criar nova chave" (JSON). Salve o arquivo como `n8n-pubsub-key.json` — você usará ele no n8n.
    <a href="https://cloud.google.com/pubsub/docs/quickstart-console#create_a_service_account" target="_blank" rel="noopener noreferrer">Documentação oficial da Service Account</a>
  </li>
</ol>

<h2>Como configurar o n8n para se conectar ao Pub/Sub</h2>
<p>No n8n, você usará o node <strong>HTTP Request</strong> para se conectar ao Pub/Sub, seja para publicar ou assinar mensagens. Veja como:</p>

<ol>
  <li>
    <strong>Instale o node HTTP Request</strong>:
    No editor do n8n, clique em "+" > "Nodes" e pesquise por "HTTP Request". Arraste-o para o fluxo.
  </li>
  <li>
    <strong>Configure as credenciais</strong>:
    Crie uma nova credencial do tipo "Google OAuth2 API" ou "JSON" (se usar o arquivo da Service Account). Cole o conteúdo do `n8n-pubsub-key.json` no campo de autenticação.
  </li>
  <li>
    <strong>Defina a URL do endpoint</strong>:
    Para <strong>subscribe</strong>, use:
    
    <code>https://pubsub.googleapis.com/v1/projects/{PROJECT_ID}/subscriptions/{SUBSCRIPTION_NAME}:pull</code>
    
    Para <strong>publish</strong>, use:
    
    <code>https://pubsub.googleapis.com/v1/projects/{PROJECT_ID}/topics/{TOPIC_NAME}:publish</code>
    
    Substitua `{PROJECT_ID}`, `{SUBSCRIPTION_NAME}` e `{TOPIC_NAME}` pelos seus valores.
  </li>
  <li>
    <strong>Diferencie publish vs subscribe</strong>:
    - <strong>Publish</strong>: Envia mensagens para um tópico (ex: um evento de compra).
    - <strong>Subscribe</strong>: Recebe mensagens de uma assinatura (ex: processar eventos no n8n).
  </li>
</ol>

<p><strong>Exemplo de payload JSON para publish:</strong></p>
<pre><code>{
  "messages": [
    {
      "data": "SGVsbG8gZnJvbSBudDhuIQ==",
      "attributes": {
        "event_type": "compra_realizada",
        "user_id": "12345"
      }
    }
  ]
}</code></pre>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub codifica o payload em base64 por padrão. No n8n, use <code>Buffer.from(payload, 'utf8').toString('base64')</code> para converter mensagens antes de publicar.</p>

<h2>Criando um tópico e assinatura no Pub/Sub para n8n</h2>
<p>No Google Cloud Console, você cria um tópico para enviar mensagens e uma assinatura para recebê-las no n8n. Siga o passo a passo:</p>

<ol>
  <li>
    <strong>Crie um tópico</strong>:
    No console, vá em "Pub/Sub" > "Tópicos" > "Criar tópico". Nomeie-o (ex: `events-n8n`) e clique em "Criar".
  </li>
  <li>
    <strong>Crie uma assinatura</strong>:
    Em "Assinaturas", clique em "Criar assinatura". Configure:
    - <strong>Nome</strong>: `n8n-subscription` (ou qualquer nome).
    - <strong>Endpoint</strong>: Para push, use a URL do seu n8n (ex: <code>https://seu-n8n.com/webhook/pubsub</code>). Para pull, deixe em branco e use o node HTTP Request no n8n para puxar mensagens.
    - <strong>Retry policy</strong>: Defina um intervalo de retentativa (ex: 10 segundos).
  </li>
  <li>
    <strong>Configure push ou pull</strong>:
    - <strong>Push</strong>: O Pub/Sub envia mensagens diretamente para o endpoint do n8n (ideal para eventos imediatos).
    - <strong>Pull</strong>: O n8n busca mensagens periodicamente (útil para automações self-hosted com tráfego esporádico).
  </li>
</ol>

<p><strong>Tabela comparativa: Pub/Sub vs Kafka vs RabbitMQ</strong></p>
<table>
  <thead>
    <tr>
      <th>Critério</th>
      <th>Google Pub/Sub</th>
      <th>Apache Kafka</th>
      <th>RabbitMQ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Modelo</td>
      <td>Assíncrono, desacoplado</td>
      <td>Streaming de eventos</td>
      <td>Fila de mensagens</td>
    </tr>
    <tr>
      <td>Escalabilidade</td>
      <td>Automática (Google Cloud)</td>
      <td>Manual (clusters)</td>
      <td>Limitada (depende de nós)</td>
    </tr>
    <tr>
      <td>Custo</td>
      <td>Pay-as-you-go (R$ 0,01 por milhão de mensagens)</td>
      <td>Open-source (custos de infra)</td>
      <td>Open-source (gratuito para uso básico)</td>
    </tr>
    <tr>
      <td>Complexidade</td>
      <td>Baixa (gerenciado)</td>
      <td>Alta (configuração de clusters)</td>
      <td>Média (depende de plugins)</td>
    </tr>
  </tbody>
</table>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub retém mensagens por até 7 dias por padrão. Se uma assinatura não consumir uma mensagem dentro desse período, ela é descartada automaticamente.</p>

<h2>Construindo o fluxo de automação no n8n: recebendo eventos do Pub/Sub</h2>
<p>Monte um fluxo no n8n com 3 nós: HTTP Request (Pub/Sub) → Processamento → Ação final. O Pub/Sub envia mensagens via push para o n8n, que processa o payload e dispara ações como e-mails ou gravações no Google Sheets. Exemplo prático: um evento de compra no e-commerce dispara uma notificação por e-mail e registra os dados no <a href="https://automacao.art.br/melhores-ias-para-gerar-imagem-gratis" target="_blank" rel="noopener noreferrer">Google Sheets</a>.</p>

<ol>
  <li>
    <strong>Node HTTP Request (Pub/Sub Push)</strong>:
    Configure a URL da assinatura Pub/Sub no campo "URL" do node. No n8n, use o método <code>POST</code> e cole a URL da assinatura criada. O Pub/Sub enviará mensagens automaticamente para esse endpoint.
  </li>
  <li>
    <strong>Node Function para decodificar payload</strong>:
    Adicione um node "Function" após o HTTP Request. Use o código abaixo para decodificar o payload base64 e extrair os dados:
    <pre><code>const payload = items[0].json.message.data;
const decoded = Buffer.from(payload, 'base64').toString('utf8');
return [{ json: { ...JSON.parse(decoded), original_payload: items[0].json } }];</code></pre>
  </li>
  <li>
    <strong>Node de ação final (ex: Send Email)</strong>:
    Configure o node de e-mail com os dados decodificados. Exemplo de payload recebido:
    <pre><code>{
  "message": {
    "data": "eyJldmVudF90eXBlIjogImNvbXBhcmlvX3JlYWxpc2FjaW8iLCAidXNlcl9pZCI6ICIxMjM0NSJ9",
    "attributes": {
      "order_id": "ORD-67890"
    }
  }
}</code></pre>
    Resultado: o n8n envia um e-mail com os detalhes da compra e registra no Google Sheets.
  </li>
</ol>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub envia o payload sempre em base64, mas os atributos (como <code>order_id</code>) chegam como texto puro no header <code>attributes</code>. Use <code>items[0].json.message.attributes</code> no n8n para acessar esses metadados sem decodificação.</p>

<h2>Tratando erros e garantindo confiabilidade no processamento</h2>
<p>Configure dead-letter topics no Pub/Sub e use retentativas exponenciais no n8n para mensagens que falham. Crie um fluxo paralelo que redireciona mensagens não processadas para uma fila de recuperação. Exemplo: se o Google Sheets estiver indisponível, a mensagem vai para um tópico <code>dead-letter</code> com até 5 retentativas.</p>

<ol>
  <li>
    <strong>Crie um dead-letter topic e subscription</strong>:
    No Google Cloud Console, crie um tópico <code>dead-letter-events</code> e uma assinatura <code>dlq-subscription</code> com retenção de 10 dias.
  </li>
  <li>
    <strong>Configure retentativas no n8n</strong>:
    No node HTTP Request, ative a opção "Retry on Fail" e defina:
    <ul>
      <li>Tentativas: 5</li>
      <li>Intervalo inicial: 1 segundo</li>
      <li>Fator exponencial: 2</li>
      <li>Timeout: 30 segundos</li>
    </ul>
  </li>
  <li>
    <strong>Fluxo de erro com Switch node</strong>:
    Adicione um node "Switch" após o processamento principal. Se o status for <code>error</code>, redirecione a mensagem para o node HTTP Request que publica no <code>dead-letter-topic</code>. Exemplo de payload de erro:
    <pre><code>{ "error": "Google Sheets API quota exceeded", "message_id": "12345" }</code></pre>
  </li>
</ol>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub conta retentativas como tentativas de pull/push. Se uma mensagem falhar 5 vezes, ela é automaticamente enviada para o dead-letter topic — a menos que você configure a política de retentativa no nível da assinatura.</p>

<h2>Otimizando performance: loteamento e paralelismo no n8n</h2>
<p>Use o node <strong>SplitInBatches</strong> para processar mensagens em lotes e aproveite o paralelismo do Pub/Sub com múltiplas assinaturas. Configure o n8n para consumir até 100 mensagens por pull e processe-as em paralelo com threads. Exemplo: 1.000 mensagens chegam em 1 segundo — o n8n processa 100 de cada vez em 10 segundos.</p>

<ol>
  <li>
    <strong>Configure Pull com loteamento</strong>:
    No node HTTP Request para Pub/Sub Pull, adicione o parâmetro <code>maxMessages</code> na URL:
    <pre><code>https://pubsub.googleapis.com/v1/projects/{PROJECT_ID}/subscriptions/{SUBSCRIPTION_NAME}:pull?maxMessages=100</code></pre>
  </li>
  <li>
    <strong>Adicione o node SplitInBatches</strong>:
    Configure o node para dividir as mensagens em lotes de 10. Isso reduz o número de requests para APIs externas (como Google Sheets).
  </li>
  <li>
    <strong>Ative paralelismo no n8n</strong>:
    Em "Settings" > "Execution", defina:
    <ul>
      <li><strong>Concurrency</strong>: 10 (threads paralelas)</li>
      <li><strong>Batch Size</strong>: 100 (mensagens por execução)</li>
    </ul>
  </li>
</ol>

<p><strong>Boas práticas para performance:</strong></p>
<ul>
  <li>Use <strong>Pull</strong> em vez de Push se precisar de controle sobre lotes.</li>
  <li>Configure <strong>ackDeadlineSeconds</strong> na assinatura para 30 segundos (padrão é 10). Isso dá mais tempo para o n8n processar mensagens grandes.</li>
  <li>Evite processar mensagens individualmente no n8n — use batch para reduzir custos de APIs externas.</li>
  <li>Monitore o <strong>backlog</strong> no Pub/Sub Console para ajustar o tamanho dos lotes.</li>
</ul>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub Pull permite que você ajuste o <code>maxMessages</code> dinamicamente via código. No n8n, use uma expressão como <code>{{ $json.maxMessages || 100 }}</code> na URL para priorizar lotes em horários de pico.</p>

<h2>Segurança: autenticação, IAM e boas práticas no Pub/Sub</h2>
<p>Restrinja acessos com IAM, use Service Accounts específicas por função e rotacione chaves a cada 90 dias. Nunca use a chave de uma conta "Owner" — dê apenas as permissões mínimas necessárias (ex: <code>roles/pubsub.subscriber</code> para ler mensagens). A criptografia de mensagens deve ser feita antes de publicar, já que o Pub/Sub não criptografa payloads por padrão.</p>

<ol>
  <li>
    <strong>Defina permissões mínimas no IAM</strong>:
    Para uma Service Account que só precisa ler mensagens, atribua a role <strong>Pub/Sub Subscriber</strong>. Para publicar, use <strong>Pub/Sub Publisher</strong>. Evite roles como <code>Editor</code> ou <code>Owner</code>.
  </li>
  <li>
    <strong>Rotacione a chave JSON da Service Account</strong>:
    No Google Cloud Console, vá em "IAM e administração" > "Service Accounts" > selecione a conta > "Chaves" > "Rotacionar". Baixe a nova chave e atualize no n8n imediatamente.
  </li>
  <li>
    <strong>Criptografe mensagens antes de publicar</strong>:
    No n8n, use o node "Cryptography" para encriptar o payload antes de enviar ao Pub/Sub. Exemplo com AES-256:
    <pre><code>const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
encrypted += cipher.final('hex');
return [{ json: { encrypted_data: encrypted, iv: iv.toString('hex'), key: key.toString('hex') } }];</code></pre>
  </li>
  <li>
    <strong>Restrinja acesso por IP (opcional)</strong>:
    No Google Cloud, configure uma política de firewall para permitir requests apenas do IP do seu n8n. Vá em "VPC Network" > "Firewall" > "Criar regra de firewall" e defina a origem como o IP do servidor.
  </li>
</ol>

<p><strong>Aviso crítico:</strong> Nunca exponha a chave JSON da Service Account em logs, variáveis de ambiente ou código público. Use o n8n com <a href="https://automacao.art.br/o-que-e-n8n-cloud-self-hosted" target="_blank" rel="noopener noreferrer">n8n Cloud</a> ou self-hosted com segurança de rede reforçada.</p>

<p><strong>Curiosidade técnica:</strong> O Pub/Sub valida tokens JWT no cabeçalho <code>Authorization</code> para autenticação. Se você usar o node HTTP Request no n8n com a opção "Google OAuth2 API", ele gera automaticamente o token com escopo <code>https://www.googleapis.com/auth/pubsub</code>.</p>


<h2>Perguntas frequentes sobre Como usar n8n com Google Cloud Pub/Sub para ingestão de eventos</h2>

<h3>Como criar um projeto no Google Cloud para usar com Pub/Sub?</h3>
<p>Acesse o Google Cloud Console, clique em "Criar Projeto", nomeie-o (ex: "n8n-pubsub-automacao") e confirme. Após criar, habilite a API Pub/Sub em "APIs e Serviços" > "Biblioteca".</p>

<h3>Preciso pagar para usar o Google Cloud Pub/Sub com n8n?</h3>
<p>O Google Cloud Pub/Sub tem um plano gratuito com 10GB de mensagens por mês. Acima disso, custa <strong>R$ 0,01 por milhão de mensagens</strong>. Verifique a tabela de preços na <a href="https://cloud.google.com/pubsub/pricing" target="_blank" rel="noopener noreferrer">documentação oficial</a> para detalhes.</p>

<h3>Qual é a diferença entre tópico e assinatura no Pub/Sub?</h3>
<p>O tópico é o canal onde as mensagens são publicadas, enquanto a assinatura define quem recebe essas mensagens. Uma assinatura pode ser configurada para push (envio automático) ou pull (busca manual).</p>

<h3>Como testar se o Pub/Sub está enviando mensagens corretamente?</h3>
<p>Use a ferramenta "Test" no Google Cloud Console ou publique uma mensagem manualmente via API. Verifique se o n8n recebe a mensagem no endpoint configurado ou consulte os logs da assinatura.</p>

<h3>Posso usar o Pub/Sub com n8n self-hosted?</h3>
<p>Sim, o Pub/Sub funciona com n8n self-hosted. Configure a assinatura para pull e use o node HTTP Request no n8n para buscar mensagens periodicamente.</p>

<h3>Como lidar com erros de autenticação no n8n com Pub/Sub?</h3>
<p>Verifique se a Service Account tem as permissões corretas (<code>Pub/Sub Subscriber/Publisher</code>) e se a chave JSON está válida. No n8n, teste a conexão com o node HTTP Request antes de prosseguir.</p>

<h3>Qual é a melhor forma de processar mensagens em lote no n8n?</h3>
<p>Use o node <strong>SplitInBatches</strong> para dividir mensagens em lotes menores e configure o node HTTP Request com o parâmetro <code>maxMessages</code> na URL (ex: <code>?maxMessages=100</code>). Isso reduz o número de requests para APIs externas.</p>

<h3>Como monitorar o consumo de mensagens no Pub/Sub?</h3>
<p>Acesse o Google Cloud Console > Pub/Sub > Assinaturas e verifique o gráfico de backlog ou o número de mensagens não ack. Configure alertas para backlogs altos ou erros de processamento.</p>

<h2>Do Pub/Sub ao n8n: transforme eventos em automações poderosas</h2>

<p>Integrar n8n com Google Cloud Pub/Sub é a combinação perfeita para quem busca automações em tempo real sem complicações. Com este guia, você aprendeu a configurar ambientes, criar fluxos de trabalho escaláveis e garantir confiabilidade — tudo sem escrever código complexo. Agora, é hora de colocar em prática: publique eventos, processe-os no n8n e automatize ações como notificações, registros ou disparos de APIs.</p>

<ul>
<li><strong>Pub/Sub</strong> como backbone de eventos assíncronos;</li>
<li><strong>n8n</strong> como orquestrador de automações sem código;</li>
<li><strong>Segurança</strong> com IAM e Service Accounts;</li>
<li><strong>Performance</strong> com loteamento e paralelismo;</li>
<li><strong>Confiança</strong> com dead-letter topics e retentativas.</li>
</ul>

<p>Pronto para transformar seus eventos em automações inteligentes? Explore mais tutoriais na categoria <a href="https://automacao.art.br/automacao-sem-codigo" target="_blank" rel="noopener noreferrer">Automação sem Código</a> e descubra como o n8n pode simplificar ainda mais seus fluxos!</p>