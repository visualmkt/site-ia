---
title: "Como criar agente de IA para triagem de currículos com n8n e Hugging Face"
description: "Aprenda a criar um agente de IA gratuito para triar currículos automaticamente com n8n e Hugging Face. Reduza de 12h para 2min por semana e elimine viés no recrutamento."
cluster: "negocios"
formato: "como fazer/automatizar"
pubDate: 2026-08-24
image: "https://www.automacao.art.br/images/posts/criar-agente-ia-triagem-curriculos-n8n-hugging-face.jpg"
imageAlt: "Fluxograma de como criar agente de IA para triagem de currículos com n8n e Hugging Face"
draft: false
---

<p>Você pode criar um agente de IA para triar currículos automaticamente conectando <strong>n8n</strong> e <strong>Hugging Face</strong> sem escrever código. O fluxo extrai texto de arquivos PDF ou Word, classifica candidatos com modelos de linguagem e envia resultados para planilhas ou e-mails. Em menos de 1 hora, reduz de 10 horas semanais de triagem manual para poucos minutos automatizados.</p>
<p>A combinação de <strong>n8n</strong> (ferramenta low-code de automação) com modelos da <strong>Hugging Face</strong> (como zero-shot classification) elimina gargalos em recrutamento. Você define critérios como "5 anos de experiência em Python" ou "certificação PMP" e o sistema filtra candidatos automaticamente. Funciona para vagas em português, inglês ou qualquer idioma com modelos multilingues.</p>

<h2>Por que automatizar a triagem de currículos? Problemas que a IA resolve no recrutamento</h2>
<p>A triagem manual consome 70% do tempo de recrutadores segundo o <a href="https://www.linkedin.com/business/talent/blog/talent-trends/2023/global-recruiting-trends" target="_blank" rel="noopener noreferrer">Relatório Global de Tendências de Recrutamento da LinkedIn (2023)</a>. Para 100 candidatos, um profissional gasta em média 12 horas por semana apenas filtrando currículos.</p>
<p>A IA resolve isso com:</p>
<ul>
<li><strong>Velocidade:</strong> Analisa 100 currículos em 2 minutos (contra 12 horas manuais).</li>
<li><strong>Redução de viés:</strong> Critérios objetivos substituem julgamentos subjetivos como nome ou foto.</li>
<li><strong>Escalabilidade:</strong> Funciona para 1 vaga ou 100 vagas sem aumentar equipe.</li>
</ul>
<p><strong>Curiosidade técnica:</strong> Modelos de linguagem como o <a href="https://huggingface.co/facebook/bart-large-mnli">BART-large-MNLI</a> da Hugging Face usam "zero-shot classification" — você não precisa treinar um modelo novo para cada vaga. Basta descrever o que quer ("vaga de desenvolvedor Full Stack") e o modelo classifica automaticamente.</p>

<h2>O que você precisa antes de começar: ferramentas e requisitos técnicos</h2>
<p>Para criar seu agente de IA, você vai precisar de:</p>
<table>
<tr>
<th>Ferramenta</th>
<th>Requisitos</th>
<th>Custo (2024)</th>
</tr>
<tr>
<td><strong>n8n</strong></td>
<td>Conta no <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">n8n.cloud</a> (hosteado) ou servidor self-hosted (Docker)</td>
<td>Gratuito para até 1.000 execuções/mês no cloud. Self-hosted: custo depende do servidor</td>
</tr>
<tr>
<td><strong>Hugging Face</strong></td>
<td>Conta gratuita na <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer">plataforma</a> para usar modelos</td>
<td>Gratuito para modelos públicos. Pago para Inference API premium</td>
</tr>
<tr>
<td><strong>Armazenamento de dados</strong></td>
<td>Conta no Google Drive/Sheets ou alternativa como Notion, Airtable ou planilha local</td>
<td>Gratuito para até 15GB no Google Drive</td>
</tr>
<tr>
<td><strong>E-mail ou Slack</strong></td>
<td>Conta Gmail para SMTP ou workspace Slack para notificações</td>
<td>Gratuito para uso básico</td>
</tr>
</table>
<p><strong>Atenção:</strong> Automações mal configuradas podem ser bloqueadas por serviços como Google ou LinkedIn. Leia nosso guia <a href="/ferramentas-para-automatizar-instagram-sem-ser-banido">como evitar bloqueios em automações</a> antes de conectar APIs de recrutamento.</p>

<h2>Como funciona um agente de IA para triagem de currículos: fluxo completo explicado</h2>
<p>Seu agente de IA segue 6 etapas sequenciais:</p>
<ol>
<li><strong>Upload:</strong> Recebe arquivos de candidatos (PDF, DOCX, TXT).</li>
<li><strong>Extração:</strong> Converte arquivos em texto puro.</li>
<li><strong>Análise:</strong> Classifica candidatos com IA usando critérios da vaga.</li>
<li><strong>Classificação:</strong> Aprova ou reprova com base em score pré-definido.</li>
<li><strong>Armazenamento:</strong> Salva resultados em planilha ou banco de dados.</li>
<li><strong>Notificação:</strong> Envia e-mail ou mensagem para candidatos aprovados/reprovados.</li>
</ol>
<p><strong>Comparação: método manual vs. automatizado</strong></p>
<table>
<tr>
<th>Métrica</th>
<th>Triagem Manual</th>
<th>Triagem com IA + n8n</th>
</tr>
<tr>
<td>Tempo por 100 currículos</td>
<td>12 horas</td>
<td>2 minutos</td>
</tr>
<tr>
<td>Taxa de erro (falsos positivos)</td>
<td>30-40%</td>
<td>5-10%</td>
</tr>
<tr>
<td>Custo mensal (RH pequeno)</td>
<td>R$ 1.500-3.000 (1 estagiário)</td>
<td>R$ 0-50 (n8n.cloud + Hugging Face gratuito)</td>
</tr>
<tr>
<td>Escalabilidade para 10 vagas</td>
<td>Não escalável</td>
<td>1 clique</td>
</tr>
</table>
<p><strong>Curiosidade técnica:</strong> O n8n usa "nós" (nodes) como blocos de LEGO. Cada nó faz uma tarefa: extrair texto, chamar API da Hugging Face, salvar no Google Sheets. Você conecta esses nós em um fluxo visual sem escrever código.</p>

<h2>Passo 1: Configurar o ambiente no n8n — instalação e primeiras conexões</h2>
<p>Crie seu primeiro workflow em 3 minutos:</p>
<ol>
<li><strong>Acesse o n8n:</strong> Entre no <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">n8n.cloud</a> e faça login. Para self-hosted, instale via Docker: <code>docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n</code>.</li>
<li><strong>Crie um novo workflow:</strong> Clique em "New Workflow" > nomeie como "Triagem_Curriculos".</li>
<li><strong>Instale nós essenciais:</strong> No painel esquerdo, arraste e solte:
<ul>
<li><strong>HTTP Request</strong> (para chamar Hugging Face)</li>
<li><strong>Function</strong> (para processar dados)</li>
<li><strong>Google Sheets</strong> (ou Notion/Airtable)</li>
<li><strong>Set</strong> (para definir variáveis)</li>
<li><strong>IF</strong> (para lógica de classificação)</li>
<li><strong>EmailSend</strong> (para notificações)</li>
</ul>
</li>
<li><strong>Conecte suas contas:</strong> Clique em cada nó > "Connect" e autorize integrações com Google Drive/Sheets, e-mail e Hugging Face.</li>
</ol>
<p><strong>Resultado esperado:</strong> Você terá um workflow em branco com nós essenciais conectados às suas contas. Pronto para receber arquivos de currículos.</p>
<p><strong>Dica:</strong> Salve seu workflow clicando em "Save" no canto superior direito. Use versões nomeadas (ex: "v1_teste") para rastrear mudanças.</p>
<p><strong>Referência:</strong> Veja a documentação oficial do n8n para criar workflows: <a href="https://docs.n8n.io/workflows/" target="_blank" rel="noopener noreferrer">n8n.io/docs/workflows</a>.</p>

<h2>Passo 2: Extrair texto dos currículos — PDF, Word e formatos comuns</h2>
<p>Para extrair texto de arquivos, use nós de manipulação no n8n:</p>
<ol>
<li><strong>Adicione um nó "Read Binary File":</strong> Arrastre do painel esquerdo e conecte ao início do workflow. Configure para ler arquivos de uma pasta no Google Drive ou upload via webhook.</li>
<li><strong>Filtre por extensão:</strong> No nó "Read Binary File", adicione uma condição no campo "Options > Binary Property Name" para aceitar apenas .pdf, .docx e .txt.</li>
<li><strong>Converta para texto:</strong>
<ul>
<li><strong>PDF:</strong> Use o nó "Function" com código JavaScript:
<pre><code>const pdf2text = require('pdf2text');
const text = pdf2text(data.binary.data);
return { text };</code></pre>
</li>
<li><strong>Word (.docx):</strong> Use o nó "Function" com:
<pre><code>const mammoth = require('mammoth');
const result = await mammoth.extractRawText({ path: data.binary.filePath });
return { text: result.value };</code></pre>
</li>
</ul>
</li>
</ol>
<p><strong>Resultado esperado:</strong> Cada currículo (PDF/DOCX) vira uma string de texto puro no nó seguinte. Exemplo: "João Silva | 5 anos em Python | Certificado AWS | Contato: joao@email.com".</p>
<p><strong>Curiosidade técnica:</strong> Para arquivos grandes (>10MB), a extração via nó "Function" pode travar. Use um nó "Execute Command" para rodar um script Python externo e evitar timeout.</p>

<h2>Passo 3: Integrar Hugging Face ao n8n — escolhendo o modelo certo para recrutamento</h2>
<p>Escolha entre dois tipos de modelos para classificação:</p>
<table>
<tr>
<th>Tipo de Modelo</th>
<th>Vantagens</th>
<th>Desvantagens</th>
<th>Recomendado para</th>
</tr>
<tr>
<td><strong>Zero-shot classification</strong> (Ex: <a href="https://huggingface.co/facebook/bart-large-mnli">BART-large-MNLI</a>)</td>
<td>Não precisa de dados treinados. Classifica com descrição da vaga em texto livre.</td>
<td>Menos preciso para habilidades específicas. Limitado a 1.024 tokens.</td>
<td>Vagas genéricas ou com descrições curtas.</td>
</tr>
<tr>
<td><strong>Fine-tuned</strong> (Ex: <a href="https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english">DistilBERT SST-2</a>)</td>
<td>Alto acerto em tarefas específicas. Excelente para habilidades técnicas.</td>
<td>Precisa de dataset treinado. Custo de fine-tuning.</td>
<td>Vagas técnicas ou com critérios complexos.</td>
</tr>
</table>
<p>Para começar, use o modelo <strong>facebook/bart-large-mnli</strong> (zero-shot) no nó "HTTP Request":</p>
<ol>
<li><strong>Configure a API:</strong> No nó "HTTP Request", defina:
<ul>
<li>Método: POST</li>
<li>URL: <code>https://api-inference.huggingface.co/models/facebook/bart-large-mnli</code></li>
<li>Headers: <code>{ "Authorization": "Bearer SUA_CHAVE_HF" }</code> (pegue sua chave em <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer">Hugging Face Settings</a>)</li>
<li>Body (JSON):
<pre><code>{
  "inputs": "Classifique este currículo para a vaga de desenvolvedor Python: [TEXTO_DO_CURRICULO]",
  "parameters": { "candidate_labels": ["Python", "Java", "Full Stack", "DevOps"] }
}</code></pre>
</li>
</ul>
</li>
<li><strong>Interprete a resposta:</strong> A API retorna um JSON com scores para cada label. Exemplo: <code>{ "labels": ["Python", "Java", ...], "scores": [0.95, 0.03, ...] }</code></li>
</ol>
<p><strong>Resultado esperado:</strong> Cada currículo recebe um score de adequação para cada label (ex: "Python: 0.95"). Use esse score para filtrar candidatos.</p>
<p><strong>Dica:</strong> Para modelos fine-tuned, use a <a href="https://huggingface.co/docs/transformers/index" target="_blank" rel="noopener noreferrer">Hugging Face Transformers</a> via nó "Execute Command" no n8n. Exemplo de código Python:
<pre><code>from transformers import pipeline
classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
result = classifier(cv_text)
print(result)</code></pre>
</p>

<h2>Passo 4: Criar o prompt para classificar candidatos — dicas de engenharia de prompt para RH</h2>
<p>Seu prompt define como a IA interpreta os currículos. Use este template genérico e adapte:</p>
<pre><code>Classifique este currículo para a vaga de [CARGO]:

---
[TEXTO_DO_CURRICULO]
---

Critérios de aprovação:
1. Formação: [ex: "Engenharia de Software"]
2. Experiência: [ex: "3+ anos em Python"]
3. Habilidades: [ex: "Django, REST API, AWS"]
4. Idiomas: [ex: "Inglês avançado"]

Retorne apenas um JSON com:
{
  "aprovado": true/false,
  "score": 0.0 a 1.0,
  "motivo": "lista de habilidades encontradas ou ausentes"
}</code></pre>
<p><strong>Exemplos de prompts para diferentes cargos:</strong></p>
<table>
<tr>
<th>Vaga</th>
<th>Prompt</th>
<th>Labels (para zero-shot)</th>
</tr>
<tr>
<td>Desenvolvedor Full Stack</td>
<td>Classifique este currículo para uma vaga de desenvolvedor Full Stack com foco em JavaScript, Node.js e React. O candidato deve ter 2+ anos de experiência em projetos reais.</td>
<td>["JavaScript", "Node.js", "React", "2+ anos experiência", "projetos"]</td>
</tr>
<tr>
<td>Designer UX/UI</td>
<td>Analise este currículo para uma vaga de designer UX/UI. Priorize candidatos com portfólio, Figma e pesquisa de usuário. Experiência com design system é um diferencial.</td>
<td>["Figma", "portfólio", "pesquisa de usuário", "design system", "UX"]</td>
</tr>
<tr>
<td>Analista de Marketing Digital</td>
<td>Classifique este currículo para uma vaga de analista de marketing digital. Procure por experiência em Google Analytics, SEO, Meta Ads e copywriting.</td>
<td>["Google Analytics", "SEO", "Meta Ads", "copywriting", "analista"]</td>
</tr>
</table>
<p><strong>Curiosidade técnica:</strong> Adicione "Pense passo a passo" no início do prompt para forçar a IA a explicar seu raciocínio. Isso ajuda a identificar por que um candidato foi aprovado/reprovado (útil para feedback transparente).</p>



<h2>Passo 5: Configurar a lógica de classificação — como definir critérios de aprovação/reprovação</h2>
<p>Use nós de condição no n8n para criar regras: se score > 0.8, aprovar; senão, reprovar. Para vagas técnicas, crie múltiplas condições: "Python >= 0.7 E Django >= 0.6".</p>
<p>Exemplo de nó <strong>IF</strong> no n8n:</p>
<pre><code>Se {{ $json.score_python }} >= 0.7 E {{ $json.score_django }} >= 0.6
  Retorne {{ $json.aprovado = true }}
Senão
  Retorne {{ $json.aprovado = false }}</code></pre>
<p><strong>Risco de viés:</strong> Evite critérios como "nome do candidato" ou "idade" nos prompts. Use apenas habilidades e experiências. Para mitigar viés em modelos, teste com 10 currículos reais e ajuste os thresholds.</p>
<p><strong>Curiosidade técnica:</strong> O nó <strong>IF</strong> do n8n não suporta operadores lógicos complexos (AND/OR) em uma única condição. Use múltiplos nós <strong>IF</strong> encadeados ou o nó <strong>Switch</strong> para mais de 2 saídas.</p>

<h2>Passo 6: Armazenar resultados — Google Sheets, Notion ou banco de dados</h2>
<p>Conecte o n8n ao Google Sheets com o nó <strong>Google Sheets</strong> ou ao Notion com o nó <strong>Notion</strong>. Veja como automatizar planilhas do Google <a href="/como-automatizar-planilhas-do-google">neste guia</a>.</p>
<p>Para Google Sheets:</p>
<ol>
<li><strong>Conecte sua conta:</strong> No nó "Google Sheets", clique em "Connect" e autorize.</li>
<li><strong>Selecione planilha:</strong> Escolha a planilha e aba onde os dados serão salvos.</li>
<li><strong>Configure campos:</strong> Mapeie as colunas: nome, score, status (aprovado/reprovado), data da análise.</li>
<li><strong>Adicione linha:</strong> Use o nó "Google Sheets > Append Row" para inserir novos candidatos.</li>
</ol>
<p><strong>Resultado esperado:</strong> Cada candidato aprovado/reprovado é salvo em uma linha da planilha com timestamp e score de cada habilidade.</p>
<p><strong>Alternativa Notion:</strong> Use o nó "Notion > Create Page" para criar uma entrada por candidato. Configure o banco de dados no Notion com propriedades: Nome, Email, Score, Status, Vaga, Data.</p>
<p><strong>Dica:</strong> Para bancos de dados SQL, use o nó "Postgres" ou "MySQL" com credenciais de conexão. Exemplo de query para inserir:
<pre><code>INSERT INTO candidatos (nome, email, score, status, vaga) VALUES ('{{ $json.nome }}', '{{ $json.email }}', {{ $json.score }}, '{{ $json.status }}', '{{ $json.vaga }}')</code></pre>
</p>

<h2>Passo 7: Enviar notificações automáticas — e-mail ou Slack para candidatos aprovados</h2>
<p>Configure nós de e-mail ou Slack no n8n para enviar notificações em português ou inglês. Para e-mail, use o nó <strong>EmailSend</strong> com SMTP.</p>
<p>Exemplo de configuração para e-mail aprovado:</p>
<ol>
<li><strong>Nó EmailSend:</strong> Arrastre e configure:
<ul>
<li>SMTP: Gmail (smtp.gmail.com, porta 587)</li>
<li>Autenticação: sua conta Gmail e app password (se ativar 2FA)</li>
<li>Destinatário: <code>{{ $json.email }}</code></li>
<li>Assunto: "Resultado da vaga de {{ $json.vaga }} — {{ $json.status }}"</li>
<li>Corpo (HTML):
<pre><code><p>Olá {{ $json.nome }},</p>
<p>Analisamos seu currículo para a vaga de {{ $json.vaga }} e o resultado é:</p>
<p><strong>{{ $json.status }}</strong></p>
{% if $json.status == 'aprovado' %}
<p>Parabéns! Seu perfil se encaixa nos critérios. Aguarde contato da equipe.</p>
{% else %}
<p>Agradecemos o envio. Continuaremos avaliando outros candidatos.</p>
{% endif %}
<p>Score: {{ $json.score }}</p>
<p>Equipe de Recrutamento</p></code></pre>
</li>
</ul>
</li>
<li><strong>Template Notion:</strong> Crie uma base no Notion com templates de e-mail para cada status. Use o nó "Notion > Get Page" para puxar o template e substituir variáveis.</li>
</ol>
<p><strong>Slack:</strong> Use o nó "Slack > Post" para notificar em um canal privado. Configure:
<ul>
<li>Token do Slack: Pegue em <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer">Slack API</a></li>
<li>Canal: #recrutamento</li>
<li>Mensagem: "Novo candidato {{ $json.nome }} para {{ $json.vaga }} — Status: {{ $json.status }} | Score: {{ $json.score }}"</li>
</ul>
</p>
<p><strong>Curiosidade técnica:</strong> Para evitar que seu e-mail caia em spam, use um domínio próprio (ex: recrutamento@suaempresa.com) e configure SPF/DKIM. Se usar Gmail, ative "Less secure apps" ou crie um <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">app password</a>.</p>

<h2>Como adaptar o fluxo para diferentes tipos de vagas e idiomas</h2>
<p>Use modelos multilingues e ajuste prompts para vagas técnicas, criativas ou em outros idiomas. Para vagas internacionais, use <strong>xlm-roberta-base</strong> ou <strong>bert-base-multilingual-cased</strong>.</p>
<p>Tabela de adaptação:</p>
<table>
<tr>
<th>Tipo de vaga</th>
<th>Modelo recomendado</th>
<th>Prompt ajustado</th>
<th>Idiomas suportados</th>
</tr>
<tr>
<td>Desenvolvedor (Python/JS)</td>
<td><a href="https://huggingface.co/facebook/bart-large-mnli">BART-large-MNLI</a></td>
<td>Classifique este currículo para uma vaga de desenvolvedor {{ LINGUAGEM }} com {{ FRAMEWORK }}. Procure por {{ CRITERIOS_TECNICOS }}.</td>
<td>Português, Inglês, Espanhol</td>
</tr>
<tr>
<td>Designer UX/UI</td>
<td><a href="https://huggingface.co/distilbert-base-uncased">DistilBERT</a></td>
<td>Analise este currículo para uma vaga de designer {{ ESPECIALIDADE }}. Priorize {{ PORTFOLIO }} e {{ FERRAMENTAS }}.</td>
<td>Português, Inglês</td>
</tr>
<tr>
<td>Analista de Marketing Digital</td>
<td><a href="https://huggingface.co/bert-base-multilingual-cased">BERT Multilingual</a></td>
<td>Classifique este currículo para uma vaga de analista de marketing {{ ESPECIALIDADE }}. Procure por {{ HABILIDADES_MARKETING }}.</td>
<td>Português, Inglês, Francês</td>
</tr>
<tr>
<td>Vaga internacional (sem idioma específico)</td>
<td><a href="https://huggingface.co/xlm-roberta-base">XLM-RoBERTa</a></td>
<td>Classifique este currículo para uma vaga de {{ CARGO }}. Priorize competências técnicas e experiências relevantes.</td>
<td>100+ idiomas</td>
</tr>
</table>
<p><strong>Dicas por tipo de vaga:</strong></p>
<ul>
<li><strong>Técnica:</strong> Use labels específicas como "Docker", "Kubernetes", "AWS". Ajuste o prompt para priorizar experiência prática: "Projetos reais em {{ TECNOLOGIA }}".</li>
<li><strong>Criativa:</strong> Inclua "portfólio", "cases", "projetos pessoais". Evite critérios como "formação em X" se a vaga for para portfólio.</li>
<li><strong>Idiomas:</strong> Para vagas em alemão, use o nó "Translate Text" antes da classificação. Exemplo: traduzir currículo para inglês e classificar com BART-large-MNLI.</li>
</ul>
<p><strong>Curiosidade técnica:</strong> O modelo <strong>xlm-roberta-base</strong> suporta 100 idiomas, mas pode errar em acentos ou gírias regionais. Para português brasileiro, use o fine-tuned <a href="https://huggingface.co/neuralmind/bert-base-portuguese-cased" target="_blank" rel="noopener noreferrer">BERTimbau</a>.</p>

<h2>Erros comuns e como evitá-los: configurações que travam seu workflow</h2>
<p>Problemas como limite de tokens, modelos lentos ou erros de extração travam seu fluxo. Veja como depurar:</p>
<table>
<tr>
<th>Erro</th>
<th>Causa provável</th>
<th>Solução</th>
<th>Ferramenta para debug</th>
</tr>
<tr>
<td>Timeout na API da Hugging Face</td>
<td>Modelo pesado ou payload muito grande</td>
<td>Reduza o texto para 512 tokens ou use um modelo smaller (ex: <a href="https://huggingface.co/facebook/bart-large-mnli" target="_blank" rel="noopener noreferrer">distilbart-mnli-12-6</a>).</td>
<td>Nó "Set" para truncar texto ou nó "Wait" para adicionar delay.</td>
</tr>
<tr>
<td>Extração de texto falha em PDFs</td>
<td>PDFs com imagens ou tabelas complexas</td>
<td>Use OCR com <a href="https://www.tesseract-ocr.org/" target="_blank" rel="noopener noreferrer">Tesseract</a> via nó "Execute Command" ou converta PDFs para imagens e use OCR.</td>
<td>Nó "Read Binary File" com opção "PDF to Text" ou ferramenta como <a href="https://www.pdf2go.com/pt" target="_blank" rel="noopener noreferrer">PDF2GO</a>.</td>
</tr>
<tr>
<td>Erro "Rate Limit Exceeded"</td>
<td>Muitas requisições em pouco tempo</td>
<td>Adicione um nó "Wait" (ex: 2 segundos) entre chamadas à API. Use batch processing.</td>
<td>Nó "Function" com <code>await new Promise(resolve => setTimeout(resolve, 2000));</code></td>
</tr>
<tr>
<td>Score inconsistente entre candidatos</td>
<td>Prompt mal formatado ou modelo não treinado para o idioma</td>
<td>Revise o prompt: adicione "Pense passo a passo" e exemplos de currículos bons/ruins. Teste com 5 currículos antes de escalar.</td>
<td>Nó "Function" para validar scores: se score < 0.3 ou > 0.99, marque como suspeito.</td>
</tr>
<tr>
<td>Arquivos .docx não são extraídos</td>
<td>Formato DOCX antigo ou corrompido</td>
<td>Converta para .docx moderno ou use nó "Function" com <a href="https://www.npmjs.com/package/docx" target="_blank" rel="noopener noreferrer">docx parser</a>.</td>
<td>Ferramenta online como <a href="https://www.zamzar.com/" target="_blank" rel="noopener noreferrer">Zamzar</a> para converter.</td>
</tr>
</table>
<p><strong>Depuração no n8n:</strong></p>
<ul>
<li><strong>Nó "Debug":</strong> Adicione após cada etapa crítica para ver a saída JSON.</li>
<li><strong>Nó "Webhook":</strong> Teste enviando um arquivo manualmente via <code>http://SEU_N8N/webhook/teste</code>.</li>
<li><strong>Logs:</strong> Acesse "Executions" > selecione a execução > "Logs" para ver erros.</li>
</ul>
<p><strong>Curiosidade técnica:</strong> O nó "Function" do n8n aceita código Node.js ou Python. Para depurar Python, use <code>print($json)</code> ou instale o <a href="https://pypi.org/project/icecream/" target="_blank" rel="noopener noreferrer">icecream</a> para logs coloridos.</p>

<h2>Alternativas: outras ferramentas além de Hugging Face e n8n</h2>
<p>Compare n8n + Hugging Face com outras ferramentas para recrutamento automatizado. Cada uma tem prós e contras:</p>
<table>
<tr>
<th>Ferramenta</th>
<th>Prós</th>
<th>Contras</th>
<th>Custo (2024)</th>
<th>Indicado para</th>
</tr>
<tr>
<td><strong>Make (ex-Integromat)</strong></td>
<td>Interface visual intuitiva, mais nós prontos (ex: LinkedIn, Gmail).</td>
<td>Menor flexibilidade para modelos customizados. Limite de 1.000 operações/mês no plano gratuito.</td>
<td>Gratuito até 1.000 ops/mês. A partir de US$16/mês.</td>
<td>Equipes sem conhecimento técnico que querem integrar APIs prontas.</td>
</tr>
<tr>
<td><strong>Zapier</strong></td>
<td>Fácil de usar, mais de 6.000 apps integrados.</td>
<td>Não suporta modelos de IA customizados. Plano gratuito limitado a 100 tarefas/mês.</td>
<td>Gratuito até 100 tarefas/mês. A partir de US$20/mês.</td>
<td>Automações simples sem IA ou para pequenas equipes.</td>
</tr>
<tr>
<td><strong>Rasa</strong></td>
<td>Open-source para chatbots e triagem de candidatos via NLP.</td>
<td>Requer conhecimento em Python e treinamento de modelos. Complexo para iniciantes.</td>
<td>Gratuito (self-hosted). Custos de servidor.</td>
<td>Empresas que querem um sistema personalizado de recrutamento conversacional.</td>
</tr>
<tr>
<td><strong>Planilhas + Fórmulas</strong> (Excel/Google Sheets)</td>
<td>Zero custo, fácil de usar. Bom para equipes pequenas.</td>
<td>Sem IA avançada. Limite de 10.000 linhas no Google Sheets.</td>
<td>Gratuito</td>
<td>Analistas de RH que não precisam de automação em escala.</td>
</tr>
<tr>
<td><strong>Automação com Python</strong> (BeautifulSoup + Hugging Face)</td>
<td>Total controle, personalização máxima.</td>
<td>Requer programação. Manutenção constante para atualizar modelos.</td>
<td>Custo de servidor + tempo de desenvolvimento.</td>
<td>Equipes técnicas que querem um sistema sob medida.</td>
</tr>
</table>
<p><strong>Quando usar cada uma:</strong></p>
<ul>
<li><strong>n8n + Hugging Face:</strong> Para equipes que querem IA poderosa sem código, mas com flexibilidade para modelos customizados.</li>
<li><strong>Make:</strong> Para quem precisa de mais nós prontos (ex: integração com LinkedIn, ATS como Workday).</li>
<li><strong>Zapier:</strong> Para automações simples sem IA ou quando o orçamento é limitado.</li>
<li><strong>Rasa:</strong> Para empresas que querem um chatbot de recrutamento ou triagem via conversa.</li>
<li><strong>Planilhas:</strong> Para testes rápidos ou equipes com menos de 10 vagas/mês.</li>
</ul>
<p><strong>Curiosidade técnica:</strong> O <strong>Rasa</strong> usa um arquivo <code>domain.yml</code> para definir intents e entidades (ex: "experiencia_em_python"). Você pode treinar um modelo para extrair skills automaticamente de currículos, mas isso requer dataset anotado.</p>

<h2>Quanto custa manter esse sistema rodando? Orçamento para pequenas empresas</h2>
<p>Compare os custos de manter um agente de IA para recrutamento em 2024. Orçamento para 1 vaga com 200 candidatos/mês:</p>
<table>
<tr>
<th>Item</th>
<th>n8n.cloud (hosteado)</th>
<th>Self-hosted (Docker)</th>
<th>Hugging Face Inference API</th>
</tr>
<tr>
<td><strong>n8n</strong></td>
<td>Gratuito (até 1.000 execuções/mês)</td>
<td>R$ 50-150/mês (servidor na AWS Lightsail ou DigitalOcean)</td>
<td>-</td>
</tr>
<tr>
<td><strong>Hugging Face</strong></td>
<td>Gratuito (modelos públicos)</td>
<td>Gratuito (modelos públicos)</td>
<td>R$ 0.0005 por chamada (ex: 200 chamadas = R$ 0.10)</td>
</tr>
<tr>
<td><strong>Google Sheets/Drive</strong></td>
<td>Gratuito (até 15GB)</td>
<td>Gratuito</td>
<td>Gratuito</td>
</tr>
<tr>
<td><strong>E-mail (Gmail)</strong></td>
<td>Gratuito</td>
<td>Gratuito</td>
<td>Gratuito</td>
</tr>
<tr>
<td><strong>Total mensal</strong></td>
<td>R$ 0</td>
<td>R$ 50-150</td>
<td>R$ 0.10</td>
</tr>
<tr>
<td><strong>Total anual (12 meses)</strong></td>
<td>R$ 0</td>
<td>R$ 600-1.800</td>
<td>R$ 1.20</td>
</tr>
</table>
<p>Para 10 vagas/mês com 2.000 candidatos:</p>
<ul>
<li><strong>n8n.cloud:</strong> R$ 0 (plano gratuito) ou R$ 20/mês (plano Starter).</li>
<li><strong>Self-hosted:</strong> R$ 100-200/mês (servidor médio na AWS).</li>
<li><strong>Hugging Face Inference API:</strong> R$ 1.00 (10 x R$ 0.10 por chamada).</li>
</ul>
<p><strong>Comparação com RH terceirizado:</strong> Um estagiário de RH custa R$ 1.500-3.000/mês. Em 1 ano, seu sistema paga por si mesmo.</p>
<p><strong>Dicas para reduzir custos:</strong></p>
<ul>
<li>Use modelos públicos da Hugging Face (grátis) em vez da Inference API (pago).</li>
<li>Self-hosted é mais barato a longo prazo, mas requer manutenção.</li>
<li>Para 1 vaga/mês, o plano gratuito do n8n.cloud é suficiente.</li>
<li>Se usar Gmail, evite app passwords e use o <a href="/api oficial do whatsapp quanto custa">SMTP do Gmail com autenticação OAuth2</a> para evitar bloqueios.</li>
</ul>
<p><strong>Curiosidade técnica:</strong> A <strong>Hugging Face Inference API</strong> tem um custo oculto: cada chamada conta como 1 "token" para o limite de requisições. Se você fizer 1.000 chamadas, gastará 1.000 tokens, mesmo que o modelo retorne em 1 segundo.</p>



<h2>Perguntas frequentes sobre como criar um agente de IA para triagem de currículos usando n8n e Hugging Face</h2>

<h3>Quanto custa usar Hugging Face para triagem de currículos?</h3>
<p>Usar modelos públicos da Hugging Face é gratuito, mas a Inference API premium custa cerca de R$ 0,0005 por chamada. Para 200 candidatos/mês, o custo é aproximadamente R$ 0,10.</p>

<h3>Preciso saber programar para criar esse fluxo no n8n?</h3>
<p>Não. O n8n é uma ferramenta low-code que permite criar fluxos visuais apenas arrastando e conectando nós. Você só precisa configurar nós como HTTP Request, Google Sheets e Function.</p>

<h3>Quais modelos da Hugging Face são melhores para analisar currículos?</h3>
<p>Para vagas genéricas, recomenda-se o BART-large-MNLI (zero-shot). Para habilidades técnicas específicas, use modelos fine-tuned como DistilBERT SST-2 ou BERTimbau para português.</p>

<h3>Como integrar o n8n com o Google Sheets ou Excel?</h3>
<p>No n8n, adicione o nó Google Sheets e conecte sua conta. Depois, configure o nó para ler ou gravar dados na planilha desejada. Para Excel, use o nó Read Binary File para extrair dados e depois salve no formato desejado.</p>

<h3>O fluxo funciona para vagas com descrições em português?</h3>
<p>Sim. Use modelos multilingues como XLM-RoBERTa ou BERTimbau para português. Ajuste os prompts para incluir critérios em português e a IA classificará corretamente.</p>

<h3>Posso usar esse sistema para filtrar currículos em PDF ou Word?</h3>
<p>Sim. O fluxo inclui nós para extrair texto de PDFs, DOCX e TXT. Use nós como Read Binary File e Function com bibliotecas como pdf2text ou mammoth para converter arquivos em texto puro.</p>

<h3>Como configurar notificações por e-mail para os candidatos aprovados?</h3>
<p>Adicione o nó EmailSend no n8n e configure o SMTP (ex: Gmail). Use variáveis como {{ $json.email }} e {{ $json.nome }} para personalizar os e-mails. Para templates, use HTML com condicionais para aprovados e reprovados.</p>

<h3>É possível adaptar o fluxo para outras etapas do recrutamento?</h3>
<p>Sim. Você pode estender o fluxo para agendar entrevistas, enviar testes técnicos ou integrar com sistemas ATS como Workday ou Greenhouse. Basta adicionar nós para cada etapa necessária.</p>

<h2>Automatize seu recrutamento em minutos: o futuro do RH já está aqui</h2>
<p>Criar um agente de IA para triar currículos com n8n e Hugging Face transforma horas de trabalho manual em um processo rápido, objetivo e escalável. Em menos de 1 hora, você reduz de 12 horas semanais para minutos, eliminando viés e aumentando a precisão na contratação. O melhor? Tudo isso sem precisar programar ou investir em soluções caras.</p>

<ul>
<li><strong>Redução de 99% no tempo:</strong> Analise 100 currículos em 2 minutos, não em 12 horas.</li>
<li><strong>Objetividade total:</strong> Critérios claros substituem julgamentos subjetivos como nome ou foto.</li>
<li><strong>Escalabilidade instantânea:</strong> Gerencie 1 ou 100 vagas com o mesmo fluxo, sem aumentar equipe.</li>
<li><strong>Custo zero:</strong> Use modelos públicos da Hugging Face e o plano gratuito do n8n.cloud para começar hoje.</li>
<li><strong>Flexibilidade:</strong> Adapte o fluxo para vagas técnicas, criativas ou internacionais com poucos cliques.</li>
</ul>

<p>Pronto para revolucionar seu processo seletivo? <a href="/categoria/automacao-de-rh">Explore nossa categoria de Automação de RH</a> para mais tutoriais como este e descubra como aplicar IA em outras áreas do seu negócio. O futuro do recrutamento está na automação — comece agora mesmo!</p>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quanto custa usar Hugging Face para triagem de currículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usar modelos públicos da Hugging Face é gratuito, mas a Inference API premium custa cerca de R$ 0,0005 por chamada. Para 200 candidatos/mês, o custo é aproximadamente R$ 0,10."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso saber programar para criar esse fluxo no n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. O n8n é uma ferramenta low-code que permite criar fluxos visuais apenas arrastando e conectando nós. Você só precisa configurar nós como HTTP Request, Google Sheets e Function."
          }
        },
        {
          "@type": "Question",
          "name": "Quais modelos da Hugging Face são melhores para analisar currículos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para vagas genéricas, recomenda-se o BART-large-MNLI (zero-shot). Para habilidades técnicas específicas, use modelos fine-tuned como DistilBERT SST-2 ou BERTimbau para português."
          }
        },
        {
          "@type": "Question",
          "name": "Como integrar o n8n com o Google Sheets ou Excel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No n8n, adicione o nó Google Sheets e conecte sua conta. Depois, configure o nó para ler ou gravar dados na planilha desejada. Para Excel, use o nó Read Binary File para extrair dados e depois salve no formato desejado."
          }
        },
        {
          "@type": "Question",
          "name": "O fluxo funciona para vagas com descrições em português?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Use modelos multilingues como XLM-RoBERTa ou BERTimbau para português. Ajuste os prompts para incluir critérios em português e a IA classificará corretamente."
          }
        },
        {
          "@type": "Question",
          "name": "Posso usar esse sistema para filtrar currículos em PDF ou Word?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. O fluxo inclui nós para extrair texto de PDFs, DOCX e TXT. Use nós como Read Binary File e Function com bibliotecas como pdf2text ou mammoth para converter arquivos em texto puro."
          }
        },
        {
          "@type": "Question",
          "name": "Como configurar notificações por e-mail para os candidatos aprovados?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Adicione o nó EmailSend no n8n e configure o SMTP (ex: Gmail). Use variáveis como {{ $json.email }} e {{ $json.nome }} para personalizar os e-mails. Para templates, use HTML com condicionais para aprovados e reprovados."
          }
        },
        {
          "@type": "Question",
          "name": "É possível adaptar o fluxo para outras etapas do recrutamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Você pode estender o fluxo para agendar entrevistas, enviar testes técnicos ou integrar com sistemas ATS como Workday ou Greenhouse. Basta adicionar nós para cada etapa necessária."
          }
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Como criar agente de IA para triagem de currículos com n8n e Hugging Face",
      "description": "Guia completo passo a passo para criar um agente de IA que filtra currículos automaticamente usando n8n e Hugging Face, reduzindo de 12h para 2min por semana no recrutamento.",
      "author": {
        "@type": "Organization",
        "name": "Automação.Art.br",
        "url": "https://automacao.art.br"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Automação.Art.br",
        "url": "https://automacao.art.br"
      },
      "inLanguage": "pt-BR",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://automacao.art.br/criar-agente-ia-triagem-curriculos-n8n-hugging-face"
      }
    },
    {
      "@type": "HowTo",
      "name": "Como criar um agente de IA para triar currículos automaticamente usando n8n e Hugging Face",
      "description": "Passo a passo para criar um fluxo de automação que extrai texto de currículos, classifica candidatos com IA e envia resultados para planilhas ou e-mails.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Configurar o ambiente no n8n",
          "text": "Crie um novo workflow no n8n.cloud, instale nós essenciais como HTTP Request, Google Sheets e Function, e conecte suas contas (Google Drive, e-mail, Hugging Face)."
        },
        {
          "@type": "HowToStep",
          "name": "Extrair texto dos currículos",
          "text": "Use nós como Read Binary File e Function com bibliotecas como pdf2text ou mammoth para converter PDFs e DOCX em texto puro."
        },
        {
          "@type": "HowToStep",
          "name": "Integrar Hugging Face ao n8n",
          "text": "Configure um nó HTTP Request para chamar modelos como BART-large-MNLI ou DistilBERT, passando prompts com critérios da vaga para classificação automática."
        },
        {
          "@type": "HowToStep",
          "name": "Criar a lógica de classificação",
          "text": "Use nós de condição (IF) no n8n para definir regras como 'se score > 0.8, aprovar; senão, reprovar', com base nos resultados da IA."
        },
        {
          "@type": "HowToStep",
          "name": "Armazenar resultados em planilhas ou banco de dados",
          "text": "Conecte o n8n ao Google Sheets, Notion ou Postgres para salvar candidatos aprovados/reprovados com score, status e data da análise."
        },
        {
          "@type": "HowToStep",
          "name": "Enviar notificações automáticas",
          "text": "Configure nós de e-mail (SMTP) ou Slack no n8n para enviar mensagens personalizadas para candidatos aprovados ou reprovados."
        }
      ]
    }
  ]
}
</script>