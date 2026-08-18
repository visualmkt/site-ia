---
title: "n8n com GitHub Actions: Tutorial Completo para Automação"
description: "Aprenda a integrar n8n com GitHub Actions para automações CI/CD, webhooks e workflows escaláveis. Guia prático com YAML, custos e dicas de segurança."
cluster: "ferramentas"
formato: "o que é"
pubDate: 2026-08-18
image: "https://www.automacao.art.br/images/posts/n8n-com-github-actions-tutorial.jpg"
imageAlt: "Fluxo de integração n8n com GitHub Actions via webhook"
draft: false
---

<p><strong>Usar n8n com GitHub Actions</strong> significa criar automações escaláveis onde o GitHub gerencia eventos (push, PR, issues) e o n8n executa lógica de negócios sem servidor. Você envia um commit ao GitHub, o Actions dispara um workflow, que aciona o n8n via webhook para processar dados ou notificar sistemas. Isso reduz custos, elimina servidores próprios e acelera deploy de automações.</p>

<p>O n8n é uma plataforma open-source de automação low-code que conecta APIs, bancos de dados e serviços via nós (nodes). O GitHub Actions é um orquestrador de CI/CD que roda workflows em resposta a eventos da plataforma. Juntos, eles formam um pipeline onde o GitHub aciona e o n8n executa, ideal para automações de negócios, CI/CD de bots ou sincronização de dados.</p>

---

<h2>O que é n8n e por que integrar com GitHub Actions?</h2>
<p>O <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">n8n</a> é uma ferramenta open-source de automação que usa nós (nodes) para conectar APIs, serviços e bancos de dados sem código complexo. O <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">GitHub Actions</a> é uma plataforma de CI/CD que executa workflows em resposta a eventos do GitHub (push, PR, issues).</p>

<p>A integração permite que você use o GitHub como "cérebro" para disparar automações no n8n, reduzindo custos e aumentando escalabilidade. Por exemplo: um commit na branch main aciona um workflow no Actions, que envia um webhook para o n8n processar um relatório e notificar o Slack.</p>

<p>Benefícios principais:
<ul>
<li>Elimina servidores para rodar automações diárias;</li>
<li>Automatiza deploy de bots ou fluxos de negócios;</li>
<li>Reduz custos ao usar minutos gratuitos do GitHub Actions;</li>
<li>Centraliza logs e monitoramento no GitHub.</li>
</ul>
</p>

<p>Curiosidade: você pode usar o n8n self-hosted ou na nuvem, mas o GitHub Actions sempre roda na infraestrutura do GitHub, o que simplifica a manutenção.</p>

<p>Veja também como gerar <a href="/melhores-ias-para-gerar-imagem-gratis">imagens com IA grátis</a> para complementar seus workflows.</p>

---

<h2>Pré-requisitos: Configurando ambiente para n8n + GitHub Actions</h2>

<p>Para integrar n8n com GitHub Actions, você precisa:</p>
<ul>
<li>Conta no <strong>GitHub</strong> (pública ou privada);</li>
<li>n8n <strong>self-hosted</strong> (em um servidor ou Docker) ou <strong>n8n Cloud</strong>;</li>
<li>Chaves de API (se seu workflow usar serviços externos);</li>
<li>Conhecimento básico de <strong>YAML</strong> para escrever workflows;</li>
<li>Webhook configurado no n8n para receber requisições do GitHub.</li>
</ul>

<p>Compare as opções de n8n:</p>

<table>
<tr>
<th>Opção</th>
<th>Custo</th>
<th>Facilidade de uso</th>
<th>Casos de uso</th>
<th>Manutenção</th>
</tr>
<tr>
<td><strong>n8n Cloud</strong></td>
<td>R$ 20–R$ 200/mês</td>
<td>Fácil (gerenciado)</td>
<td>Automações simples, testes</td>
<td>Zero (n8n cuida)</td>
</tr>
<tr>
<td><strong>n8n Self-Hosted</strong></td>
<td>R$ 0–R$ 50/mês (servidor)</td>
<td>Médio (você gerencia)</td>
<td>Automações avançadas, privacidade</td>
<td>Alta (Docker, atualizações)</td>
</tr>
<tr>
<td><strong>n8n no GitHub Actions</strong></td>
<td>R$ 0–R$ 10/mês (minutos gratuitos)</td>
<td>Fácil (workflow YAML)</td>
<td>Automações rápidas, CI/CD</td>
<td>Baixa (GitHub gerencia)</td>
</tr>
</table>

<p>Dica: se você já usa Docker, o self-hosted é a melhor opção para automações complexas. Para testes ou automações simples, o n8n Cloud ou o GitHub Actions são suficientes.</p>

---

<h2>Passo a passo: Criando seu primeiro workflow n8n no GitHub Actions</h2>

<p>Este tutorial cria um workflow que aciona o n8n via webhook quando um commit é feito na branch <code>main</code>, enviando uma notificação para o Slack.</p>

<h3>1. Configure um webhook no n8n</h3>
<p>Abra seu n8n (self-hosted ou cloud) e crie um workflow com um nó <strong>Webhook</strong>. Copie a URL do webhook (ex: <code>https://seu-n8n.com/webhook/teste-webhook</code>).</p>

<h3>2. Crie um workflow no GitHub Actions</h3>
<p>No seu repositório, crie o arquivo <code>.github/workflows/n8n-webhook.yml</code> com o seguinte conteúdo:</p>

yaml
name: Acionar n8n via Webhook
on:
  push:
    branches: [ main ]

jobs:
  acionar-n8n:
    runs-on: ubuntu-latest
    steps:
      - name: Enviar webhook para n8n
        run: |
          curl -X POST \
            -H "Content-Type: application/json" \
            -d '{"mensagem": "Novo commit na main!"}' \
            ${{ secrets.N8N_WEBHOOK_URL }}


<p>Explicação das linhas principais:
<ul>
<li><code>on: push: branches: [ main ]</code> → Dispara quando há um commit na branch main;</li>
<li><code>runs-on: ubuntu-latest</code> → Executa no runner do GitHub Actions;</li>
<li><code>${{ secrets.N8N_WEBHOOK_URL }}</code> → URL do webhook armazenada como segredo;</li>
<li><code>curl -X POST</code> → Envia uma requisição HTTP para o n8n.</li>
</ul>
</p>

<h3>3. Configure o segredo no GitHub</h3>
<p>Vá em <strong>Settings > Secrets and variables > Actions</strong> do seu repositório e adicione um novo segredo chamado <code>N8N_WEBHOOK_URL</code> com o valor da URL do webhook do n8n.</p>

<h3>4. Teste o workflow</h3>
<p>Faça um commit na branch main com a mensagem "Teste n8n". Vá em <strong>Actions</strong> do seu repositório para ver o workflow executando. No n8n, você verá a execução do workflow com os dados recebidos.</p>

<p>Resultado esperado: uma notificação no Slack (se seu nó n8n estiver configurado para isso) ou qualquer ação que você tenha definido no workflow.</p>

---

<h2>Como acionar n8n via eventos do GitHub (push, PR, issues)</h2>

<p>O GitHub Actions permite disparar workflows em resposta a eventos como <code>push</code>, <code>pull_request</code>, <code>issues</code> ou até <code>workflow_dispatch</code> (manual). Você filtra eventos com condições no YAML.</p>

<h3>Eventos suportados e exemplos</h3>

<table>
<tr>
<th>Evento</th>
<th>Descrição</th>
<th>Exemplo de uso</th>
</tr>
<tr>
<td><code>push</code></td>
<td>Commit feito em uma branch ou tag</td>
<td>Validar código antes de mergear</td>
</tr>
<tr>
<td><code>pull_request</code></td>
<td>PR aberto, atualizado ou fechado</td>
<td>Rodar testes automáticos em PRs</td>
</tr>
<tr>
<td><code>issues</code></td>
<td>Issue aberta ou comentada</td>
<td>Notificar equipe quando uma issue é criada</td>
</tr>
<tr>
<td><code>workflow_dispatch</code></td>
<td>Disparo manual via API ou botão</td>
<td>Rodar automação sob demanda</td>
</tr>
</table>

<h3>Exemplo: Workflow para validar PRs</h3>
<p>Crie o arquivo <code>.github/workflows/validar-pr.yml</code>:</p>

yaml
name: Validar PR com n8n
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  validar-pr:
    runs-on: ubuntu-latest
    steps:
      - name: Acionar n8n para validar PR
        run: |
          curl -X POST \
            -H "Content-Type: application/json" \
            -d '{"pr_url": "${{ github.event.pull_request.html_url }}"}' \
            ${{ secrets.N8N_PR_VALIDATION_WEBHOOK }}


<p>Detalhes:
<ul>
<li><code>types: [opened, synchronize]</code> → Roda quando um PR é aberto ou atualizado;</li>
<li><code>${{ github.event.pull_request.html_url }}</code> → Envia a URL do PR para o n8n;</li>
<li><code>secrets.N8N_PR_VALIDATION_WEBHOOK</code> → URL do webhook para validação de PR.</li>
</ul>
</p>

<p>No n8n, você pode usar nós como <strong>HTTP Request</strong> para validar o PR com APIs externas (ex: SonarQube, Linters).</p>

<p>Veja também como <a href="/ia-para-transcrever-audio-em-texto-gratis">transcrever áudio com IA grátis</a> para integrar ao seu workflow.</p>



<h2>Automação avançada: n8n + GitHub Actions para CI/CD de negócios</h2>

<p>A integração n8n + GitHub Actions vai além de notificações: você automatiza deploy de bots, gera relatórios dinâmicos, sincroniza dados entre sistemas e valida código em tempo real. O GitHub dispara eventos, o n8n processa a lógica e os resultados são enviados para terceiros (Slack, Notion, APIs).</p>

<p>Exemplo prático: um commit na branch main aciona um workflow que:</p>
<ol>
<li>Faz deploy automático de um bot no Telegram;</li>
<li>Gera um relatório de vendas em PDF;</li>
<li>Envia o PDF para o Google Drive;</li>
<li>Notifica o time no Slack com os resultados.</li>
</ol>

<p>Nós essenciais do n8n para CI/CD:</p>

<table>
<tr>
<th>Node</th>
<th>Função</th>
<th>Exemplo de uso</th>
</tr>
<tr>
<td><strong>Webhook</strong></td>
<td>Recebe dados do GitHub Actions</td>
<td>Processar payload de push/PR</td>
</tr>
<tr>
<td><strong>HTTP Request</strong></td>
<td>Chama APIs externas (Slack, Notion, etc.)</td>
<td>Enviar notificação ou buscar dados</td>
</tr>
<tr>
<td><strong>Function</strong></td>
<td>Processa dados com JavaScript</td>
<td>Filtrar itens de um array ou calcular métricas</td>
</tr>
<tr>
<td><strong>Schedule Trigger</strong></td>
<td>Agenda execuções periódicas</td>
<td>Gerar relatórios diários</td>
</tr>
<tr>
<td><strong>Spreadsheet File</strong></td>
<td>Manipula arquivos CSV/Excel</td>
<td>Sincronizar dados com Google Sheets</td>
</tr>
<tr>
<td><strong>Email</strong></td>
<td>Envia e-mails com anexos</td>
<td>Enviar relatórios por e-mail</td>
</tr>
</table>

<p>Curiosidade: você pode usar o nó <strong>Function</strong> para transformar dados antes de enviá-los para APIs. Por exemplo, converter uma data do formato ISO para "DD/MM/AAAA" antes de notificar o Slack.</p>

---

<h2>Segurança: Gerenciando segredos e permissões no GitHub Actions</h2>

<p>O GitHub Secrets é o lugar certo para armazenar chaves de API, tokens e credenciais. Nunca hardcode esses valores no YAML: use <code>${{ secrets.NOME_DO_SEGREDO }}</code> para acessá-los de forma segura.</p>

<p>Boas práticas para segurança:</p>
<ul>
<li>Use <strong>environment variables</strong> para separar segredos por ambiente (dev, prod);</li>
<li>Restrinja permissões dos workflows com <code>permissions:</code> no YAML;</li>
<li>Crie segredos específicos para cada serviço (ex: <code>SLACK_TOKEN</code>, <code>GOOGLE_API_KEY</code>);</li>
<li>Revise periodicamentes os segredos ativos no repositório;</li>
<li>Use <strong>GitHub OIDC</strong> para autenticar com provedores de nuvem (AWS, GCP) sem tokens permanentes.</li>
</ul>

<p>Exemplo de YAML com permissões restritas:</p>

yaml
name: Deploy seguro
on: push
permissions:
  contents: read
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

<p>Detalhes:
<ul>
<li><code>permissions: contents: read</code> → Permite apenas leitura do repositório;</li>
<li><code>id-token: write</code> → Permite usar OIDC para autenticar na AWS;</li>
<li><code>secrets.AWS_ROLE_ARN</code> → ARN da role IAM armazenada como segredo.</li>
</ul>
</p>

<p>Curiosidade: o GitHub Actions tem um limite de 100 segredos por repositório. Para projetos grandes, use organizations e <strong>environment secrets</strong> para organizar melhor.</p>

---

<h2>Custos e otimização: Quanto custa rodar n8n no GitHub Actions?</h2>

<p>O custo depende do plano do GitHub e da frequência de execução. Contas públicas têm 2.000 minutos gratuitos/mês, enquanto contas privadas têm 50.000 minutos. Cada job conta como 1 minuto, independentemente da duração real.</p>

<p>Tabela de custos comparativos (valores aproximados em R$):</p>

<table>
<tr>
<th>Serviço</th>
<th>Plano</th>
<th>Custo (R$/mês)</th>
<th>Minutos inclusos</th>
<th>Custo adicional</th>
</tr>
<tr>
<td rowspan="3"><strong>GitHub Actions</strong></td>
<td>Pública</td>
<td>R$ 0</td>
<td>2.000</td>
<td>R$ 0,001/min (acima de 2.000)</td>
</tr>
<tr>
<td>Privada (Team)</td>
<td>R$ 40</td>
<td>50.000</td>
<td>R$ 0,001/min (acima de 50.000)</td>
</tr>
<tr>
<td>Privada (Enterprise)</td>
<td>R$ 200+</td>
<td>50.000+</td>
<td>Personalizado</td>
</tr>
<tr>
<td rowspan="2"><strong>n8n Cloud</strong></td>
<td>Starter</td>
<td>R$ 20</td>
<td>—</td>
<td>R$ 0,05/execução extra</td>
</tr>
<tr>
<td>Pro</td>
<td>R$ 100</td>
<td>—</td>
<td>R$ 0,20/execução extra</td>
</tr>
<tr>
<td><strong>n8n Self-Hosted</strong></td>
<td>Docker/servidor</td>
<td>R$ 0–R$ 50</td>
<td>—</td>
<td>Custo do servidor</td>
</tr>
</table>

<p>Dicas para otimizar custos:</p>
<ul>
<li>Reutilize jobs com <code>needs:</code> para evitar execuções redundantes;</li>
<li>Use <strong>caches</strong> para armazenar dependências e acelerar jobs;</li>
<li>Limite execuções com <code>if:</code> no YAML (ex: só rodar em branches específicas);</li>
<li>Monitore o uso em <strong>Settings > Actions > Usage</strong>;</li>
<li>Para automações longas, considere o n8n self-hosted ou Cloud.</li>
</ul>

<p>Exemplo de cache para acelerar um job:</p>

yaml
- name: Cache de dependências
  uses: actions/cache@v3
  with:
    path: |
      node_modules
      .npm
    key: ${{ runner.os }}-npm-${{ hashFiles('package-lock.json') }}

<p>Curiosidade: se seu workflow usa Docker, você pode reduzir o tempo de execução armazenando uma imagem pré-build no GitHub Container Registry (GHCR) e reutilizando-a.</p>

---
<h2>Erros comuns e como resolvê-los no n8n + GitHub Actions</h2>

<p>Problemas frequentes e soluções diretas:</p>

<table>
<tr>
<th>Erro</th>
<th>Causa provável</th>
<th>Solução</th>
</tr>
<tr>
<td><strong>Webhook timeout</strong></td>
<td>n8n demora mais de 30s para responder</td>
<td>Reduza a carga no workflow ou aumente o timeout no nó Webhook</td>
</tr>
<tr>
<td><strong>403 Forbidden</strong></td>
<td>Permissões insuficientes no segredo ou URL inválida</td>
<td>Verifique <code>${{ secrets.N8N_WEBHOOK_URL }}</code> e permissões do repositório</td>
</tr>
<tr>
<td><strong>Variáveis não carregadas</strong></td>
<td>Segredo não está no GitHub Secrets ou nome errado</td>
<td>Confira se o segredo existe e está nomeado corretamente no YAML</td>
</tr>
<tr>
<td><strong>n8n não recebe dados</strong></td>
<td>Payload do GitHub não está no formato esperado</td>
<td>Use <code>${{ toJSON(github.event) }}</code> para debugar o payload</td>
</tr>
<tr>
<td><strong>Workflow não dispara</strong></td>
<td>Evento ou branch mal configurado no YAML</td>
<td>Verifique <code>on: push: branches: [ main ]</code> e eventos suportados</td>
</tr>
<tr>
<td><strong>Curl falha com SSL</strong></td>
<td>URL do webhook usa HTTPS mas não tem certificado válido</td>
<td>Use <code>curl -k</code> para ignorar (não recomendado) ou corrija o certificado</td>
</tr>
</table>

<p>Para debugar:
<ul>
<li>Veja os logs do workflow em <strong>Actions > [Workflow] > [Run]</strong>;</li>
<li>Use <code>echo "${{ secrets.N8N_WEBHOOK_URL }}"</code> para verificar segredos;</li>
<li>Teste o webhook manualmente com <code>curl -v</code> para ver detalhes;</li>
<li>Ative <strong>debug logging</strong> no n8n para logs detalhados.</li>
</ul>
</p>

<p>Documentação oficial do n8n para troubleshooting:
<a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">docs.n8n.io</a></p>



<h2>Perguntas frequentes sobre usar n8n com GitHub Actions</h2>

<h3>Como instalar o n8n no GitHub Actions?</h3>
<p>Você não instala o n8n diretamente no GitHub Actions, mas sim executa workflows que acionam um n8n self-hosted ou na nuvem via webhook. O GitHub Actions age como orquestrador, enquanto o n8n processa a lógica de automação em um servidor externo ou na nuvem.</p>

<h3>Preciso pagar para usar n8n com GitHub Actions?</h3>
<p>Não necessariamente. O GitHub Actions oferece minutos gratuitos (2.000 para contas públicas, 50.000 para privadas), e o n8n pode ser self-hosted (gratuito) ou na nuvem (planos a partir de R$20/mês). Os custos dependem da complexidade do workflow e do plano do n8n escolhido.</p>

<h3>Quais são os custos de rodar n8n no GitHub Actions?</h3>
<p>Os custos são basicamente os minutos do GitHub Actions (R$0,001/minuto acima do limite gratuito) e o custo do n8n (R$0 para self-hosted, R$20–R$200/mês para n8n Cloud). Para automações simples, o custo pode ser zero; para workflows frequentes, pode chegar a R$50–R$100/mês.</p>

<h3>Posso usar n8n self-hosted com GitHub Actions?</h3>
<p>Sim, é uma combinação poderosa. Você hospeda o n8n em um servidor ou Docker e usa o GitHub Actions para disparar workflows que acionam o n8n via webhook. Isso é ideal para automações avançadas ou que exigem privacidade.</p>

<h3>Como configurar um webhook no n8n para acionar pelo GitHub?</h3>
<p>No n8n, crie um workflow com um nó Webhook. Copie a URL gerada (ex: https://seu-n8n.com/webhook/teste) e armazene-a como segredo no GitHub Actions. No workflow do GitHub, use um step com curl para enviar dados para essa URL sempre que um evento ocorrer.</p>

<h3>Quais são os limites de execução do GitHub Actions para n8n?</h3>
<p>Contas públicas têm 2.000 minutos gratuitos/mês, e privadas têm 50.000 minutos. Cada job conta como 1 minuto, independentemente da duração real. Workflows longos ou frequentes podem exceder esses limites e gerar custos adicionais (R$0,001/minuto).</p>

<h3>Como armazenar segredos (API keys) no GitHub Actions para n8n?</h3>
<p>Vá em Settings > Secrets and variables > Actions do seu repositório e adicione segredos como SLACK_TOKEN ou N8N_WEBHOOK_URL. No YAML do workflow, acesse-os com ${{ secrets.NOME_DO_SEGREDO }}. Nunca hardcode segredos no arquivo de workflow.</p>

<h3>Posso agendar workflows no n8n via GitHub Actions?</h3>
<p>Sim, você pode agendar workflows no GitHub Actions usando o evento schedule no YAML (ex: on: schedule: - cron: '0 9 * * *'). O GitHub disparará o workflow na hora agendada, e o n8n processará a lógica. Também é possível agendar diretamente no n8n usando o nó Schedule Trigger.</p>

<h2>Automação sem limites: o futuro é agora</h2>
<p>Integrar n8n com GitHub Actions transforma automações manuais em pipelines escaláveis, onde o GitHub gerencia eventos e o n8n executa lógica de negócios sem servidor. Você elimina servidores próprios, reduz custos com minutos gratuitos do GitHub Actions e ganha flexibilidade para criar workflows de CI/CD, notificações ou sincronização de dados. Seja para deploy de bots, geração de relatórios ou validação de código, essa combinação oferece o melhor dos dois mundos: confiabilidade do GitHub e poder de automação do n8n.</p>

<p>Resumo rápido para começar hoje:</p>
<ul>
<li><strong>Configure um webhook</strong> no n8n para receber dados do GitHub;</li>
<li><strong>Crie um workflow</strong> no GitHub Actions com YAML para disparar em eventos (push, PR, issues);</li>
<li><strong>Armazene segredos</strong> no GitHub Secrets para segurança;</li>
<li><strong>Teste e otimize</strong> com logs e caches para reduzir custos;</li>
<li><strong>Expanda</strong> com nós avançados do n8n (Function, HTTP Request, Schedule).</li>
</ul>

<p>Pronto para automatizar? Explore mais tutoriais na categoria <a href="/automacao">Automação com n8n</a> e descubra como levar seus processos para o próximo nível!</p>

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "name": "n8n com GitHub Actions: Perguntas Frequentes",
      "description": "Respostas rápidas sobre integração de n8n com GitHub Actions para automações CI/CD e workflows de negócios.",
      "inLanguage": "pt-BR",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como instalar o n8n no GitHub Actions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você não instala o n8n diretamente no GitHub Actions, mas sim executa workflows que acionam um n8n self-hosted ou na nuvem via webhook. O GitHub Actions age como orquestrador, enquanto o n8n processa a lógica de automação em um servidor externo ou na nuvem."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso pagar para usar n8n com GitHub Actions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não necessariamente. O GitHub Actions oferece minutos gratuitos (2.000 para contas públicas, 50.000 para privadas), e o n8n pode ser self-hosted (gratuito) ou na nuvem (planos a partir de R$20/mês). Os custos dependem da complexidade do workflow e do plano do n8n escolhido."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os custos de rodar n8n no GitHub Actions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os custos são basicamente os minutos do GitHub Actions (R$0,001/minuto acima do limite gratuito) e o custo do n8n (R$0 para self-hosted, R$20–R$200/mês para n8n Cloud). Para automações simples, o custo pode ser zero; para workflows frequentes, pode chegar a R$50–R$100/mês."
          }
        },
        {
          "@type": "Question",
          "name": "Posso usar n8n self-hosted com GitHub Actions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, é uma combinação poderosa. Você hospeda o n8n em um servidor ou Docker e usa o GitHub Actions para disparar workflows que acionam o n8n via webhook. Isso é ideal para automações avançadas ou que exigem privacidade."
          }
        },
        {
          "@type": "Question",
          "name": "Como configurar um webhook no n8n para acionar pelo GitHub?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No n8n, crie um workflow com um nó Webhook. Copie a URL gerada (ex: https://seu-n8n.com/webhook/teste) e armazene-a como segredo no GitHub Actions. No workflow do GitHub, use um step com curl para enviar dados para essa URL sempre que um evento ocorrer."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os limites de execução do GitHub Actions para n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contas públicas têm 2.000 minutos gratuitos/mês, e privadas têm 50.000 minutos. Cada job conta como 1 minuto, independentemente da duração real. Workflows longos ou frequentes podem exceder esses limites e gerar custos adicionais (R$0,001/minuto)."
          }
        },
        {
          "@type": "Question",
          "name": "Como armazenar segredos (API keys) no GitHub Actions para n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vá em Settings > Secrets and variables > Actions do seu repositório e adicione segredos como SLACK_TOKEN ou N8N_WEBHOOK_URL. No YAML do workflow, acesse-os com ${{ secrets.NOME_DO_SEGREDO }}. Nunca hardcode segredos no arquivo de workflow."
          }
        },
        {
          "@type": "Question",
          "name": "Posso agendar workflows no n8n via GitHub Actions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, você pode agendar workflows no GitHub Actions usando o evento schedule no YAML (ex: on: schedule: - cron: '0 9 * * *'). O GitHub disparará o workflow na hora agendada, e o n8n processará a lógica. Também é possível agendar diretamente no n8n usando o nó Schedule Trigger."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como usar n8n com GitHub Actions: Guia Prático para Automações",
      "description": "Aprenda passo a passo como integrar n8n com GitHub Actions para automações CI/CD, webhooks e workflows escaláveis. Guia prático para iniciantes.",
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
          "url": "https://automacao.art.br/logo.png"
        }
      },
      "datePublished": "2024-06-20",
      "dateModified": "2024-06-20",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/n8n-com-github-actions-tutorial"
      }
    },
    {
      "@type": "HowTo",
      "name": "Tutorial passo a passo: Integrar n8n com GitHub Actions",
      "description": "Guia completo para criar automações escaláveis usando n8n e GitHub Actions, com exemplos práticos de YAML e webhooks.",
      "inLanguage": "pt-BR",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Configure um webhook no n8n",
          "text": "Abra seu n8n (self-hosted ou cloud) e crie um workflow com um nó Webhook. Copie a URL do webhook gerada para usar no GitHub Actions.",
          "url": "https://automacao.art.br/n8n-com-github-actions-tutorial#1-configure-um-webhook-no-n8n"
        },
        {
          "@type": "HowToStep",
          "name": "Crie um workflow no GitHub Actions",
          "text": "No seu repositório, crie o arquivo .github/workflows/n8n-webhook.yml com um job que usa curl para enviar dados para o webhook do n8n quando um commit é feito na branch main.",
          "url": "https://automacao.art.br/n8n-com-github-actions-tutorial#2-crie-um-workflow-no-github-actions"
        },
        {
          "@type": "HowToStep",
          "name": "Configure o segredo no GitHub",
          "text": "Vá em Settings > Secrets and variables > Actions do seu repositório e adicione um novo segredo chamado N8N_WEBHOOK_URL com o valor da URL do webhook do n8n.",
          "url": "https://automacao.art.br/n8n-com-github-actions-tutorial#3-configure-o-segredo-no-github"
        },
        {
          "@type": "HowToStep",
          "name": "Teste o workflow",
          "text": "Faça um commit na branch main e verifique o workflow executando em Actions > [Workflow]. No n8n, você verá a execução com os dados recebidos.",
          "url": "https://automacao.art.br/n8n-com-github-actions-tutorial#4-teste-o-workflow"
        }
      ]
    }
  ]
}