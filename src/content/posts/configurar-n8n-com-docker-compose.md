---
title: "Como configurar n8n com Docker Compose: guia passo a passo para automação self-hosted"
description: "Aprenda a instalar e configurar o n8n com Docker Compose para automação self-hosted gratuita. Guia passo a passo para iniciantes com segurança, performance e integrações de IA."
cluster: "ferramentas"
formato: "o que é"
pubDate: 2026-08-18
image: "https://www.automacao.art.br/images/posts/configurar-n8n-com-docker-compose.jpg"
imageAlt: "Comando docker-compose up -d sendo executado para iniciar n8n com Docker Compose"
draft: false
---

<h2>Por que usar n8n com Docker Compose para automação?</h2>
<p>Configurar o <strong>n8n com Docker Compose</strong> te dá controle total sobre suas automações, sem pagar por serviços proprietários como Zapier ou Make. Você roda tudo em um servidor próprio ou VPS, com privacidade total dos dados e flexibilidade para escalar conforme sua necessidade.</p>
<p>Comparado ao n8n.cloud (serviço oficial pago), o modelo self-hosted com Docker evita limites de execuções e cobranças por uso, além de permitir integrações com bancos de dados locais e APIs internas sem restrições. Veja a tabela abaixo:</p>

<table>
  <thead>
    <tr>
      <th>Critério</th>
      <th>n8n com Docker Compose</th>
      <th>n8n.cloud (pago)</th>
      <th>Zapier</th>
      <th>Make (ex-Integromat)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Custo</td>
      <td>R$ 0 (custo do servidor)</td>
      <td>US$ 20–US$ 100/mês</td>
      <td>US$ 19–US$ 3.599/mês</td>
      <td>US$ 9–US$ 299/mês</td>
    </tr>
    <tr>
      <td>Privacidade</td>
      <td>Total (seus dados)</td>
      <td>Parcial (servidor da n8n)</td>
      <td>Baixa (servidores externos)</td>
      <td>Baixa (servidores externos)</td>
    </tr>
    <tr>
      <td>Escalabilidade</td>
      <td>Limitada apenas pelo hardware</td>
      <td>Limitada pelo plano</td>
      <td>Limitada pelo plano</td>
      <td>Limitada pelo plano</td>
    </tr>
    <tr>
      <td>Integrações personalizadas</td>
      <td>Total (APIs locais, bancos de dados)</td>
      <td>Parcial (depende de conectores)</td>
      <td>Parcial (apenas apps oficiais)</td>
      <td>Parcial (apenas apps oficiais)</td>
    </tr>
  </tbody>
</table>

<p><strong>Dica técnica:</strong> Se você já usa <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> em outros projetos, o n8n com Docker Compose roda isolado em containers, facilitando a manutenção e atualizações sem conflitos com outras aplicações.</p>

---

<h2>Pré-requisitos: o que você precisa antes de começar</h2>
<p>Antes de instalar o n8n com Docker Compose, você precisa de: Docker instalado, Docker Compose, um servidor (Linux/Windows/Mac ou VPS) e pelo menos 2GB de RAM.</p>

<p>Verifique se o Docker está instalado com:</p>
<ul>
  <li><code>docker --version</code> → Deve mostrar versão 20.10 ou superior</li>
  <li><code>docker-compose --version</code> → Deve mostrar versão 1.29 ou superior</li>
</ul>

<p>Se estiver no Linux, instale o Docker com:</p>
<pre><code>sudo apt update && sudo apt install -y docker.io docker-compose</code></pre>

<p><strong>Hardware mínimo:</strong> 1 CPU core e 2GB RAM são suficientes para automações leves. Para workloads pesados (muitos workflows ou nós de IA), recomenda-se 4GB RAM e 2 cores.</p>

---

<h2>Instalando o n8n com Docker Compose: passo a passo completo</h2>
<p>Para instalar o n8n com Docker Compose, crie um arquivo <code>docker-compose.yml</code> com a configuração mínima abaixo e execute <code>docker-compose up -d</code>.</p>

<ol>
  <li><strong>Crie o arquivo <code>docker-compose.yml</code></strong> com o seguinte conteúdo:
    <pre><code>version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=secreto123
    volumes:
      - n8n_data:/home/node/.n8n
volumes:
  n8n_data:</code></pre>
  </li>
  <li><strong>Execute o comando</strong>:
    <pre><code>docker-compose up -d</code></pre>
    <strong>Resultado:</strong> O container do n8n será baixado e iniciado em segundo plano. Acesse <code>http://seu-servidor:5678</code> para ver a interface.
  </li>
  <li><strong>Verifique o status</strong> com:
    <pre><code>docker-compose ps</code></pre>
    <strong>Resultado:</strong> Deve mostrar o container do n8n no estado "Up (healthy)".
  </li>
</ol>

<p><strong>Nota técnica:</strong> O volume <code>n8n_data</code> garante que seus workflows, credenciais e logs persistam mesmo se o container for removido ou atualizado.</p>

---

<h2>Configurando o n8n com Docker Compose: ambiente ideal para automação</h2>
<p>Para um ambiente seguro e funcional, configure variáveis de ambiente no <code>docker-compose.yml</code> e use um proxy reverso como Nginx para expor o n8n via HTTPS.</p>

<p>Adicione estas variáveis no serviço <code>n8n</code> do seu <code>docker-compose.yml</code>:</p>
<table>
  <thead>
    <tr>
      <th>Variável</th>
      <th>Valor</th>
      <th>Exemplo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>N8N_HOST</code></td>
      <td>Domínio ou IP do servidor</td>
      <td>n8n.seudominio.com</td>
    </tr>
    <tr>
      <td><code>N8N_PORT</code></td>
      <td>Porta interna (5678)</td>
      <td>5678</td>
    </tr>
    <tr>
      <td><code>N8N_PROTOCOL</code></td>
      <td>https (se usar proxy)</td>
      <td>https</td>
    </tr>
    <tr>
      <td><code>N8N_BASIC_AUTH_ACTIVE</code></td>
      <td>Ativa autenticação</td>
      <td>true</td>
    </tr>
    <tr>
      <td><code>N8N_BASIC_AUTH_USER</code></td>
      <td>Usuário para login</td>
      <td>admin</td>
    </tr>
    <tr>
      <td><code>N8N_BASIC_AUTH_PASSWORD</code></td>
      <td>Senha forte</td>
      <td>MinhaSenha@123!</td>
    </tr>
  </tbody>
</table>

<p>Exemplo de configuração com Nginx como proxy reverso:</p>
<pre><code>server {
    listen 80;
    server_name n8n.seudominio.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}</code></pre>

<p><strong>Dica de segurança:</strong> Sempre use HTTPS (via Let’s Encrypt com Certbot) para proteger credenciais e dados trafegados. O n8n não expõe HTTPS nativamente no container.</p>



<h2>Personalizando o n8n com Docker Compose: bancos de dados e persistência</h2>
<p>Use um banco de dados externo como PostgreSQL ou MySQL para armazenar workflows, execuções e credenciais de forma segura e escalável. O SQLite é uma opção leve para testes, mas não é recomendado para produção.</p>

<p>Configure o <code>docker-compose.yml</code> para conectar o n8n a um PostgreSQL externo (recomendado para produção):</p>
<pre><code>version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=senha_postgres_segura
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=MinhaSenha@123!
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=senha_postgres_segura
      - POSTGRES_DB=n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U n8n"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  n8n_data:
  postgres_data:</code></pre>

<p><strong>Dica técnica:</strong> O <code>healthcheck</code> no PostgreSQL garante que o n8n só inicie após o banco estar pronto, evitando erros de conexão no startup.</p>

---

<h2>Conectando o n8n Docker a APIs de IA: ChatGPT, Google e outras</h2>
<p>Adicione as chaves de API das ferramentas de IA no ambiente do container via variáveis de ambiente. O n8n usa essas chaves para autenticar requisições sem expor credenciais no código dos workflows.</p>

<p>No <code>docker-compose.yml</code>, adicione as variáveis para APIs de IA:</p>
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Variável de ambiente</th>
      <th>Exemplo de valor</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OpenAI (ChatGPT)</td>
      <td><code>OPENAI_API_KEY</code></td>
      <td>sk-proj-abc123...</td>
    </tr>
    <tr>
      <td>Google AI (Gemini)</td>
      <td><code>GOOGLE_API_KEY</code></td>
      <td>AIzaSyBvXy...</td>
    </tr>
    <tr>
      <td>Hugging Face</td>
      <td><code>HUGGINGFACE_API_KEY</code></td>
      <td>hf_AbCdEfG...</td>
    </tr>
  </tr>
  </tbody>
</table>

<p>Exemplo de workflow com OpenAI no n8n:</p>
<ol>
  <li>Crie um novo workflow.</li>
  <li>Adicione um nó <strong>HTTP Request</strong> com a URL <code>https://api.openai.com/v1/chat/completions</code>.</li>
  <li>No cabeçalho, adicione <code>Authorization: Bearer {{ $env.OPENAI_API_KEY }}</code>.</li>
  <li>No corpo da requisição, use:
    <pre><code>{
  "model": "gpt-4",
  "messages": [{"role": "user", "content": "Automatize meu processo de vendas"}]
}</code></pre>
  </li>
  <li>Execute o workflow e veja a resposta da IA no nó seguinte.</li>
</ol>

<p><strong>Link útil:</strong> Veja a documentação oficial da OpenAI para entender os endpoints e limites de requisições: <a href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noopener noreferrer">OpenAI API Reference</a>.</p>

---

<h2>Otimizando performance do n8n no Docker: dicas para iniciantes</h2>
<p>Ajuste os recursos do container para evitar crashes em workloads pesados e use ferramentas como <code>docker stats</code> para monitorar consumo de CPU e memória em tempo real.</p>

<p>Adicione limites de recursos no <code>docker-compose.yml</code>:</p>
<pre><code>services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=MinhaSenha@123!
    volumes:
      - n8n_data:/home/node/.n8n
    deploy:
      resources:
        limits:
          cpus: '1.5'
          memory: 2G
        reservations:
          cpus: '0.5'
          memory: 1G</code></pre>

<p>Comandos úteis para monitoramento:</p>
<table>
  <thead>
    <tr>
      <th>Comando</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>docker stats</code></td>
      <td>Exibe uso de CPU, memória e rede do container em tempo real.</td>
    </tr>
    <tr>
      <td><code>docker logs n8n-n8n-1 --tail 100</code></td>
      <td>Mostra os últimos 100 logs do container n8n.</td>
    </tr>
    <tr>
      <td><code>docker system df</code></td>
      <td>Verifica o uso de espaço em disco pelos containers.</td>
    </tr>
  </tbody>
</table>

<p><strong>Dica técnica:</strong> Use <code>.dockerignore</code> para evitar copiar arquivos desnecessários para o container, reduzindo o tamanho da imagem e acelerando builds.</p>

---

<h2>Segurança no n8n com Docker Compose: proteja suas automações</h2>
<p>Impeça acessos não autorizados com autenticação básica, HTTPS obrigatório e restrição de IPs. Desabilite nós inseguros como "Execute Command" para evitar execução de código arbitrário.</p>

<p>Configuração segura no <code>docker-compose.yml</code>:</p>
<pre><code>services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:5678:5678"  # Restringe acesso à máquina local
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin_seguro
      - N8N_BASIC_AUTH_PASSWORD=SenhaComplexa@123!456
      - N8N_DISABLE_DIRECT_EXECUTION_NODE=true  # Desabilita nós perigosos
    volumes:
      - n8n_data:/home/node/.n8n</code></pre>

<p>Para restringir acesso por IP, configure o Nginx com:</p>
<pre><code>server {
    listen 443 ssl;
    server_name n8n.seudominio.com;

    allow 192.168.1.100;  # IP autorizado
    allow 192.168.1.101;  # Outro IP autorizado
    deny all;

    ssl_certificate /etc/letsencrypt/live/n8n.seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/n8n.seudominio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5678;
    }
}</code></pre>

<p><strong>Checklist de segurança:</strong>
<ul>
  <li>Sempre use HTTPS (Certbot + Let’s Encrypt).</li>
  <li>Atualize as imagens do n8n regularmente com <code>docker-compose pull && docker-compose up -d</code>.</li>
  <li>Remova nós "Execute Command" ou "Execute Code" se não forem essenciais.</li>
  <li>Revogue chaves de API de IA que não estão em uso.</li>
</ul>
</p>



<h2>Perguntas frequentes sobre configurar n8n com Docker Compose</h2>

<h3>Preciso saber programar para usar o n8n com Docker Compose?</h3>
<p>Não é necessário programar para começar. O n8n tem interface visual (low-code) onde você arrasta e conecta nós (nodes) para criar automações. Conhecimentos básicos de YAML ajudam na configuração do Docker Compose, mas não são obrigatórios para usar a ferramenta.</p>

<h3>Qual a diferença entre usar n8n na nuvem e self-hosted com Docker?</h3>
<p>A versão self-hosted com Docker oferece controle total sobre seus dados e evita limites de execuções pagas. Na nuvem (n8n.cloud), você paga por uso e tem menos flexibilidade para integrações personalizadas ou bancos de dados locais. O custo é zero no modelo self-hosted, exceto pelo servidor.</p>

<h3>O n8n com Docker consome muita memória RAM?</h3>
<p>Para automações leves, o n8n consome cerca de 200-400MB de RAM. Workflows complexos ou com nós de IA podem exigir 1-2GB. Com 2GB de RAM você já consegue rodar o n8n + PostgreSQL sem problemas para uso pessoal ou pequeno negócio.</p>

<h3>Posso usar o n8n com Docker em um servidor com apenas 1GB de RAM?</h3>
<p>Sim, mas com limitações. O n8n pode rodar em 1GB de RAM usando SQLite e workflows simples, mas você terá que evitar nós pesados (como IA) e monitorar o consumo. Para produção, recomenda-se no mínimo 2GB de RAM.</p>

<h3>Como faço backup dos meus workflows no n8n Docker?</h3>
<p>O backup é feito automaticamente pelo volume Docker configurado. Para restaurar, basta copiar o volume <code>n8n_data</code> ou o banco de dados externo (PostgreSQL/MySQL). Também é recomendado exportar workflows manualmente via interface ou API.</p>

<h3>É possível usar o n8n com Docker em um Raspberry Pi?</h3>
<p>Sim! O n8n funciona bem em Raspberry Pi com 4GB de RAM. Use a imagem <code>n8nio/n8n:latest</code> e configure o Docker para usar menos recursos. É ideal para automações residenciais ou testes, mas workflows pesados podem ficar lentos.</p>

<h3>Como conecto o n8n Docker a outras ferramentas como ChatGPT ou Google Sheets?</h3>
<p>Adicione as chaves de API das ferramentas no ambiente do container via variáveis de ambiente (ex: <code>OPENAI_API_KEY</code>). No n8n, use nós como "HTTP Request" ou "Google Sheets" com as credenciais configuradas. A documentação oficial de cada ferramenta tem exemplos de autenticação.</p>

<h3>Qual banco de dados é melhor para o n8n: SQLite, PostgreSQL ou MySQL?</h3>
<p>Para produção, PostgreSQL ou MySQL são as melhores opções por oferecerem performance e escalabilidade. SQLite é ideal para testes ou ambientes com poucos recursos, mas não suporta múltiplos usuários e tem limitações de concorrência.

<h2>Automação self-hosted é o futuro: seu controle começa aqui</h2>
<p>Configurar o n8n com Docker Compose é o primeiro passo para ter automações poderosas sem depender de serviços externos ou pagar por execuções limitadas. Você ganhou controle total sobre seus dados, pode integrar qualquer ferramenta local ou API, e ainda tem a liberdade de escalar conforme sua necessidade — tudo com custo zero além do servidor. Agora que seu n8n está rodando, explore os templates prontos na biblioteca do n8n ou crie seus próprios workflows para automatizar marketing, vendas ou atendimento.</p>

<h3>Resumo rápido do que você aprendeu:</h3>
<ul>
  <li><strong>Instalação:</strong> Um arquivo <code>docker-compose.yml</code> e <code>docker-compose up -d</code> são suficientes para começar.</li>
  <li><strong>Segurança:</strong> Autenticação básica + HTTPS + restrição de nós perigosos mantêm suas automações seguras.</li>
  <li><strong>Performance:</strong> Limites de CPU/memória e monitoramento com <code>docker stats</code> evitam crashes.</li>
  <li><strong>Integrações:</strong> Chaves de API no ambiente do container permitem conectar ChatGPT, Google Sheets e muito mais.</li>
  <li><strong>Persistência:</strong> Volumes Docker garantem que seus dados sobrevivam a atualizações ou reinicializações.</li>
</ul>

<p><strong>Pronto para automatizar?</strong> Explore a <a href="/categoria/automacao" target="_blank" rel="noopener noreferrer">categoria Automação</a> do site para mais tutoriais, templates e guias sobre como transformar seus processos manuais em fluxos automáticos com o n8n e outras ferramentas self-hosted.</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Preciso saber programar para usar o n8n com Docker Compose?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não é necessário programar para começar. O n8n tem interface visual (low-code) onde você arrasta e conecta nós (nodes) para criar automações. Conhecimentos básicos de YAML ajudam na configuração do Docker Compose, mas não são obrigatórios para usar a ferramenta."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a diferença entre usar n8n na nuvem e self-hosted com Docker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A versão self-hosted com Docker oferece controle total sobre seus dados e evita limites de execuções pagas. Na nuvem (n8n.cloud), você paga por uso e tem menos flexibilidade para integrações personalizadas ou bancos de dados locais. O custo é zero no modelo self-hosted, exceto pelo servidor."
          }
        },
        {
          "@type": "Question",
          "name": "O n8n com Docker consome muita memória RAM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para automações leves, o n8n consome cerca de 200-400MB de RAM. Workflows complexos ou com nós de IA podem exigir 1-2GB. Com 2GB de RAM você já consegue rodar o n8n + PostgreSQL sem problemas para uso pessoal ou pequeno negócio."
          }
        },
        {
          "@type": "Question",
          "name": "Posso usar o n8n com Docker em um servidor com apenas 1GB de RAM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, mas com limitações. O n8n pode rodar em 1GB de RAM usando SQLite e workflows simples, mas você terá que evitar nós pesados (como IA) e monitorar o consumo. Para produção, recomenda-se no mínimo 2GB de RAM."
          }
        },
        {
          "@type": "Question",
          "name": "Como faço backup dos meus workflows no n8n Docker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O backup é feito automaticamente pelo volume Docker configurado. Para restaurar, basta copiar o volume <code>n8n_data</code> ou o banco de dados externo (PostgreSQL/MySQL). Também é recomendado exportar workflows manualmente via interface ou API."
          }
        },
        {
          "@type": "Question",
          "name": "É possível usar o n8n com Docker em um Raspberry Pi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! O n8n funciona bem em Raspberry Pi com 4GB de RAM. Use a imagem <code>n8nio/n8n:latest</code> e configure o Docker para usar menos recursos. É ideal para automações residenciais ou testes, mas workflows pesados podem ficar lentos."
          }
        },
        {
          "@type": "Question",
          "name": "Como conecto o n8n Docker a outras ferramentas como ChatGPT ou Google Sheets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Adicione as chaves de API das ferramentas no ambiente do container via variáveis de ambiente (ex: <code>OPENAI_API_KEY</code>). No n8n, use nós como 'HTTP Request' ou 'Google Sheets' com as credenciais configuradas. A documentação oficial de cada ferramenta tem exemplos de autenticação."
          }
        },
        {
          "@type": "Question",
          "name": "Qual banco de dados é melhor para o n8n: SQLite, PostgreSQL ou MySQL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para produção, PostgreSQL ou MySQL são as melhores opções por oferecerem performance e escalabilidade. SQLite é ideal para testes ou ambientes com poucos recursos, mas não suporta múltiplos usuários e tem limitações de concorrência."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como configurar n8n com Docker Compose: guia passo a passo para automação self-hosted",
      "description": "Aprenda a instalar e configurar o n8n usando Docker Compose para criar automações poderosas sem depender de serviços externos. Guia completo para iniciantes com segurança, performance e integrações de IA.",
      "author": {
        "@type": "Person",
        "name": "Equipe Automação.art.br"
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
      "inLanguage": "pt-BR",
      "articleBody": "Configurar o n8n com Docker Compose te dá controle total sobre suas automações, sem pagar por serviços proprietários como Zapier ou Make. Você roda tudo em um servidor próprio ou VPS, com privacidade total dos dados e flexibilidade para escalar conforme sua necessidade. Comparado ao n8n.cloud (serviço oficial pago), o modelo self-hosted com Docker evita limites de execuções e cobranças por uso, além de permitir integrações com bancos de dados locais e APIs internas sem restrições. O guia aborda desde a instalação básica até configurações avançadas como bancos de dados externos (PostgreSQL/MySQL), integrações com APIs de IA (ChatGPT, Google AI), otimização de performance e segurança com HTTPS, autenticação básica e restrição de nós perigosos. Inclui exemplos práticos de docker-compose.yml para diferentes cenários e dicas para monitoramento com docker stats."
    },
    {
      "@type": "HowTo",
      "name": "Como configurar n8n com Docker Compose: guia passo a passo para automação self-hosted",
      "description": "Passo a passo completo para instalar e configurar o n8n usando Docker Compose, incluindo segurança, performance e integrações com IA.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Verificar pré-requisitos",
          "text": "Certifique-se de ter Docker (versão 20.10+) e Docker Compose (versão 1.29+) instalados. Verifique com 'docker --version' e 'docker-compose --version'."
        },
        {
          "@type": "HowToStep",
          "name": "Criar arquivo docker-compose.yml",
          "text": "Crie um arquivo docker-compose.yml com a configuração mínima do n8n e execute 'docker-compose up -d' para iniciar o container.",
          "image": "https://automacao.art.br/imagens/comando-docker-compose-up.png"
        },
        {
          "@type": "HowToStep",
          "name": "Configurar autenticação e ambiente",
          "text": "Adicione variáveis de ambiente como N8N_BASIC_AUTH_ACTIVE, N8N_BASIC_AUTH_USER, N8N_BASIC_AUTH_PASSWORD e N8N_HOST para segurança e acesso remoto."
        },
        {
          "@type": "HowToStep",
          "name": "Conectar banco de dados externo",
          "text": "Configure o n8n para usar PostgreSQL ou MySQL externo no docker-compose.yml para persistência e escalabilidade em produção."
        },
        {
          "@type": "HowToStep",
          "name": "Integrar APIs de IA",
          "text": "Adicione chaves de API de ferramentas como OpenAI ou Google AI no ambiente do container via variáveis de ambiente para usar nós de IA nos workflows."
        },
        {
          "@type": "HowToStep",
          "name": "Otimizar performance",
          "text": "Defina limites de CPU e memória no docker-compose.yml e use comandos como 'docker stats' para monitorar o consumo de recursos."
        },
        {
          "@type": "HowToStep",
          "name": "Garantir segurança",
          "text": "Habilite HTTPS com Nginx, restrinja acesso por IP, desabilite nós perigosos como 'Execute Command' e atualize imagens regularmente."
        }
      ]
    }
  ]
}
</script>