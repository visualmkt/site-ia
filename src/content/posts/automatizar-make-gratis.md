---
title: "Como automatizar com Make de graça: Guia completo"
description: "Aprenda a usar o plano gratuito do Make para criar cenários, integrar APIs e ChatGPT, e otimizar limites sem pagar."
cluster: "make"
formato: "tutorial"
pubDate: 2026-07-18
image: "https://image.pollinations.ai/prompt/Fluxo%20de%20automa%C3%A7%C3%A3o%20simples%20criado%20no%20Make%2C%20mostrando%20trigger%20e%20a%C3%A7%C3%A3o%20conectados.%2C%20digital%20painting%20detalhada%2C%20cores%20neon%20sobre%20fundo%20escuro%2C%20luz%20noturna%20urbana%2C%20sem%20texto%2C%20sem%20letras%2C%20sem%20marca%20dagua%2C%20composi%C3%A7%C3%A3o%2016%3A9?width=1200&height=675&nologo=true&seed=160407"
imageAlt: "Fluxo de automação gratuito no Make"
draft: false
---

<p>Você pode automatizar tarefas com o <strong>Make (ex-Integromat)</strong> de graça usando o plano gratuito dele. Basta criar um login, montar um cenário de automação com até 1.000 operações por mês e conectar apps como Gmail, Google Sheets ou APIs públicas. O segredo é escolher triggers simples e ações diretas para não esbarrar nos limites.</p>

<p>Neste guia, você vai aprender a criar seu primeiro fluxo no Make sem pagar, integrar APIs e webhooks, e ainda usar o ChatGPT gratuitamente. Tudo com passos verificáveis e dicas de quem usa a ferramenta no dia a dia. Prepare-se para cortar trabalho manual e ganhar tempo.</p>

<h2>Entendendo o plano gratuito do Make</h2>
<p>O plano gratuito do Make dá 1.000 operações por mês, 100 MB de dados transferidos e dois cenários ativos. Você tem acesso a mais de 1.000 apps integrados, mas só pode usar 3 módulos por cenário e não pode usar roteamento condicional nem loops.</p>

<p>Custos ocultos? Nenhum, mas se você ultrapassar 1.000 operações em um mês, o Make pausa a execução até o próximo ciclo. Também não dá pra usar filas de espera nem agendamentos complexos no free tier.</p>

<table>
  <tr>
    <th>Recurso</th>
    <th>Plano Gratuito</th>
    <th>Plano Pro (a partir de)</th>
  </tr>
  <tr>
    <td>Operações por mês</td>
    <td>1.000</td>
    <td>10.000</td>
  </tr>
  <tr>
    <td>Módulos por cenário</td>
    <td>3</td>
    <td>10</td>
  </tr>
  <tr>
    <td>Cenários ativos</td>
    <td>2</td>
    <td>5</td>
  </tr>
  <tr>
    <td>Roteamento condicional</td>
    <td>Não</td>
    <td>Sim</td>
  </tr>
  <tr>
    <td>Agendamentos complexos</td>
    <td>Não</td>
    <td>Sim</td>
  </tr>
</table>

<p><strong>Dica de quem usa:</strong> Se você precisa de roteamento ou loops, crie dois cenários separados no plano gratuito e conecte-os via <strong>webhook</strong> ou <strong>HTTP request</strong> para contornar a limitação.</p>

<h2>Criando seu primeiro cenário no Make sem custos</h2>
<p>Vamos montar um fluxo que envia um e-mail no Gmail sempre que um novo registro for adicionado em uma planilha do Google Sheets. Você não paga nada e o processo leva menos de 5 minutos.</p>

<ol>
  <li>
    <strong>Cadastre-se no Make</strong> em <a href="https://www.make.com/pricing" target="_blank" rel="noopener noreferrer">make.com/pricing</a>. Use seu e-mail e crie uma senha. Você receberá um link de confirmação no seu e-mail.
    <br><strong>Resultado esperado:</strong> Conta ativa com acesso ao painel do Make.
  </li>
  <li>
    <strong>Crie um novo cenário</strong> clicando em “Create a new scenario”. Escolha o template “When Google Sheets row added -> Send Gmail”.
    <br><strong>Resultado esperado:</strong> Cenário pré-configurado com trigger do Google Sheets e ação de envio de e-mail.
  </li>
  <li>
    <strong>Autorize o Google Sheets</strong>. Clique no módulo do Google Sheets, selecione “Add connection” e autorize com sua conta Google.
    <br><strong>Resultado esperado:</strong> Conexão bem-sucedida com a planilha selecionada automaticamente.
  </li>
  <li>
    <strong>Autorize o Gmail</strong>. Clique no módulo do Gmail, selecione “Add connection” e autorize com sua conta Google.
    <br><strong>Resultado esperado:</strong> Conexão bem-sucedida com permissão de envio de e-mails.
  </li>
  <li>
    <strong>Configure o e-mail</strong>. No módulo do Gmail, preencha o destinatário, assunto e corpo. Use variáveis como {{1.subject}} e {{1.text}} para puxar dados da planilha.
    <br><strong>Resultado esperado:</strong> Cenário pronto para testar.
  </li>
  <li>
    <strong>Execute o cenário</strong> clicando em “Run once”. Adicione uma nova linha na planilha e veja o e-mail chegar.
    <br><strong>Resultado esperado:</strong> E-mail enviado automaticamente com dados da planilha.
  </li>
</ol>

<p><strong>Curiosidade:</strong> Se você não encontrar o template exato, use o botão “Search apps” para procurar por “Google Sheets” e “Gmail”, arraste os módulos e configure manualmente. O Make salva suas conexões para reuso.</p>

<h2>Integrações essenciais gratuitas: APIs, webhooks e ChatGPT</h2>
<p>No plano gratuito do Make, você pode conectar qualquer API pública usando o módulo <strong>HTTP request</strong>. Também pode receber dados via <strong>webhook</strong> e usar a API do OpenAI gratuitamente, com limites baixos mas suficientes para testes.</p>

<h3>Conectando um webhook no Make</h3>
<ol>
  <li>
    <strong>Crie um webhook no Make</strong>. No cenário, adicione um módulo “Webhooks” e selecione “Custom webhook”. Copie a URL gerada.
  </li>
  <li>
    <strong>Envie dados para o webhook</strong>. Use uma ferramenta como Postman ou cURL para fazer uma requisição POST com JSON para a URL do webhook.
    <br><strong>Exemplo:</strong>
    <code>curl -X POST https://hook.make.com/SEU_TOKEN -H "Content-Type: application/json" -d '{"nome":"João","email":"joao@email.com"}'</code>
  </li>
  <li>
    <strong>Processa os dados no Make</strong>. O webhook dispara o cenário e você pode usar os dados na próxima ação, como enviar um e-mail ou gravar no Google Sheets.
  </li>
</ol>

<h3>Usando a API do OpenAI no Make</h3>
<p>O plano gratuito do Make não inclui créditos da OpenAI, mas você pode usar a API com sua própria chave. O limite é 3 requisições por minuto e US$ 5 de créditos, o suficiente para testar prompts simples.</p>

<ol>
  <li>
    <strong>Obtenha sua chave da OpenAI</strong> em <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com/account/api-keys</a>. Crie uma conta se não tiver.
  </li>
  <li>
    <strong>Adicione um módulo HTTP request no Make</strong>. Configure a URL como <code>https://api.openai.com/v1/chat/completions</code>, método POST.
  </li>
  <li>
    <strong>Preencha os cabeçalhos</strong>. Adicione <code>Authorization: Bearer SUA_CHAVE</code> e <code>Content-Type: application/json</code>.
  </li>
  <li>
    <strong>Configure o corpo da requisição</strong>. Use:
    <code>{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Resuma este texto: {{1.text}}"}]} </code>
  </li>
  <li>
    <strong>Execute e veja a resposta</strong>. O Make retorna o texto gerado pela OpenAI, que você pode usar em outro módulo.
  </li>
</ol>

<p><strong>Dica de ouro:</strong> Se você receber erro de cota, use <code>gpt-3.5-turbo-instruct</code> em vez de <code>gpt-3.5-turbo</code> — o modelo instrucional consome menos créditos e ainda funciona bem para automação.</p>



<h2>Otimizando limites e boas práticas no plano gratuito do Make</h2>
<p>Para não estourar as 1.000 operações mensais, você deve organizar módulos reutilizáveis e programar execuções fora dos horários de pico. Cada ação conta como uma operação, então consolidar lógica reduz o consumo.</p>

<ul>
  <li><strong>Reutilize módulos:</strong> copie conexões já criadas em vez de criar novas.</li>
  <li><strong>Agende execuções:</strong> use “Schedule” apenas nas janelas de 00:00‑06:00 para economizar operações de polling.</li>
  <li><strong>Monitore uso:</strong> abra o painel “Usage” diariamente e ajuste fluxos que ultrapassam 80 % do limite.</li>
  <li><strong>Batch de dados:</strong> agrupe linhas em lotes de 10‑20 antes de chamar APIs externas.</li>
  <li><strong>Desative cenários:</strong> pause fluxos que não são críticos nos fins de semana.</li>
</ul>

<p><strong>Curiosidade:</strong> quem usa o Make costuma criar um “master webhook” que redireciona para diferentes cenários; isso permite dividir a carga sem criar loops.</p>

<h2>Make gratuito vs outras plataformas de automação</h2>
<p>Se o objetivo é maximizar operações grátis, o Make oferece 1.000 execuções mensais, enquanto Zapier, Power Automate e n8n entregam menos ou exigem limites mais rígidos.</p>

<table>
  <tr>
    <th>Plataforma</th>
    <th>Operações grátis/mês</th>
    <th>Módulos/fluxo grátis</th>
    <th>Limite de apps</th>
    <th>Recursos avançados gratuitos</th>
  </tr>
  <tr>
    <td>Make</td>
    <td>1 000</td>
    <td>3</td>
    <td>+1 000</td>
    <td>Webhooks, HTTP request</td>
  </tr>
  <tr>
    <td>Zapier</td>
    <td>100</td>
    <td>5</td>
    <td>≈ 500</td>
    <td>Filtragem básica</td>
  </tr>
  <tr>
    <td>Power Automate</td>
    <td>750</td>
    <td>2</td>
    <td>≈ 300</td>
    <td>Conectores padrão</td>
  </tr>
  <tr>
    <td>n8n</td>
    <td>Sem limite (auto‑hospedado)</td>
    <td>Ilimitado</td>
    <td>Il‑limitado</td>
    <td>Roteamento condicional</td>
  </tr>
</table>

<p>Para entender quando o Power Automate vale a pena, confira <a href="/power-automate-o-que-e-e-quando-usar">Power Automate: o que é e quando usar</a>.</p>

<p><strong>Curiosidade:</strong> usuários avançados do Make costumam usar a API interna para “resetar” contadores de operações ao início do mês, evitando a pausa automática.</p>

<p><a href="https://en.wikipedia.org/wiki/Automation_software" target="_blank" rel="noopener noreferrer">Automação de software</a> descreve as diferenças de modelo de cobrança entre essas ferramentas.</p>

<h2>Migrando de outras ferramentas para o Make gratuito</h2>
<p>Para trocar seu fluxo do Zapier ou n8n por um cenário no Make, basta reproduzir cada passo usando módulos equivalentes e adaptar as limitações de 3 módulos.</p>

<ol>
  <li><strong>Exporte o fluxo original:</strong> no Zapier, acesse “Export” e baixe o JSON; no n8n, use “Download Workflow”.</li>
  <li><strong>Identifique triggers e ações:</strong> anote quais apps são usados e quais campos são mapeados.</li>
  <li><strong>Crie o cenário no Make:</strong> adicione um módulo “Webhooks” para receber o mesmo payload que o Zapier/n8n enviava.</li>
  <li><strong>Mapeie variáveis:</strong> substitua as variáveis do JSON pelos campos {{1.field}} nos módulos do Make.</li>
  <li><strong>Ajuste limites:</strong> se o fluxo original tinha mais de 3 módulos, divida em dois cenários e conecte-os via webhook.</li>
  <li><strong>Teste e ative:</strong> execute “Run once” com dados reais; corrija erros e habilite o agendamento.</li>
</ol>

<p>Para um passo a passo detalhado de migração de Zapier para n8n, veja <a href="/migrar-do-zapier-para-o-n8n-passo-a-passo">Migrar do Zapier para o n8n passo a passo</a>.</p>

<p><strong>Curiosidade:</strong> quem migra de n8n costuma usar o recurso “Execute Workflow” do Make para chamar sub‑cenários, mantendo a estrutura modular.</p>



<h2>Perguntas frequentes sobre como automatizar com make de graça</h2><h3>O que é o plano gratuito do Make?</h3><p>O plano gratuito do Make oferece 1.000 operações mensais, 100 MB de transferência de dados e até dois cenários ativos, permitindo integração com mais de 1.000 apps.</p><h3>Quais limitações tem a versão grátis do Make?</h3><p>A versão grátis permite apenas 3 módulos por cenário, não suporta roteamento condicional nem loops, e pausa as execuções ao ultrapassar 1.000 operações.</p><h3>Como criar um cenário no Make sem pagar?</h3><p>Cadastre‑se, escolha um template ou adicione manualmente módulos de trigger e ação, autorize as contas necessárias e teste o cenário com “Run once”. Tudo isso pode ser feito no plano gratuito.</p><h3>É possível integrar o Make com o ChatGPT gratuitamente?</h3><p>Sim, usando sua própria chave da API OpenAI. O plano gratuito do Make permite chamadas HTTP, então você pode enviar prompts ao ChatGPT dentro dos limites de crédito da sua conta OpenAI.</p><h3>Qual a diferença entre Make gratuito e Zapier gratuito?</h3><p>Make oferece 1.000 operações mensais e suporte a webhooks e requisições HTTP, enquanto o Zapier gratuito limita a 100 tarefas e tem menos opções de integração avançada.</p><h3>Posso usar webhooks no plano gratuito do Make?</h3><p>Sim, o módulo Webhooks está disponível no plano gratuito e pode ser usado para receber ou disparar dados entre cenários, contornando a limitação de módulos.</p><h3>Como migrar de outra ferramenta para o Make gratuito?</h3><p>Exporte seu fluxo da ferramenta original, recrie os triggers e ações com módulos equivalentes no Make e, se necessário, divida o fluxo em dois cenários conectados por webhook.</p><h3>Existe limite de execuções mensais no plano gratuito do Make?</h3><p>Sim, o limite é de 1.000 operações por mês. Quando o limite é atingido, o Make pausa as execuções até o próximo ciclo de faturamento.</p>

<h2>Desperte o poder da automação sem gastar nada</h2><p>Com o plano gratuito do Make você consegue criar fluxos úteis, integrar APIs e até conversar com o ChatGPT, tudo dentro de limites que cabem na maioria das pequenas empresas. Basta seguir as boas práticas e otimizar cada operação.</p><ul><li>Entenda os limites do plano gratuito.</li><li>Crie cenários simples usando triggers e ações.</li><li>Use webhooks e requisições HTTP para expandir funcionalidades.</li><li>Monitore o consumo e ajuste horários de execução.</li></ul><p>Pronto para colocar a mão na massa? Explore mais artigos da categoria <a href="/automacao">Automação</a> e descubra outras ferramentas e estratégias para impulsionar seu negócio.</p>

<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"O que é o plano gratuito do Make?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"O plano gratuito do Make oferece 1.000 operações mensais, 100 MB de transferência de dados e até dois cenários ativos, permitindo integração com mais de 1.000 apps.\"}},{\"@type\":\"Question\",\"name\":\"Quais limitações tem a versão grátis do Make?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"A versão grátis permite apenas 3 módulos por cenário, não suporta roteamento condicional nem loops, e pausa as execuções ao ultrapassar 1.000 operações.\"}},{\"@type\":\"Question\",\"name\":\"Como criar um cenário no Make sem pagar?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Cadastre‑se, escolha um template ou adicione manualmente módulos de trigger e ação, autorize as contas necessárias e teste o cenário com “Run once”. Tudo isso pode ser feito no plano gratuito.\"}},{\"@type\":\"Question\",\"name\":\"É possível integrar o Make com o ChatGPT gratuitamente?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, usando sua própria chave da API OpenAI. O plano gratuito do Make permite chamadas HTTP, então você pode enviar prompts ao ChatGPT dentro dos limites de crédito da sua conta OpenAI.\"}},{\"@type\":\"Question\",\"name\":\"Qual a diferença entre Make gratuito e Zapier gratuito?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Make oferece 1.000 operações mensais e suporte a webhooks e requisições HTTP, enquanto o Zapier gratuito limita a 100 tarefas e tem menos opções de integração avançada.\"}},{\"@type\":\"Question\",\"name\":\"Posso usar webhooks no plano gratuito do Make?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, o módulo Webhooks está disponível no plano gratuito e pode ser usado para receber ou disparar dados entre cenários, contornando a limitação de módulos.\"}},{\"@type\":\"Question\",\"name\":\"Como migrar de outra ferramenta para o Make gratuito?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Exporte seu fluxo da ferramenta original, recrie os triggers e ações com módulos equivalentes no Make e, se necessário, divida o fluxo em dois cenários conectados por webhook.\"}},{\"@type\":\"Question\",\"name\":\"Existe limite de execuções mensais no plano gratuito do Make?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Sim, o limite é de 1.000 operações por mês. Quando o limite é atingido, o Make pausa as execuções até o próximo ciclo de faturamento.\"}}]} ,{\"@type\":\"Article\",\"headline\":\"Como automatizar com Make de graça: Guia completo\",\"description\":\"Aprenda a usar o plano gratuito do Make para criar cenários, integrar APIs e ChatGPT, e otimizar limites sem pagar.\",\"author\":{\"@type\":\"Person\",\"name\":\"Equipe Automação\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"automacao.art.br\"},\"inLanguage\":\"pt-BR\"},{\"@type\":\"HowTo\",\"name\":\"Como criar seu primeiro cenário no Make sem custos\",\"description\":\"Passo a passo para montar um fluxo que envia e‑mail via Gmail quando uma linha é adicionada ao Google Sheets.\",\"step\":[{\"@type\":\"HowToStep\",\"text\":\"Cadastre‑se no Make e confirme o e‑mail.\"},{\"@type\":\"HowToStep\",\"text\":\"Crie um novo cenário e escolha o template “When Google Sheets row added → Send Gmail”.\"},{\"@type\":\"HowToStep\",\"text\":\"Autorize as conexões do Google Sheets e do Gmail.\"},{\"@type\":\"HowToStep\",\"text\":\"Configure o e‑mail usando variáveis da planilha ({{1.subject}}, {{1.text}}).\"},{\"@type\":\"HowToStep\",\"text\":\"Execute o cenário com “Run once” e verifique o e‑mail recebido.\"}] }]} </script>