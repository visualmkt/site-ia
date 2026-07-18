---
title: "Como criar bot de Telegram com n8n: tutorial passo a passo"
description: "Aprenda a criar um bot de Telegram com n8n em 20 minutos. Guia completo com webhook, Docker e integração OpenAI. Ideal para iniciantes e pequenas empresas."
cluster: "n8n"
formato: "tutorial"
pubDate: 2026-07-18
image: "https://image.pollinations.ai/prompt/Fluxo%20visual%20do%20workflow%20n8n%20que%20cria%20o%20bot%20de%20Telegram%2C%20render%203D%20estilizado%20tipo%20Pixar%2C%20tons%20pastel%20suaves%2C%20golden%20hour%2C%20sem%20texto%2C%20sem%20letras%2C%20sem%20marca%20dagua%2C%20composi%C3%A7%C3%A3o%2016%3A9?width=1200&height=675&nologo=true&seed=139988"
imageAlt: "Diagrama do workflow n8n para criar bot de Telegram"
draft: false
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Como criar um bot de Telegram com n8n – Guia completo passo a passo</title>
<meta name="description" content="Aprenda passo a passo a criar um bot de Telegram com n8n, configurando webhook, Docker, VPS e integração OpenAI. Guia completo para iniciantes.">
<meta name="slug" content="como-criar-bot-telegram-com-n8n">
<link rel="canonical" href="https://automacao.art.br/como-criar-bot-telegram-com-n8n">
</head>
<body>
<h2>Como criar um bot de Telegram com n8n – Guia completo passo a passo</h2>
<p>Neste artigo, você vai aprender como criar um bot de Telegram com n8n em 5 etapas: gerar token no BotFather, instalar n8n (Docker ou VPS), configurar webhook com URL pública e SSL, montar workflow com <strong>Telegram Trigger</strong> e <strong>Telegram Send Message</strong>, e testar com mensagens reais. O fluxo roda 100% self-hosted ou no n8n Cloud, com suporte a automação avançada via <strong>HTTP Request</strong> para APIs como OpenAI.</p>
<p>Neste guia, você vai do zero ao deploy de um bot funcional que recebe comandos e responde automaticamente, usando nodes nativos do n8n. Não precisa saber programar: tudo é feito por interface visual e configurações prontas.</p>

---

<h2>Passo a passo para criar um bot de Telegram com n8n</h2>
<p>Crie um bot de Telegram no n8n em até 20 minutos seguindo estas etapas: gere token no BotFather, instale n8n, configure webhook com URL pública e SSL, monte o workflow com nodes de trigger e resposta, e salve o fluxo. Abaixo, o resumo das etapas com tempo estimado e nível de dificuldade.</p>

<table>
  <tr>
    <th>Etapa</th>
    <th>Descrição</th>
    <th>Tempo</th>
    <th>Dificuldade</th>
  </tr>
  <tr>
    <td>1. Criar bot no BotFather</td>
    <td>Use o BotFather no Telegram para gerar token e definir comandos /start e /help.</td>
    <td>5 min</td>
    <td>Fácil</td>
  </tr>
  <tr>
    <td>2. Instalar n8n</td>
    <td>Escolha entre n8n Cloud (gratuito), Docker ou VPS (recomendado para produção).</td>
    <td>10 min</td>
    <td>Médio</td>
  </tr>
  <tr>
    <td>3. Configurar webhook</td>
    <td>Crie um node <strong>Webhook</strong> no n8n e insira URL pública com HTTPS (ex.: https://seusite.com/webhook).</td>
    <td>7 min</td>
    <td>Médio</td>
  </tr>
  <tr>
    <td>4. Montar workflow</td>
    <td>Adicione nodes <strong>Telegram Trigger</strong>, <strong>Function</strong> (opcional) e <strong>Telegram Send Message</strong> para responder mensagens.</td>
    <td>8 min</td>
    <td>Fácil</td>
  </tr>
  <tr>
    <td>5. Testar e salvar</td>
    <td>Envie /start no Telegram e verifique se o bot responde automaticamente. Salve o workflow.</td>
    <td>5 min</td>
    <td>Fácil</td>
  </tr>
</table>
<p>Confira o <a href="/n8n-guia-completo-portugues">guia completo do n8n em português</a> para mais detalhes sobre nodes e configurações avançadas.</p>
<p><strong>Dica de quem usa no dia a dia:</strong> Sempre salve o workflow antes de testar. O n8n não salva automaticamente, e você pode perder horas de configuração se esquecer.</p>

---

<h2>Preparando o ambiente: instalação do n8n</h2>
<p>Instale o n8n de três formas: <strong>n8n Cloud</strong> (gratuito, zero configuração), <strong>Docker</strong> (recomendado para self-hosted) ou <strong>VPS</strong> (Linux com Node.js). Escolha a opção que se adequa ao seu objetivo: testes rápidos ou produção escalável.</p>

<ul>
  <li><strong>n8n Cloud</strong>: Acesse <a href="https://n8n.cloud/" target="_blank" rel="noopener noreferrer">n8n.cloud</a> e crie uma conta gratuita. Ideal para quem não quer lidar com servidor.</li>
  <li><strong>Docker</strong>: Execute <code>docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n</code> para subir localmente. Use <a href="/como-instalar-n8n-na-vps-com-docker">este guia</a> para configurar em VPS.</li>
  <li><strong>VPS</strong>: Instale Node.js 18+ e execute <code>npm install -g n8n</code>. Para produção, use PM2 ou Docker para gerenciar o processo.</li>
</ul>
<p>Confira a <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">documentação oficial do n8n</a> para detalhes de instalação em cada ambiente. Lá você encontra comandos específicos para AWS, Azure, DigitalOcean e outros.</p>
<p><strong>Contexto técnico:</strong> O n8n Cloud usa um plano gratuito com limite de 1000 execuções/mês. Se passar disso, você precisa pagar ou migrar para self-hosted.</p>

---

<h2>Criando e configurando o bot no Telegram</h2>
<p>Crie um bot no Telegram usando o <strong>BotFather</strong> em 2 minutos: abra o app, pesquise por @BotFather, digite <code>/newbot</code>, dê um nome e um username (ex: <code>meubot_do_n8n_bot</code>), e copie o token gerado. Este token é a chave de acesso do seu bot à API do Telegram.</p>
<p>Depois, defina comandos básicos como <code>/start</code> e <code>/help</code> para guiar os usuários. Use o comando <code>/setcommands</code> no BotFather e envie a lista no formato:</p>
<pre>start - Inicia o bot
help - Mostra ajuda</pre>
<p><img src="imagens/botfather-criacao-bot.png" alt="Como criar um bot de Telegram com n8n - captura de tela do BotFather mostrando a criação de um novo bot" width="600" height="400" style="border-radius: 8px; border: 1px solid #ddd;">
<br><strong>Como usar o BotFather:</strong> Nunca compartilhe o token do seu bot publicamente. Se vazar, o bot pode ser sequestrado ou usado para spam. Revogue o token com <code>/revoke</code> se necessário.</p>
<p>Para mais detalhes sobre webhooks, veja o <a href="/o-que-e-webhook-e-como-usar-no-n8n">guia sobre webhook no n8n</a>.</p>

---

<h2>Construindo o workflow: recebendo e respondendo mensagens</h2>
<p>Para receber e responder mensagens no n8n, conecte <strong>Telegram Trigger</strong> → <strong>Function</strong> (opcional) → <strong>HTTP Request</strong> (para OpenAI) → <strong>Telegram Send Message</strong>. Cada node tem poucos campos; basta preencher o token, o chatId e o texto.</p>
<ul>
  <li><strong>Telegram Trigger</strong>: <em>Token</em> (token do bot), <em>Chat ID</em> (identificador do usuário ou grupo), <em>Update Type</em> (message, callback_query).</li>
  <li><strong>Function</strong>: código JavaScript que formata a mensagem ou gera prompts.</li>
  <li><strong>HTTP Request</strong>: URL da API (ex.: https://api.openai.com/v1/completions), <em>Headers</em> (Authorization Bearer &lt;chave&gt;), <em>Body</em> (JSON com prompt).</li>
  <li><strong>Telegram Send Message</strong>: <em>Chat ID</em> (recebido no Trigger), <em>Text</em> (resposta final), <em>Parse Mode</em> (Markdown ou HTML).</li>
</ul>
<p>Para usar a Evolution API dentro do workflow, veja <a href="/evolution-api-o-que-e-e-como-usar-com-n8n">Evolution API: o que é e como usar com n8n</a>.</p>
<p><strong>Curiosidade de quem usa no dia a dia:</strong> ao chamar a OpenAI, inclua “max_tokens”: 50 para evitar respostas longas que excedam o limite de 4096 bytes do Telegram.</p>

<h2>Testando e depurando seu bot</h2>
<p>Teste o bot ativando o modo “Execute Workflow” e analisando os logs de cada node. Se algo falhar, abra o console do n8n, procure a linha vermelha e ajuste o parâmetro.</p>
<ol>
  <li>Abra o workflow e clique em “Execute Workflow”.</li>
  <li>Envie a mensagem /start no Telegram.</li>
  <li>Observe a execução na aba “Execution”.</li>
  <li>Se o webhook não receber a chamada, rode <code>ngrok http 5678</code> e atualize a URL no Telegram.</li>
  <li>Corrija o erro indicado e repita até que a resposta apareça.</li>
</ol>
<p>Para entender detalhes de depuração de webhooks, consulte <a href="https://core.telegram.org/bots/webhooks" target="_blank" rel="noopener noreferrer">documentação oficial do Telegram sobre webhooks</a>.</p>
<p><strong>Curiosidade de quem usa no dia a dia:</strong> o n8n grava a payload completa da chamada; copie‑a do log para reproduzir o erro em um sandbox.</p>

<h2>Melhores práticas e dicas de escalabilidade</h2>
<p>Proteja o token, limite a taxa e monitore a performance para escalar o bot sem interrupções. Use variáveis de ambiente para credenciais e configure alertas de uso.</p>
<ul>
  <li><strong>Token seguro</strong>: armazene em <code>process.env.TELEGRAM_TOKEN</code> e nunca commit no repositório.</li>
  <li><strong>Limite de taxa</strong>: implemente <code>Rate Limit</code> node ou atrasos de <code>setTimeout</code> para não ultrapassar 30 msg/s.</li>
  <li><strong>Variáveis de ambiente</strong>: configure <code>OPENAI_API_KEY</code> e <code>BASE_URL</code> no Docker‑compose ou no PM2.</li>
  <li><strong>Monitoramento</strong>: habilite o painel de “Executions” do n8n e envie métricas para Grafana ou Datadog.</li>
  <li><strong>Backup</strong>: exporte o workflow JSON semanalmente e guarde em um bucket S3.</li>
</ul>
<p><strong>Curiosidade de quem usa no dia a dia:</strong> o n8n permite “Workflow Execution Timeout” de até 1 hora; ajuste quando usar APIs lentas como a da OpenAI.</p>

<h2>Perguntas frequentes sobre como criar um bot de Telegram com n8n</h2>

<h3>Qual é a diferença entre usar um webhook e polling para receber mensagens do Telegram?</h3>
<p>O webhook é mais eficiente: o Telegram envia atualizações automaticamente para uma URL configurada, enquanto o polling exige que o n8n fique constantemente verificando novas mensagens na API. O webhook é ideal para produção, pois reduz a latência e o uso de recursos.</p>

<h3>Posso hospedar o bot de Telegram no n8n Cloud ou preciso de VPS?</h3>
<p>Sim, o n8n Cloud (plano gratuito) suporta bots de Telegram, mas tem limite de 1000 execuções/mês. Para escalar ou usar recursos avançados, recomenda-se self-hosted em VPS com Docker ou Node.js.</p>

<h3>É necessário usar Docker para rodar n8n ao criar um bot de Telegram?</h3>
<p>Não é obrigatório. Você pode usar n8n Cloud, instalar via npm global ou até mesmo executar localmente. Docker é recomendado para produção por facilitar atualizações e isolamento de ambiente.</p>

<h3>Como proteger o token do bot de Telegram no fluxo do n8n?</h3>
<p>Armazene o token em variáveis de ambiente (ex: TELEGRAM_TOKEN) e nunca o commite no código. No Docker, use arquivos .env ou secrets do Swarm. No n8n Cloud, utilize as credenciais nativas da plataforma.</p>

<h3>É possível integrar o bot de Telegram com ChatGPT usando n8n?</h3>
<p>Sim! Use o node HTTP Request para chamar a API da OpenAI (ou ChatGPT) e processe a resposta com nodes como Function ou Set. Exemplo: receba uma mensagem no Telegram, envie para a OpenAI e devolva a resposta formatada ao usuário.</p>

<h3>Qual a melhor forma de debugar erros de webhook no n8n?</h3>
<p>Ative os logs detalhados no n8n, verifique a aba "Execution" após enviar uma mensagem e use ferramentas como ngrok para testar URLs locais. Copie a payload da falha e replique em um ambiente de sandbox para isolar o problema.</p>

<h3>O n8n tem limite de mensagens por segundo no Telegram?</h3>
<p>O Telegram permite até 30 mensagens por segundo por bot. Para evitar bloqueios, implemente um node de Rate Limit ou delays entre execuções. Monitore os logs para ajustar conforme a demanda.</p>

<h3>Como escalar o bot de Telegram quando o número de usuários cresce?</h3>
<p>Use self-hosted com recursos otimizados (CPU/RAM), implemente cache para respostas frequentes e distribua o fluxo em múltiplos workers. Monitore métricas como tempo de resposta e ajuste a infraestrutura conforme necessário.</p>

<h2>🚀 Seu bot de Telegram está pronto para decolar!</h2>

<p>Criar um bot de Telegram com n8n é mais simples do que parece: em poucas etapas você tem um assistente automatizado respondendo mensagens, processando comandos e até integrando com IA. O segredo está em começar pequeno, testar cada etapa e escalar com boas práticas de segurança e performance. Com este guia, você já tem tudo para colocar seu bot no ar hoje mesmo — seja para atendimento ao cliente, automação de tarefas ou até mesmo um assistente pessoal.</p>

<ul>
  <li><strong>5 minutos:</strong> Gere o token no BotFather e instale o n8n.</li>
  <li><strong>10 minutos:</strong> Configure o webhook com SSL e monte o workflow básico.</li>
  <li><strong>5 minutos:</strong> Teste com /start e ajuste conforme necessário.</li>
  <li><strong>Pronto!</strong> Seu bot está funcional e pode ser expandido com integrações avançadas.</li>
</ul>

<p>Agora que seu bot está funcionando, que tal explorar mais automações com n8n? Confira nossos tutoriais sobre <a href="/n8n-automacao-com-api-externa">integrações com APIs</a> ou <a href="/n8n-para-pequenos-negocios">automação para negócios</a> para levar suas habilidades ao próximo nível!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qual é a diferença entre usar um webhook e polling para receber mensagens do Telegram?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O webhook é mais eficiente: o Telegram envia atualizações automaticamente para uma URL configurada, enquanto o polling exige que o n8n fique constantemente verificando novas mensagens na API. O webhook é ideal para produção, pois reduz a latência e o uso de recursos."
          }
        },
        {
          "@type": "Question",
          "name": "Posso hospedar o bot de Telegram no n8n Cloud ou preciso de VPS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, o n8n Cloud (plano gratuito) suporta bots de Telegram, mas tem limite de 1000 execuções/mês. Para escalar ou usar recursos avançados, recomenda-se self-hosted em VPS com Docker ou Node.js."
          }
        },
        {
          "@type": "Question",
          "name": "É necessário usar Docker para rodar n8n ao criar um bot de Telegram?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não é obrigatório. Você pode usar n8n Cloud, instalar via npm global ou até mesmo executar localmente. Docker é recomendado para produção por facilitar atualizações e isolamento de ambiente."
          }
        },
        {
          "@type": "Question",
          "name": "Como proteger o token do bot de Telegram no fluxo do n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Armazene o token em variáveis de ambiente (ex: TELEGRAM_TOKEN) e nunca o commite no código. No Docker, use arquivos .env ou secrets do Swarm. No n8n Cloud, utilize as credenciais nativas da plataforma."
          }
        },
        {
          "@type": "Question",
          "name": "É possível integrar o bot de Telegram com ChatGPT usando n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Use o node HTTP Request para chamar a API da OpenAI (ou ChatGPT) e processe a resposta com nodes como Function ou Set. Exemplo: receba uma mensagem no Telegram, envie para a OpenAI e devolva a resposta formatada ao usuário."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a melhor forma de debugar erros de webhook no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ative os logs detalhados no n8n, verifique a aba \"Execution\" após enviar uma mensagem e use ferramentas como ngrok para testar URLs locais. Copie a payload da falha e replique em um ambiente de sandbox para isolar o problema."
          }
        },
        {
          "@type": "Question",
          "name": "O n8n tem limite de mensagens por segundo no Telegram?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Telegram permite até 30 mensagens por segundo por bot. Para evitar bloqueios, implemente um node de Rate Limit ou delays entre execuções. Monitore os logs para ajustar conforme a demanda."
          }
        },
        {
          "@type": "Question",
          "name": "Como escalar o bot de Telegram quando o número de usuários cresce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use self-hosted com recursos otimizados (CPU/RAM), implemente cache para respostas frequentes e distribua o fluxo em múltiplos workers. Monitore métricas como tempo de resposta e ajuste a infraestrutura conforme necessário."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como criar bot de Telegram com n8n – Guia completo passo a passo",
      "description": "Aprenda a criar um bot de Telegram usando n8n em poucos minutos. Guia completo com webhook, Docker e integração OpenAI para iniciantes.",
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
      "inLanguage": "pt-BR",
      "datePublished": "2024-05-15",
      "articleBody": "Você cria um bot de Telegram com n8n em 5 etapas: gerar token no BotFather, instalar n8n (Docker ou VPS), configurar webhook com URL pública e SSL, montar workflow com Telegram Trigger e Telegram Send Message, e testar com mensagens reais. O fluxo roda 100% self-hosted ou no n8n Cloud, com suporte a automação avançada via HTTP Request para APIs como OpenAI. Neste guia, você vai do zero ao deploy de um bot funcional que recebe comandos e responde automaticamente, usando nodes nativos do n8n. Não precisa saber programar: tudo é feito por interface visual e configurações prontas."
    },
    {
      "@type": "HowTo",
      "name": "Como criar bot de Telegram com n8n – Guia completo passo a passo",
      "description": "Tutorial passo a passo para criar um bot de Telegram usando n8n, incluindo configuração de webhook, integração com OpenAI e boas práticas de segurança.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Criar bot no BotFather",
          "text": "Abra o BotFather no Telegram, digite /newbot, defina um nome e username para o bot, e copie o token gerado. Este token é essencial para conectar o bot à API do Telegram."
        },
        {
          "@type": "HowToStep",
          "name": "Instalar n8n",
          "text": "Escolha entre n8n Cloud (gratuito), Docker ou VPS. Para produção, recomenda-se Docker ou VPS com Node.js 18+ para melhor performance e escalabilidade."
        },
        {
          "@type": "HowToStep",
          "name": "Configurar webhook",
          "text": "Crie um node Webhook no n8n e insira uma URL pública com HTTPS (ex.: https://seusite.com/webhook). Certifique-se de que o SSL está válido para evitar erros de conexão."
        },
        {
          "@type": "HowToStep",
          "name": "Montar workflow",
          "text": "Adicione nodes Telegram Trigger para receber mensagens, Function para processamento (opcional), HTTP Request para integrações como OpenAI, e Telegram Send Message para enviar respostas."
        },
        {
          "@type": "HowToStep",
          "name": "Testar e salvar",
          "text": "Envie /start no Telegram e verifique se o bot responde automaticamente. Salve o workflow para evitar perder configurações e teste novamente antes de colocar em produção."
        }
      ]
    }
  ]
}
</script>
</body>
</html>