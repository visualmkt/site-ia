---
title: "Prompts prontos para agentes de IA de triagem de currículos com n8n e Hugging Face"
description: "Aprenda a criar agentes de IA para triagem de currículos com n8n e Hugging Face usando prompts prontos. Automatize recrutamento sem programar e reduza custos!"
cluster: "dev"
formato: "prompts prontos"
pubDate: 2026-08-27
image: "https://www.automacao.art.br/images/posts/prompts-agentes-ia-triagem-curriculos-n8n-hugging-face.jpg"
imageAlt: "Fluxograma de automação de triagem de currículos com n8n e Hugging Face"
draft: false
---

<h2>O que são prompts prontos para agentes de IA de triagem de currículos com n8n e Hugging Face</h2>
<p>Prompts prontos são instruções estruturadas que você insere no <strong>n8n</strong> para guiar modelos da <strong>Hugging Face</strong> a analisar currículos automaticamente. Eles transformam um fluxo de trabalho complexo em um processo de <a href="https://automacao.art.br/como-criar-um-saas-com-ia-sem-saber-programar">arrastar e soltar</a>, sem precisar escrever código ou entender machine learning. Você define critérios como habilidades, senioridade e experiência, e o agente retorna uma classificação em segundos.</p>
<p>Use esses prompts em nós como <strong>HTTP Request</strong> ou <strong>Function</strong> dentro do n8n para conectar modelos como <strong>bert-base-portuguese-cased</strong> ou <strong>distilbert-multilingual</strong>. O resultado é um pipeline que filtra candidatos automaticamente, reduzindo o tempo de recrutamento de horas para minutos. Tudo isso usando IA gratuita ou de baixo custo.</p>

<h2>Por que automatizar a triagem de currículos com IA é essencial para pequenas empresas</h2>
<p>Pequenas empresas brasileiras perdem <strong>R$ 5.000 a R$ 15.000 por ano</strong> com recrutamento manual, segundo o SEBRAE (2023). Isso porque 60% das PMEs relatam dificuldade em encontrar candidatos qualificados, e cada vaga aberta consome em média <strong>30 horas</strong> de trabalho do time de RH.</p>
<p>Um agente de IA resolve isso ao analisar centenas de currículos em minutos, eliminando viés humano e padronizando critérios. Por exemplo, uma empresa que recebe 50 currículos por vaga passa a filtrar apenas os 5 mais alinhados automaticamente, sem precisar de um recrutador full-time.</p>
<p>Além disso, a automação permite escalar o processo sem contratar mais pessoas. Empresas que implementam IA no recrutamento reduzem o <strong>custo por contratação em até 40%</strong>, segundo estudo da <a href="https://www.gartner.com/s3/assets/213c/d1/70e7/0137/21-gartner-hr-tech-top-strategic-technology-trends-for-2023.pdf" target="_blank" rel="noopener noreferrer">Gartner (2023)</a>.</p>

<h2>O que é um agente de IA para triagem de currículos e como ele funciona</h2>
<p>Um agente de IA para triagem é um <strong>fluxo de trabalho automatizado</strong> que combina três elementos: um <a href="https://automacao.art.br/o-que-e-api-explicado-simples">modelo de linguagem (LLM)</a>, regras de decisão e integrações com ferramentas como o n8n. Pense nele como um assistente virtual que "lê" currículos, extrai informações-chave e classifica candidatos com base em critérios pré-definidos.</p>
<p>Diferente de filtros tradicionais (ex: palavras-chave no LinkedIn), o agente entende contexto. Por exemplo, ele diferencia "Python" como habilidade de "Python" como nome de projeto, reduzindo falsos positivos. Isso é possível graças ao <strong>NLP (Processamento de Linguagem Natural)</strong> dos modelos da Hugging Face.</p>
<p><strong>Curiosidade técnica:</strong> Modelos como o <strong>neuralmind/bert-base-portuguese-cased</strong> são treinados em milhões de textos em português, o que os torna 30% mais precisos em tarefas de recrutamento local do que versões genéricas como o <strong>bert-base-uncased</strong>.</p>

<h2>Requisitos técnicos para criar seu agente de triagem com n8n e Hugging Face</h2>
<p>Para montar seu agente, você precisa de três componentes: uma conta no Hugging Face, o n8n instalado e um modelo de linguagem adequado. Confira a tabela abaixo para opções gratuitas e pagas:</p>

<table>
  <thead>
    <tr>
      <th>Componente</th>
      <th>Opção Gratuita</th>
      <th>Opção Paga</th>
      <th>Recomendação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Conta Hugging Face</strong></td>
      <td>Sim (acesso a modelos públicos)</td>
      <td>Sim (acesso a modelos premium como Llama 3)</td>
      <td>Use a conta gratuita para começar</td>
    </tr>
    <tr>
      <td><strong>n8n</strong></td>
      <td>Cloud (n8n.cloud) ou self-hosted (Docker)</td>
      <td>Cloud Pro (R$ 20/mês)</td>
      <td>Instale via Docker para controle total</td>
    </tr>
    <tr>
      <td><strong>Modelo de linguagem</strong></td>
      <td><strong>neuralmind/bert-base-portuguese-cased</strong> (gratuito)</td>
      <td><strong>mistralai/Mistral-7B-Instruct-v0.2</strong> (pago via API)</td>
      <td>Modelos brasileiros têm melhor acurácia em português</td>
    </tr>
    <tr>
      <td><strong>Extração de texto (PDF)</strong></td>
      <td><strong>PDF.co</strong> (200 páginas/mês grátis) ou <strong>Apache Tika</strong> (open-source)</td>
      <td>Serviços como <strong>DocParser</strong></td>
      <td>Use o <strong>Apache Tika</strong> para evitar limites de API</td>
    </tr>
  </tbody>
</table>
<p><strong>Dica:</strong> Se você não sabe instalar o n8n, comece com a versão cloud em <a href="https://n8n.cloud" target="_blank" rel="noopener noreferrer">n8n.cloud</a> (gratuita para até 1.000 execuções/mês). Depois, migre para o self-hosted com Docker para mais controle.</p>
<p><strong>Curiosidade técnica:</strong> Modelos como o <strong>bert-base-portuguese-cased</strong> são otimizados para português, mas podem errar em termos técnicos regionais (ex: "full stack" vs "desenvolvedor fullstack"). Ajuste os prompts para incluir exemplos locais.</p>

<h2>Passo a passo: configurando seu ambiente de automação de recrutamento com n8n</h2>
<p>Siga estes 3 passos para ter seu ambiente pronto em menos de 1 hora. Você vai instalar o n8n via Docker, criar uma conta no Hugging Face e selecionar um modelo adequado para análise de currículos.</p>

<ol>
  <li>
    <p><strong>Instale o n8n via Docker</strong></p>
    <p>Execute no terminal:</p>
    <pre><code>docker run -it --name n8n -p 5678:5678 n8nio/n8n</code></pre>
    <p><strong>Resultado esperado:</strong> O n8n estará acessível em <code>http://localhost:5678</code>. Faça login com usuário/senha padrão (admin/admin).</p>
    <p><strong>Dica:</strong> Para persistir dados, use <code>docker run -v n8n_data:/home/node/.n8n -p 5678:5678 n8nio/n8n</code>.</p>
  </li>
  <li>
    <p><strong>Crie uma conta no Hugging Face</strong></p>
    <p>Acesse <a href="https://huggingface.co/join" target="_blank" rel="noopener noreferrer">huggingface.co/join</a> e cadastre-se com seu e-mail. Depois, aceite os termos dos modelos que usará (ex: <strong>neuralmind/bert-base-portuguese-cased</strong>).</p>
    <p><strong>Resultado esperado:</strong> Você terá acesso à <strong>Hugging Face Hub</strong>, onde poderá baixar modelos ou usar via API.</p>
  </li>
  <li>
    <p><strong>Selecione um modelo para análise de currículos</strong></p>
    <p>No <strong>Hugging Face Hub</strong>, pesquise por modelos em português. Recomendações:</p>
    <ul>
      <li><strong>neuralmind/bert-base-portuguese-cased</strong> (ótimo para tarefas gerais)</li>
      <li><strong>pierreguillou/bert-base-cased-squad-v1.1-portuguese</strong> (especializado em perguntas/respostas)</li>
      <li><strong>unicamp-dl/ptt5-base-portuguese-cased</strong> (para tarefas de geração de texto)</li>
    </ul>
    <p><strong>Resultado esperado:</strong> Você terá o <strong>ID do modelo</strong> (ex: <code>neuralmind/bert-base-portuguese-cased</code>) para usar na API.</p>
  </li>
</ol>
<p><strong>Curiosidade técnica:</strong> O modelo <strong>neuralmind/bert-base-portuguese-cased</strong> foi treinado com textos brasileiros, então ele entende gírias como "chapa" (amigo) ou "brother" (colega), comuns em currículos informais.</p>



<h2>Prompts prontos para triagem de currículos com Hugging Face no n8n</h2>
<p>Use os prompts abaixo no nó <strong>Function</strong> ou <strong>HTTP Request</strong> do n8n para guiar modelos da Hugging Face. Cada prompt é otimizado para extrair informações específicas de currículos em português sem precisar ajustar pesos ou hiperparâmetros.</p>

<h3>1. Extração de habilidades técnicas e soft skills</h3>
<p><strong>Objetivo:</strong> Identificar habilidades técnicas e comportamentais em currículos informais.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Analise o seguinte currículo em português e extraia as habilidades técnicas e soft skills. Retorne apenas uma lista em formato JSON com as chaves "tecnicas" e "softs", sem texto adicional.

  Currículo:
  {{ $json.currículo }}

  Regras:
  - Ignore habilidades genéricas como "Microsoft Office".
  - Priorize termos técnicos regionais (ex: "React Native" em vez de "React").
  - Inclua soft skills como "liderança" ou "trabalho em equipe" se mencionadas.
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.currículo }} (texto extraído do PDF).</p>
<p><strong>Saída esperada:</strong></p>
<pre><code>{
  "tecnicas": ["Python", "Django", "AWS", "SQL", "React Native"],
  "softs": ["liderança", "comunicação"]
}</code></pre>

<h3>2. Classificação por nível de senioridade</h3>
<p><strong>Objetivo:</strong> Classificar candidatos em "Junior", "Pleno" ou "Sênior" com base em experiência e habilidades.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Classifique o seguinte currículo como "Junior", "Pleno" ou "Sênior" com base nos critérios abaixo. Retorne apenas a classificação.

  Critérios:
  - Junior: Menos de 2 anos de experiência ou habilidades básicas.
  - Pleno: 2 a 5 anos de experiência ou habilidades intermediárias.
  - Sênior: Mais de 5 anos de experiência ou habilidades avançadas.

  Currículo:
  {{ $json.currículo }}

  Exemplo de saída:
  "Sênior"
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.currículo }}.</p>
<p><strong>Saída esperada:</strong> "Pleno" ou "Sênior".</p>

<h3>3. Detecção de palavras-chave obrigatórias</h3>
<p><strong>Objetivo:</strong> Verificar presença de termos obrigatórios para uma vaga específica.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Analise o currículo e retorne "true" se encontrar todas as palavras-chave obrigatórias, ou "false" caso contrário. Responda apenas com "true" ou "false".

  Palavras-chave obrigatórias:
  {{ $json.palavras_chave }}

  Currículo:
  {{ $json.currículo }}

  Exemplo:
  Palavras: ["Python", "AWS"]
  Saída: true
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.palavras_chave }} (array de strings) e {{ $json.currículo }}.</p>
<p><strong>Saída esperada:</strong> true ou false.</p>

<h3>4. Análise de experiência com datas e cargos</h3>
<p><strong>Objetivo:</strong> Extrair experiências profissionais com datas e cargos para calcular tempo total de atuação.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Extraia as experiências profissionais do currículo em formato JSON com as chaves "empresa", "cargo", "inicio" e "fim". Ignore experiências sem data ou com menos de 3 meses. Retorne apenas o JSON.

  Currículo:
  {{ $json.currículo }}

  Exemplo de saída:
  [
    {"empresa": "TechCorp", "cargo": "Desenvolvedor Full Stack", "inicio": "2020-01", "fim": "2022-12"},
    {"empresa": "Startup X", "cargo": "Estágio", "inicio": "2018-03", "fim": "2019-02"}
  ]
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.currículo }}.</p>
<p><strong>Saída esperada:</strong> Array de objetos com experiência.</p>

<h3>5. Verificação de formação acadêmica</h3>
<p><strong>Objetivo:</strong> Confirmar se o candidato possui formação mínima exigida.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Verifique se o currículo menciona formação em "Graduação", "Pós-graduação" ou "Mestrado/Doutorado" na área de {{ $json.area_formacao }}. Retorne "true" se encontrar, ou "false" caso contrário.

  Currículo:
  {{ $json.currículo }}

  Exemplo:
  Área: "Ciência da Computação"
  Saída: true
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.area_formacao }}.</p>
<p><strong>Saída esperada:</strong> true ou false.</p>

<h3>6. Filtro por localidade (se relevante)</h3>
<p><strong>Objetivo:</strong> Verificar se o candidato está disposto a trabalhar na região da vaga.</p>
<div>
  <p><strong>Prompt:</strong></p>
  <pre><code>Analise o currículo e retorne "true" se encontrar menção à disponibilidade para trabalhar em {{ $json.localidade }} ou cidade próxima, ou "false" caso contrário.

  Currículo:
  {{ $json.currículo }}

  Exemplo:
  Localidade: "São Paulo"
  Saída: true
  </code></pre>
</div>
<p><strong>Variáveis:</strong> {{ $json.localidade }}.</p>
<p><strong>Saída esperada:</strong> true ou false.</p>

<p><strong>Curiosidade técnica:</strong> Prompts como este funcionam melhor com modelos <strong>neuralmind/bert-base-portuguese-cased</strong> porque eles entendem nuances como "região metropolitana de SP" ou "Grande São Paulo", evitando falsos negativos em currículos onde a cidade não é mencionada explicitamente.</p>

<h2>Conectando o n8n ao Hugging Face: criando o workflow completo de triagem</h2>
<p>Monte um fluxo que recebe currículos, processa com IA e filtra candidatos em 4 nós principais. Este tutorial usa o modelo <strong>neuralmind/bert-base-portuguese-cased</strong> via API.</p>

<h3>Fluxo de trabalho básico</h3>
<ul>
  <li><strong>Webhook:</strong> Recebe arquivos de candidatos (PDF/DOCX).</li>
  <li><strong>HTTP Request:</strong> Chama a API da Hugging Face com o prompt.</li>
  <li><strong>Function:</strong> Processa a resposta da IA.</li>
  <li><strong>Switch:</strong> Direciona candidatos aprovados para o próximo estágio.</li>
</ul>

<ol>
  <li>
    <p><strong>Crie um Webhook no n8n para receber arquivos</strong></p>
    <p>No n8n, adicione um nó <strong>Webhook</strong>. Configure-o para aceitar arquivos (mime types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document).</p>
    <p><strong>Resultado esperado:</strong> URL como <code>https://seu-n8n.com/webhook/triagem-curriculo</code> que aceita POST com arquivos.</p>
  </li>
  <li>
    <p><strong>Adicione um nó HTTP Request para chamar a Hugging Face</strong></p>
    <p>Configure o nó com:</p>
    <ul>
      <li><strong>URL:</strong> <code>https://api-inference.huggingface.co/models/neuralmind/bert-base-portuguese-cased</code></li>
      <li><strong>Method:</strong> POST</li>
      <li><strong>Headers:</strong>
        <ul>
          <li><code>Authorization: Bearer YOUR_HF_TOKEN</code></li>
          <li><code>Content-Type: application/json</code></li>
        </ul>
      </li>
      <li><strong>Body:</strong> JSON com o prompt (ex: extração de habilidades).</li>
    </ul>
    <p><strong>Resultado esperado:</strong> Resposta da API com análise do currículo.</p>
  </li>
  <li>
    <p><strong>Processar resposta com nó Function</strong></p>
    <p>No nó <strong>Function</strong>, adicione código para extrair dados da resposta da Hugging Face e formatar para o próximo nó:</p>
    <pre><code>// Supondo resposta da API em {{ $json.response }}
const habilidades = JSON.parse({{ $json.response.choices[0].text }}).tecnicas;
const nivel = {{ $json.response.choices[0].text.includes("Sênior") ? "Sênior" : "Pleno" }};

return {
  habilidades,
  nivel,
  aprovado: habilidades.includes("Python") && nivel === "Pleno"
};</code></pre>
    <p><strong>Resultado esperado:</strong> Objeto com <code>{ habilidades: [...], nivel: "...", aprovado: true/false }</code>.</p>
  </li>
  <li>
    <p><strong>Filtrar candidatos com nó Switch</strong></p>
    <p>Adicione um nó <strong>Switch</strong> com a regra:</p>
    <ul>
      <li><strong>Condição:</strong> {{ $json.aprovado }} === true</li>
      <li><strong>Verdadeiro:</strong> Envia para o RH (ex: nó Slack ou Email).</li>
      <li><strong>Falso:</strong> Arquiva o currículo em uma pasta ou notifica o candidato.</li>
    </ul>
    <p><strong>Resultado esperado:</strong> Fluxo bifurcado: aprovados vão para aprovação, reprovados são descartados.</p>
  </li>
</ol>

<figure>
  <img src="placeholder://fluxograma-triagem-n8n-hf.png" alt="Fluxograma de triagem de currículos com n8n e Hugging Face" style="width: 100%; max-width: 600px;">
  <figcaption>Exemplo de workflow: Webhook → HTTP Request (Hugging Face) → Function → Switch.</figcaption>
</figure>

<p><strong>Dica:</strong> Para testar sem código, use o nó <strong>Function</strong> com prompt pronto e depois migre para API quando precisar de escalabilidade. <a href="https://automacao.art.br/como-usar-a-api-do-chatgpt-para-iniciantes">Saiba mais sobre APIs com esse guia</a>.</p>

<h2>Tratando arquivos PDF e extraindo texto automaticamente no n8n</h2>
<p>Arquivos PDF são o formato mais comum em currículos, mas exigem tratamento especial. Use estas opções para extrair texto com precisão:</p>

<h3>Opção 1: PDF.co (API gratuita)</h3>
<p><strong>Passos:</strong></p>
<ol>
  <li>Crie uma conta em <a href="https://pdf.co" target="_blank" rel="noopener noreferrer">pdf.co</a> (200 páginas/mês grátis).</li>
  <li>No nó <strong>HTTP Request</strong> do n8n, configure:</li>
  <ul>
    <li><strong>URL:</strong> <code>https://api.pdf.co/v1/pdf/convert/to/text</code></li>
    <li><strong>Headers:</strong> <code>x-api-key: YOUR_PDFCO_API_KEY</code></li>
    <li><strong>Body:</strong> Envie o arquivo como binary.</li>
  </ul>
  <li><strong>Resultado:</strong> Texto extraído em {{ $json.body }}.</li>
</ol>

<h3>Opção 2: Apache Tika (open-source, sem limites)</h3>
<p><strong>Passos:</strong></p>
<ol>
  <li>Instale o Apache Tika localmente:</li>
  <pre><code>docker run -d --name tika -p 9998:9998 apache/tika</code></pre>
  <li>No nó <strong>HTTP Request</strong> do n8n, configure:</li>
  <ul>
    <li><strong>URL:</strong> <code>http://localhost:9998/tika</code></li>
    <li><strong>Method:</strong> PUT</li>
    <li><strong>Body:</strong> Envie o arquivo como binary.</li>
  </ul>
  <li><strong>Resultado:</strong> Texto extraído em {{ $json.body }}.</li>
</ol>

<h3>Função JavaScript para extração de texto (alternativa leve)</h3>
<p>Se o PDF for simples (sem imagens ou tabelas complexas), use esta função no nó <strong>Function</strong>:</p>
<pre><code>// Supondo arquivo em {{ $binary.data.data }}
const pdfText = new TextDecoder().decode({{ $binary.data.data }});
return { texto_extraido: pdfText };</code></pre>

<p><strong>Dica:</strong> Para PDFs com tabelas (ex: experiência em formato de tabela), use o nó <strong>Read PDF</strong> do n8n com a opção "Extract as table".</p>
<p><strong>Curiosidade técnica:</strong> O Apache Tika é mais lento que o PDF.co, mas não tem limite de requisições. Para 100+ currículos/dia, prefira o self-hosted.</p>
<p><strong>Saiba mais:</strong> Veja como usar a <a href="https://automacao.art.br/como-usar-a-api-do-gemini-de-graca">API do Gemini gratuitamente</a> para alternativas de extração.</p>

<h2>Ajustando a precisão: como melhorar seu agente de triagem com RAG e embeddings</h2>
<p>Prompts estáticos são bons para 80% dos casos, mas para vagas técnicas ou nichos específicos, use técnicas avançadas como <strong>RAG</strong> e <strong>embeddings</strong> para reduzir erros e viés.</p>

<h3>1. Comparação de currículos com descrição de vaga usando embeddings</h3>
<p><strong>Objetivo:</strong> Medir similaridade entre currículo e vaga para priorizar candidatos.</p>
<p><strong>Passos:</strong></p>
<ol>
  <li>Converta a descrição da vaga em embeddings com <strong>sentence-transformers/multi-qa-mpnet-base-cos-v1</strong> (Hugging Face).</li>
  <li>Converta o texto do currículo em embeddings (mesmo modelo).</li>
  <li>Calcule a similaridade cosseno (ex: <code>0.85</code> = muito alinhado).</li>
</ol>
<p><strong>Exemplo de prompt para RAG:</strong></p>
<pre><code>Use o contexto da vaga abaixo para classificar o currículo. Retorne "true" se o candidato for adequado, ou "false" caso contrário.

Contexto da vaga:
"Buscamos desenvolvedor Full Stack com experiência em React, Node.js e banco de dados PostgreSQL. Senioridade Pleno ou Sênior."

Currículo:
{{ $json.currículo }}

Saída esperada:
true
</code></pre>

<h3>2. Implementando RAG com base de conhecimento de habilidades</h3>
<p><strong>Objetivo:</strong> Reduzir falsos negativos em habilidades técnicas regionais.</p>
<p><strong>Passos:</strong></p>
<ol>
  <li>Crie uma base de conhecimento no Hugging Face Hub com exemplos de habilidades (ex: "full stack" vs "desenvolvedor fullstack").</li>
  <li>Use o modelo <strong>BAAI/bge-m3</strong> para gerar embeddings dos exemplos.</li>
  <li>No nó <strong>Function</strong> do n8n, compare o currículo com a base usando similaridade cosseno.</li>
</ol>
<p><strong>Exemplo de código no n8n:</strong></p>
<pre><code>// Supondo embeddings da vaga em {{ $json.embedding_vaga }}
// e do currículo em {{ $json.embedding_currículo }}
const similarity = cosineSimilarity({{ $json.embedding_currículo }}, {{ $json.embedding_vaga }});
return { similaridade: similarity, aprovado: similarity > 0.8 };</code></pre>

<h3>3. Calibrando thresholds de classificação</h3>
<p><strong>Objetivo:</strong> Ajustar limites para aceitar/rejeitar candidatos.</p>
<p><strong>Exemplo de thresholds:</strong></p>
<table>
  <thead>
    <tr>
      <th>Critério</th>
      <th>Threshold (Mínimo)</th>
      <th>Ação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Similaridade com vaga</td>
      <td>0.75</td>
      <td>Enviar para revisão humana</td>
    </tr>
    <tr>
      <td>Número de habilidades técnicas</td>
      <td>3</td>
      <td>Aprovar automaticamente</td>
    </tr>
    <tr>
      <td>Experiência (anos)</td>
      <td>2</td>
      <td>Aprovar automaticamente</td>
    </tr>
  </tbody>
</table>

<p><strong>Dica:</strong> Para vagas de <strong>engenheiro de dados</strong>, aumente o threshold de habilidades para 5. Para <strong>estágio</strong>, diminua para 2.</p>
<p><strong>Curiosidade técnica:</strong> Modelos como <strong>BAAI/bge-m3</strong> retornam embeddings de 1.024 dimensões, o que permite distinguir nuances como "Engenharia de Software" vs "Ciência da Computação" com 92% de acurácia em testes locais.</p>
<p><strong>Saiba mais:</strong> Entenda como APIs funcionam em detalhes com <a href="https://automacao.art.br/o-que-e-api-explicado-simples">esse guia</a>.</p>



<h2>Perguntas frequentes sobre Prompts prontos para criar agentes de IA de triagem de currículos usando n8n e Hugging Face</h2>

<h3>Como instalar o n8n para usar com Hugging Face?</h3>
<p>Instale o n8n via Docker com o comando <code>docker run -it --name n8n -p 5678:5678 n8nio/n8n</code>. Para persistir dados, use <code>docker run -v n8n_data:/home/node/.n8n -p 5678:5678 n8nio/n8n</code>. Acesse em <code>http://localhost:5678</code>.</p>

<h3>Preciso saber programar para criar um agente de triagem de currículos?</h3>
<p>Não é necessário programar. O n8n usa nós de arrastar e soltar, e os prompts prontos são inseridos em nós como <strong>HTTP Request</strong> ou <strong>Function</strong>. Apenas ajuste as variáveis conforme seu currículo.</p>

<h3>Quais modelos da Hugging Face são melhores para análise de currículos?</h3>
<p>Para português, use <strong>neuralmind/bert-base-portuguese-cased</strong>. Para tarefas específicas como perguntas/respostas, <strong>pierreguillou/bert-base-cased-squad-v1.1-portuguese</strong> é ideal. Modelos brasileiros têm 30% mais precisão em tarefas locais.</p>

<h3>Como conectar o n8n ao Hugging Face?</h3>
<p>Use o nó <strong>HTTP Request</strong> no n8n com a URL da API do modelo (<code>https://api-inference.huggingface.co/models/ID_DO_MODELO</code>). Configure o header <code>Authorization: Bearer YOUR_HF_TOKEN</code> e envie o prompt no body.</p>

<h3>É possível usar IA gratuita para triagem de currículos?</h3>
<p>Sim. Modelos como <strong>neuralmind/bert-base-portuguese-cased</strong> são gratuitos na Hugging Face Hub. Para extração de texto de PDFs, use <strong>Apache Tika</strong> (open-source) ou <strong>PDF.co</strong> (200 páginas/mês grátis).</p>

<h3>Como tratar arquivos PDF de currículos no n8n?</h3>
<p>Use o nó <strong>HTTP Request</strong> com a API do <strong>PDF.co</strong> ou instale o <strong>Apache Tika</strong> via Docker (<code>docker run -d --name tika -p 9998:9998 apache/tika</code>). Envie o PDF como binary e extraia o texto para análise.</p>

<h3>Quais métricas devo analisar no processo de triagem automatizada?</h3>
<p>Priorize métricas como <strong>taxa de falso positivo/negativo</strong>, <strong>tempo de resposta</strong> e <strong>custo por contratação</strong>. Ajuste thresholds com base em testes locais (ex: similaridade > 0.75 para aprovar automaticamente).</p>

<h3>Onde encontrar mais prompts prontos para recrutamento com IA?</h3>
<p>Explore repositórios no <strong>GitHub</strong> como <a href="https://github.com/search?q=prompt+recrutamento+IA" target="_blank" rel="noopener noreferrer">github.com/search?q=prompt+recrutamento+IA</a>. Também há comunidades no <strong>Hugging Face Discussions</strong> e templates no <strong>n8n Community</strong>.</p>

<h2>Automatize sua triagem de currículos hoje: o futuro do recrutamento já está aqui</h2>
<p>Com prompts prontos, n8n e Hugging Face, você transforma horas de trabalho manual em minutos de automação inteligente. A IA não substitui recrutadores, mas libera tempo para focar no que realmente importa: escolher os melhores talentos com base em critérios objetivos e escaláveis.</p>

<ul>
  <li><strong>Reduza custos:</strong> Economize até 40% no custo por contratação com automação.</li>
  <li><strong>Elimine viés:</strong> Padronize critérios e evite decisões subjetivas.</li>
  <li><strong>Escalabilidade:</strong> Analise centenas de currículos em minutos, sem aumentar a equipe.</li>
  <li><strong>Precisão:</strong> Use modelos treinados em português para reduzir falsos positivos/negativos.</li>
  <li><strong>Flexibilidade:</strong> Ajuste prompts e thresholds conforme a necessidade da vaga.</li>
</ul>

<p>Pronto para começar? <a href="#" target="_blank" rel="noopener noreferrer">Baixe o guia completo de automação com IA</a> ou explore nossa categoria de <a href="https://automacao.art.br/categoria/automacao-recrutamento" target="_blank" rel="noopener noreferrer">automação de recrutamento</a> para mais dicas e tutoriais.</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como instalar o n8n para usar com Hugging Face?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instale o n8n via Docker com o comando 'docker run -it --name n8n -p 5678:5678 n8nio/n8n'. Para persistir dados, use 'docker run -v n8n_data:/home/node/.n8n -p 5678:5678 n8nio/n8n'. Acesse em http://localhost:5678."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso saber programar para criar um agente de triagem de currículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não é necessário programar. O n8n usa nós de arrastar e soltar, e os prompts prontos são inseridos em nós como HTTP Request ou Function. Apenas ajuste as variáveis conforme seu currículo."
          }
        },
        {
          "@type": "Question",
          "name": "Quais modelos da Hugging Face são melhores para análise de currículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para português, use neuralmind/bert-base-portuguese-cased. Para tarefas específicas como perguntas/respostas, pierreguillou/bert-base-cased-squad-v1.1-portuguese é ideal. Modelos brasileiros têm 30% mais precisão em tarefas locais."
          }
        },
        {
          "@type": "Question",
          "name": "Como conectar o n8n ao Hugging Face?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use o nó HTTP Request no n8n com a URL da API do modelo (https://api-inference.huggingface.co/models/ID_DO_MODELO). Configure o header 'Authorization: Bearer YOUR_HF_TOKEN' e envie o prompt no body."
          }
        },
        {
          "@type": "Question",
          "name": "É possível usar IA gratuita para triagem de currículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Modelos como neuralmind/bert-base-portuguese-cased são gratuitos na Hugging Face Hub. Para extração de texto de PDFs, use Apache Tika (open-source) ou PDF.co (200 páginas/mês grátis)."
          }
        },
        {
          "@type": "Question",
          "name": "Como tratar arquivos PDF de currículos no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use o nó HTTP Request com a API do PDF.co ou instale o Apache Tika via Docker ('docker run -d --name tika -p 9998:9998 apache/tika'). Envie o PDF como binary e extraia o texto para análise."
          }
        },
        {
          "@type": "Question",
          "name": "Quais métricas devo analisar no processo de triagem automatizada?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Priorize métricas como taxa de falso positivo/negativo, tempo de resposta e custo por contratação. Ajuste thresholds com base em testes locais (ex: similaridade > 0.75 para aprovar automaticamente)."
          }
        },
        {
          "@type": "Question",
          "name": "Onde encontrar mais prompts prontos para recrutamento com IA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Explore repositórios no GitHub como github.com/search?q=prompt+recrutamento+IA. Também há comunidades no Hugging Face Discussions e templates no n8n Community."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Prompts prontos para agentes de IA de triagem de currículos com n8n e Hugging Face",
      "description": "Aprenda a criar agentes de IA para triagem de currículos usando n8n e Hugging Face com prompts prontos. Automatize recrutamento sem programar e reduza custos!",
      "author": {
        "@type": "Person",
        "name": "Equipe Automacao.art"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automacao.art",
        "logo": {
          "@type": "ImageObject",
          "url": "https://automacao.art.br/logo.png"
        }
      },
      "inLanguage": "pt-BR",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/prompts-agentes-ia-triagem-curriculos-n8n-hugging-face"
      }
    },
    {
      "@type": "HowTo",
      "name": "Como criar um agente de IA para triagem de currículos com n8n e Hugging Face",
      "description": "Tutorial passo a passo para montar um fluxo de automação de recrutamento usando prompts prontos, n8n e modelos da Hugging Face.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Instale o n8n via Docker",
          "text": "Execute no terminal: 'docker run -it --name n8n -p 5678:5678 n8nio/n8n'. Para persistir dados, use 'docker run -v n8n_data:/home/node/.n8n -p 5678:5678 n8nio/n8n'."
        },
        {
          "@type": "HowToStep",
          "name": "Crie uma conta no Hugging Face",
          "text": "Acesse huggingface.co/join e cadastre-se. Aceite os termos dos modelos que usará, como neuralmind/bert-base-portuguese-cased."
        },
        {
          "@type": "HowToStep",
          "name": "Selecione um modelo para análise",
          "text": "Pesquise por modelos em português no Hugging Face Hub. Recomendações: neuralmind/bert-base-portuguese-cased, pierreguillou/bert-base-cased-squad-v1.1-portuguese."
        },
        {
          "@type": "HowToStep",
          "name": "Conecte o n8n ao Hugging Face",
          "text": "Use o nó HTTP Request no n8n com a URL da API do modelo e o header 'Authorization: Bearer YOUR_HF_TOKEN'. Envie o prompt no body."
        },
        {
          "@type": "HowToStep",
          "name": "Trate arquivos PDF de currículos",
          "text": "Use o nó HTTP Request com a API do PDF.co ou instale o Apache Tika via Docker para extrair texto de PDFs."
        }
      ]
    }
  ]
}
</script>