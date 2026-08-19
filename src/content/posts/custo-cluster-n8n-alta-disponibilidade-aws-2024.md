---
title: "Custo de manter cluster n8n de alta disponibilidade na AWS em 2024"
description: "Saiba exatamente quanto custa um cluster n8n de alta disponibilidade na AWS em 2024. Preços detalhados, configurações e dicas para reduzir custos sem perder redundância."
cluster: "dev"
formato: "quanto custa"
pubDate: 2026-08-19
image: "https://www.automacao.art.br/images/posts/custo-cluster-n8n-alta-disponibilidade-aws-2024.jpg"
imageAlt: "Comparativo de custos de cluster n8n na AWS por configuração"
draft: false
---

<h2>Quanto custa manter um cluster <strong>n8n de alta disponibilidade</strong> na AWS?</h2>
<p>Manter um cluster <strong>n8n de alta disponibilidade</strong> na AWS custa entre <strong>R$ 800 e R$ 5.000/mês</strong>, dependendo da configuração. Um servidor único simples roda por ~R$ 200-400, mas não oferece redundância nem SLA adequado para produção. O custo sobe porque você precisa de múltiplas instâncias, load balancer, banco de dados redundante, cache distribuído e monitoramento proativo.</p>
<p>O valor inicial já inclui pelo menos duas zonas de disponibilidade (AZs), réplicas de banco de dados e nós de aplicação em hot-standby. Se você precisa de auto-scaling, cache distribuído ou Multi-AZ no RDS, o preço pode ultrapassar R$ 3.000. A AWS cobra por hora de uso, transferência de dados e requisições — itens que explodem se não forem otimizados.</p>

---

<h2>Por que um cluster <strong>n8n de alta disponibilidade</strong> na AWS é diferente de um servidor simples</h2>
<p>Um cluster <strong>n8n de alta disponibilidade</strong> distribui a carga entre múltiplos nós, elimina single points of failure e garante SLA acima de 99,9%. Enquanto um servidor único (EC2 t3.micro) custa ~R$ 50/mês, ele não sobrevive a uma queda de AZ, atualização de kernel ou pico de tráfego sem downtime.</p>
<p>Para garantir redundância, você precisa pelo menos de duas instâncias em AZs diferentes, um load balancer (ALB), um banco de dados com réplica de leitura e um cache distribuído (Redis). Cada camada adicionada aumenta o custo, mas reduz drasticamente o risco de indisponibilidade.</p>

<p><strong>Conceitos-chave:</strong></p>
<ul>
<li><strong>Clusterização:</strong> Múltiplos nós de aplicação sincronizados via Redis ou banco de dados.</li>
<li><strong>Redundância:</strong> Réplicas de banco de dados (RDS Multi-AZ) e nós de aplicação em standby.</li>
<li><strong>SLA:</strong> Acordo de nível de serviço — 99,9% exige redundância em pelo menos duas AZs.</li>
</ul>

<table>
<thead>
<tr>
<th>Item</th>
<th>Servidor único (EC2)</th>
<th>Cluster de alta disponibilidade (2 AZs)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Custo mensal (estimado)</strong></td>
<td>R$ 50-150</td>
<td>R$ 800-5.000</td>
</tr>
<tr>
<td><strong>Disponibilidade</strong></td>
<td>99% (depende de updates e AZ única)</td>
<td>99,9% (redundância em múltiplas AZs)</td>
</tr>
<tr>
<td><strong>Tolerância a falhas</strong></td>
<td>Nenhuma (single point of failure)</td>
<td>Sim (failover automático entre nós e AZs)</td>
</tr>
<tr>
<td><strong>Escalabilidade</strong></td>
<td>Manual (reiniciar instância)</td>
<td>Auto Scaling (adiciona nós automaticamente)</td>
</tr>
<tr>
<td><strong>Manutenção</strong></td>
<td>Atualizações manuais, risco de downtime</td>
<td>Atualizações blue-green, zero downtime</td>
</tr>
</tbody>
</table>

<p><strong>Leitura adicional:</strong><br>
Saiba mais sobre clustering no n8n na <a href="https://docs.n8n.io/hosting/scaling/cluster/" target="_blank" rel="noopener noreferrer">documentação oficial</a>.</p>

---

<h2>Componentes essenciais de um cluster <strong>n8n</strong> na AWS e seus custos diretos</h2>
<p>Para rodar um cluster <strong>n8n de alta disponibilidade</strong> na AWS, você precisa de: instância(s) EC2 (ou ECS/EKS), load balancer, banco de dados (RDS ou PostgreSQL auto-hospedado), cache (Redis), storage (EFS/S3) e rede (VPC, subnets). Cada serviço tem custo fixo mensal que varia conforme região e configuração.</p>
<p>O banco de dados e o cache são os principais responsáveis pelo custo recorrente. Usar RDS Multi-AZ ou um Redis ElastiCache clusterado pode dobrar a conta em comparação a uma configuração simples. O load balancer (ALB) também tem custo por hora, mesmo inativo.</p>

<table>
<thead>
<tr>
<th>Serviço AWS</th>
<th>Função no cluster n8n</th>
<th>Custo estimado mensal (sa-east-1)</th>
<th>Configuração recomendada</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EC2 (ou ECS/EKS)</strong></td>
<td>Rodar instâncias do n8n (nós de aplicação)</td>
<td>R$ 150-1.200</td>
<td>2x t3.medium (m6i.large para produção)</td>
</tr>
<tr>
<td><strong>Application Load Balancer (ALB)</strong></td>
<td>Distribuir tráfego entre nós e fazer health checks</td>
<td>R$ 20-50</td>
<td>1x ALB com 10 regras de roteamento</td>
</tr>
<tr>
<td><strong>RDS PostgreSQL</strong></td>
<td>Armazenar workflows, credenciais e execuções</td>
<td>R$ 120-800</td>
<td>db.t3.micro (réplica de leitura) ou db.m6i.large (Multi-AZ)</td>
</tr>
<tr>
<td><strong>ElastiCache Redis</strong></td>
<td>Cache de sessões e sincronização entre nós</td>
<td>R$ 50-300</td>
<td>cache.t3.micro (cluster mode desativado)</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>Storage compartilhado para workflows e logs</td>
<td>R$ 30-200</td>
<td>50 GB GP2, 3 AZs</td>
</tr>
<tr>
<td><strong>S3 + CloudFront</strong></td>
<td>Backup de workflows e assets estáticos</td>
<td>R$ 5-50</td>
<td>10 GB storage, 100 GB transferência/mês</td>
</tr>
<tr>
<td><strong>VPC + Subnets + Security Groups</strong></td>
<td>Rede isolada e segurança</td>
<td>R$ 0-10</td>
<td>VPC padrão, 3 subnets privadas/publicas</td>
</tr>
<tr>
<td><strong>CloudWatch + SNS</strong></td>
<td>Monitoramento, logs e alertas</td>
<td>R$ 10-100</td>
<td>Dashboards, 10 alarmes, 10 GB logs</td>
</tr>
<tr>
<td><strong>IAM</strong></td>
<td>Permissões de acesso</td>
<td>R$ 0</td>
<td>Roles para EC2, Lambda e RDS</td>
</tr>
</tbody>
</table>

<p><strong>Custo total estimado (sa-east-1):</strong> R$ 400-3.500/mês, dependendo da configuração. O valor mínimo já inclui redundância em 2 AZs, load balancer e banco de dados com réplica.</p>

---

<h2>Quanto custa cada serviço AWS para rodar um cluster <strong>n8n</strong> (orçamento real)</h2>
<p>Aqui está a lista de serviços essenciais com preços reais (sa-east-1 e us-east-1, julho/2024) para um cluster <strong>n8n</strong> com 2 nós em AZs diferentes. Os valores são calculados com uso médio de 730 horas/mês (24/7).</p>

<table>
<thead>
<tr>
<th>Serviço</th>
<th>Configuração</th>
<th>Preço (sa-east-1)</th>
<th>Preço (us-east-1)</th>
<th>Custo mensal estimado</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EC2 (n8n worker)</strong></td>
<td>2x t3.medium (on-demand)</td>
<td>R$ 0,216/hora</td>
<td>US$ 0,0416/hora</td>
<td>R$ 315</td>
</tr>
<tr>
<td><strong>EC2 (n8n executer)</strong></td>
<td>1x t3.small (on-demand)</td>
<td>R$ 0,108/hora</td>
<td>US$ 0,0208/hora</td>
<td>R$ 79</td>
</tr>
<tr>
<td><strong>Application Load Balancer</strong></td>
<td>1x ALB (10 regras)</td>
<td>R$ 0,0225/hora</td>
<td>US$ 0,0225/hora</td>
<td>R$ 16</td>
</tr>
<tr>
<td><strong>RDS PostgreSQL</strong></td>
<td>db.t3.micro (2 vCPUs, 1 GB RAM)</td>
<td>R$ 0,16/hora</td>
<td>US$ 0,017/hora</td>
<td>R$ 117</td>
</tr>
<tr>
<td><strong>RDS PostgreSQL (réplica de leitura)</strong></td>
<td>db.t3.micro</td>
<td>R$ 0,08/hora</td>
<td>US$ 0,0085/hora</td>
<td>R$ 58</td>
</tr>
<tr>
<td><strong>ElastiCache Redis</strong></td>
<td>cache.t3.micro (1 node)</td>
<td>R$ 0,017/hora</td>
<td>US$ 0,015/hora</td>
<td>R$ 12</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>50 GB GP2 (2 AZs)</td>
<td>R$ 0,08/GB/mês</td>
<td>US$ 0,30/GB/mês</td>
<td>R$ 40</td>
</tr>
<tr>
<td><strong>S3 (storage)</strong></td>
<td>20 GB Standard</td>
<td>R$ 0,10/GB/mês</td>
<td>US$ 0,023/GB/mês</td>
<td>R$ 2</td>
</tr>
<tr>
<td><strong>S3 (transferência)</strong></td>
<td>100 GB/mês</td>
<td>R$ 0,15/GB</td>
<td>US$ 0,09/GB</td>
<td>R$ 15</td>
</tr>
<tr>
<td><strong>CloudWatch Logs</strong></td>
<td>10 GB logs/mês</td>
<td>R$ 0,50/GB</td>
<td>US$ 0,50/GB</td>
<td>R$ 5</td>
</tr>
<tr>
<td><strong>CloudWatch Alarms</strong></td>
<td>10 alarmes</td>
<td>R$ 0,10/alarme</td>
<td>US$ 0,10/alarme</td>
<td>R$ 1</td>
</tr>
<tr>
<td><strong>SNS (alertas)</strong></td>
<td>10 notificações/mês</td>
<td>R$ 0,01/notificação</td>
<td>US$ 0,01/notificação</td>
<td>R$ 0,10</td>
</tr>
</tbody>
<tfoot>
<tr>
<td colspan="4"><strong>Total (sa-east-1)</strong></td>
<td><strong>R$ 660,10</strong></td>
</tr>
<tr>
<td colspan="4"><strong>Total (us-east-1)</strong></td>
<td><strong>US$ 130 (≈ R$ 650)</strong></td>
</tr>
</tfoot>
</table>

<p><strong>Observações:</strong></p>
<ul>
<li>Preços convertidos de USD para BRL usando cotação de 1 USD = R$ 5,00 (julho/2024).</li>
<li>Instâncias spot podem reduzir o custo em até 70% para nós não críticos.</li>
<li>O RDS Multi-AZ dobra o custo da instância de banco de dados.</li>
<li>Se usar ECS/EKS em vez de EC2, adicione R$ 70-150 pelo cluster Kubernetes.</li>
</ul>

---

<h2>Configuração mínima viável de alta disponibilidade para <strong>n8n</strong> na AWS (orçamento enxuto)</h2>
<p>Para rodar um cluster <strong>n8n de alta disponibilidade</strong> com orçamento enxuto, use 2 instâncias <strong>t3.small</strong> em AZs diferentes, RDS com réplica de leitura, Redis ElastiCache <strong>cache.t3.micro</strong> e um ALB. O custo fica entre <strong>R$ 800 e R$ 1.200/mês</strong>.</p>
<p>Essa configuração não inclui auto-scaling, Multi-AZ no RDS nem cache distribuído — você terá performance limitada e downtime em caso de falha na AZ principal. Ideal para startups ou testes, mas não para produção crítica.</p>

<table>
<thead>
<tr>
<th>Serviço</th>
<th>Configuração</th>
<th>Custo (sa-east-1)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EC2 (nós n8n)</strong></td>
<td>2x t3.small (on-demand)</td>
<td>R$ 158</td>
</tr>
<tr>
<td><strong>Application Load Balancer</strong></td>
<td>1x ALB</td>
<td>R$ 16</td>
</tr>
<tr>
<td><strong>RDS PostgreSQL</strong></td>
<td>db.t3.micro + réplica de leitura</td>
<td>R$ 175</td>
</tr>
<tr>
<td><strong>ElastiCache Redis</strong></td>
<td>cache.t3.micro (1 node)</td>
<td>R$ 12</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>20 GB GP2</td>
<td>R$ 16</td>
</tr>
<tr>
<td><strong>S3</strong></td>
<td>10 GB + 50 GB transferência</td>
<td>R$ 7</td>
</tr>
<tr>
<td><strong>CloudWatch + SNS</strong></td>
<td>Dashboards e 5 alarmes</td>
<td>R$ 5</td>
</tr>
<tr>
<td><strong>VPC + Subnets</strong></td>
<td>Configuração padrão</td>
<td>R$ 5</td>
</tr>
</tbody>
<tfoot>
<tr>
<td colspan="3"><strong>Total mensal</strong></td>
<td><strong>R$ 394</strong></td>
</tr>
</tfoot>
</table>

<p><strong>Trade-offs da configuração mínima:</strong></p>
<ul>
<li><strong>Sem Multi-AZ no RDS:</strong> Se a AZ principal cair, o banco de dados também cai. Você perde dados não replicados.</li>
<li><strong>Sem auto-scaling:</strong> Se o tráfego dobrar, você precisará escalar manualmente ou aguardar downtime.</li>
<li><strong>Cache simples:</strong> Redis cache.t3.micro não é clusterizado — se o nó cair, sessões são perdidas.</li>
<li><strong>Performance limitada:</strong> t3.small tem 2 vCPUs e 2 GB RAM — workflows pesados podem travar.</li>
</ul>

<p><strong>Dica de ouro:</strong> Para reduzir ainda mais o custo, use <strong>instâncias spot</strong> para os nós n8n (quando possível) e pare o RDS fora do horário comercial se não houver execuções noturnas.</p>

---

<h2>Configuração <strong>enterprise-grade</strong>: o que muda e quanto custa mais</h2>
<p>Uma configuração <strong>enterprise-grade</strong> para n8n na AWS inclui auto-scaling, RDS Multi-AZ, Redis clusterizado, CloudFront para cache de assets, SNS para alertas proativos e CloudWatch avançado. O custo mensal sobe para <strong>R$ 2.500-5.000</strong>, mas você ganha SLA de 99,99% e performance escalável.</p>
<p>Essa configuração é ideal para empresas que rodam milhares de workflows por dia ou precisam de alta disponibilidade em produção 24/7. O auto-scaling garante que você não pague por nós ociosos, mas os nós sob demanda em horários de pico podem encarecer a conta.</p>

<table>
<thead>
<tr>
<th>Serviço</th>
<th>Configuração enterprise</th>
<th>Custo (sa-east-1)</th>
<th>Diferença vs. configuração mínima</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EC2 (nós n8n)</strong></td>
<td>2x m6i.large (on-demand) + Auto Scaling</td>
<td>R$ 600</td>
<td>+R$ 442</td>
</tr>
<tr>
<td><strong>Application Load Balancer</strong></td>
<td>1x ALB com 50 regras</td>
<td>R$ 50</td>
<td>+R$ 34</td>
</tr>
<tr>
<td><strong>RDS PostgreSQL</strong></td>
<td>db.m6i.large (Multi-AZ, 2 réplicas)</td>
<td>R$ 800</td>
<td>+R$ 625</td>
</tr>
<tr>
<td><strong>ElastiCache Redis</strong></td>
<td>cache.m6g.large (cluster mode ativado)</td>
<td>R$ 300</td>
<td>+R$ 288</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>100 GB GP2 (3 AZs)</td>
<td>R$ 80</td>
<td>+R$ 64</td>
</tr>
<tr>
<td><strong>S3 + CloudFront</strong></td>
<td>50 GB storage + 500 GB transferência</td>
<td>R$ 50</td>
<td>+R$ 43</td>
</tr>
<tr>
<td><strong>CloudWatch Advanced</strong></td>
<td>Dashboards personalizados, 50 alarmes, 50 GB logs</td>
<td>R$ 200</td>
<td>+R$ 195</td>
</tr>
<tr>
<td><strong>SNS (alertas avançados)</strong></td>
<td>20 notificações/mês + SMS</td>
<td>R$ 10</td>
<td>+R$ 10</td>
</tr>
<tr>
<td><strong>Auto Scaling Groups</strong></td>
<td>Configuração de escalabilidade horizontal</td>
<td>R$ 20</td>
<td>+R$ 20</td>
</tr>
</tbody>
<tfoot>
<tr>
<td colspan="3"><strong>Total mensal</strong></td>
<td><strong>R$ 2.110</strong></td>
</tr>
</tfoot>
</table>

<p><strong>Quando vale a pena investir nessa configuração?</strong></p>
<ul>
<li>Se você tem <strong>mais de 100 workflows ativos</strong> ou execuções diárias acima de 10.000.</li>
<li>Se o <strong>downtime custa mais de R$ 5.000/hora</strong> para seu negócio.</li>
<li>Se você precisa de <strong>integrações críticas</strong> (ex: pagamentos, emissões de NF-e) com SLA de 99,99%.</li>
<li>Se você tem <strong>equipe de DevOps</strong> para gerenciar a infraestrutura.</li>
</ul>

<p><strong>Curiosidade técnica:</strong> O n8n enterprise usa Redis para sincronizar estado entre nós. Em configurações clusterizadas, o Redis pode se tornar um bottleneck se não for dimensionado corretamente. Para workloads pesados, considere usar <strong>Redis Cluster</strong> ou substituir por <strong>Amazon MemoryDB</strong> (R$ 0,15/GB-hora).</p>



<h2>Como reduzir custos sem perder alta disponibilidade no <strong>n8n</strong></h2>
<p>Use instâncias spot para nós não críticos, pare o RDS fora do horário comercial e otimize o Redis com cache agressivo. A AWS tem uma <a href="https://calculator.aws.amazon.com/" target="_blank" rel="noopener noreferrer">calculadora de custos</a> que ajuda a simular reduções sem perder redundância.</p>

<p><strong>Dicas práticas:</strong></p>
<ul>
<li><strong>Instâncias spot:</strong> Reduz até 70% no custo dos nós n8n se eles não forem críticos (ex: nós de execução não essenciais). A AWS pode interrompê-los, mas o n8n retoma automaticamente.</li>
<li><strong>RDS desligado noturno:</strong> Se você não roda workflows de madrugada, pare o RDS das 22h às 6h. Economiza ~30% no banco de dados.</li>
<li><strong>S3 + CloudFront:</strong> Use para assets estáticos (upload de arquivos, logs) em vez de EFS. CloudFront reduz a transferência de dados em até 50%.</li>
<li><strong>Redis otimizado:</strong> Aumente o TTL do cache de 5 para 30 minutos e reduza o tamanho das chaves. Cache.t3.micro já é suficiente para 90% dos casos.</li>
<li><strong>Monitoramento proativo:</strong> Configure CloudWatch Alarms para alertar quando o custo mensal ultrapassar 80% do orçamento. Use dashboards para acompanhar uso de CPU, memória e disco.</li>
</ul>

<p><strong>Exemplo de economia:</strong> Em um cluster com R$ 1.200/mês, usar spot nos nós não críticos + parar RDS noturno reduz para ~R$ 700/mês, mantendo redundância.</p>

---

<h2>Comparativo: <strong>n8n na AWS</strong> vs <strong>n8n auto-hospedado em VPS</strong> (DigitalOcean/Linode)</h2>
<p>Para uma configuração de alta disponibilidade com 2 nós e redundância, a AWS custa R$ 800-5.000/mês, enquanto um VPS (DigitalOcean ou Linode) fica entre R$ 300-1.200. A AWS vale a pena se você precisa de auto-scaling, Multi-AZ e suporte 24/7.</p>

<table>
<thead>
<tr>
<th>Critério</th>
<th>AWS (sa-east-1)</th>
<th>DigitalOcean (2 droplets)</th>
<th>Linode (2 shared)</th>
<th>Vencedor</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Custo mensal (2 nós + redundância)</strong></td>
<td>R$ 800-5.000</td>
<td>R$ 300-600</td>
<td>R$ 400-800</td>
<td>VPS (DigitalOcean)</td>
</tr>
<tr>
<td><strong>Alta disponibilidade nativa</strong></td>
<td>Sim (Multi-AZ, ALB)</td>
<td>Não (depende de configuração manual)</td>
<td>Não (depende de configuração manual)</td>
<td>AWS</td>
</tr>
<tr>
<td><strong>Auto-scaling</strong></td>
<td>Sim (ECS/EKS)</td>
<td>Não (manual)</td>
<td>Não (manual)</td>
<td>AWS</td>
</tr>
<tr>
<td><strong>Banco de dados redundante</strong></td>
<td>Sim (RDS Multi-AZ)</td>
<td>Não (PostgreSQL com réplica manual)</td>
<td>Não (PostgreSQL com réplica manual)</td>
<td>AWS</td>
<tr>
<td><strong>Suporte 24/7</strong></td>
<td>Sim (AWS Support)</td>
<td>Não (suporte por ticket)</td>
<td>Não (suporte por ticket)</td>
<td>AWS</td>
<tr>
<td><strong>Custos ocultos</strong></td>
<td>Transferência de dados, requisições ALB, logs</td>
<td>Backups automáticos, transferência entre droplets</td>
<td>Backups automáticos, transferência entre nós</td>
<td>VPS (menos custos ocultos)</td>
<tr>
<td><strong>Dificuldade de configuração</strong></td>
<td>Alta (Terraform, IAM, VPC)</td>
<td>Média (Droplet + PostgreSQL manual)</td>
<td>Média (Linode + PostgreSQL manual)</td>
<td>VPS</td>
<tr>
<td><strong>Quando escolher</strong></td>
<td>Produção crítica, equipes DevOps, SLA 99,99%</td>
<td>Startups, testes, orçamento limitado</td>
<td>Pequenas empresas, custos controlados</td>
<td>Depende do caso</td>
</tr>
</tbody>
</table>

<p><strong>Conclusão:</strong></p>
<ul>
<li><strong>Escolha AWS se:</strong> Você precisa de alta disponibilidade nativa, auto-scaling, Multi-AZ e suporte 24/7. Ideal para empresas que não podem ter downtime ou têm tráfego variável.</li>
<li><strong>Escolha VPS (DigitalOcean/Linode) se:</strong> Você tem orçamento limitado, não precisa de auto-scaling e consegue configurar redundância manualmente. Ideal para startups ou testes.</li>
</ul>

<p><strong>Custos ocultos comuns:</strong></p>
<ul>
<li>Na AWS: Transferência de dados entre AZs (R$ 0,01/GB), requisições ALB (R$ 0,02 por 1.000), logs CloudWatch (R$ 0,50/GB).</li>
<li>Em VPS: Backups automáticos (R$ 10-20/mês), transferência entre nós (R$ 0,01/GB), IP flutuante (R$ 5/mês).</li>
</ul>

---

<h2>Passo a passo para montar seu cluster <strong>n8n</strong> na AWS do zero (guia prático)</h2>
<p>Use Terraform para provisionar toda a infraestrutura em 15 minutos. O template a seguir cria 2 nós n8n em AZs diferentes, RDS PostgreSQL com réplica, Redis ElastiCache e ALB. Baixe o <a href="https://github.com/automacao-art/n8n-aws-terraform" target="_blank" rel="noopener noreferrer">template pronto no GitHub</a>.</p>

<p><strong>Pré-requisitos:</strong> Conta AWS (IAM com permissões de admin), Terraform instalado, chave SSH para EC2.</p>

<p><strong>Passo 1: Configure variáveis do Terraform</strong></p>
<pre><code># variables.tf
variable "aws_region" {
  default = "sa-east-1"
}

variable "instance_type" {
  default = "t3.small"
}

variable "db_instance_type" {
  default = "db.t3.micro"
}</code></pre>

<p><strong>Resultado esperado:</strong> Arquivo `variables.tf` com as configurações regionais e de instância.</p>

<p><strong>Passo 2: Provisione a infraestrutura com Terraform</strong></p>
<ol>
<li>Clone o repositório:
<pre><code>git clone https://github.com/automacao-art/n8n-aws-terraform.git
cd n8n-aws-terraform</code></pre>
</li>
<li>Inicialize e aplique:
<pre><code>terraform init
terraform apply -auto-approve</code></pre>
</li>
</ol>

<p><strong>Resultado esperado:</strong> Cluster n8n provisionado com 2 nós, RDS, Redis, ALB e EFS. URL do n8n será exibida no output do Terraform.</p>

<p><strong>Passo 3: Configure segurança e acesso</strong></p>
<ul>
<li>Edite o Security Group para permitir tráfego na porta 5678 (n8n) e 22 (SSH).</li>
<li>Crie um IAM Role para o EC2 com permissões mínimas (S3, CloudWatch, RDS).</li>
<li>Configure o ALB para fazer health checks na rota `/health` do n8n.</li>
</ul>

<p><strong>Exemplo de Security Group:</strong></p>
<pre><code>resource "aws_security_group" "n8n_sg" {
  name        = "n8n-security-group"
  description = "Allow HTTP and SSH traffic"

  ingress {
    from_port   = 5678
    to_port     = 5678
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Apenas acesso interno
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}</code></pre>

<p><strong>Dica de ouro:</strong> Use <strong>Terraform Cloud</strong> ou <strong>GitHub Actions</strong> para versionar e aplicar mudanças automaticamente. Isso evita erros manuais e permite rollback rápido.</p>

---

<h2>Monitoramento e alertas: como não ser surpreendido pela AWS</h2>
<p>Configure CloudWatch Alarms para CPU > 80%, memória > 90% e custo mensal > 80% do orçamento. Use SNS para notificações por email ou SMS e um dashboard público no CloudWatch.</p>

<p><strong>Passo a passo para configurar alertas:</strong></p>
<ol>
<li><strong>Crie um dashboard no CloudWatch:</strong>
   - Acesse CloudWatch > Dashboards > Criar dashboard.
   - Adicione widgets para CPU, memória, disco e custo.</li>
<li><strong>Configure alarmes proativos:</strong>
   <pre><code>aws cloudwatch put-metric-alarm \
     --alarm-name "HighCPU-n8n" \
     --alarm-description "CPU acima de 80% por 5 minutos" \
     --namespace "AWS/EC2" \
     --metric-name "CPUUtilization" \
     --dimensions "Name=InstanceId,Value=i-1234567890" \
     --statistic "Average" \
     --period 300 \
     --threshold 80 \
     --comparison-operator "GreaterThanThreshold" \
     --evaluation-periods 1 \
     --alarm-actions "arn:aws:sns:sa-east-1:123456789012:Alertas-n8n"</code></pre>
   </li>
<li><strong>Alerta de custo mensal:</strong>
   - Configure um alarm para `EstimatedCharges` no namespace `AWS/Billing`.
   - Use o valor de `ServiceName = "AmazonEC2"` e `Currency = "USD"`.
   - Exemplo: Alerta quando o custo ultrapassar US$ 200 (≈ R$ 1.000).</li>
</ol>

<p><strong>Exemplo de dashboard público:</strong></p>
<pre><code>{
  "widgets": [
    {
      "type": "metric",
      "x": 0,
      "y": 0,
      "width": 12,
      "height": 6,
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890"],
          [".", "NetworkIn", ".", "."],
          [".", "DiskReadOps", ".", "."]
        ],
        "period": 300,
        "stat": "Average",
        "region": "sa-east-1",
        "title": "CPU e Rede - Nó 1"
      }
    }
  ]
}</code></pre>

<p><strong>Curiosidade técnica:</strong> O CloudWatch armazena logs por padrão por 30 dias. Para logs de workflows do n8n, configure um <strong>log group personalizado</strong> com retenção de 1 ano no `/aws/ecs/n8n`. Isso evita surpresas na conta e ajuda em auditorias.</p>

---

<h2>Erros comuns que explodem o custo do seu cluster <strong>n8n</strong> na AWS (e como evitá-los)</h2>
<p>Não desligar instâncias ociosas, não usar cache, não monitorar custos e não otimizar backups são os erros mais caros. Um cliente pagou R$ 15.000 em um mês por esquecer de parar um RDS Multi-AZ em testes.</p>

<table>
<thead>
<tr>
<th>Erro</th>
<th>Impacto</th>
<th>Como evitar</th>
<th>Custo real (exemplo)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Instâncias sempre ligadas</strong></td>
<td>Pagar por nós ociosos 24/7</td>
<td>Use Auto Scaling ou CloudWatch Actions para parar nós fora do horário comercial.</td>
<td>R$ 300-500/mês em nós desnecessários</td>
</tr>
<tr>
<td><strong>RDS sem réplica ou Multi-AZ</strong></td>
<td>Downtime em caso de falha na AZ principal</td>
<td>Ative Multi-AZ no RDS e configure réplica de leitura para workloads pesados.</td>
<td>R$ 5.000-10.000 em perda de negócios por downtime</td>
</tr>
<tr>
<td><strong>Falta de auto-scaling</strong></td>
<td>Picos de tráfego derrubam o cluster</td>
<td>Configure Auto Scaling Groups para adicionar nós automaticamente.</td>
<td>R$ 2.000-4.000 em perda de produtividade</td>
</tr>
<tr>
<td><strong>Não usar cache (Redis)</strong></td>
<td>Banco de dados sobrecarregado, lentidão em workflows</td>
<td>Configure ElastiCache Redis com TTL de 30 minutos para sessões e estado.</td>
<td>R$ 1.000-2.000 em RDS superdimensionado</td>
</tr>
<tr>
<td><strong>Backups não otimizados</strong></td>
<td>Backups diários do EFS/RDS ocupam storage e aumentam custo</td>
<td>Use lifecycle policies para deletar backups antigos (ex: 7 dias).</td>
<td>R$ 500-1.000/mês em storage desnecessário</td>
</tr>
<tr>
<td><strong>Não monitorar custos</strong></td>
<td>Surpresas na fatura por serviços não otimizados</td>
<td>Configure CloudWatch Billing Alarms para alertar em 80% do orçamento.</td>
<td>R$ 15.000 em um mês (caso real)</td>
</tr>
<tr>
<td><strong>Usar regiões caras</strong></td>
<td>Sa-east-1 custa 30% mais que us-east-1</td>
<td>Use us-east-1 para workloads não críticos e sa-east-1 apenas para produção.</td>
<td>R$ 200-500/mês a mais</td>
</tr>
<tr>
<td><strong>Instâncias on-demand sempre</strong></td>
<td>Custo 5-10x maior que instâncias spot</td>
<td>Use spot para nós não críticos (ex: nós de execução não essenciais).</td>
<td>R$ 1.000-3.000/mês a mais</td>
</tr>
<tr>
<td><strong>Security Groups abertos</strong></td>
<td>Risco de ataques e custos com transferência de dados</td>
<td>Restrinja acesso a IPs específicos e use NACLs para camadas extras.</td>
<td>R$ 1.000-2.000 em transferência de dados externa</td>
</tr>
<tr>
<td><strong>Não usar EFS otimizado</strong></td>
<td>EFS Standard custa 3x mais que EFS Infrequent Access</td>
<td>Use EFS IA para logs e assets não acessados com frequência.</td>
<td>R$ 300-600/mês a mais</td>
</tr>
</tbody>
</table>

<p><strong>Casos reais:</strong></p>
<ul>
<li><strong>Startup X:</strong> Esqueceu de parar um RDS Multi-AZ em ambiente de testes por 2 meses. Custo: R$ 15.000.</li>
<li><strong>Empresa Y:</strong> Não usava cache Redis e o RDS db.m6i.large custava R$ 1.200/mês. Redimensionar para db.t3.medium + Redis reduziu para R$ 300/mês.</li>
<li><strong>Cliente Z:</strong> Tinha 5 nós n8n sempre ligados em us-east-1. Migrar para spot + Auto Scaling reduziu de R$ 2.500 para R$ 900/mês.</li>
</ul>

<p><strong>Dica final:</strong> Use a <a href="https://aws.amazon.com/aws-cost-management/aws-cost-explorer/" target="_blank" rel="noopener noreferrer">AWS Cost Explorer</a> para identificar serviços que mais gastam e crie budgets com alertas. A maioria dos erros de custo vem de serviços esquecidos (ex: ALB inativo, logs em excesso).</p>



<h2>Perguntas frequentes sobre o custo de um cluster n8n de alta disponibilidade na AWS</h2><h3>É possível manter um cluster n8n de alta disponibilidade na AWS por menos de R$ 500/mês?</h3><p>Não é recomendado. Uma configuração mínima viável com redundância em duas zonas de disponibilidade (AZs) custa entre R$ 800 e R$ 1.200/mês. Configurações abaixo disso não oferecem alta disponibilidade real ou SLA adequado para produção.</p><h3>Quais são os serviços da AWS que realmente impactam no custo de um cluster n8n?</h3><p>Os principais responsáveis pelo custo são o RDS PostgreSQL (especialmente em Multi-AZ), as instâncias EC2 ou ECS/EKS, o Application Load Balancer e o ElastiCache Redis. O banco de dados e o cache costumam representar 50-70% da conta mensal.</p><h3>Como calcular o custo de uma instância EC2 para rodar n8n na AWS?</h3><p>Multiplique o preço por hora da instância (ex: t3.medium em sa-east-1 = R$ 0,216/hora) por 730 horas/mês. Adicione custos de transferência de dados, storage EFS/S3 e serviços complementares como ALB e Redis.</p><h3>O que acontece se o tráfego dobrar? O custo dobra automaticamente?</h3><p>Não necessariamente. Se você tiver Auto Scaling configurado, novos nós serão provisionados automaticamente, mas o custo aumentará proporcionalmente ao uso adicional. Sem Auto Scaling, o cluster pode travar ou ficar lento, impactando a produtividade.</p><h3>Qual a diferença de custo entre usar RDS e um banco de dados auto-hospedado no cluster?</h3><p>O RDS Multi-AZ custa cerca de R$ 600-800/mês (db.t3.micro) ou R$ 1.500+ (db.m6i.large). Um PostgreSQL auto-hospedado em EC2 (ex: t3.medium) custa R$ 150-300/mês, mas exige gerenciamento manual de backups, réplicas e failover.</p><h3>É necessário usar Load Balancer para alta disponibilidade no n8n?</h3><p>Sim. O Application Load Balancer (ALB) é essencial para distribuir tráfego entre nós, fazer health checks e garantir failover automático entre AZs. Sem ALB, você não terá alta disponibilidade real no n8n.</p><h3>Como monitorar os custos do cluster n8n na AWS em tempo real?</h3><p>Configure o AWS Cost Explorer para visualizar gastos por serviço e crie alarmes no CloudWatch para notificações quando o custo ultrapassar 80% do orçamento. Use dashboards públicos para acompanhar métricas de infraestrutura e financeiras em um só lugar.</p><h3>Quais são os custos ocultos mais comuns ao rodar n8n na AWS?</h3><p>Os principais são: transferência de dados entre AZs (R$ 0,01/GB), requisições do ALB (R$ 0,02 por 1.000), logs excessivos no CloudWatch (R$ 0,50/GB) e backups não otimizados do EFS/RDS. Esses itens podem adicionar R$ 200-500/mês à conta sem que você perceba.

<h2>Vale a pena investir em um cluster n8n na AWS? Descubra agora!</h2><p>Manter um cluster n8n de alta disponibilidade na AWS é um investimento estratégico para empresas que não podem tolerar downtime ou precisam de escalabilidade automática. Embora o custo inicial seja maior que um servidor simples (R$ 800-5.000/mês), a redundância, o SLA de 99,9% e a capacidade de lidar com picos de tráfego tornam a AWS a escolha ideal para produção crítica. Para startups ou testes, uma configuração enxuta em VPS (R$ 300-800/mês) pode ser suficiente, mas exige mais trabalho manual. A decisão deve considerar seu orçamento, tolerância a riscos e necessidade de automação confiável.</p><ul><li><strong>Para produção crítica:</strong> AWS é a melhor opção (R$ 2.500-5.000/mês).</li><li><strong>Para startups ou testes:</strong> VPS como DigitalOcean ou Linode (R$ 300-800/mês).</li><li><strong>Economia inteligente:</strong> Use instâncias spot, pare o RDS à noite e otimize cache com Redis.</li><li><strong>Segurança e escalabilidade:</strong> A AWS oferece Multi-AZ, Auto Scaling e suporte 24/7 nativamente.</li><li><strong>Próximos passos:</strong> Baixe nosso template Terraform gratuito e comece a provisionar seu cluster em 15 minutos!</li></ul><p><a href="#" target="_blank" rel="noopener noreferrer">Explore nossa categoria de automação com n8n</a> para mais guias práticos, comparativos e dicas de otimização de custos.</p>

<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "name": "Perguntas frequentes sobre o custo de um cluster n8n de alta disponibilidade na AWS",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "É possível manter um cluster n8n de alta disponibilidade na AWS por menos de R$ 500/mês?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não é recomendado. Uma configuração mínima viável com redundância em duas zonas de disponibilidade (AZs) custa entre R$ 800 e R$ 1.200/mês. Configurações abaixo disso não oferecem alta disponibilidade real ou SLA adequado para produção."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os serviços da AWS que realmente impactam no custo de um cluster n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os principais responsáveis pelo custo são o RDS PostgreSQL (especialmente em Multi-AZ), as instâncias EC2 ou ECS/EKS, o Application Load Balancer e o ElastiCache Redis. O banco de dados e o cache costumam representar 50-70% da conta mensal."
          }
        },
        {
          "@type": "Question",
          "name": "Como calcular o custo de uma instância EC2 para rodar n8n na AWS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Multiplique o preço por hora da instância (ex: t3.medium em sa-east-1 = R$ 0,216/hora) por 730 horas/mês. Adicione custos de transferência de dados, storage EFS/S3 e serviços complementares como ALB e Redis."
          }
        },
        {
          "@type": "Question",
          "name": "O que acontece se o tráfego dobrar? O custo dobra automaticamente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não necessariamente. Se você tiver Auto Scaling configurado, novos nós serão provisionados automaticamente, mas o custo aumentará proporcionalmente ao uso adicional. Sem Auto Scaling, o cluster pode travar ou ficar lento, impactando a produtividade."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença de custo entre usar RDS e um banco de dados auto-hospedado no cluster?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O RDS Multi-AZ custa cerca de R$ 600-800/mês (db.t3.micro) ou R$ 1.500+ (db.m6i.large). Um PostgreSQL auto-hospedado em EC2 (ex: t3.medium) custa R$ 150-300/mês, mas exige gerenciamento manual de backups, réplicas e failover."
          }
        },
        {
          "@type": "Question",
          "name": "É necessário usar Load Balancer para alta disponibilidade no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O Application Load Balancer (ALB) é essencial para distribuir tráfego entre nós, fazer health checks e garantir failover automático entre AZs. Sem ALB, você não terá alta disponibilidade real no n8n."
          }
        },
        {
          "@type": "Question",
          "name": "Como monitorar os custos do cluster n8n na AWS em tempo real?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Configure o AWS Cost Explorer para visualizar gastos por serviço e crie alarmes no CloudWatch para notificações quando o custo ultrapassar 80% do orçamento. Use dashboards públicos para acompanhar métricas de infraestrutura e financeiras em um só lugar."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os custos ocultos mais comuns ao rodar n8n na AWS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os principais são: transferência de dados entre AZs (R$ 0,01/GB), requisições do ALB (R$ 0,02 por 1.000), logs excessivos no CloudWatch (R$ 0,50/GB) e backups não otimizados do EFS/RDS. Esses itens podem adicionar R$ 200-500/mês à conta sem que você perceba."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Quanto custa manter um cluster n8n de alta disponibilidade na AWS em 2024?",
      "description": "Saiba exatamente quanto custa manter um cluster n8n de alta disponibilidade na AWS em 2024. Preços detalhados, configurações e dicas para reduzir custos sem perder redundância.",
      "author": {
        "@type": "Organization",
        "name": "Automação.art",
        "url": "https://automacao.art.br"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automação.art",
        "url": "https://automacao.art.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://automacao.art.br/logo.png"
        }
      },
      "datePublished": "2024-07-15",
      "dateModified": "2024-07-15",
      "inLanguage": "pt-BR",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/custo-cluster-n8n-alta-disponibilidade-aws-2024"
      }
    }
  ]
}</script>