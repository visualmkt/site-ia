---
palavra: "SENHA"
title: "Onde sua senha vaza quando você usa agente de IA (+ checklist de 10 itens)"
description: "Os 6 lugares onde chave de API e senha escapam no uso de agente de IA, e o checklist de 10 itens que eu sigo para fechar cada um. Grátis, do @andrezao.ia."
lead: "Senha não vaza só por invasão. No dia a dia com agente de IA, ela escapa por lugares que ninguém olha. Estes são os 6 que eu já vi e o checklist que fecha cada um."
botao: "Quero o checklist"
pubDate: 2026-10-29
---

<p>Chave de API é dinheiro. Com ela, outra pessoa usa a sua conta, e a conta chega para você. Abaixo estão os lugares por onde ela escapa sem ninguém perceber.</p>

<h2>Os 6 lugares onde a senha vaza</h2>
<ol>
  <li><strong>No chat com o agente.</strong> Colou a chave na conversa? Ela fica no histórico, no seu computador e às vezes em log. Peça ao agente para ler a chave do arquivo <code>.env</code>, nunca do chat.</li>
  <li><strong>Nas permissões salvas do agente.</strong> Quando você aprova "sempre permitir" um comando que tem a chave escrita nele, a regra salva o comando inteiro, com a chave, num arquivo de configuração.</li>
  <li><strong>No repositório.</strong> Arquivo <code>.env</code> enviado ao git ou chave escrita no código. Em repositório público, robôs procuram chaves o tempo todo. Apagar no commit seguinte não resolve: a chave continua no histórico.</li>
  <li><strong>Na saída de comando e no log.</strong> Script que imprime a variável e ferramentas que mostram a configuração do contêiner exibem o valor inteiro na tela e no log.</li>
  <li><strong>Na URL.</strong> Token na URL (<code>?token=...</code>) fica gravado no log do servidor, no histórico do navegador e em quem recebe o link.</li>
  <li><strong>Em cópia e backup.</strong> Uma cópia do <code>.env</code> dentro de pasta sincronizada, compartilhada ou pública vaza igual ao original.</li>
</ol>

<h2>Checklist de 10 itens</h2>
<ol>
  <li>Toda chave mora só no <code>.env</code>, e o <code>.env</code> está no <code>.gitignore</code> antes do primeiro commit.</li>
  <li>Nunca colo chave no chat. O agente lê do <code>.env</code>.</li>
  <li>Reviso as permissões salvas do agente e apago as que têm chave escrita.</li>
  <li>Nas respostas do agente aparece só o NOME da variável, nunca o valor.</li>
  <li>Antes de publicar repositório, rodo uma varredura de segredos (gitleaks ou a do próprio GitHub).</li>
  <li>Chave vazou? Revogo e gero outra na hora. Apagar o arquivo não basta.</li>
  <li>Uma chave por automação, só com a permissão de que ela precisa.</li>
  <li>Token vai no cabeçalho da requisição, não na URL.</li>
  <li>Log e saída de script mostram a chave mascarada (os 4 primeiros caracteres, no máximo).</li>
  <li>Backup do <code>.env</code> fica fora de pasta sincronizada, compartilhada ou pública.</li>
</ol>

<h2>Regra para colar no seu agente</h2>
<pre><code>Chaves e senhas ficam só no arquivo .env. Leia de lá.
Nunca mostre o valor de uma chave. Mostre só o nome da variável.
Nunca escreva chave em código, URL, log ou commit.
Se encontrar uma chave fora do .env, pare e me avise.</code></pre>

<p>Essas regras saíram de sustos reais. Mais travas assim: <strong>@andrezao.ia</strong> no Instagram.</p>
