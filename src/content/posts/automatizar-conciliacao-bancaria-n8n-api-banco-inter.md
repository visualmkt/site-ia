---
title: "Como automatizar conciliação bancária com n8n usando API do Banco Inter"
description: "Aprenda a criar um fluxo completo de automação para conciliar extratos bancários automaticamente usando n8n e API do Banco Inter, mesmo sem saber programar."
cluster: "dev"
formato: "como fazer/automatizar"
pubDate: 2026-08-27
image: "https://www.automacao.art.br/images/posts/automatizar-conciliacao-bancaria-n8n-api-banco-inter.jpg"
imageAlt: "Como gerar API Key do Banco Inter no painel de desenvolvedores"
draft: false
---

<h2>Introdução</h2>
<p>Você gasta horas conferindo extratos bancários para bater com seus lançamentos contábeis? Com o <strong>n8n</strong> e a <strong>API do Banco Inter</strong>, você cria um fluxo que extrai extratos, compara transações e atualiza planilhas automaticamente — sem saber programar. Basta configurar nós prontos e deixar a máquina trabalhar por você, economizando tempo e eliminando erros manuais.</p>
<p>Este guia mostra como montar uma automação completa: desde a geração da <strong>API Key</strong> no painel do Banco Inter até a integração com o <strong>Google Sheets</strong> ou um arquivo CSV. Você aprenderá a usar nós essenciais como <strong>HTTP Request</strong>, <strong>JSON Parser</strong> e <strong>Spreadsheet File</strong>, além de dicas para agendar a execução diária e resolver problemas comuns. Tudo passo a passo, com prints e exemplos práticos.</p>

---

<h2>Por que automatizar a conciliação bancária é crucial para o seu negócio</h2>
<p>A conciliação bancária manual consome tempo e introduz erros que podem custar caro: <strong>30% das pequenas e médias empresas brasileiras</strong> enfrentam divergências fiscais por falhas nesse processo, segundo o SEBRAE. Cada lançamento não conferido pode gerar multas, juros e retrabalho na contabilidade.</p>
<p>Automatizar essa tarefa elimina inconsistências e libera você para focar no que realmente importa: <strong>crescer o negócio</strong>. Com um fluxo no n8n, você garante que cada transação do extrato do Banco Inter seja comparada automaticamente com seus lançamentos, destacando divergências em segundos. Para entender como a API viabiliza isso, confira nosso guia <a href="/o-que-e-api-explicado-simples">O que é API? Explicado de forma simples</a>.</p>

---

<h2>O que você precisa antes de começar: requisitos técnicos e acesso</h2>
<p>Antes de montar o fluxo, reúna esses itens:</p>
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Detalhes</th>
      <th>Onde obter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Conta no Banco Inter (Pessoa Jurídica)</strong></td>
      <td>Obrigatório para acessar a API de extratos</td>
      <td><a href="https://www.bancointer.com.br/" target="_blank" rel="noopener noreferrer">Site do Banco Inter</a></td>
    </tr>
    <tr>
      <td><strong>API Key do Banco Inter</strong></td>
      <td>Credencial para autenticar chamadas à API</td>
      <td>Painel do Banco Inter > Desenvolvedores > Credenciais</td>
    </tr>
    <tr>
      <td><strong>n8n instalado</strong></td>
      <td>Versão local (Docker), nuvem ou <a href="/docker-o-que-e-explicado-simples">self-hosted</a></td>
      <td><a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">n8n.io</a></td>
    </tr>
    <tr>
      <td><strong>Conta no Google Sheets</strong></td>
      <td>Opcional, mas recomendado para armazenar resultados</td>
      <td><a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer">Google Sheets</a></td>
    </tr>
    <tr>
      <td><strong>Navegador moderno</strong></td>
      <td>Chrome, Firefox ou Edge (para acessar interfaces)</td>
      <td>Qualquer navegador atualizado</td>
    </tr>
  </tbody>
</table>
<p><strong>Aviso:</strong> A API do Banco Inter exige permissões específicas. Nunca compartilhe sua <strong>API Key</strong> ou <strong>Client Secret</strong> publicamente. Use variáveis de ambiente no n8n para armazená-las com segurança.</p>
<p>Para mais detalhes sobre as permissões, consulte a <a href="https://developers.bancointer.com.br/" target="_blank" rel="noopener noreferrer">documentação oficial da API do Banco Inter</a>.</p>

---

<h2>Configurando a API do Banco Inter no n8n: passo a passo detalhado</h2>
<p>Primeiro, gere suas credenciais no Banco Inter para acessar a API de extratos. No painel do banco, vá em <strong>Desenvolvedores > Credenciais</strong> e crie uma nova chave com escopo para <strong>Extrato</strong>.</p>
<ol>
  <li>
    <strong>Gerar API Key e Client Secret</strong>
    <p>No painel do Banco Inter, acesse <strong>Desenvolvedores > Credenciais</strong> e crie uma nova aplicação. Anote a <strong>API Key</strong> e o <strong>Client Secret</strong> gerados — você precisará deles para autenticar no n8n.</p>
  </li>
  <li>
    <strong>Configurar nó HTTP Request no n8n</strong>
    <p>No n8n, adicione um nó <strong>HTTP Request</strong> e preencha os campos:</p>
    <ul>
      <li><strong>URL:</strong> `https://api.bancointer.com.br/openbanking/v1/transactions`</li>
      <li><strong>Method:</strong> `GET`</li>
      <li><strong>Authentication:</strong> `OAuth2`</li>
      <li><strong>Client ID:</strong> Sua API Key do Banco Inter</li>
      <li><strong>Client Secret:</strong> Seu Client Secret</li>
      <li><strong>Query Parameters:</strong> `dataInicial` e `dataFinal` (formato: `YYYY-MM-DD`)</li>
    </ul>
  </li>
  <li>
    <strong>Testar endpoint de extrato</strong>
    <p>Execute o nó e verifique se a resposta retorna um JSON com as transações. Se der erro 401, revise as credenciais. Para autenticação com OAuth2, confira nosso guia <a href="/como-usar-api-chatgpt-para-iniciantes">Como usar a API do ChatGPT para iniciantes</a>.</p>
  </li>
</ol>
<p><strong>Dica:</strong> O Banco Inter atualiza extratos em horários específicos. Teste com uma data recente (ex: ontem) para garantir que os dados retornam corretamente.</p>

---
<h2>Montando o fluxo de automação no n8n: do extrato à planilha</h2>
<p>Com a API configurada, monte o fluxo no n8n para extrair extratos, processá-los e salvar em uma planilha. Este é o fluxo padrão:</p>
<ul>
  <li><strong>HTTP Request</strong>: Busca os extratos da API do Banco Inter</li>
  <li><strong>JSON Parser</strong>: Extrai os dados relevantes (data, descrição, valor, tipo)</li>
  <li><strong>Set</strong>: Adiciona colunas personalizadas (ex: "Status", "Divergência")</li>
  <li><strong>Spreadsheet File</strong>: Gera um arquivo CSV ou Excel</li>
  <li><strong>Google Sheets</strong> (opcional): Envia os dados para uma planilha</li>
</ul>

<table>
  <thead>
    <tr>
      <th>Nó</th>
      <th>Função</th>
      <th>Configuração essencial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>HTTP Request</strong></td>
      <td>Faz a chamada à API do Banco Inter</td>
      <td>Método GET, URL com parâmetros de data, autenticação OAuth2</td>
    </tr>
    <tr>
      <td><strong>JSON Parser</strong></td>
      <td>Transforma o JSON bruto em dados estruturados</td>
      <td>Selecione o campo "transactions" no JSON de resposta</td>
    </tr>
    <tr>
      <td><strong>Set</strong></td>
      <td>Adiciona metadados ou regras de negócio</td>
      <td>Ex: `{{$json.valor > 0 ? "Receita" : "Despesa"}}`</td>
    </tr>
    <tr>
      <td><strong>Spreadsheet File</strong></td>
      <td>Gera um arquivo CSV ou Excel</td>
      <td>Selecione as colunas desejadas para exportar</td>
    </tr>
    <tr>
      <td><strong>Google Sheets</strong></td>
      <td>Envia dados para uma planilha</td>
      <td>Autorize a integração no n8n e selecione a planilha</td>
    </tr>
  </tbody>
</table>

<p><strong>Exemplo de fluxo:</strong> Ao executar o nó <strong>HTTP Request</strong>, o n8n busca os extratos do Banco Inter. O <strong>JSON Parser</strong> filtra apenas as transações, e o <strong>Set</strong> adiciona uma coluna "Status" com valores "OK" ou "Divergente". O <strong>Spreadsheet File</strong> exporta tudo para um CSV, que pode ser salvo em sua máquina ou enviado para o Google Sheets.</p>



<h2>Automatizando a conciliação com regras inteligentes: como evitar divergências</h2>
<p>Comparar extratos bancários com lançamentos contábeis exige regras claras. Use o nó <strong>Function</strong> no n8n para aplicar lógica personalizada, como: se o valor da transação no extrato for igual ao lançamento ± R$5, marque como "OK".</p>
<p>No Google Sheets, crie uma fórmula como `=SE(E(A2=B2; ABS(C2-D2)<5); "OK"; "Divergente")` para comparar data, descrição e valor entre duas colunas.</p>
<p><strong>Exemplo avançado:</strong> Use IA no nó <strong>Function</strong> para classificar transações automaticamente. Com uma lista de palavras-chave ("Salário", "Aluguel", "Internet"), o n8n categoriza cada lançamento sem você precisar revisar manualmente.</p>

<h3>Regras de comparação essenciais</h3>
<ul>
  <li><strong>Tolerância de valor:</strong> Ignore divergências de até R$5 (comum em taxas ou arredondamentos).</li>
  <li><strong>Data aproximada:</strong> Use `DATEDIF` no Google Sheets ou `moment.js` no n8n para aceitar transações até 2 dias de diferença.</li>
  <li><strong>Descrição flexível:</strong> Normalize textos com `LOWER()` e remova caracteres especiais antes de comparar.</li>
</ul>
<p><strong>Curiosidade:</strong> O Banco Inter arredonda valores em centavos nas APIs. Se seu sistema usa mais casas decimais, ajuste a regra de comparação para evitar falsos positivos.</p>

---

<h2>Agendando a automação: como rodar diariamente sem sua intervenção</h2>
<p>Configure um <strong>Cron</strong> no n8n para executar o fluxo automaticamente todos os dias às 08:00 BRT (horário de atualização dos extratos no Banco Inter).</p>
<p>No nó <strong>Cron</strong>, use a sintaxe `0 8 * * *` para rodar diariamente às 8h da manhã, horário de Brasília. Ajuste para `0 7 * * *` se você estiver no Acre (fuso -4).</p>
<p><strong>Dica:</strong> O Banco Inter atualiza extratos entre 06:00 e 07:30 BRT. Agende seu fluxo para executar após esse período, evitando dados incompletos.</p>

<h3>Configuração passo a passo do Cron no n8n</h3>
<ol>
  <li>
    <strong>Adicione o nó Cron</strong>
    <p>No painel do n8n, arraste o nó <strong>Cron</strong> para o fluxo e conecte-o ao início.</p>
  </li>
  <li>
    <strong>Defina a frequência</strong>
    <p>No campo <strong>Trigger Times</strong>, insira `0 8 * * *` (8h BRT todos os dias).</p>
  </li>
  <li>
    <strong>Teste manualmente antes de agendar</strong>
    <p>Execute o fluxo uma vez para garantir que todos os nós funcionam antes de confiar no agendamento.</p>
  </li>
</ol>
<p><strong>Curiosidade:</strong> Se você usa n8n na nuvem, o agendamento fica a cargo dos servidores da plataforma. Em instalações locais, o nó Cron depende da máquina estar ligada no horário agendado.</p>

---

<h2>Erros comuns e como resolvê-los: o guia de troubleshooting do n8n + Banco Inter</h2>
<p>Problemas com APIs bancárias geralmente vêm de autenticação, dados ou timeout. Aqui estão os erros mais frequentes e suas soluções:</p>

<table>
  <thead>
    <tr>
      <th>Erro</th>
      <th>Causa provável</th>
      <th>Solução</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>401 Unauthorized</strong></td>
      <td>API Key ou Client Secret inválidos</td>
      <td>Revise as credenciais no nó HTTP Request. Teste com um novo par de chaves no painel do Banco Inter.</td>
    </tr>
    <tr>
      <td><strong>403 Forbidden</strong></td>
      <td>Escopo da API incorreto (ex: extrato não habilitado)</td>
      <td>Acesse o painel do Banco Inter > Desenvolvedores > Credenciais e adicione o escopo "Extrato" à sua aplicação.</td>
    </tr>
    <tr>
      <td><strong>404 Not Found</strong></td>
      <td>URL errada ou data fora do intervalo disponível</td>
      <td>Verifique a URL (`https://api.bancointer.com.br/openbanking/v1/transactions`) e use datas no formato `YYYY-MM-DD` dentro do período permitido pela API (geralmente últimos 90 dias).</td>
    </tr>
    <tr>
      <td><strong>Timeout (504)</strong></td>
      <td>Servidor do Banco Inter lento ou limite de requisições atingido</td>
      <td>Aguarde 1-2 minutos e tente novamente. A API do Banco Inter tem limite de 100 requisições por minuto.</td>
    </tr>
    <tr>
      <td><strong>JSON Inválido</strong></td>
      <td>Resposta da API não está no formato esperado</td>
      <td>Use o nó <strong>Set</strong> para validar o JSON antes de processá-lo. Adicione um nó <strong>IF</strong> para desviar fluxos com erro.</td>
    </tr>
  </tbody>
</table>
<p><strong>Curiosidade:</strong> O Banco Inter retorna erros 429 quando você excede o limite de requisições. Use o nó <strong>Wait</strong> no n8n para aguardar 60 segundos entre chamadas consecutivas à API.</p>

---

<h2>Alternativas e próximos passos: levando essa automação para outros bancos</h2>
<p>Adapte este fluxo para outros bancos trocando apenas a <strong>URL da API</strong> e o método de autenticação. O Nubank usa OAuth2, enquanto Itaú e Bradesco usam <strong>Basic Auth</strong> ou <strong>Bearer Token</strong>.</p>
<p>Para bancos sem API pública, use o nó <strong>Webhook</strong> do n8n para receber notificações de transações via email ou SMS e processá-las automaticamente.</p>

<h3>Tabela de adaptação para APIs bancárias brasileiras</h3>
<table>
  <thead>
    <tr>
      <th>Banco</th>
      <th>Autenticação</th>
      <th>Endpoint de Extrato</th>
      <th>Documentação Oficial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nubank</td>
      <td>OAuth2</td>
      <td><code>/api/extrato</code> (via <a href="https://nubank.com.br/" target="_blank" rel="noopener noreferrer">Open Banking Nubank</a>)</td>
      <td><a href="https://developers.nubank.com.br/" target="_blank" rel="noopener noreferrer">Nubank Developers</a></td>
    </tr>
    <tr>
      <td>Itaú</td>
      <td>Bearer Token</td>
      <td><code>/api/v1/transactions</code> (via <a href="https://www.itau.com.br/" target="_blank" rel="noopener noreferrer">Open Banking Itaú</a>)</td>
      <td><a href="https://developers.itau.com.br/" target="_blank" rel="noopener noreferrer">Itaú Developers</a></td>
    </tr>
    <tr>
      <td>Bradesco</td>
      <td>Basic Auth</td>
      <td><code>/api/v2/transactions</code> (via <a href="https://banco.bradesco/html/empresas/" target="_blank" rel="noopener noreferrer">Open Banking Bradesco</a>)</td>
      <td><a href="https://developers.bradesco.com.br/" target="_blank" rel="noopener noreferrer">Bradesco Developers</a></td>
    </tr>
  </tbody>
</table>
<p><strong>Exemplo de adaptação:</strong> Para o Nubank, substitua o nó <strong>HTTP Request</strong> pela URL `https://api.nubank.com.br/api/extrato` e use o token de acesso do OAuth2. O resto do fluxo (JSON Parser, Set, Spreadsheet) permanece igual.</p>
<p><strong>Próximo nível:</strong> Se quiser escalar essa automação, confira nosso guia <a href="/como-criar-um-saas-com-ia-sem-saber-programar">Como criar um SaaS com IA sem saber programar</a> para transformar esse fluxo em um produto recorrente.</p>



<h2>Perguntas frequentes sobre Como automatizar a conciliação bancária com n8n usando API do Banco Inter</h2>

<h3>Preciso saber programar para usar a API do Banco Inter no n8n?</h3>
<p>Não! O n8n é uma ferramenta de automação sem código, então você não precisa saber programar para configurar o fluxo. Basta seguir os passos do guia, usar nós prontos como HTTP Request e JSON Parser, e adaptar os exemplos para sua realidade.</p>

<h3>A API do Banco Inter tem custo para usar no n8n?</h3>
<p>A API do Banco Inter é gratuita para uso pessoal ou comercial, mas verifique os limites de requisições na documentação oficial. O n8n também é open-source e gratuito em sua versão básica. Custos podem surgir apenas se você usar serviços de nuvem para hospedar o n8n ou integrar com ferramentas premium.</p>

<h3>Como extrair o extrato do Banco Inter via API?</h3>
<p>Use o nó HTTP Request no n8n para chamar o endpoint `/openbanking/v1/transactions` com os parâmetros `dataInicial` e `dataFinal`. Autentique com OAuth2 usando sua API Key e Client Secret. O retorno será um JSON com todas as transações, que você processará com nós como JSON Parser.</p>

<h3>Posso integrar a automação com o Google Sheets?</h3>
<p>Sim! O nó Spreadsheet File do n8n permite exportar os dados para um arquivo CSV ou diretamente para o Google Sheets. Basta autorizar a integração no n8n e selecionar a planilha de destino. Essa é a forma mais prática de armazenar e analisar os extratos conciliados.</p>

<h3>O que fazer se a API do Banco Inter não retornar dados?</h3>
<p>Primeiro, verifique se as credenciais (API Key e Client Secret) estão corretas e se o escopo 'Extrato' está habilitado no painel do Banco Inter. Teste com uma data recente (ex: ontem) e confira se o endpoint está acessível. Erros 401 ou 403 geralmente indicam problemas de autenticação.</p>

<h3>Como configurar o webhook no n8n para receber dados da API?</h3>
<p>O nó HTTP Request já funciona como um webhook quando usado com o método GET. Para receber dados em tempo real, configure o nó Webhook do n8n para escutar uma URL específica e processe os dados recebidos. No Banco Inter, use o endpoint de extrato com parâmetros de data para buscar informações periódicas.</p>

<h3>É seguro usar a API do Banco Inter em um fluxo de automação?</h3>
<p>Sim, desde que você proteja suas credenciais. Nunca compartilhe sua API Key ou Client Secret publicamente. Use variáveis de ambiente no n8n para armazená-las com segurança e restrinja o escopo da API no painel do Banco Inter. A API do Banco Inter usa OAuth2 e criptografia para proteger os dados.</p>

<h3>Quais nós do n8n são essenciais para essa automação?</h3>
<p>Os nós essenciais são: HTTP Request (para chamar a API), JSON Parser (para extrair dados), Set (para adicionar regras), Spreadsheet File (para exportar) e Google Sheets (opcional). Para automação agendada, adicione o nó Cron. Esses nós formam a base do fluxo de conciliação bancária.</p>

<h2>Automação bancária sem segredos: transforme horas de trabalho em minutos</h2>
<p>Automatizar a conciliação bancária com o n8n e a API do Banco Inter é um divisor de águas para empreendedores e profissionais de finanças. Você elimina erros manuais, economiza tempo valioso e ganha visibilidade em tempo real sobre suas transações, tudo sem precisar saber programar. Ao seguir os passos deste guia, você criou um fluxo robusto que extrai extratos, processa dados e atualiza planilhas automaticamente — e pode ser adaptado para outros bancos com facilidade.</p>

<h3>Resumo rápido do que você conquistou:</h3>
<ul>
  <li><strong>Economizou horas:</strong> A automação substitui o trabalho manual de conferência de extratos.</li>
  <li><strong>Reduziu erros:</strong> Regras inteligentes evitam divergências e multas por lançamentos incorretos.</li>
  <li><strong>Ganhou controle:</strong> Dados atualizados diariamente, prontos para análise ou exportação.</li>
  <li><strong>Escalou sem limites:</strong> O mesmo fluxo funciona para outros bancos com pequenas adaptações.</li>
</ul>

<p>Agora que você dominou a automação de conciliação bancária, que tal explorar outras formas de otimizar seu controle financeiro? Confira nossa categoria <a href="/categoria/automacao-financeira">Automação Financeira</a> para mais tutoriais práticos e dicas para pequenas empresas!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://automacao.art.br/automatizar-conciliacao-bancaria-n8n-api-banco-inter#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Preciso saber programar para usar a API do Banco Inter no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não! O n8n é uma ferramenta de automação sem código, então você não precisa saber programar para configurar o fluxo. Basta seguir os passos do guia, usar nós prontos como HTTP Request e JSON Parser, e adaptar os exemplos para sua realidade."
          }
        },
        {
          "@type": "Question",
          "name": "A API do Banco Inter tem custo para usar no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A API do Banco Inter é gratuita para uso pessoal ou comercial, mas verifique os limites de requisições na documentação oficial. O n8n também é open-source e gratuito em sua versão básica. Custos podem surgir apenas se você usar serviços de nuvem para hospedar o n8n ou integrar com ferramentas premium."
          }
        },
        {
          "@type": "Question",
          "name": "Como extrair o extrato do Banco Inter via API?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use o nó HTTP Request no n8n para chamar o endpoint `/openbanking/v1/transactions` com os parâmetros `dataInicial` e `dataFinal`. Autentique com OAuth2 usando sua API Key e Client Secret. O retorno será um JSON com todas as transações, que você processará com nós como JSON Parser."
          }
        },
        {
          "@type": "Question",
          "name": "Posso integrar a automação com o Google Sheets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! O nó Spreadsheet File do n8n permite exportar os dados para um arquivo CSV ou diretamente para o Google Sheets. Basta autorizar a integração no n8n e selecionar a planilha de destino. Essa é a forma mais prática de armazenar e analisar os extratos conciliados."
          }
        },
        {
          "@type": "Question",
          "name": "O que fazer se a API do Banco Inter não retornar dados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Primeiro, verifique se as credenciais (API Key e Client Secret) estão corretas e se o escopo 'Extrato' está habilitado no painel do Banco Inter. Teste com uma data recente (ex: ontem) e confira se o endpoint está acessível. Erros 401 ou 403 geralmente indicam problemas de autenticação."
          }
        },
        {
          "@type": "Question",
          "name": "Como configurar o webhook no n8n para receber dados da API?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O nó HTTP Request já funciona como um webhook quando usado com o método GET. Para receber dados em tempo real, configure o nó Webhook do n8n para escutar uma URL específica e processe os dados recebidos. No Banco Inter, use o endpoint de extrato com parâmetros de data para buscar informações periódicas."
          }
        },
        {
          "@type": "Question",
          "name": "É seguro usar a API do Banco Inter em um fluxo de automação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, desde que você proteja suas credenciais. Nunca compartilhe sua API Key ou Client Secret publicamente. Use variáveis de ambiente no n8n para armazená-las com segurança e restrinja o escopo da API no painel do Banco Inter. A API do Banco Inter usa OAuth2 e criptografia para proteger os dados."
          }
        },
        {
          "@type": "Question",
          "name": "Quais nós do n8n são essenciais para essa automação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os nós essenciais são: HTTP Request (para chamar a API), JSON Parser (para extrair dados), Set (para adicionar regras), Spreadsheet File (para exportar) e Google Sheets (opcional). Para automação agendada, adicione o nó Cron. Esses nós formam a base do fluxo de conciliação bancária."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "@id": "https://automacao.art.br/automatizar-conciliacao-bancaria-n8n-api-banco-inter#article",
      "headline": "Como automatizar conciliação bancária com n8n usando API do Banco Inter",
      "description": "Aprenda a criar um fluxo completo de automação para conciliar extratos bancários automaticamente usando n8n e a API do Banco Inter, mesmo sem saber programar. Guia passo a passo com nós essenciais, agendamento e solução de erros.",
      "inLanguage": "pt-BR",
      "author": {
        "@type": "Organization",
        "name": "Automação.Art",
        "url": "https://automacao.art.br"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automação.Art",
        "url": "https://automacao.art.br"
      },
      "headline": "Como automatizar conciliação bancária com n8n usando API do Banco Inter",
      "datePublished": "2024-05-20T00:00:00-03:00",
      "dateModified": "2024-05-20T00:00:00-03:00"
    },
    {
      "@type": "HowTo",
      "@id": "https://automacao.art.br/automatizar-conciliacao-bancaria-n8n-api-banco-inter#howto",
      "name": "Como automatizar conciliação bancária com n8n usando API do Banco Inter",
      "description": "Passo a passo completo para criar um fluxo de automação que extrai extratos do Banco Inter, processa transações e atualiza planilhas automaticamente usando n8n e a API do Banco Inter.",
      "inLanguage": "pt-BR",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Gerar credenciais da API do Banco Inter",
          "text": "Acesse o painel do Banco Inter, vá em Desenvolvedores > Credenciais e crie uma nova aplicação com escopo para Extrato. Anote a API Key e o Client Secret gerados."
        },
        {
          "@type": "HowToStep",
          "name": "Configurar nó HTTP Request no n8n",
          "text": "Adicione um nó HTTP Request no n8n e preencha a URL com o endpoint de extrato do Banco Inter. Configure a autenticação OAuth2 com a API Key e Client Secret."
        },
        {
          "@type": "HowToStep",
          "name": "Processar dados com JSON Parser",
          "text": "Use o nó JSON Parser para extrair os campos relevantes do JSON retornado pela API, como data, descrição e valor das transações."
        },
        {
          "@type": "HowToStep",
          "name": "Adicionar regras com nó Set",
          "text": "Configure o nó Set para adicionar colunas personalizadas, como Status ou Categoria, com base em regras de negócio (ex: marcar transações com valor > 0 como Receita)."
        },
        {
          "@type": "HowToStep",
          "name": "Exportar para planilha ou Google Sheets",
          "text": "Use o nó Spreadsheet File para gerar um arquivo CSV ou conecte ao Google Sheets para armazenar os dados automaticamente."
        },
        {
          "@type": "HowToStep",
          "name": "Agendar execução diária com nó Cron",
          "text": "Adicione um nó Cron ao fluxo e defina a frequência de execução (ex: 0 8 * * * para 8h da manhã todos os dias). Teste manualmente antes de agendar."
        }
      ]
    }
  ]
}
</script>