---
title: "Agendar Tarefas no n8n com Cron e Schedule"
description: "Aprenda a agendar tarefas no n8n com cron e schedule e automatize processos. Guia prático para iniciantes e pequenos negócios."
cluster: "n8n"
formato: "tutorial"
pubDate: 2026-07-23
image: "https://image.pollinations.ai/prompt/Imagem%20de%20um%20rel%C3%B3gio%20para%20representar%20o%20agendamento%20de%20tarefas%2C%20ilustra%C3%A7%C3%A3o%20flat%20minimalista%2C%20tons%20terrosos%20marrom%20e%20bege%2C%20luz%20difusa%20de%20est%C3%BAdio%2C%20sem%20texto%2C%20sem%20letras%2C%20sem%20marca%20dagua%2C%20composi%C3%A7%C3%A3o%2016%3A9?width=1200&height=675&nologo=true&seed=251502"
imageAlt: "Agendar tarefas no n8n com cron e schedule"
draft: false
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<title>Como agendar tarefas no n8n cron e schedule – Guia completo</title>
<meta name="description" content="Aprenda como agendar tarefas no n8n usando cron e schedule. Guia passo a passo com exemplos, custos e dicas para automatizar seu negócio.">
<!-- slug: como-agendar-tarefas-no-n8n-cron-e-schedule -->
</head>
<body>
<p>Como agendar tarefas no n8n usando cron ou schedule é simples: basta arrastar o nó <strong>Cron</strong> ou <strong>Schedule</strong>, definir a expressão de tempo e conectar ao fluxo desejado. O gatilho executa o fluxo automaticamente conforme a agenda configurada.</p>
<p>Essa funcionalidade elimina a necessidade de scripts externos e garante que processos como envio de relatórios ou limpeza de bancos rodem sem intervenção manual. Pequenos negócios ganham consistência e reduzem custos operacionais.</p>

<h2>Introdução ao n8n e Agendamento de Tarefas</h2>
<p>n8n é uma plataforma de automação de workflows open‑source, baseada em Node.js, que roda em Docker ou diretamente no seu servidor. Ele permite conectar APIs, bancos de dados e serviços como Zapier ou Make em poucos cliques.</p>
<p>Com os nós <em>Cron</em> e <em>Schedule</em>, você transforma qualquer fluxo em uma tarefa recorrente, ideal para processos diários, semanais ou mensais. <a href="/n8n-guia-completo-em-portugues">n8n guia completo em português</a></p>
<p><strong>Curiosidade:</strong> o n8n suporta execução a partir de 512 MB de RAM, o que o torna viável em VPS de baixo custo.</p>

<h2>Como agendar tarefas no n8n cron e schedule</h2>
<p>O nó Cron aceita expressões no formato <code>* * * * *</code> e permite definir fuso horário específico.</p>
<ol>
<li>Arraste o nó <strong>Cron</strong> para a tela.</li>
<li>No campo <em>Cron Expression</em>, insira, por exemplo, <code>0 8 * * 1-5</code> para executar às 08:00 de segunda a sexta.</li>
<li>Selecione o fuso horário “America/Sao_Paulo” para alinhar ao horário brasileiro.</li>
<li>Conecte o nó ao restante do fluxo (por exemplo, um nó HTTP Request).</li>
<li>Salve e ative o workflow; o n8n disparará o fluxo nos horários configurados.</li>
</ol>
<p>Resultado esperado: o fluxo roda automaticamente às 08:00 nos dias úteis, sem precisar de intervenção.</p>
<p>Mais detalhes na <a href="https://docs.n8n.io/nodes/n8n-nodes-base.cron" target="_blank" rel="noopener noreferrer">documentação oficial do n8n sobre Cron</a>.</p>
<p><strong>Curiosidade:</strong> o nó Cron permite sobrescrever o horário por execução usando a variável <code>{{$now}}</code>, algo que o crontab tradicional não oferece.</p>

<h2>Utilizando o Schedule no n8n</h2>
<p>O nó Schedule oferece configuração amigável: intervalo, data de início, data de término e limite de execuções.</p>
<ol>
<li>Adicione o nó <strong>Schedule</strong> ao seu workflow.</li>
<li>Defina “Every 5 minutes” no campo Interval.</li>
<li>Em “Start Date”, coloque <code>2024-07-24T00:00:00Z</code> para iniciar a contagem a partir de hoje.</li>
<li>Em “End Date”, insira <code>2026-12-31T23:59:59Z</code> para parar no final de 2026.</li>
<li>Conecte o nó a um nó de ação, como “Send Email” ou “Update Database”.</li>
<li>Salve e ative; o fluxo será disparado a cada 5 minutos até a data final.</li>
</ol>
<p>Resultado esperado: o fluxo executa repetidamente a cada 5 minutos, facilitando tarefas como monitoramento de filas ou atualizações de dashboards.</p>
<p>Veja a <a href="https://docs.n8n.io/nodes/n8n-nodes-base.schedule" target="_blank" rel="noopener noreferrer">documentação oficial do n8n sobre Schedule</a> para opções avançadas.</p>
<p><strong>Curiosidade:</strong> o nó Schedule aceita valores “human readable” como <code>2h</code> ou <code>30s</code>, simplificando a configuração de intervalos curtos.</p>

<h2>Diferenças entre n8n Self-Hosted e Cloud</h2>
<p>A principal diferença entre n8n self‑hosted e a versão Cloud está no controle da infraestrutura e nos custos recorrentes. No self‑hosted você gerencia o servidor; na Cloud o provedor cuida da disponibilidade.</p>
<ul>
<li><strong>Infraestrutura:</strong> self‑hosted roda em Docker, VPS ou Kubernetes; Cloud roda nos data‑centers da n8n.</li>
<li><strong>Manutenção:</strong> no self‑hosted você atualiza versões e corrige bugs; na Cloud as atualizações são automáticas.</li>
<li><strong>Escalabilidade:</strong> Cloud oferece scaling automático por demanda; self‑hosted requer provisionamento manual.</li>
<li><strong>Custo:</strong> self‑hosted tem custo fixo de servidor (ex.: R$ 45/mês em um VPS 1 vCPU + 2 GB RAM); Cloud cobra por execução (ex.: US$ 0,01 por mil execuções).</li>
<li><strong>Segurança:</strong> self‑hosted permite políticas internas de firewall; Cloud segue padrões de certificação ISO/PCI.</li>
</ul>
<p><strong>Curiosidade:</strong> a versão Cloud inclui um painel de auditoria que registra cada execução, algo que no self‑hosted você precisa implementar manualmente.</p>
<p>Confira <a href="/n8n-self-hosted-vs-cloud-precos-e-diferencas">n8n self‑hosted vs cloud preços e diferenças</a> para comparar detalhes.</p>

<h2>Criando um Fluxo no n8n</h2>
<p>Para criar um fluxo no n8n, abra o editor, arraste o nó de partida e conecte os demais nós. Salve e ative para que ele fique pronto para disparar.</p>
<ol>
<li>Acesse <strong>Workflows</strong> e clique em “New”.</li>
<li>Selecione um nó “Start” (ex.: HTTP Trigger) e posicione na tela.</li>
<li>Arraste nós de ação (HTTP Request, Set, Send Email) e conecte ao nó “Start”.</li>
<li>Configure cada nó: URL, método, payload ou parâmetros.</li>
<li>Teste com “Execute Workflow” e verifique a saída no painel de execução.</li>
<li>Salve, dê um nome ao workflow e ative usando o toggle no canto superior direito.</li>
</ol>
<p>Resultado esperado: o fluxo aceita a requisição inicial e executa as ações configuradas em sequência.</p>
<p>Veja <a href="/como-criar-seu-primeiro-fluxo-no-n8n">como criar seu primeiro fluxo no n8n</a> para um guia passo‑a‑passo.</p>
<p><strong>Curiosidade:</strong> ao usar o nó “Set”, você pode criar variáveis globais que ficam disponíveis para todos os nós subsequentes, facilitando a reutilização de valores.</p>

<h2>Exemplos de Utilização do n8n para Automação de Tarefas</h2>
<p>O n8n automatiza relatórios diários, sincroniza bancos de dados e monitora APIs em tempo real. Cada exemplo pode ser implementado com poucos nós e sem código.</p>
<ul>
<li><strong>Relatório de vendas diário:</strong> nó “Cron” → “MySQL” (SELECT) → “Google Sheets” (append).</li>
<li><strong>Sincronização de clientes:</strong> nó “Schedule” → “Airtable” (GET) → “HubSpot” (POST).</li>
<li><strong>Alerta de fila cheia:</strong> nó “HTTP Request” (API de fila) → “If” (condição) → “Telegram” (sendMessage).</li>
<li><strong>Backup de arquivos S3:</strong> nó “Schedule” → “AWS S3” (list) → “Dropbox” (upload).</li>
</ul>
<p><strong>Curiosidade:</strong> o nó “Merge” permite combinar até 10 fluxos paralelos antes de seguir para um nó único, algo que simplifica pipelines complexas.</p>
<p>Para entender a evolução dos clusters de computação que inspiram a arquitetura do n8n, consulte <a href="https://en.wikipedia.org/wiki/Cluster_(computing)" target="_blank" rel="noopener noreferrer">Wikipedia – Cluster (computing)</a>.</p>

<h2>Perguntas frequentes sobre como agendar tarefas no n8n cron e schedule</h2>
<h3>O que é n8n e como funciona?</h3>
<p>n8n é uma plataforma open‑source de automação de workflows que conecta APIs, bancos de dados e serviços sem precisar de código.</p>
<h3>Como instalar o n8n?</h3>
<p>Instale via Docker, npm ou use o instalador one‑click; basta executar <code>docker run n8nio/n8n</code> ou <code>npm install n8n -g</code>.</p>
<h3>Quais são as principais diferenças entre n8n self‑hosted e cloud?</h3>
<p>Self‑hosted dá controle total da infraestrutura e custos fixos; Cloud cuida da disponibilidade, escalabilidade automática e cobra por execução.</p>
<h3>Como criar um fluxo no n8n?</h3>
<p>Abra o editor, adicione um nó de gatilho (ex.: HTTP Trigger) e conecte nós de ação como HTTP Request, Set ou Send Email, depois salve e ative.</p>
<h3>Como agendar tarefas no n8n utilizando cron?</h3>
<p>Use o nó Cron, informe a expressão cron (ex.: 0 8 * * 1‑5) e conecte ao fluxo; o n8n executará o workflow nos horários definidos.</p>
<h3>Como utilizar o schedule no n8n?</h3>
<p>Adicione o nó Schedule, escolha um intervalo (ex.: a cada 5 min), defina datas de início/fim e ligue ao fluxo; ele disparará periodicamente.</p>
<h3>Quais são as vantagens de utilizar o n8n para automação de tarefas?</h3>
<p>n8n é gratuito, auto‑hospedado, possui mais de 300 integrações e permite criar fluxos complexos sem código, reduzindo custos operacionais.</p>

<h2>Domine o Agendamento no n8n e Automatize Seu Negócio</h2>
<p>Com os nós Cron e Schedule você pode transformar qualquer processo em uma tarefa recorrente, garantindo consistência e economia para pequenos negócios.</p>
<ul>
<li>Configure expressões cron de forma simples.</li>
<li>Use intervalos flexíveis com o nó Schedule.</li>
<li>Escolha entre self‑hosted ou Cloud conforme sua necessidade.</li>
<li>Crie fluxos completos sem escrever código.</li>
</ul>
<p>Explore mais artigos na categoria <a href="/automacao-de-processos">Automação de Processos</a> e continue aprimorando suas automações.</p>

<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"O que é n8n e como funciona?","acceptedAnswer":{"@type":"Answer","text":"n8n é uma plataforma open‑source de automação de workflows que conecta APIs, bancos de dados e serviços sem precisar de código."}},{"@type":"Question","name":"Como instalar o n8n?","acceptedAnswer":{"@type":"Answer","text":"Instale via Docker, npm ou use o instalador one‑click; basta executar `docker run n8nio/n8n` ou `npm install n8n -g`."}},{"@type":"Question","name":"Quais são as principais diferenças entre n8n self‑hosted e cloud?","acceptedAnswer":{"@type":"Answer","text":"Self‑hosted dá controle total da infraestrutura e custos fixos; Cloud cuida da disponibilidade, escalabilidade automática e cobra por execução."}},{"@type":"Question","name":"Como criar um fluxo no n8n?","acceptedAnswer":{"@type":"Answer","text":"Abra o editor, adicione um nó de gatilho (ex.: HTTP Trigger) e conecte nós de ação como HTTP Request, Set ou Send Email, depois salve e ative."}},{"@type":"Question","name":"Como agendar tarefas no n8n utilizando cron?","acceptedAnswer":{"@type":"Answer","text":"Use o nó Cron, informe a expressão cron (ex.: 0 8 * * 1‑5) e conecte ao fluxo; o n8n executará o workflow nos horários definidos."}},{"@type":"Question","name":"Como utilizar o schedule no n8n?","acceptedAnswer":{"@type":"Answer","text":"Adicione o nó Schedule, escolha um intervalo (ex.: a cada 5 min), defina datas de início/fim e ligue ao fluxo; ele disparará periodicamente."}},{"@type":"Question","name":"Quais são as vantagens de utilizar o n8n para automação de tarefas?","acceptedAnswer":{"@type":"Answer","text":"n8n é gratuito, auto‑hospedado, possui mais de 300 integrações e permite criar fluxos complexos sem código, reduzindo custos operacionais."}}]},{"@type":"Article","headline":"Agendar Tarefas no n8n com Cron e Schedule","description":"Aprenda a agendar tarefas no n8n com cron e schedule e automatize processos. Guia prático para iniciantes e pequenos negócios.","author":{"@type":"Person","name":"Automação.art"},"publisher":{"@type":"Organization","name":"automacao.art.br"},"inLanguage":"pt-BR"},{"@type":"HowTo","name":"Como agendar tarefas no n8n usando Cron e Schedule","description":"Passo a passo para configurar nós Cron e Schedule no n8n.","step":[{"@type":"HowToStep","name":"Adicionar nó Cron","text":"Arraste o nó Cron para o editor e configure a expressão de tempo desejada."},{"@type":"HowToStep","name":"Conectar ao fluxo","text":"Conecte o nó Cron ao próximo nó, como HTTP Request ou Set, e salve o workflow."},{"@type":"HowToStep","name":"Adicionar nó Schedule (opcional)","text":"Se precisar de intervalos flexíveis, adicione o nó Schedule, defina o intervalo e as datas de início/fim."},{"@type":"HowToStep","name":"Ativar o workflow","text":"Ative o workflow; o n8n executará as tarefas automaticamente conforme a agenda."}],"inLanguage":"pt-BR"}]}</script>
</body>
</html>