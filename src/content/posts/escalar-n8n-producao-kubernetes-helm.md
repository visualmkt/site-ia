---
title: "Como escalar o n8n em produção com Kubernetes e Helm"
description: "Guia definitivo para escalar n8n em produção com Kubernetes e Helm. Alta disponibilidade, escalabilidade e segurança para automações profissionais."
cluster: "dev"
formato: "como fazer/automatizar"
pubDate: 2026-08-19
image: "https://www.automacao.art.br/images/posts/escalar-n8n-producao-kubernetes-helm.jpg"
imageAlt: "Arquitetura n8n Kubernetes produção com PostgreSQL Redis Ingress"
draft: false
---

<h2>Por que escalar o n8n com Kubernetes e Helm?</h2>
<p>Rodar o n8n sem orquestração limita você a uma única máquina, o que quebra em dois cenários: <strong>pico de carga</strong> (workflows HTTP/webhook lotam a CPU) ou <strong>falha de hardware</strong> (container cai e ninguém conserta). Um workflow simples que envia 100 e-mails por segundo trava o n8n em Docker puro, enquanto no Kubernetes ele escala automaticamente para 3 réplicas sem perder requisições. Sem persistência configurada, você perde todos os workflows ao reiniciar o container — já viu perder 50 automações porque o Docker atualizou sem aviso?</p>
<p>O Helm resolve o problema de configuração repetitiva: ao invés de escrever 10 arquivos YAML manualmente, você ajusta 5 parâmetros no <code>values.yaml</code> e aplica tudo de uma vez. Para quem já tentou orquestrar n8n com Docker Compose em produção, a diferença é clara: <strong>o Helm padroniza o deploy</strong>, enquanto o Kubernetes garante <strong>alta disponibilidade</strong> e <strong>escalabilidade horizontal</strong> nativa.</p>
<p><strong>Dica de quem usa na prática:</strong> Se você começou com <a href="/docker-n8n-self-hosted">n8n no Docker</a>, o primeiro sinal de que precisa migrar é quando os logs mostram <code>Error: connect ECONNREFUSED localhost:5432</code> — porque o banco de dados não sobreviveu ao reboot. No Kubernetes, o erro desaparece quando você usa <strong>PersistentVolumeClaims</strong> para o PostgreSQL.</p>

<h2>Pré-requisitos: o que você precisa antes de começar</h2>
<p>Você só precisa de 4 coisas para rodar n8n em produção no Kubernetes:</p>
<ul>
<li><strong>Conta em provedor de cloud</strong>: AWS (EKS), GCP (GKE), Azure (AKS) ou DigitalOcean (DOKS).</li>
<li><strong>Ferramentas CLI</strong>: <strong>kubectl</strong> (v1.27+) e <strong>Helm</strong> (v3.12+).</li>
<li><strong>Domínio e SSL</strong>: um domínio apontando para seu cluster e certificado TLS (usaremos Let's Encrypt).</li>
<li><strong>n8n Helm Chart</strong>: o repositório oficial mantido pela comunidade.</li>
</ul>
<p>Instale as ferramentas:</p>
<div class="code-block">
<p># Instala kubectl (Linux/WSL)</p>
<pre><code>curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl</code></pre>

<p># Instala Helm (Linux/WSL)</p>
<pre><code>curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash</code></pre>
</div>
<p><a href="https://docs.n8n.io/hosting/installation/environment-variables/" target="_blank" rel="noopener noreferrer">Documentação oficial do n8n</a> lista variáveis de ambiente essenciais para produção.</p>

<h2>Instalando o cluster Kubernetes: escolha do provedor e configuração inicial</h2>
<p>A escolha do provedor define custo, complexidade e tempo de setup. Comparação rápida:</p>
<table>
<thead>
<tr>
<th>Provedor</th>
<th>Custo inicial</th>
<th>Complexidade</th>
<th>Tempo de setup</th>
<th>Melhor para</th>
</tr>
</thead>
<tbody>
<tr>
<td>EKS (AWS)</td>
<td>R$ 0,10/hora por nó (t3.medium)</td>
<td>Alta (IAM, VPC, subnets)</td>
<td>2-3 horas</td>
<td>Workloads críticos, multi-região</td>
</tr>
<tr>
<td>GKE (Google)</td>
<td>R$ 0,08/hora por nó (e2-medium)</td>
<td>Média (autopilot vs padrão)</td>
<td>1-2 horas</td>
<td>Equipes com expertise GCP</td>
</tr>
<tr>
<td>AKS (Azure)</td>
<td>R$ 0,09/hora por nó (Standard_B2s)</td>
<td>Média (integração AD)</td>
<td>1,5 horas</td>
<td>Empresas Microsoft</td>
</tr>
<tr>
<td>DigitalOcean (DOKS)</td>
<td>R$ 0,05/hora por nó (Basic)</td>
<td>Baixa</td>
<td>30 min</td>
<td>Startups e MVPs</td>
</tr>
<tr>
<td>k3s (local)</td>
<td>R$ 0 (hardware próprio)</td>
<td>Baixa</td>
<td>15 min</td>
<td>Testes e desenvolvimento</td>
</tr>
</tbody>
</table>
<p>Para este guia, usaremos o <strong>DigitalOcean DOKS</strong> (mais barato e simples). Siga o passo a passo:</p>
<ol>
<li>Crie um cluster via painel ou CLI:
<div class="code-block">
<pre><code>doctl kubernetes cluster create n8n-prod \
  --region nyc1 \
  --node-pool "name=worker-pool;size=s-2vcpu-4gb;count=3"</code></pre>
</div>
</li>
<li>Configure o kubectl:
<div class="code-block">
<pre><code>doctl kubernetes cluster kubeconfig save n8n-prod</code></pre>
</div>
</li>
<li>Verifique os nós:
<div class="code-block">
<pre><code>kubectl get nodes
\# Saída esperada:
NAME                STATUS   ROLES    AGE   VERSION
pool-abc123-xyz     Ready    <none>   5m    v1.27.4</code></pre>
</div>
</li>
</ol>
<p><strong>Curiosidade técnica:</strong> O DOKS usa <strong>containerd</strong> como runtime padrão, enquanto EKS ainda permite Docker. Se seus workflows dependem de Docker-in-Docker, ajuste o <code>values.yaml</code> para usar <code>dind: true</code> no deployment do n8n.</p>

<h2>Instalando o Helm e adicionando o repositório oficial do n8n</h2>
<p>O Helm é o "gerenciador de pacotes" do Kubernetes. Instale e configure:</p>
<ol>
<li>Instale o Helm:
<div class="code-block">
<pre><code>helm version --client
\# Deve mostrar: version.BuildInfo{Version:"v3.12.0"}</code></pre>
</div>
</li>
<li>Adicione o repositório oficial do n8n (mantido pela comunidade):
<div class="code-block">
<pre><code>helm repo add n8n https://n8nio.github.io/helm-charts/
helm repo update</code></pre>
</div>
</li>
<li>Verifique as versões disponíveis:
<div class="code-block">
<pre><code>helm search repo n8n/n8n --versions
\# Saída esperada:
n8n/n8n    0.25.0    1.33.0    Self-host n8n in Kubernetes</code></pre>
</div>
</li>
</ol>
<p><strong>Link útil:</strong> <a href="https://github.com/n8nio/helm-charts" target="_blank" rel="noopener noreferrer">Repositório oficial do Helm Chart do n8n no GitHub</a>.</p>
<p><strong>Dica de quem usa na prática:</strong> Sempre verifique a versão do chart antes de instalar. O n8n 1.33.0 requer chart 0.25.0 ou superior — versões antigas não suportam <strong>Redis</strong> nativo.</p>

<h2>Configurando o Helm Chart do n8n para produção: values.yaml explicado</h2>
<p>O <code>values.yaml</code> é onde você define tudo: réplicas, banco de dados, autenticação e persistência. Abaixo, a tabela com parâmetros essenciais e valores recomendados para produção:</p>
<table>
<thead>
<tr>
<th>Parâmetro</th>
<th>Valor recomendado</th>
<th>Descrição</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>replicaCount</code></td>
<td><code>3</code></td>
<td>Quantidade mínima de réplicas para alta disponibilidade.</td>
</tr>
<tr>
<td><code>persistence.enabled</code></td>
<td><code>true</code></td>
<td>Habilita PersistentVolume para dados do n8n.</td>
</tr>
<tr>
<td><code>persistence.size</code></td>
<td><code>10Gi</code></td>
<td>Tamanho do volume para workflows e configurações.</td>
</tr>
<tr>
<td><code>database.type</code></td>
<td><code>postgres</code></td>
<td>Banco de dados externo (evite SQLite em produção).</td>
</tr>
<tr>
<td><code>redis.enabled</code></td>
<td><code>true</code></td>
<td>Habilita Redis para caching e filas.</td>
</tr>
<tr>
<td><code>ingress.enabled</code></td>
<td><code>true</code></td>
<td>Habilita Ingress para acesso externo.</td>
</tr>
<tr>
<td><code>auth.enabled</code></td>
<td><code>true</code></td>
<td>Ativa autenticação básica no dashboard.</td>
</tr>
<tr>
<td><code>auth.username</code></td>
<td><code>admin</code> (mude!)</td>
<td>Usuário padrão para login.</td>
</tr>
<tr>
<td><code>auth.password</code></td>
<td>Gere com <code>openssl rand -base64 16</code></td>
<td>Senha forte para o dashboard.</td>
</tr>
</tbody>
</table>
<p>Crie um arquivo <code>values-prod.yaml</code> com o conteúdo acima. Para ajustar a senha automaticamente, use:</p>
<div class="code-block">
<pre><code>export N8N_PASSWORD=$(openssl rand -base64 16)
echo "auth.password: $N8N_PASSWORD" >> values-prod.yaml</code></pre>
</div>
<p><strong>Curiosidade técnica:</strong> O Helm Chart do n8n não usa <strong>StatefulSet</strong> para o n8n em si (apenas para o PostgreSQL). Isso porque o n8n é stateless por design — os dados ficam no banco externo ou no <strong>PersistentVolume</strong>.</p>

<h2>Deploy do n8n com PostgreSQL e Redis: garantindo persistência e performance</h2>
<p>O n8n precisa de dois componentes externos para funcionar bem em produção: um banco de dados relacional (<strong>PostgreSQL</strong>) e um cache/queue (<strong>Redis</strong>). Vamos configurar ambos via Helm Chart:</p>
<ol>
<li>Instale o PostgreSQL (usaremos o Bitnami Chart):
<div class="code-block">
<pre><code>helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres bitnami/postgresql \
  --set auth.postgresPassword=SENHA_POSTGRES \
  --set primary.persistence.size=20Gi</code></pre>
</div>
</li>
<li>Instale o Redis (também Bitnami):
<div class="code-block">
<pre><code>helm install redis bitnami/redis \
  --set auth.enabled=true \
  --set auth.password=SENHA_REDIS</code></pre>
</div>
</li>
<li>Configure as credenciais no <code>values-prod.yaml</code>:
<div class="code-block">
<pre><code>database:
  type: postgres
  host: postgres-primary
  port: 5432
  database: n8n
  user: postgres
  password: SENHA_POSTGRES

redis:
  enabled: true
  host: redis-master
  port: 6379
  password: SENHA_REDIS</code></pre>
</div>
</li>
<li>Faça o deploy do n8n:
<div class="code-block">
<pre><code>helm upgrade --install n8n-prod n8n/n8n \
  -f values-prod.yaml \
  --namespace n8n --create-namespace</code></pre>
</div>
</li>
</ol>
<p><strong>Snippet útil:</strong> Para verificar se o PostgreSQL está pronto:</p>
<div class="code-block">
<pre><code>kubectl get pods -n n8n
\# Saída esperada:
NAME                            READY   STATUS    RESTARTS   AGE
n8n-prod-n8n-abc123-xyz         1/1     Running   0          2m
postgres-primary-0              1/1     Running   0          5m
redis-master-0                  1/1     Running   0          3m</code></pre>
</div>
<p><strong>Dica de quem usa na prática:</strong> Sempre use <strong>PersistentVolumeClaims</strong> com <code>storageClassName: do-block-storage</code> no DigitalOcean (ou equivalente no seu provedor). Sem isso, seus dados somem ao reiniciar o pod.</p>

<h2>Configurando Ingress Controller e SSL/TLS para acesso seguro</h2>
<p>Sem Ingress, você acessa o n8n apenas via <code>NodePort</code> ou <code>LoadBalancer</code> — lento e inseguro. Vamos usar o <strong>ingress-nginx</strong> + <strong>cert-manager</strong> para HTTPS automático:</p>
<ol>
<li>Instale o ingress-nginx:
<div class="code-block">
<pre><code>helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --set controller.service.type=LoadBalancer</code></pre>
</div>
</li>
<li>Instale o cert-manager (para Let's Encrypt):
<div class="code-block">
<pre><code>helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager \
  --set installCRDs=true</code></pre>
</div>
</li>
<li>Crie um ClusterIssuer (substitua <code>your-email@dominio.com</code>):
<div class="code-block">
<pre><code>cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: your-email@dominio.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF</code></pre>
</div>
</li>
<li>Configure o Ingress no <code>values-prod.yaml</code>:
<div class="code-block">
<pre><code>ingress:
  enabled: true
  className: nginx
  hosts:
    - host: n8n.seudominio.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: n8n-tls
      hosts:
        - n8n.seudominio.com</code></pre>
</div>
</li>
<li>Aplique as mudanças:
<div class="code-block">
<pre><code>helm upgrade --install n8n-prod n8n/n8n \
  -f values-prod.yaml \
  --namespace n8n</code></pre>
</div>
</li>
</ol>
<p><strong>Exemplo de Ingress resource gerado:</strong></p>
<div class="code-block">
<pre><code>apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: n8n-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - n8n.seudominio.com
    secretName: n8n-tls
  rules:
  - host: n8n.seudominio.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: n8n-prod-n8n
            port:
              number: 5678</code></pre>
</div>
<p><strong>Curiosidade técnica:</strong> O cert-manager usa <strong>HTTP-01 challenge</strong> por padrão, mas para domínios com DNS dinâmico, você pode usar <strong>DNS-01</strong> com Cloudflare ou Route53. Isso evita o erro <code>too many redirects</code> no Ingress.</p>



<h2>Escalando o n8n horizontalmente: HPA e Load Balancer</h2>
<p>O n8n escala automaticamente com o <strong>Horizontal Pod Autoscaler (HPA)</strong> quando a CPU/memória ultrapassa 70%. O <strong>Service do tipo LoadBalancer</strong> distribui tráfego entre réplicas, enquanto o <strong>Ingress</strong> gerencia acesso externo via DNS.</p>

<p>Configure o HPA para 3 réplicas mínimas e 10 máximas:</p>
<div class="code-block">
<pre><code>kubectl autoscale deployment n8n-prod-n8n \
  --cpu-percent=70 \
  --min=3 \
  --max=10 \
  --namespace n8n</code></pre>
</div>

<p>Verifique a escalabilidade:</p>
<div class="code-block">
<pre><code>kubectl get hpa -n n8n
\# Saída esperada:
NAME            REFERENCE                  TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
n8n-prod-n8n    Deployment/n8n-prod-n8n     50%/70%   3         10        5          10m</code></pre>
</div>

<p><strong>Diferença crítica:</strong> O <strong>LoadBalancer</strong> expõe a porta 5678 diretamente (IP público), enquanto o <strong>Ingress</strong> roteia via DNS com SSL. Use LoadBalancer apenas para testes — em produção, sempre Ingress.</p>

<p><strong>Curiosidade técnica:</strong> O HPA no Kubernetes usa métricas do <strong>metrics-server</strong>. Se você ver <code>unable to fetch metrics</code>, instale com <code>kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</code>.</p>

---

<h2>Monitoramento e logs: Prometheus, Grafana e n8n built-in</h2>
<p>O n8n expõe métricas na porta <code>5678/metrics</code> (formato Prometheus). Para monitorar, instale o <strong>kube-prometheus-stack</strong> e configure o Grafana:</p>

<ol>
<li>Adicione o repositório do Prometheus:
<div class="code-block">
<pre><code>helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update</code></pre>
</div>
</li>
<li>Instale o stack (inclui Prometheus, Grafana e Alertmanager):
<div class="code-block">
<pre><code>helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace</code></pre>
</div>
</li>
<li>Configure o ServiceMonitor para o n8n (crie o arquivo <code>n8n-servicemonitor.yaml</code>):
<div class="code-block">
<pre><code>apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: n8n-metrics
  namespace: n8n
spec:
  selector:
    matchLabels:
      app: n8n-prod-n8n
  endpoints:
  - port: http
    path: /metrics
    interval: 15s</code></pre>
</div>
</li>
<li>Aplique e acesse o Grafana:
<div class="code-block">
<pre><code>kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring
\# Acesse: http://localhost:3000
\# Usuário: admin, Senha: prom-operator</code></pre>
</div>
</li>
<li>Verifique logs do n8n:
<div class="code-block">
<pre><code>kubectl logs -l app=n8n-prod-n8n -n n8n --tail=100</code></pre>
</div>
</li>
</ol>

<p><strong>Painel útil:</strong> O Grafana tem um dashboard pronto para n8n (ID: <strong>15993</strong>). Importe via <code>http://localhost:3000/dashboard/import</code>.</p>

<p><strong>Curiosidade técnica:</strong> O n8n não expõe métricas por padrão. Habilite no <code>values-prod.yaml</code> com <code>metrics.enabled: true</code> e adicione a anotação <code>prometheus.io/scrape: "true"</code> no Service do n8n.</p>

---

<h2>Atualizações sem downtime: estratégias para manter o n8n sempre disponível</h2>
<p>Use <strong>rolling updates</strong> (padrão do Helm) ou <strong>blue-green deployment</strong> para zerar downtime. O Helm já faz rollback automático se o pod falhar:</p>

<ol>
<li>Atualize com <code>--wait</code> para garantir que todos os pods estejam prontos:
<div class="code-block">
<pre><code>helm upgrade --install n8n-prod n8n/n8n \
  -f values-prod.yaml \
  --namespace n8n \
  --wait \
  --timeout 5m</code></pre>
</div>
</li>
<li>Para blue-green, crie um novo release antes de deletar o antigo:
<div class="code-block">
<pre><code>helm upgrade --install n8n-prod-new n8n/n8n \
  -f values-prod-v2.yaml \
  --namespace n8n \
  --wait</code></pre>
</div>
</li>
<li>Troque o Ingress para apontar para o novo release:
<div class="code-block">
<pre><code>kubectl patch ingress n8n-ingress -n n8n --type json \
  -p '[{"op": "replace", "path": "/spec/rules/0/http/paths/0/backend/service/name", "value": "n8n-prod-new-n8n"}]'</code></pre>
</div>
</li>
<li>Delete o antigo release:
<div class="code-block">
<pre><code>helm uninstall n8n-prod --namespace n8n</code></pre>
</div>
</li>
</ol>

<p><strong>Backup rápido:</strong> Antes de atualizar, faça backup do PostgreSQL:</p>
<div class="code-block">
<pre><code>kubectl exec -it postgres-primary-0 -n n8n -- bash -c \
  "pg_dump -U postgres -d n8n" > n8n_backup_$(date +%Y%m%d).sql</code></pre>
</div>

<p><strong>Curiosidade técnica:</strong> O Helm faz <strong>rolling updates</strong> por padrão, atualizando 25% dos pods a cada 10 segundos. Para mudar esse comportamento, ajuste <code>strategy.rollingUpdate.maxSurge</code> e <code>strategy.rollingUpdate.maxUnavailable</code> no deployment.</p>

---

<h2>Backup e recovery: protegendo seus workflows e dados</h2>
<p>Perder dados do n8n significa perder suas automações. Faça backups diários do <strong>PostgreSQL</strong> e do <strong>PersistentVolume</strong> do n8n:</p>

<ol>
<li>Backup do PostgreSQL (via <code>pg_dump</code>):
<div class="code-block">
<pre><code>kubectl exec -it postgres-primary-0 -n n8n -- bash -c \
  "pg_dump -U postgres -d n8n -Fc -f /tmp/n8n_backup.dump"</code></pre>
</div>
<li>Copie o backup para sua máquina:
<div class="code-block">
<pre><code>kubectl cp n8n/postgres-primary-0:/tmp/n8n_backup.dump ./n8n_backup_$(date +%Y%m%d).dump</code></pre>
</div>
<li>Backup do PersistentVolume do n8n (usando <code>rsync</code>):
<div class="code-block">
<pre><code>kubectl exec -it n8n-prod-n8n-abc123-xyz -n n8n -- tar czvf /tmp/n8n_data.tar.gz /home/node/.n8n</code></pre>
</div>
<li>Copie o backup:
<div class="code-block">
<pre><code>kubectl cp n8n/n8n-prod-n8n-abc123-xyz:/tmp/n8n_data.tar.gz ./n8n_data_backup_$(date +%Y%m%d).tar.gz</code></pre>
</div>
</ol>

<p>Para restaurar:</p>
<div class="code-block">
<pre><code># Restaurar PostgreSQL
kubectl cp ./n8n_backup_20240101.dump n8n/postgres-primary-0:/tmp/n8n_backup.dump
kubectl exec -it postgres-primary-0 -n n8n -- bash -c \
  "pg_restore -U postgres -d n8n /tmp/n8n_backup.dump --clean --if-exists"

\# Restaurar PV do n8n
kubectl cp ./n8n_data_backup_20240101.tar.gz n8n/n8n-prod-n8n-new-xyz:/tmp/n8n_data.tar.gz
kubectl exec -it n8n-prod-n8n-new-xyz -n n8n -- bash -c \
  "tar xzvf /tmp/n8n_data.tar.gz -C /home/node/.n8n"</code></pre>
</div>

<p><strong>Ferramenta avançada:</strong> Use o <a href="https://velero.io/" target="_blank" rel="noopener noreferrer">Velero</a> para backups completos do cluster (PV + banco + configurações). Instale com:</p>
<div class="code-block">
<pre><code>velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.0.0 \
  --bucket n8n-backups \
  --secret-file ./credentials-velero</code></pre>
</div>

<p><strong>Curiosidade técnica:</strong> O n8n armazena workflows no diretório <code>/home/node/.n8n</code>. Se você usar <strong>PersistentVolumeClaims</strong>, esse diretório é preservado mesmo ao deletar o pod.</p>

---

<h2>Segurança adicional: RBAC, rede e boas práticas</h2>
<p>Restrinja acesso ao n8n com <strong>RBAC</strong>, <strong>Network Policies</strong> e <strong>Service Accounts</strong> dedicados. Desabilite credenciais padrão e use segredo de ambiente:</p>

<ol>
<li>Crie um Service Account com permissão mínima:
<div class="code-block">
<pre><code>kubectl create serviceaccount n8n-sa -n n8n</code></pre>
</div>
<li>Defina um Role com acesso apenas ao namespace:
<div class="code-block">
<pre><code>cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: n8n
  name: n8n-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "secrets"]
  verbs: ["get", "list", "watch"]
EOF</code></pre>
</div>
<li>Vincule o Role ao Service Account:
<div class="code-block">
<pre><code>kubectl create rolebinding n8n-rolebinding \
  --role=n8n-role \
  --serviceaccount=n8n:n8n-sa \
  --namespace=n8n</code></pre>
</div>
<li>Aplique no <code>values-prod.yaml</code>:
<div class="code-block">
<pre><code>serviceAccount:
  create: true
  name: n8n-sa</code></pre>
</div>
</ol>

<p><strong>Network Policies:</strong> Bloqueie todo o tráfego exceto do Ingress:</p>
<div class="code-block">
<pre><code>cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: n8n-ingress-only
  namespace: n8n
spec:
  podSelector:
    matchLabels:
      app: n8n-prod-n8n
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: ingress-nginx
    ports:
    - protocol: TCP
      port: 5678
EOF</code></pre>
</div>

<p><strong>Boas práticas:</strong></p>
<ul>
<li>Use <strong>vaults</strong> como HashiCorp Vault ou AWS Secrets Manager para senhas.</li>
<li>Restrinja acesso ao dashboard com <strong>IP whitelist</strong> no Ingress:</li>
<div class="code-block">
<pre><code>ingress:
  annotations:
    nginx.ingress.kubernetes.io/whitelist-source-range: "192.168.1.0/24,10.0.0.0/8"</code></pre>
</div>
<li>Desabilite <strong>credenciais padrão</strong> no <code>values-prod.yaml</code>:</li>
<div class="code-block">
<pre><code>auth:
  enabled: true
  username: ""
  password: ""</code></pre>
</div>
</ul>

<p><strong>Referência:</strong> Veja como proteger APIs do n8n com <a href="/seguranca-api-n8n">autenticação JWT e OAuth2</a>.</p>

<p><strong>Curiosidade técnica:</strong> O n8n não valida automaticamente tokens JWT — você precisa configurar no <code>GENERIC_CREDENTIALS</code> ou usar um <strong>API Gateway</strong> como Kong ou Traefik.</p>

---

<h2>Custos reais: quanto custa rodar n8n no Kubernetes?</h2>
<p>O custo varia por provedor e uso. Comparação real (valores em R$ para 3 meses de 24/7):</p>

<table>
<thead>
<tr>
<th>Provedor</th>
<th>Configuração</th>
<th>Custo mensal</th>
<th>Custo 3 meses</th>
<th>Otimização possível</th>
</tr>
</thead>
<tbody>
<tr>
<td>DigitalOcean DOKS</td>
<td>3 nós s-2vcpu-4gb + 20GB PV</td>
<td>R$ 45</td>
<td>R$ 135</td>
<td>Auto-scaling para 1 nó em horários de baixa</td>
</tr>
<tr>
<td>AWS EKS</td>
<td>3 nós t3.medium + 20GB GP2</td>
<td>R$ 120</td>
<td>R$ 360</td>
<td>Spot Instances para nós worker (50% de economia)</td>
</tr>
<tr>
<td>GCP GKE</td>
<td>3 nós e2-medium + 20GB SSD</td>
<td>R$ 90</td>
<td>R$ 270</td>
<td>Autopilot (paga por pod ativo)</td>
</tr>
<tr>
<td>Azure AKS</td>
<td>3 nós Standard_B2s + 20GB HDD</td>
<td>R$ 100</td>
<td>R$ 300</td>
<td>Cluster scale-down em finais de semana</td>
</tr>
<tr>
<td>Local (k3s)</td>
<td>Raspberry Pi 4 4GB + HDD externo</td>
<td>R$ 20 (energia)</td>
<td>R$ 60</td>
<td>Zero custo se já tiver hardware</td>
</tr>
</tbody>
</table>

<p><strong>Otimizações:</strong></p>
<ul>
<li><strong>Auto-scaling:</strong> Configure <code>cluster-autoscaler</code> para ajustar nós automaticamente. No DOKS, use <code>doctl kubernetes cluster update n8n-prod --auto-upgrade --auto-scale</code>.</li>
<li><strong>Spot Instances:</strong> Na AWS, use <code>--set nodeGroups[0].instancesDistribution.instanceTypes={"m5.large","m5a.large"}</code> no Helm Chart do cluster-autoscaler.</li>
<li><strong>PersistentVolume:</strong> Use <code>storageClassName: gp3</code> na AWS (mais barato que gp2) ou <code>do-block-storage</code> no DOKS.</li>
<li><strong>Logs e métricas:</strong> Desabilite armazenamento de logs antigos no Prometheus (<code>retention: 7d</code>).</li>
</ul>

<p><strong>Exemplo de economia:</strong> No EKS, reduzir de 3 nós para 1 nó em horários de baixa (22h-6h) economiza ~R$ 60/mês.</p>

<p><strong>Curiosidade técnica:</strong> O <strong>k3s</strong> é a opção mais barata, mas requer manutenção manual (atualizações do SO, backups). Para produção, prefira provedores gerenciados se não tiver equipe de DevOps.</p>

---

<h2>Alternativas e quando não usar Kubernetes para n8n</h2>
<p>Kubernetes é overkill para <strong>n8n local</strong> ou <strong>pequenas equipes</strong>. Use alternativas quando:</p>

<ul>
<li>Você não tem expertise em K8s (curva de aprendizado alta).</li>
<li>Seu uso é <strong>baixo</strong> (menos de 10 workflows/s).</li>
<li>Prefere soluções <strong>gerenciadas</strong> (menos manutenção).</li>
</ul>

<p><strong>Comparativo:</strong></p>

<table>
<thead>
<tr>
<th>Solução</th>
<th>Custo mensal</th>
<th>Complexidade</th>
<th>Escalabilidade</th>
<th>Manutenção</th>
<th>Melhor para</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>n8n Cloud</strong> (oficial)</td>
<td>R$ 20-100</td>
<td>Baixa</td>
<td>Limitada (planos)</td>
<td>Zero</td>
<td>Startups e MVPs</td>
</tr>
<tr>
<td><strong>n8n no Docker</strong></td>
<td>R$ 5-20 (VPS)</td>
<td>Média</td>
<td>Manual (docker-compose)</td>
<td>Baixa (você gerencia)</td>
<td>Equipes pequenas</td>
</tr>
<tr>
<td><strong>Docker Swarm</strong></td>
<td>R$ 15-40 (3 nós)</td>
<td>Média</td>
<td>Automática (replicas)</td>
<td>Média</td>
<td>Equipes com Docker</td>
</tr>
<tr>
<td><strong>n8n com PM2</strong> (Node.js)</td>
<td>R$ 10 (VPS 1GB)</td>
<td>Baixa</td>
<td>Manual</td>
<td>Baixa</td>
<td>Desenvolvedores</td>
</tr>
</tbody>
</table>

<p><strong>Quando usar Kubernetes:</strong></p>
<ul>
<li>Você tem <strong>workflows críticos</strong> (ex: processamento de pagamentos).</li>
<li>Precisa de <strong>alta disponibilidade</strong> (réplicas + failover).</li>
<li>Tem <strong>muitos workflows</strong> (50+ ou alta carga HTTP).</li>
<li>Usa <strong>outras aplicações no cluster</strong> (monitoramento, APIs).</li>
</ul>

<p><strong>Quando NÃO usar Kubernetes:</strong></p>
<ul>
<li>Seu uso é <strong>testes ou desenvolvimento</strong>.</li>
<li>Você não quer pagar por <strong>nós masters</strong> (EKS/GKE cobram ~R$ 50/mês extras).</li>
<li>Prefere <strong>menos YAML</strong> e mais simplicidade.</li>
</ul>

<p><strong>Alternativa recomendada:</strong> Para equipes pequenas, o <strong>Docker Swarm</strong> é um meio-termo entre Kubernetes e Docker puro. Exemplo de deploy:</p>
<div class="code-block">
<pre><code>docker stack deploy -c docker-compose.yml n8n</code></pre>
</div>

<p>Com arquivo <code>docker-compose.yml</code>:</p>
<div class="code-block">
<pre><code>version: '3.8'
services:
  n8n:
    image: n8nio/n8n:1.33.0
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - DB_TYPE=postgres
      - DB_POSTGRES_DB=n8n
      - DB_POSTGRES_HOST=postgres
      - DB_POSTGRES_USER=postgres
      - DB_POSTGRES_PASSWORD=SENHA_POSTGRES

  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=SENHA_POSTGRES

volumes:
  n8n_data:
  postgres_data:</code></pre>
</div>

<p><strong>Curiosidade técnica:</strong> O Docker Swarm usa <strong>Raft consensus</strong> para eleição de líderes, enquanto o Kubernetes usa <strong>etcd</strong>. O Swarm é mais simples, mas menos flexível para orquestração avançada.</p>



<h2>Perguntas frequentes sobre Como escalar o n8n em produção com Kubernetes e Helm</h2>

<h3>É possível usar n8n gratuito com Kubernetes?</h3>
<p>Sim, o n8n é open-source e pode ser implantado gratuitamente no Kubernetes. Você só paga pelos custos de infraestrutura (nós do cluster, armazenamento e banda). O Helm Chart e as imagens oficiais do n8n não têm custo direto.</p>

<h3>Qual a diferença entre n8n com Docker e n8n com Kubernetes?</h3>
<p>O Docker é ideal para desenvolvimento ou pequenos projetos, pois é simples e rápido. O Kubernetes oferece alta disponibilidade, escalabilidade automática e gerenciamento avançado de recursos, mas com maior complexidade. Para produção escalável, o Kubernetes é a melhor escolha.</p>

<h3>Como fazer backup de workflows no n8n com Kubernetes?</h3>
<p>Faça backup do PostgreSQL com <code>pg_dump</code> e do PersistentVolume do n8n com <code>tar</code>. Para backups completos, use ferramentas como Velero. Armazene os backups em um local seguro, como um bucket S3 ou armazenamento externo.</p>

<h3>Qual banco de dados é melhor para n8n em produção?</h3>
<p>O PostgreSQL é a melhor opção para produção devido à sua confiabilidade e recursos avançados. O Redis é recomendado para caching e filas. Evite o SQLite em produção, pois não é adequado para ambientes multi-replicas ou com alta carga.</p>

<h3>Como configurar autoscale para n8n no k8s?</h3>
<p>Use o Horizontal Pod Autoscaler (HPA) configurando métricas de CPU/memória. No Helm, ajuste <code>replicaCount</code> e defina limites no HPA. O Kubernetes ajustará automaticamente o número de réplicas com base na carga.</p>

<h3>Preciso de um Load Balancer para n8n no Kubernetes?</h3>
<p>Não necessariamente. Para produção, o Ingress com SSL é suficiente e mais seguro. O LoadBalancer expõe o n8n diretamente na porta 5678, enquanto o Ingress roteia via DNS com HTTPS. Use LoadBalancer apenas para testes.</p>

<h3>Como atualizar o n8n sem downtime no Kubernetes?</h3>
<p>Use <code>helm upgrade --install --wait</code> para rolling updates. Para zero downtime, faça blue-green deployment: implante um novo release, troque o Ingress e delete o antigo. Sempre faça backup antes de atualizar.</p>

<h3>Quais são os custos de rodar n8n no Kubernetes?</h3>
<p>Os custos variam por provedor: DigitalOcean DOKS (R$ 45/mês), AWS EKS (R$ 120/mês), GCP GKE (R$ 90/mês). Otimize com auto-scaling, Spot Instances e PersistentVolume eficiente. Para uso mínimo, o k3s local pode custar menos de R$ 20/mês em energia.

<h2>Próximos passos: transforme automações em escala com confiança</h2>
<p>Escalar o n8n com Kubernetes e Helm não é apenas sobre performance — é sobre garantir que suas automações nunca parem, mesmo com picos de carga ou falhas de hardware. Ao seguir este guia, você migrou de um ambiente frágil (Docker puro) para uma infraestrutura robusta, pronta para crescer junto com seu negócio. Agora, seus workflows rodam com alta disponibilidade, backups automáticos e monitoramento em tempo real.</p>

<p>Confira também nossos outros conteúdos para dominar ainda mais suas automações:</p>
<ul>
<li><a href="/n8n-docker-self-hosted">n8n no Docker: guia completo para automação local</a></li>
<li><a href="/seguranca-api-n8n">Segurança avançada para APIs do n8n: JWT, OAuth2 e mais</a></li>
<li><a href="/monitoramento-n8n-prometheus-grafana">Monitoramento de n8n com Prometheus e Grafana: métricas essenciais</a></li>
<li><a href="/backup-n8n-velero">Backups automáticos do n8n com Velero: proteja seus dados</a></li>
</ul>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "É possível usar n8n gratuito com Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, o n8n é open-source e pode ser implantado gratuitamente no Kubernetes. Você só paga pelos custos de infraestrutura (nós do cluster, armazenamento e banda). O Helm Chart e as imagens oficiais do n8n não têm custo direto."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre n8n com Docker e n8n com Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Docker é ideal para desenvolvimento ou pequenos projetos, pois é simples e rápido. O Kubernetes oferece alta disponibilidade, escalabilidade automática e gerenciamento avançado de recursos, mas com maior complexidade. Para produção escalável, o Kubernetes é a melhor escolha."
          }
        },
        {
          "@type": "Question",
          "name": "Como fazer backup de workflows no n8n com Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Faça backup do PostgreSQL com pg_dump e do PersistentVolume do n8n com tar. Para backups completos, use ferramentas como Velero. Armazene os backups em um local seguro, como um bucket S3 ou armazenamento externo."
          }
        },
        {
          "@type": "Question",
          "name": "Qual banco de dados é melhor para n8n em produção?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O PostgreSQL é a melhor opção para produção devido à sua confiabilidade e recursos avançados. O Redis é recomendado para caching e filas. Evite o SQLite em produção, pois não é adequado para ambientes multi-replicas ou com alta carga."
          }
        },
        {
          "@type": "Question",
          "name": "Como configurar autoscale para n8n no k8s?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use o Horizontal Pod Autoscaler (HPA) configurando métricas de CPU/memória. No Helm, ajuste replicaCount e defina limites no HPA. O Kubernetes ajustará automaticamente o número de réplicas com base na carga."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso de um Load Balancer para n8n no Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não necessariamente. Para produção, o Ingress com SSL é suficiente e mais seguro. O LoadBalancer expõe o n8n diretamente na porta 5678, enquanto o Ingress roteia via DNS com HTTPS. Use LoadBalancer apenas para testes."
          }
        },
        {
          "@type": "Question",
          "name": "Como atualizar o n8n sem downtime no Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use helm upgrade --install --wait para rolling updates. Para zero downtime, faça blue-green deployment: implante um novo release, troque o Ingress e delete o antigo. Sempre faça backup antes de atualizar."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os custos de rodar n8n no Kubernetes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os custos variam por provedor: DigitalOcean DOKS (R$ 45/mês), AWS EKS (R$ 120/mês), GCP GKE (R$ 90/mês). Otimize com auto-scaling, Spot Instances e PersistentVolume eficiente. Para uso mínimo, o k3s local pode custar menos de R$ 20/mês em energia."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como escalar o n8n em produção com Kubernetes e Helm: guia definitivo",
      "description": "Aprenda passo a passo a implantar n8n em produção usando Kubernetes e Helm para alta disponibilidade e escalabilidade. Guia prático com exemplos reais.",
      "inLanguage": "pt-BR",
      "author": {
        "@type": "Organization",
        "name": "Automação.art.br"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automação.art.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://automacao.art.br/logo.png"
        }
      },
      "datePublished": "2024-06-15",
      "dateModified": "2024-06-15",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/escalar-n8n-producao-kubernetes-helm"
      },
      "articleBody": "Guia completo para escalar n8n em produção com Kubernetes e Helm, cobrindo desde a configuração inicial até monitoramento, backups e otimização de custos. Inclui exemplos práticos de values.yaml, comandos kubectl e estratégias de alta disponibilidade."
    },
    {
      "@type": "HowTo",
      "name": "Como escalar o n8n em produção com Kubernetes e Helm",
      "description": "Passo a passo para implantar n8n em produção usando Kubernetes e Helm, garantindo alta disponibilidade e escalabilidade.",
      "inLanguage": "pt-BR",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Configurar pré-requisitos",
          "text": "Instale kubectl, Helm e crie um cluster Kubernetes em seu provedor de escolha (DigitalOcean, AWS, GCP ou Azure)."
        },
        {
          "@type": "HowToStep",
          "name": "Instalar e configurar Helm Chart do n8n",
          "text": "Adicione o repositório oficial do n8n e configure o values.yaml para produção, incluindo PostgreSQL, Redis, autenticação e persistência."
        },
        {
          "@type": "HowToStep",
          "name": "Configurar Ingress e SSL/TLS",
          "text": "Instale ingress-nginx e cert-manager para roteamento seguro via HTTPS com Let's Encrypt."
        },
        {
          "@type": "HowToStep",
          "name": "Escalar horizontalmente com HPA",
          "text": "Configure o Horizontal Pod Autoscaler para ajustar automaticamente o número de réplicas com base na carga."
        },
        {
          "@type": "HowToStep",
          "name": "Monitorar e fazer backup",
          "text": "Monitore o n8n com Prometheus e Grafana, e faça backups regulares do PostgreSQL e do PersistentVolume."
        },
        {
          "@type": "HowToStep",
          "name": "Atualizar sem downtime",
          "text": "Use rolling updates ou blue-green deployment para manter o n8n sempre disponível durante atualizações."
        }
      ]
    }
  ]
}
</script>