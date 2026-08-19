---
title: "Como monitorar o desempenho do n8n com Prometheus e Grafana"
description: "Aprenda a monitorar n8n com Prometheus e Grafana: métricas essenciais, configuração passo a passo e alertas para garantir performance de fluxos sem gastar com soluções enterprise."
cluster: "dev"
formato: "como fazer/automatizar"
pubDate: 2026-08-19
image: "https://www.automacao.art.br/images/posts/monitorar-desempenho-n8n-prometheus-grafana.jpg"
imageAlt: "Dashboard do Grafana exibindo desempenho do n8n com métricas de execução por fluxo"
draft: false
---

<h2>Como monitorar o desempenho do n8n com Prometheus e Grafana</h2>

<p>Você precisa garantir que seus fluxos no <strong>n8n</strong> rodem sem travar, consumam poucos recursos e não falhem silenciosamente. Sem monitoramento, erros como <strong>fluxos travados</strong>, <strong>alto consumo de CPU/RAM</strong> ou <strong>falhas em webhooks</strong> só aparecem quando o cliente reclama ou o sistema cai. O <strong>n8n</strong> expõe métricas via endpoint <code>/metrics</code>, mas você precisa configurá-lo para enviá-las ao <strong>Prometheus</strong> e visualizá-las no <strong>Grafana</strong>.</p>

<p>Neste guia, você aprenderá a instalar e configurar o <strong>Prometheus</strong> para coletar dados do <strong>n8n</strong>, criar um <strong>dashboard no Grafana</strong> com métricas essenciais e até mesmo configurar alertas para quando um fluxo falhar. Tudo sem gastar com soluções enterprise e usando ferramentas <strong>open source</strong> auto-hospedadas.</p>

---

<h2>Por que monitorar o n8n é essencial para suas automações</h2>

<p>Sem monitoramento, você descobre problemas tarde demais. Um fluxo que consome memória sem parar pode travar seu servidor. Uma automação de pagamento que falha silenciosamente perde clientes. Fluxos de integração com APIs externas podem travar por <strong>timeouts</strong> não detectados.</p>

<p>Exemplos reais: um <strong>webhook</strong> que não responde há 3 horas, um nó de <strong>SQL</strong> consumindo 90% da CPU por dias sem alerta, ou um fluxo de disparo de emails que trava após 10 mil execuções sem que você saiba. O <strong>n8n</strong> não monitora nada disso por padrão — você precisa expor suas métricas e analisá-las.</p>

<p>A documentação oficial do <strong>n8n</strong> sobre métricas explica que o endpoint <code>/metrics</code> fornece dados como <strong>tempo de execução de nós</strong>, <strong>taxa de erros</strong> e <strong>uso de recursos</strong>, mas só estão disponíveis se você ativar a variável de ambiente <code>N8N_METRICS_ENABLED=true</code>.</p>

<a href="https://docs.n8n.io/hosting/metrics/" target="_blank" rel="noopener noreferrer">Documentação oficial do n8n sobre métricas</a>

---

<h2>Configurando o n8n para expor métricas via endpoint /metrics</h2>

<p>Ative as métricas no <strong>n8n</strong> adicionando a variável de ambiente <code>N8N_METRICS_ENABLED=true</code> na inicialização. Se estiver usando <strong>Docker</strong>, adicione ao <code>docker run</code> ou ao <code>docker-compose.yml</code>:</p>

<pre><code>environment:
  - N8N_METRICS_ENABLED=true
</code></pre>

<p>Se estiver usando o <strong>n8n</strong> sem container, defina a variável no arquivo de configuração ou na linha de comando:</p>

<pre><code>N8N_METRICS_ENABLED=true npm start
</code></pre>

<p>Teste se as métricas estão expostas acessando <code>http://SEU_DNS:5678/metrics</code> no navegador ou via <strong>curl</strong>:</p>

<pre><code>curl http://localhost:5678/metrics
</code></pre>

<p>Você verá saídas como <code>n8n_workflow_execution_time_seconds_sum</code> e <code>n8n_node_execution_errors_total</code>. Se não funcionar, verifique se a porta 5678 está acessível e se o <strong>n8n</strong> não está bloqueando o endpoint.</p>

<p>Para entender como funcionam APIs como essa, confira nosso guia sobre <a href="/como-usar-apis-em-automacoes">como usar APIs em automações</a>.</p>

---

<h2>Instalando e configurando o Prometheus para coletar dados do n8n</h2>

<p>Instale o <strong>Prometheus</strong> via <strong>Docker</strong> para monitorar seu <strong>n8n</strong>. Crie um arquivo <code>prometheus.yml</code> com o seguinte conteúdo:</p>

<pre><code>global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'n8n'
    static_configs:
      - targets: ['n8n:5678']
</code></pre>

<p>Substitua <code>n8n</code> pelo nome do container ou IP do servidor onde o <strong>n8n</strong> roda. Inicie o <strong>Prometheus</strong> com:</p>

<pre><code>docker run -d \
  --name=prometheus \
  -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
</code></pre>

<p>Para validar que o <strong>Prometheus</strong> está coletando as métricas, acesse <code>http://localhost:9090/targets</code> e verifique se o job <code>n8n</code> aparece como <strong>UP</strong>.</p>

<p>A tabela abaixo lista as métricas mais úteis do <strong>n8n</strong> que você pode usar no <strong>Prometheus</strong>:</p>

<table>
  <thead>
    <tr>
      <th>Métrica</th>
      <th>Descrição</th>
      <th>Exemplo de uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>n8n_workflow_execution_time_seconds</code></td>
      <td>Tempo total de execução de um workflow</td>
      <td>Gráfico de latência por fluxo</td>
    </tr>
    <tr>
      <td><code>n8n_node_execution_time_seconds</code></td>
      <td>Tempo de execução de cada nó dentro de um fluxo</td>
      <td>Identificar nós lentos</td>
    </tr>
    <tr>
      <td><code>n8n_node_execution_errors_total</code></td>
      <td>Total de erros por nó</td>
      <td>Alertar quando erro > 5%</td>
    </tr>
    <tr>
      <td><code>n8n_workflow_executions_total</code></td>
      <td>Total de execuções de cada fluxo</td>
      <td>Monitorar throughput</td>
    </tr>
    <tr>
      <td><code>process_cpu_seconds_total</code></td>
      <td>Uso de CPU do processo do n8n</td>
      <td>Ajustar limites de container</td>
    </tr>
    <tr>
      <td><code>process_resident_memory_bytes</code></td>
      <td>Uso de memória RAM</td>
      <td>Evitar OOM kills</td>
    </tr>
  </tbody>
</table>

---

<h2>Como criar um dashboard no Grafana para visualizar o desempenho do n8n</h2>

<p>Instale o <strong>Grafana</strong> via <strong>Docker</strong> para criar dashboards com as métricas do <strong>Prometheus</strong>:</p>

<pre><code>docker run -d \
  --name=grafana \
  -p 3000:3000 \
  grafana/grafana
</code></pre>

<p>Acesse <code>http://localhost:3000</code> e faça login com usuário <code>admin</code> e senha <code>admin</code>. Adicione o <strong>Prometheus</strong> como fonte de dados:</p>

<ol>
  <li>Clique em <strong>Configuration > Data Sources > Add data source</strong>.</li>
  <li>Selecione <strong>Prometheus</strong> e configure o URL como <code>http://prometheus:9090</code>.</li>
  <li>Salve e teste a conexão.</li>
</ol>

<p>Para não começar do zero, importe um dashboard pronto como o <strong>ID 1860</strong> do <strong>Grafana</strong>, específico para <strong>n8n</strong>. Clique em <strong>Dashboards > Import</strong>, digite <code>1860</code> e selecione a fonte de dados do <strong>Prometheus</strong>.</p>

<p>Personalize o dashboard criando painéis para:</p>
<ul>
  <li>Tempo médio de execução dos 5 fluxos mais lentos.</li>
  <li>Taxa de erros por nó.</li>
  <li>Uso de CPU e RAM do container do <strong>n8n</strong>.</li>
</ul>

<p>Se precisar de ajuda para configurar o <strong>Docker</strong>, confira nosso guia sobre <a href="/como-instalar-docker-e-docker-compose-no-linux">como instalar Docker e Docker Compose no Linux</a>.</p>



<h2>Monitorando fluxos específicos: tempo de execução e taxa de sucesso por nó</h2>

<p>Você quer saber qual nó do seu fluxo é o gargalo ou está falhando? As métricas do <strong>n8n</strong> incluem labels como <code>workflow_id</code>, <code>node_name</code> e <code>status</code> que permitem filtrar dados por nó específico. No <strong>Prometheus</strong>, use queries como <code>rate(n8n_node_execution_time_seconds_sum[5m]) by (node_name)</code> para ver o tempo médio de execução dos últimos 5 minutos por nó.</p>

<p>No <strong>Grafana</strong>, crie um gráfico com essa query e adicione um painel de "Taxa de erros por nó" usando <code>rate(n8n_node_execution_errors_total[1h]) by (node_name)</code>. Se um nó como "HTTP Request" estiver com erro constante, você verá um pico no gráfico. Para isso, clique em <strong>Add Panel > Add Query</strong> e selecione sua fonte de dados do <strong>Prometheus</strong>.</p>

<p>Curiosidade: as labels do <strong>n8n</strong> incluem também <code>type</code> (ex: "n8n-nodes-base.httpRequest") e <code>position</code> (onde o nó está no fluxo). Use isso para criar dashboards avançados, como "Fluxos com nós do tipo API que falham mais de 10 vezes por hora".</p>

---

<h2>Configurando alertas para falhas e performance crítica do n8n</h2>

<p>Alertas no <strong>Prometheus</a> são regras que disparam notificações quando uma condição é violada. As notificações são enviadas via <strong>Alertmanager</strong>, que pode integrar com <strong>Telegram</strong>, <strong>Slack</strong>, <strong>Email</strong> ou até <strong>PagerDuty</strong>. A diferença é simples: alertas são regras que verificam métricas; notificações são o meio de entrega (ex: "Enviar mensagem no Slack quando o fluxo X falhar 5 vezes em 1 hora").</p>

<p>Para criar um alerta, edite o arquivo <code>prometheus.yml</code> e adicione uma seção <code>rule_files</code>. Crie um arquivo <code>alert.rules.yml</code> com regras como:</p>

<pre><code>groups:
- name: n8n-alerts
  rules:
  - alert: HighNodeErrorRate
    expr: rate(n8n_node_execution_errors_total[5m]) by (node_name) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Alto taxa de erros no nó {{ $labels.node_name }}"
      description: "O nó {{ $labels.node_name }} está falhando em mais de 5% das execuções nos últimos 5 minutos."
</code></pre>

<p>Instale o <strong>Alertmanager</strong> via <strong>Docker</strong> e configure a integração com <strong>Telegram</strong>:</p>

<pre><code>docker run -d \
  --name=alertmanager \
  -p 9093:9093 \
  -v $(pwd)/alert.rules.yml:/etc/prometheus/alert.rules.yml \
  prom/alertmanager
</code></pre>

<p>Edite o <code>prometheus.yml</code> para apontar para o <strong>Alertmanager</strong>:</p>

<pre><code>alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - alertmanager:9093
</code></pre>

<p>No <strong>Alertmanager</strong>, configure o receptor para <strong>Telegram</strong> usando a API do bot. Envie um teste com <code>curl -X POST http://localhost:9093/api/v2/alerts -d @test-alert.json</code> para validar.</p>

<p>Curiosidade: você pode criar alertas para <strong>timeout de webhooks</strong> usando <code>increase(n8n_workflow_executions_total{status="failed"}[1h]) > 0</code>. Isso detecta fluxos que falham porque um webhook não responde a tempo.</p>

---

<h2>Otimizando recursos: CPU, RAM e throughput do seu n8n auto-hospedado</h2>

<p>Se seu <strong>n8n</strong> consome 2GB de RAM ou 100% da CPU, é hora de ajustar. Use as métricas <code>process_resident_memory_bytes</code> e <code>process_cpu_seconds_total</code> para identificar picos. Se a memória atingir 80% do limite do container, aumente o valor de <code>--memory</code> no <strong>Docker</strong> ou otimize seus fluxos.</p>

<p>Para fluxos pesados, desative nós desnecessários como "Wait" ou "IF" em loops infinitos. Ajuste também o <code>N8N_METRICS_ENABLED=true</code> para evitar sobrecarga na coleta de métricas. Se estiver usando <strong>Kubernetes</strong>, defina <code>resources.limits.memory</code> e <code>resources.requests.cpu</code> no manifesto.</p>

<p>Tabela de tuning para fluxos comuns:</p>

<table>
  <thead>
    <tr>
      <th>Tipo de Fluxo</th>
      <th>Ajuste Recomendado</th>
      <th>Ferramenta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fluxo com chamadas a APIs externas</td>
      <td>Adicione <code>retryOnFail: true</code> no nó HTTP Request</td>
      <td>n8n</td>
    </tr>
    <tr>
      <td>Fluxo com nós de manipulação de grandes arquivos</td>
      <td>Use <code>splitInBatches</code> para processar em lotes</td>
      <td>n8n</td>
    </tr>
    <tr>
      <td>Fluxo com loops longos</td>
      <td>Limite o número de iterações com <code>maxIterations</code></td>
      <td>n8n</td>
    </tr>
    <tr>
      <td>Containers com uso excessivo de CPU</td>
      <td>Aumente <code>cpu_shares</code> ou migre para instância maior</td>
      <td>Docker/Kubernetes</td>
    </tr>
  </tbody>
</table>

<p>Curiosidade: o <strong>n8n</strong> usa um pool de workers para executar nós em paralelo. Se seus fluxos travam, verifique se o valor de <code>N8N_EXECUTIONS_PROCESS=main</code> não está sobrecarregando a fila. Para fluxos críticos, use <code>N8N_EXECUTIONS_PROCESS=child</code> para distribuir a carga.</p>

---

<h2>Dicas avançadas: monitorando múltiplas instâncias e integrando com OpenTelemetry</h2>

<p>Se você tem 5 instâncias do <strong>n8n</strong> rodando em diferentes servidores, configure o <strong>Prometheus</strong> para coletar métricas de todas elas usando <code>file_sd_configs</code> ou <code>consul_sd_configs</code>. Crie um arquivo <code>targets.json</code> com:</p>

<pre><code>{
  "targets": [
    "n8n-server1:5678",
    "n8n-server2:5678",
    "n8n-server3:5678"
  ]
}
</code></pre>

<p>No <code>prometheus.yml</code>, adicione:</p>

<pre><code>scrape_configs:
  - job_name: 'n8n-multi'
    file_sd_configs:
      - files:
        - targets.json
</code></pre>

<p>Para tracing distribuído, integre o <strong>n8n</strong> com <strong>OpenTelemetry</strong>. Adicione ao <strong>Docker</strong>:</p>

<pre><code>environment:
  - N8N_OPEN_TELEMETRY_ENABLED=true
  - N8N_OPEN_TELEMETRY_HOST=otel-collector:4317
</code></pre>

<p>Use o <strong>Grafana Tempo</strong> ou <strong>Jaeger</strong> para visualizar traces. Para logs, o <strong>Grafana Loki</strong> é ideal, pois indexa logs de forma eficiente e escala com milhares de instâncias. Instale o <strong>Loki</strong> via <strong>Docker</strong> e configure o <strong>Promtail</strong> para coletar logs do <strong>n8n</strong>.</p>

<p>Curiosidade: o <strong>n8n</strong> não suporta OpenTelemetry nativamente, mas você pode usar um sidecar com o <a href="https://github.com/open-telemetry/opentelemetry-collector" target="_blank" rel="noopener noreferrer">OpenTelemetry Collector</a> para instrumentar os fluxos. Isso é útil para automações complexas que dependem de múltiplas APIs externas.</p>



<h2>Perguntas frequentes sobre monitoramento do n8n com Prometheus e Grafana</h2><h3>O n8n tem métricas nativas ou preciso instalar algo?</h3><p>O n8n não monitora nada por padrão. Você precisa ativar o endpoint <code>/metrics</code> via variável de ambiente <code>N8N_METRICS_ENABLED=true</code> para expor dados essenciais como tempo de execução, erros e uso de recursos.</p><h3>Como expor as métricas do n8n para o Prometheus?</h3><p>Configure o Prometheus para fazer scraping do endpoint <code>http://SEU_DNS:5678/metrics</code> adicionando um job no arquivo <code>prometheus.yml</code> com o alvo do container ou IP do servidor do n8n.</p><h3>Qual a diferença entre Prometheus e Grafana no monitoramento?</h3><p>O Prometheus coleta e armazena métricas em tempo real, enquanto o Grafana é a ferramenta de visualização que transforma esses dados em dashboards interativos e alertas visuais.</p><h3>Posso usar Grafana sem saber programar?</h3><p>Sim. O Grafana oferece dashboards prontos para importar (como o ID 1860 para n8n) e permite criar painéis arrastando e soltando queries do Prometheus, sem necessidade de codificar.</p><h3>Como criar alertas para quando um fluxo do n8n falhar?</h3><p>No Prometheus, defina regras de alerta no arquivo <code>alert.rules.yml</code> usando expressões como <code>rate(n8n_node_execution_errors_total[5m]) > 0.05</code> e integre com ferramentas como Telegram ou Slack via Alertmanager.</p><h3>Qual a configuração mínima de recursos para rodar Prometheus e Grafana?</h3><p>Prometheus e Grafana consomem cerca de 100MB de RAM cada. Em containers Docker, 256MB de RAM e 0.5 CPU são suficientes para ambientes de desenvolvimento ou pequenas produções.</p><h3>Como visualizar o tempo de execução de cada nó de um fluxo?</h3><p>No Grafana, use queries PromQL como <code>rate(n8n_node_execution_time_seconds_sum[5m]) by (node_name)</code> em um gráfico para ver o tempo médio de execução por nó nos últimos 5 minutos.</p><h3>É possível monitorar múltiplas instâncias do n8n com uma única dashboard?</h3><p>Sim. Configure o Prometheus para coletar métricas de várias instâncias usando <code>file_sd_configs</code> com um arquivo <code>targets.json</code> contendo todos os endpoints, e crie um dashboard no Grafana com filtros por instância.</h3>

<h2>Deixe seus fluxos no n8n sob controle total: métricas, alertas e otimização em um só lugar</h2><p>Monitorar o n8n com Prometheus e Grafana transforma automações caóticas em processos previsíveis e estáveis. Você passa a identificar gargalos em nós específicos, detectar falhas antes que afetem clientes e otimizar recursos sem adivinhações. Com alertas configurados, até mesmo fluxos críticos são supervisionados 24/7, enquanto dashboards personalizados mostram exatamente onde agir. A melhor parte? Tudo isso é possível com ferramentas open source auto-hospedadas, sem depender de soluções enterprise caras ou complexas.</p><ul><li><strong>Ative métricas no n8n</strong> com <code>N8N_METRICS_ENABLED=true</code> para expor dados essenciais via <code>/metrics</code>.</li><li><strong>Configure o Prometheus</strong> para coletar essas métricas com um job simples no <code>prometheus.yml</code>.</li><li><strong>Crie dashboards no Grafana</strong> usando modelos prontos ou queries personalizadas para visualizar performance e erros.</li><li><strong>Defina alertas críticos</strong> no Prometheus para notificações em Telegram, Slack ou email quando algo sair do padrão.</li><li><strong>Otimize recursos</strong> com base em métricas de CPU, RAM e throughput, ajustando containers e fluxos conforme necessário.</li></ul><p>Pronto para levar suas automações ao próximo nível? <a href="/categoria/automacao-e-monitoramento">Explore nossa categoria de automação e monitoramento</a> para mais guias práticos e ferramentas para deixar seus processos ainda mais robustos!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "name": "Como monitorar o desempenho do n8n com Prometheus e Grafana: guia completo para iniciantes",
      "description": "Descubra como medir e otimizar o desempenho de fluxos do n8n em tempo real usando Prometheus e Grafana, com métricas essenciais, configuração e dashboards para iniciantes.",
      "inLanguage": "pt-BR",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O n8n tem métricas nativas ou preciso instalar algo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O n8n não monitora nada por padrão. Você precisa ativar o endpoint /metrics via variável de ambiente N8N_METRICS_ENABLED=true para expor dados essenciais como tempo de execução, erros e uso de recursos."
          }
        },
        {
          "@type": "Question",
          "name": "Como expor as métricas do n8n para o Prometheus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Configure o Prometheus para fazer scraping do endpoint http://SEU_DNS:5678/metrics adicionando um job no arquivo prometheus.yml com o alvo do container ou IP do servidor do n8n."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre Prometheus e Grafana no monitoramento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Prometheus coleta e armazena métricas em tempo real, enquanto o Grafana é a ferramenta de visualização que transforma esses dados em dashboards interativos e alertas visuais."
          }
        },
        {
          "@type": "Question",
          "name": "Posso usar Grafana sem saber programar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O Grafana oferece dashboards prontos para importar (como o ID 1860 para n8n) e permite criar painéis arrastando e soltando queries do Prometheus, sem necessidade de codificar."
          }
        },
        {
          "@type": "Question",
          "name": "Como criar alertas para quando um fluxo do n8n falhar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No Prometheus, defina regras de alerta no arquivo alert.rules.yml usando expressões como rate(n8n_node_execution_errors_total[5m]) > 0.05 e integre com ferramentas como Telegram ou Slack via Alertmanager."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a configuração mínima de recursos para rodar Prometheus e Grafana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prometheus e Grafana consomem cerca de 100MB de RAM cada. Em containers Docker, 256MB de RAM e 0.5 CPU são suficientes para ambientes de desenvolvimento ou pequenas produções."
          }
        },
        {
          "@type": "Question",
          "name": "Como visualizar o tempo de execução de cada nó de um fluxo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No Grafana, use queries PromQL como rate(n8n_node_execution_time_seconds_sum[5m]) by (node_name) em um gráfico para ver o tempo médio de execução por nó nos últimos 5 minutos."
          }
        },
        {
          "@type": "Question",
          "name": "É possível monitorar múltiplas instâncias do n8n com uma única dashboard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Configure o Prometheus para coletar métricas de várias instâncias usando file_sd_configs com um arquivo targets.json contendo todos os endpoints, e crie um dashboard no Grafana com filtros por instância."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Monitorando o desempenho do n8n com Prometheus e Grafana: guia completo para iniciantes",
      "description": "Aprenda passo a passo a monitorar seu n8n com Prometheus e Grafana: métricas essenciais, configuração e dashboards para garantir performance dos seus fluxos de automação",
      "inLanguage": "pt-BR",
      "author": {
        "@type": "Organization",
        "name": "Automacao.art.br",
        "url": "https://automacao.art.br"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automacao.art.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://automacao.art.br/logo.png"
        }
      },
      "datePublished": "2024-06-15",
      "dateModified": "2024-06-15",
      "articleBody": "Você precisa garantir que seus fluxos no n8n rodem sem travar, consumam poucos recursos e não falhem silenciosamente. Sem monitoramento, erros como fluxos travados, alto consumo de CPU/RAM ou falhas em webhooks só aparecem quando o cliente reclama ou o sistema cai. O n8n expõe métricas via endpoint /metrics, mas você precisa configurá-lo para enviá-las ao Prometheus e visualizá-las no Grafana. Neste guia, você aprenderá a instalar e configurar o Prometheus para coletar dados do n8n, criar um dashboard no Grafana com métricas essenciais e até mesmo configurar alertas para quando um fluxo falhar. Tudo sem gastar com soluções enterprise e usando ferramentas open source auto-hospedadas.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana"
      }
    },
    {
      "@type": "HowTo",
      "name": "Como monitorar o desempenho do n8n com Prometheus e Grafana: guia completo para iniciantes",
      "description": "Passo a passo para ativar métricas no n8n, configurar Prometheus para coleta e criar dashboards no Grafana, garantindo performance e estabilidade dos seus fluxos de automação.",
      "inLanguage": "pt-BR",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Ative métricas no n8n",
          "text": "Adicione a variável de ambiente N8N_METRICS_ENABLED=true na inicialização do n8n, seja via Docker, arquivo de configuração ou linha de comando. Teste o endpoint /metrics acessando http://SEU_DNS:5678/metrics.",
          "url": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana#configurando-o-n8n-para-expor-metricas-via-endpoint-metrics"
        },
        {
          "@type": "HowToStep",
          "name": "Instale e configure o Prometheus",
          "text": "Crie um arquivo prometheus.yml com um job para scraping do endpoint /metrics do n8n. Inicie o Prometheus via Docker com a configuração de volume para o arquivo YAML. Valide a coleta acessando http://localhost:9090/targets.",
          "url": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana#instalando-e-configurando-o-prometheus-para-coletar-dados-do-n8n"
        },
        {
          "@type": "HowToStep",
          "name": "Crie um dashboard no Grafana",
          "text": "Instale o Grafana via Docker, adicione o Prometheus como fonte de dados e importe um dashboard pronto (ID 1860). Personalize painéis para tempo de execução, taxa de erros e uso de recursos.",
          "url": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana#como-criar-um-dashboard-no-grafana-para-visualizar-o-desempenho-do-n8n"
        },
        {
          "@type": "HowToStep",
          "name": "Configure alertas para falhas",
          "text": "Edite o arquivo alert.rules.yml no Prometheus para criar regras como HighNodeErrorRate com expressão rate(n8n_node_execution_errors_total[5m]) > 0.05. Integre com Alertmanager para notificações via Telegram ou Slack.",
          "url": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana#configurando-alertas-para-falhas-e-performance-critica-do-n8n"
        },
        {
          "@type": "HowToStep",
          "name": "Otimize recursos do n8n",
          "text": "Use métricas como process_resident_memory_bytes e process_cpu_seconds_total para ajustar limites de containers Docker ou Kubernetes. Desative nós desnecessários em fluxos pesados e ajuste variáveis como N8N_EXECUTIONS_PROCESS.",
          "url": "https://automacao.art.br/monitorar-desempenho-n8n-prometheus-grafana#otimizando-recursos-cpu-ram-e-throughput-do-seu-n8n-auto-hospedado"
        }
      ]
    }
  ]
}
</script>