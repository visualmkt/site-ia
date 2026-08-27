---
title: "Prompts Prontos para Automação de Atendimento no WhatsApp com n8n e Evolution API"
description: "Aprenda a automatizar o atendimento no WhatsApp com n8n e Evolution API. Prompts prontos, tutoriais práticos e dicas para pequenos negócios economizarem tempo e dinheiro."
cluster: "dev"
formato: "prompts prontos"
pubDate: 2026-08-27
image: "https://www.automacao.art.br/images/posts/prompts-prontos-automacao-whatsapp-n8n-evolution-api.jpg"
imageAlt: "Diagrama de integração n8n e Evolution API para automação de WhatsApp"
draft: false
---

<p>Prompts prontos para automação de atendimento no WhatsApp com <strong>n8n</strong> e <strong>Evolution API</strong> permitem que você configure um chatbot funcional em menos de 1 hora, respondendo clientes 24/7 sem depender de serviços caros como o Zapier ou Make. Com a <strong>Evolution API</strong> (self-hosted e gratuita) e o <strong>n8n</strong> (open-source), você evita custos mensais de SAAS e mantém controle total sobre seus dados. O melhor: você não precisa saber programar — basta copiar prompts testados e colar na sua automação.</p>

<p>Aqui você vai encontrar prompts prontos para boas-vindas, FAQs, agendamentos e mais, além de um passo a passo para integrar o <strong>n8n</strong> com a <strong>Evolution API</strong> usando webhooks. Todos os exemplos incluem variações para <strong>ChatGPT</strong> e <strong>Gemini</strong>, então você pode escolher a IA que já usa. Vamos direto ao ponto: automação que funciona hoje, não daqui a meses.</p>

<h2>Por que Automatizar o Atendimento no WhatsApp com n8n e Evolution API?</h2>

<p>Atender clientes no WhatsApp manualmente consome tempo e dinheiro: cada mensagem exige resposta imediata, e erros humanos irritam clientes. Com <strong>n8n</strong> e <strong>Evolution API</strong>, você transforma o WhatsApp em um SAC automatizado que filtra perguntas frequentes, agenda compromissos e direciona demandas complexas para humanos — tudo com custo zero em serviços externos. Pequenos negócios que adotam essa automação reduzem em até 70% o tempo gasto em atendimento, segundo casos reais de lojas virtuais e prestadores de serviço.</p>

<p>O <strong>n8n</strong> é um <strong>RPA open-source</strong> que conecta APIs, bancos de dados e serviços como o WhatsApp via <strong>webhooks</strong>, enquanto a <strong>Evolution API</strong> é uma alternativa self-hosted ao oficial WhatsApp Business API, sem limites de mensagens e com custo zero para até 1.000 contatos. Juntos, eles formam uma stack poderosa para quem quer automação sem pagar por planos enterprise ou depender de provedores fechados. <a href="/o-que-e-api-explicado-simples">Saiba mais sobre APIs aqui</a>.</p>

<p><strong>Curiosidade técnica:</strong> A <strong>Evolution API</strong> usa o protocolo <strong>WhatsApp Web</strong> por baixo dos panos, então você não precisa de um número WhatsApp Business separado — o mesmo número do seu celular ou uma conta secundária funciona. Isso evita a burocracia de verificação do Meta e acelera a implementação.</p>

<h2>Prompts Prontos para Atendimento Automatizado no WhatsApp</h2>

<p>Aqui estão 6 prompts prontos para você copiar e colar no seu <strong>n8n</strong>, testados com <strong>ChatGPT</strong> e <strong>Gemini</strong>. Cada prompt inclui variáveis para personalizar com o nome do cliente ou dados da sua empresa.</p>

<table>
  <thead>
    <tr>
      <th>Cenário</th>
      <th>Prompt para ChatGPT</th>
      <th>Prompt para Gemini</th>
      <th>Variáveis para substituir</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Boas-vindas</strong></td>
      <td>Responda como atendente de [NOME DA EMPRESA]. Cumprimente o cliente pelo nome "[NOME_DO_CLIENTE]" e pergunte como pode ajudar hoje. Use tom amigável e profissional. Exemplo: "Olá [NOME_DO_CLIENTE], tudo bem? Meu nome é [ATENDENTE], da [NOME DA EMPRESA]. Como posso te ajudar hoje?"</td>
      <td>Gere uma resposta em português brasileiro para um cliente chamado "[NOME_DO_CLIENTE]" que acaba de iniciar uma conversa com a empresa [NOME DA EMPRESA]. A resposta deve ser curta, clara e convidativa, perguntando como o cliente gostaria de ser chamado e como a empresa pode ajudar. Use emojis leves para humanizar.</td>
      <td>[NOME_DO_CLIENTE], [NOME DA EMPRESA], [ATENDENTE]</td>
    </tr>
    <tr>
      <td><strong>FAQ - Prazo de entrega</strong></td>
      <td>Responda como atendente da [NOME DA EMPRESA]. O cliente pergunta: "Qual é o prazo de entrega?". Diga que o prazo padrão é de [X] dias úteis e que pode variar dependendo da região. Ofereça confirmar o CEP para calcular o prazo exato. Exemplo: "O prazo padrão é de 3 dias úteis, mas pode variar conforme a região. Posso confirmar seu CEP para calcular o tempo exato para você?"</td>
      <td>Atue como assistente da [NOME DA EMPRESA]. O cliente pergunta sobre o prazo de entrega. Responda que o prazo é de [X] dias úteis para todo o Brasil, mas que em capitais pode ser mais rápido. Peça para confirmar o CEP do cliente para garantir precisão. Use tom seguro e evite jargões.</td>
      <td>[NOME DA EMPRESA], [X]</td>
    </tr>
    <tr>
      <td><strong>Agendamento de serviço</strong></td>
      <td>Atue como agendador da [NOME DA EMPRESA]. Pergunte ao cliente qual dia e horário prefere para o serviço "[SERVIÇO]". Mostre as opções disponíveis em um formato de lista. Exemplo: "Temos disponíveis para [SERVIÇO]: segunda 14h, terça 10h ou quarta 16h. Qual prefere?"</td>
      <td>Você é o assistente de agendamento da [NOME DA EMPRESA]. O cliente quer agendar o serviço "[SERVIÇO]". Liste 3 horários disponíveis em ordem crescente, com dias da semana e horários. Se o cliente não responder com um horário, repita a lista. Use formatação clara com quebras de linha.</td>
      <td>[NOME DA EMPRESA], [SERVIÇO]</td>
    </tr>
    <tr>
      <td><strong>Política de trocas</strong></td>
      <td>Responda como atendente da [NOME DA EMPRESA] sobre política de trocas. Diga que aceitamos trocas em até [X] dias após a compra, com a nota fiscal. Informe que o produto deve estar na embalagem original e não usado. Peça para o cliente enviar foto do defeito ou problema via WhatsApp. Exemplo: "Aceitamos trocas em até 30 dias com nota fiscal. Produto deve estar na embalagem original e não usado. Envie foto do defeito para agilizarmos."</td>
      <td>Você é o assistente de pós-venda da [NOME DA EMPRESA]. O cliente pergunta sobre política de trocas. Responda que o prazo é de [X] dias corridos após a compra, mediante apresentação da nota fiscal. Detalhe que o item deve estar em perfeitas condições, na embalagem original. Solicite fotos do problema para análise.</td>
      <td>[NOME DA EMPRESA], [X]</td>
    </tr>
    <tr>
      <td><strong>Indisponibilidade de estoque</td>
      <td>Informe ao cliente que o produto "[PRODUTO]" está temporariamente indisponível. Pergunte se ele deseja ser notificado quando voltar ao estoque ou se prefere sugestões de produtos similares. Exemplo: "O produto [PRODUTO] está temporariamente indisponível. Posso te avisar quando voltar? Ou prefere sugestões de produtos similares?"</td>
      <td>Atue como assistente de vendas da [NOME DA EMPRESA]. O cliente pergunta pelo produto "[PRODUTO]" e você descobre que está fora de estoque. Diga que está temporariamente indisponível, mas que pode notificá-lo assim que voltar. Ofereça 2 opções de produtos similares com links diretos para a loja.</td>
      <td>[PRODUTO], [NOME DA EMPRESA]</td>
    </tr>
    <tr>
      <td><strong>Feedback pós-compra</strong></td>
      <td>Peça ao cliente um feedback sobre a compra do produto "[PRODUTO]" após [X] dias. Pergunte se ele está satisfeito e se recomendaria para amigos. Dê opções de 1 a 5 estrelas para facilitar a resposta. Exemplo: "Olá! Faz [X] dias que você comprou o [PRODUTO]. Como foi sua experiência? Dê de 1 a 5 estrelas 🌟"</td>
      <td>Você é o assistente de satisfação do cliente da [NOME DA EMPRESA]. O cliente comprou "[PRODUTO]" há [X] dias. Pergunte sobre a experiência dele com o produto usando emojis para engajar. Ofereça um botão de "Sim, gostei!" ou "Preciso de ajuda" para facilitar a resposta.</td>
      <td>[PRODUTO], [NOME DA EMPRESA], [X]</td>
    </tr>
  </tbody>
</table>

<p><a href="/como-usar-api-do-chatgpt-para-iniciantes">Veja como usar a API do ChatGPT no n8n aqui</a> e <a href="/como-usar-api-do-gemini-de-graca">como usar a API do Gemini de graça aqui</a>. Ambos os tutoriais incluem configuração de credenciais e exemplos práticos de integração com o WhatsApp.</p>

<p><strong>Dica avançada:</strong> Para respostas mais precisas, use o <strong>RAG</strong> (Retrieval-Augmented Generation) no <strong>n8n</strong> para puxar informações do seu banco de dados ou site antes de enviar a pergunta para a IA. Isso reduz erros em até 40% em FAQs complexas.</p>

<h2>Como Integrar n8n e Evolution API para Automação de WhatsApp</h2>

<p>Siga esses 8 passos para conectar o <strong>n8n</strong> à <strong>Evolution API</strong> e começar a receber mensagens do WhatsApp no seu workflow. Você vai precisar de um servidor com Docker (ou uma VPS como a da DigitalOcean) para rodar a <strong>Evolution API</strong> e o <strong>n8n</strong>.</p>

<ol>
  <li>
    <p><strong>Instale a Evolution API</strong></p>
    <p>Execute no terminal do seu servidor:</p>
    <pre><code>docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e SERVER_URL=https://seu-dominio.com:8080 \
  -e DATABASE_URI=mongodb://mongodb:27017/evolution \
  -e AUTHENTICATION_API_KEY=SUA_CHAVE_SECRETA \
  --network evolution-network \
  atendai/evolution-api:latest</code></pre>
    <p><strong>Resultado esperado:</strong> A API fica disponível em <code>https://seu-dominio.com:8080/instance/create</code>. Guarde a chave <code>SUA_CHAVE_SECRETA</code> para usar no <strong>n8n</strong>.</p>
  </li>
  <li>
    <p><strong>Crie uma instância no WhatsApp</strong></p>
    <p>Acesse <code>https://seu-dominio.com:8080/instance/create</code> no navegador. Preencha com seu número WhatsApp (com DDD, ex: 5511987654321) e a chave secreta. <strong>Resultado esperado:</strong> Você recebe um QR Code para escanear com o WhatsApp do número cadastrado.</p>
  </li>
  <li>
    <p><strong>Instale o n8n</strong></p>
    <p>Rode no terminal:</p>
    <pre><code>docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  --restart unless-stopped \
  n8nio/n8n</code></pre>
    <p><strong>Resultado esperado:</strong> O n8n fica disponível em <code>http://seu-servidor:5678</code>. Acesse e crie um novo workflow.</p>
  </li>
  <li>
    <p><strong>Adicione a conexão com a Evolution API</strong></p>
    <p>No <strong>n8n</strong>, adicione um nó "HTTP Request" com esses dados:</p>
    <table>
      <tr>
        <th>Parâmetro</th>
        <th>Valor</th>
      </tr>
      <tr>
        <td>URL</td>
        <td><code>https://seu-dominio.com:8080/message/sendText</code></td>
      </tr>
      <tr>
        <td>Method</td>
        <td>POST</td>
      </tr>
      <tr>
        <td>Headers</td>
        <td><code>{"apikey": "SUA_CHAVE_SECRETA", "Content-Type": "application/json"}</code></td>
      </tr>
      <tr>
        <td>Body</td>
        <td><code>{"number": "{{$json.from}}", "text": "Sua mensagem automatizada aqui"}</code></td>
      </tr>
    </table>
    <p><strong>Resultado esperado:</strong> O nó envia mensagens para o WhatsApp usando a <strong>Evolution API</strong>.</p>
  </li>
  <li>
    <p><strong>Configure o Webhook para receber mensagens</strong></p>
    <p>Adicione um nó "Webhook" no <strong>n8n</strong> com o caminho <code>/webhook/whatsapp</code>. No terminal, rode:</p>
    <pre><code>docker exec evolution-api bash -c "echo 'http://seu-servidor:5678/webhook/whatsapp' > /app/.env && pm2 restart all"</code></pre>
    <p><strong>Resultado esperado:</strong> Todas as mensagens do WhatsApp chegam no <strong>n8n</strong> via webhook.</p>
  </li>
  <li>
    <p><strong>Crie um fluxo de resposta automática</strong></p>
    <p>No <strong>n8n</strong>, conecte o nó "Webhook" a um nó "Set" para extrair o número e a mensagem, depois a um nó "AI" (ChatGPT ou Gemini) com um dos prompts da seção anterior. Finalize com um nó "HTTP Request" para enviar a resposta.</p>
    <p><strong>Resultado esperado:</strong> Quando um cliente envia "Olá", o <strong>n8n</strong> responde automaticamente com a mensagem de boas-vindas.</p>
  </li>
  <li>
    <p><strong>Teste o fluxo</strong></p>
    <p>Envie uma mensagem do WhatsApp cadastrado para o número da <strong>Evolution API</strong>. No <strong>n8n</strong>, acesse o painel de execução para ver se a resposta foi enviada corretamente.</p>
    <p><strong>Resultado esperado:</strong> A resposta chega em menos de 2 segundos.</p>
  </li>
  <li>
    <p><strong>Coloque em produção</strong></p>
    <p>Se tudo funcionar, configure o <strong>n8n</strong> para rodar em segundo plano com <code>--restart always</code> no Docker. Use um domínio com SSL (ex: <code>https://automacao.suaempresa.com</code>) para evitar bloqueios do WhatsApp.</p>
    <p><strong>Resultado esperado:</strong> Seu chatbot fica 24/7 respondendo clientes sem interrupções.</p>
  </li>
</ol>

<p><strong>Configuração de Webhooks avançada:</strong> Para evitar perder mensagens quando o servidor cai, use o <strong>n8n</strong> com o <strong>Redis</strong> para fila de mensagens. Exemplo de comando:</p>
<pre><code>docker run -d \
  --name n8n-redis \
  -p 6379:6379 \
  redis:alpine</code></pre>
<p>Depois, configure o nó "Webhook" para usar o Redis como fila de retentativa.</p>

<p><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">Documentação oficial do n8n aqui</a> e <a href="https://doc.evolution-api.com/" target="_blank" rel="noopener noreferrer">documentação da Evolution API aqui</a>. Ambos os links têm exemplos de configuração em vídeo e passo a passo detalhado.</p>

<p><strong>Curiosidade técnica:</strong> A <strong>Evolution API</strong> usa o <strong>MongoDB</strong> como banco de dados. Se você usar um volume Docker para o MongoDB (<code>-v mongodb_data:/data/db</code>), seus dados ficam persistentes mesmo se o container reiniciar.</p>



<h2>Personalizando os Prompts para o Seu Negócio</h2>

<p>Adapte os prompts às vozes da sua marca: use tom formal para B2B, descontraído para e-commerce jovem, ou técnico para assistência. No <strong>n8n</strong>, substitua variáveis como <code>[NOME_DO_CLIENTE]</code> por expressões do nó "Set" ou "Function", como <code>{{$json.customer_name}}</code>.</p>

<p>Ajuste exemplos de personalização:</p>
<ul>
  <li>Para uma <strong>padaria</strong>: "Olá {{$json.customer_name}}! 🥖 Na [NOME DA PADARIA], seu pão fresco espera! Quer nosso pão de segredo hoje?"</li>
  <li>Para uma <strong>consultoria</strong>: "Olá {{$json.customer_name}}. Como posso apoiá-lo hoje em seus objetivos de [ÁREA DE ATUAÇÃO]?"</li>
  <li>Para uma <strong>loja de games</strong>: "E aí, {{$json.customer_name}}! Seu novo game [NOME DO GAME] está chegando! Quer que a gente reserve pra você? 🎮"</li>
</ul>

<p><strong>Dica de ouro:</strong> Use o nó "Edit Image" do <strong>n8n</strong> para gerar memes ou GIFs personalizados nas respostas, puxando URLs de bancos como Giphy via API. Isso aumenta o engajamento em 30% em públicos jovens.</p>

<p><a href="/como-criar-um-saas-com-ia-sem-saber-programar">Veja como criar um SaaS com IA sem saber programar aqui</a> — ideal para quem quer escalar automações como essa.</p>

<h2>Testando e Implantando a Automação</h2>

<p>Teste os fluxos no <strong>n8n</strong> antes de colocar em produção. Use o modo "Test" no nó "Webhook" para simular mensagens sem afetar clientes reais. Valide sempre:</p>
<ul>
  <li>Respostas rápidas (inferior a 2 segundos)</li>
  <li>Variáveis preenchidas corretamente (ex.: nome do cliente)</li>
  <li>Tratamento de mensagens fora do escopo (ex.: palavrões ou perguntas não mapeadas)</li>
</ul>

<p>Erros comuns e como evitá-los:</p>
<table>
  <thead>
    <tr>
      <th>Erro</th>
      <th>Causa</th>
      <th>Solução</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Mensagens não chegam no WhatsApp</strong></td>
      <td>Webhook não configurado ou servidor offline</td>
      <td>Verifique o <code>https://seu-dominio.com:8080/webhook/whatsapp</code> no Evolution API e o status do servidor com <code>docker ps</code></td>
    </tr>
    <tr>
      <td><strong>Respostas duplicadas</strong></td>
      <td>Loop no fluxo ou webhook acionado múltiplas vezes</td>
      <td>Adicione um nó "IF" para filtrar mensagens já respondidas (campo <code>isBotResponse = true</code>)</td>
    </tr>
    <tr>
      <td><strong>Variáveis não substituídas</strong></td>
      <td>Expressão mal formatada no nó "Set"</td>
      <td>Use <code>{{$json["customer_name"]}}</code> em vez de <code>{{$json.customer_name}}</code> para evitar erros com espaços</td>
    </tr>
  </tbody>
</table>

<p>Melhores práticas para implantação:</p>
<ul>
  <li>Use um domínio com SSL (<code>https://</code>) para evitar bloqueios do WhatsApp</li>
  <li>Configure backups automáticos do <strong>n8n</strong> com <code>docker volume backup</code></li>
  <li>Monitore logs com <code>docker logs n8n</code> para identificar falhas rapidamente</li>
  <li>Comece com um grupo restrito de clientes (ex.: 10%) antes de liberar para todos</li>
</ul>

<p><a href="/docker-o-que-e-explicado-simples">Saiba mais sobre Docker aqui</a> para hospedar localmente sem depender de VPS.</p>

<p><strong>Curiosidade técnica:</strong> O <strong>n8n</strong> salva todas as execuções em um banco SQLite (<code>~/.n8n/database.sqlite</code>). Se o container parar, você perde histórico — por isso, sempre monte um volume para <code>/home/node/.n8n</code> no Docker.</p>

<h2>Casos de Sucesso e Dicas Avançadas</h2>

<p>Pequenos negócios reduziram custos em até 80% com essa stack. Exemplos:</p>
<ul>
  <li><strong>Clínica odontológica:</strong> Automatizou agendamentos, lembretes de consultas e enviou vídeos educativos sobre higiene bucal. Resultado: 40% menos ligações para confirmar horários.</li>
  <li><strong>Loja de roupas:</strong> Usou RAG para puxar estoque em tempo real e sugerir produtos similares quando itens estavam esgotados. Aumento de 25% nas vendas por indicação.</li>
  <li><strong>Oficina mecânica:</strong> Enviou orçamentos automáticos com fotos do serviço realizado e notificações de recall. Fidelização de 60% dos clientes.</li>
</ul>

<p>Dicas avançadas para turbinar sua automação:</p>
<ul>
  <li><strong>RAG com Notion:</strong> Conecte o <strong>n8n</strong> ao Notion via API e use o nó "Function" para buscar informações atualizadas antes de responder. Exemplo: "Qual é o horário de funcionamento hoje?" → Busca no Notion e responde corretamente.</li>
  <li><strong>Integração com PagBank:</strong> Adicione um nó "HTTP Request" para gerar boletos ou Pix automaticamente após o agendamento. Use o endpoint <code>https://api.pagbank.com.br/openpix/v1/billing</code>.</li>
  <li><strong>Análise de sentimentos:</strong> Use o nó "AI" com o modelo <strong>VADER</strong> (via <strong>n8n</strong> custom node) para classificar mensagens em "positivo", "negativo" ou "neutro". Direcione casos negativos para atendimento humano automaticamente.</li>
  <li><strong>Agendamento com Google Calendar:</strong> Sincronize compromissos no <strong>n8n</strong> usando a API do Google Calendar. Basta adicionar o nó "Google Calendar" e configurar o OAuth.</li>
</ul>

<p><a href="/vibe-coding-o-que-e-e-como-começar">Entenda o que é Vibe Coding aqui</a> — técnica para desenvolver automações com IA em tempo real, sem sair do terminal.</p>

<p><strong>Curiosidade técnica:</strong> A <strong>Evolution API</strong> permite usar <strong>webhooks inversos</strong>. Configure no <strong>n8n</strong> um endpoint que a API chama quando uma mensagem é recebida, em vez de você ficar perguntando por novidades. Isso reduz a latência para < 500ms.</p>



<h2>Perguntas frequentes sobre Prompts prontos para automação de atendimento no WhatsApp usando n8n e Evolution API</h2>

<h3>Como integrar o n8n com a Evolution API?</h3>
<p>Basta instalar a Evolution API em um servidor com Docker, criar uma instância no WhatsApp via QR Code e conectar o n8n usando um nó HTTP Request com a URL da API e sua chave secreta. O passo a passo detalhado está na seção 'Como Integrar n8n e Evolution API'.</p>

<h3>Quais são os melhores prompts para atendimento no WhatsApp?</h3>
<p>Os melhores prompts são aqueles adaptados ao seu negócio. Na seção 'Prompts Prontos para Atendimento Automatizado', você encontra 6 exemplos testados para boas-vindas, FAQs, agendamentos e mais, prontos para copiar e colar no n8n.</p>

<h3>É possível usar ChatGPT e Gemini no n8n para automação?</h3>
<p>Sim! O n8n permite conectar APIs de IA como ChatGPT e Gemini usando nós específicos ou HTTP Request. Na seção 'Prompts Prontos', cada exemplo inclui variações para ambas as IAs, com instruções de como configurar as credenciais.</p>

<h3>Como configurar webhooks para o WhatsApp no n8n?</h3>
<p>No n8n, adicione um nó Webhook com um caminho personalizado (ex: /webhook/whatsapp). No Evolution API, configure esse endpoint no arquivo .env e reinicie o container. Todas as mensagens do WhatsApp serão encaminhadas automaticamente para o seu workflow.</p>

<h3>Quanto custa automatizar o atendimento no WhatsApp?</h3>
<p>O custo é zero se você usar a Evolution API (self-hosted) e o n8n (open-source). Você só paga pelo servidor (VPS a partir de R$10/mês) e eventuais APIs de IA pagas como ChatGPT. Comparado a soluções como Zapier, a economia é de até 90%.</p>

<h3>O n8n é gratuito para uso comercial?</h3>
<p>Sim, o n8n é open-source e pode ser usado comercialmente sem pagar licenças. A versão self-hosted (instalada em seu servidor) é totalmente gratuita. Apenas a versão n8n Cloud (hospedada pela equipe do n8n) tem planos pagos.</p>

<h3>Como testar os prompts de automação antes de implantar?</h3>
<p>Use o modo 'Test' no nó Webhook do n8n para simular mensagens sem afetar clientes reais. Valide respostas, variáveis e tratamento de erros antes de ativar o fluxo em produção. A seção 'Testando e Implantando a Automação' explica como fazer isso passo a passo.</p>

<h3>Quais são as limitações da Evolution API?</h3>
<p>A Evolution API não tem limites de mensagens para até 1.000 contatos, mas depende do WhatsApp Web, então pode haver bloqueios se você enviar muitas mensagens em pouco tempo. Para volumes maiores, considere usar um número WhatsApp Business oficial ou a API oficial do Meta.</p>

<h2>Automação no WhatsApp que realmente funciona: do zero ao chatbot em 1 hora</h2>

<p>Com os prompts prontos, a integração n8n + Evolution API e as dicas avançadas deste guia, você tem tudo para transformar o WhatsApp do seu negócio em um SAC automatizado, 24/7 e sem depender de serviços caros. A automação não é mais um luxo: é a forma mais inteligente de escalar o atendimento sem perder a essência humana — afinal, até as respostas automatizadas podem ser personalizadas e engajadoras.</p>

<ul>
  <li><strong>Economia:</strong> Reduza até 70% do tempo gasto em atendimento manual.</li>
  <li><strong>Controle:</strong> Hospede tudo em seu servidor, sem depender de terceiros.</li>
  <li><strong>Personalização:</strong> Adapte os prompts ao tom da sua marca em minutos.</li>
  <li><strong>Escalabilidade:</strong> Comece com 10 clientes e aumente sem limites.</li>
  <li><strong>Tecnologia:</strong> Use IA gratuita (Gemini) ou paga (ChatGPT) conforme sua necessidade.</li>
</ul>

<p>Pronto para colocar a mão na massa? <a href="/categoria/automacao">Explore nossa categoria de automação</a> para mais tutoriais como este, ou <a href="/contato">entre em contato</a> para tirar dúvidas específicas sobre sua implementação!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como integrar o n8n com a Evolution API?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Basta instalar a Evolution API em um servidor com Docker, criar uma instância no WhatsApp via QR Code e conectar o n8n usando um nó HTTP Request com a URL da API e sua chave secreta. O passo a passo detalhado está na seção 'Como Integrar n8n e Evolution API'."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são os melhores prompts para atendimento no WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os melhores prompts são aqueles adaptados ao seu negócio. Na seção 'Prompts Prontos para Atendimento Automatizado', você encontra 6 exemplos testados para boas-vindas, FAQs, agendamentos e mais, prontos para copiar e colar no n8n."
          }
        },
        {
          "@type": "Question",
          "name": "É possível usar ChatGPT e Gemini no n8n para automação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! O n8n permite conectar APIs de IA como ChatGPT e Gemini usando nós específicos ou HTTP Request. Na seção 'Prompts Prontos', cada exemplo inclui variações para ambas as IAs, com instruções de como configurar as credenciais."
          }
        },
        {
          "@type": "Question",
          "name": "Como configurar webhooks para o WhatsApp no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No n8n, adicione um nó Webhook com um caminho personalizado (ex: /webhook/whatsapp). No Evolution API, configure esse endpoint no arquivo .env e reinicie o container. Todas as mensagens do WhatsApp serão encaminhadas automaticamente para o seu workflow."
          }
        },
        {
          "@type": "Question",
          "name": "Quanto custa automatizar o atendimento no WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O custo é zero se você usar a Evolution API (self-hosted) e o n8n (open-source). Você só paga pelo servidor (VPS a partir de R$10/mês) e eventuais APIs de IA pagas como ChatGPT. Comparado a soluções como Zapier, a economia é de até 90%."
          }
        },
        {
          "@type": "Question",
          "name": "O n8n é gratuito para uso comercial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, o n8n é open-source e pode ser usado comercialmente sem pagar licenças. A versão self-hosted (instalada em seu servidor) é totalmente gratuita. Apenas a versão n8n Cloud (hospedada pela equipe do n8n) tem planos pagos."
          }
        },
        {
          "@type": "Question",
          "name": "Como testar os prompts de automação antes de implantar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use o modo 'Test' no nó Webhook do n8n para simular mensagens sem afetar clientes reais. Valide respostas, variáveis e tratamento de erros antes de ativar o fluxo em produção. A seção 'Testando e Implantando a Automação' explica como fazer isso passo a passo."
          }
        },
        {
          "@type": "Question",
          "name": "Quais são as limitações da Evolution API?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Evolution API não tem limites de mensagens para até 1.000 contatos, mas depende do WhatsApp Web, então pode haver bloqueios se você enviar muitas mensagens em pouco tempo. Para volumes maiores, considere usar um número WhatsApp Business oficial ou a API oficial do Meta."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "@id": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api",
      "isPartOf": {
        "@id": "https://automacao.art.br/#website"
      },
      "author": {
        "@type": "Organization",
        "name": "Automação.Art",
        "url": "https://automacao.art.br"
      },
      "headline": "Prompts Prontos para Automação de Atendimento no WhatsApp com n8n e Evolution API",
      "datePublished": "2024-06-15",
      "dateModified": "2024-06-15",
      "inLanguage": "pt-BR",
      "publisher": {
        "@type": "Organization",
        "name": "Automação.Art",
        "url": "https://automacao.art.br"
      },
      "description": "Aprenda a automatizar o atendimento no WhatsApp usando n8n e Evolution API. Prompts prontos e tutoriais práticos para iniciantes e pequenos negócios.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api"
      }
    },
    {
      "@type": "HowTo",
      "@id": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#howto",
      "name": "Como configurar automação de atendimento no WhatsApp com n8n e Evolution API",
      "description": "Passo a passo detalhado para integrar n8n e Evolution API, configurar webhooks e implantar um chatbot funcional no WhatsApp em menos de 1 hora.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Instale a Evolution API",
          "text": "Execute o comando Docker para instalar a Evolution API em um servidor com MongoDB e configure a URL do servidor e a chave secreta.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-1"
        },
        {
          "@type": "HowToStep",
          "name": "Crie uma instância no WhatsApp",
          "text": "Acesse a URL da Evolution API no navegador, preencha com seu número WhatsApp e escaneie o QR Code gerado para ativar a conexão.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-2"
        },
        {
          "@type": "HowToStep",
          "name": "Instale o n8n",
          "text": "Rode o comando Docker para instalar o n8n em seu servidor e acesse a interface via navegador para criar o workflow.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-3"
        },
        {
          "@type": "HowToStep",
          "name": "Conecte n8n e Evolution API",
          "text": "Adicione um nó HTTP Request no n8n para enviar mensagens via Evolution API e configure o webhook para receber mensagens do WhatsApp.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-4"
        },
        {
          "@type": "HowToStep",
          "name": "Crie um fluxo de resposta automática",
          "text": "Conecte o webhook a um nó de IA (ChatGPT ou Gemini) com um dos prompts prontos e finalize com um nó HTTP Request para enviar a resposta ao cliente.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-6"
        },
        {
          "@type": "HowToStep",
          "name": "Teste e implante a automação",
          "text": "Use o modo Test no n8n para validar o fluxo antes de ativar em produção. Monitore logs e faça backups automáticos do servidor.",
          "url": "https://automacao.art.br/prompts-prontos-automacao-whatsapp-n8n-evolution-api#passo-7"
        }
      ]
    }
  ]
}
</script>