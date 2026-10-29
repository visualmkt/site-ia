---
palavra: "PROMPT"
title: "8 regras de manual de avião para escrever pedidos à IA"
description: "A técnica de escrita dos manuais de manutenção de avião, aplicada a prompt: 8 regras, um antes e depois e um bloco pronto para colar no seu agente. Grátis, do @andrezao.ia."
lead: "Manual de manutenção de avião não pode ter duas leituras. Por isso existe uma norma de escrita só para ele. As mesmas regras deixam o pedido à IA claro e a resposta mais certeira."
botao: "Quero as 8 regras"
pubDate: 2026-10-29
---

<p>A norma se chama <strong>ASD-STE100 (Simplified Technical English)</strong>. A indústria aeroespacial a usa para escrever manuais de manutenção sem ambiguidade. Eu aplico a mesma ideia nas instruções do meu agente, e o pedido para de ser lido de dois jeitos.</p>

<h2>As 8 regras</h2>
<ol>
  <li><strong>Uma ideia por frase.</strong> Duas instruções na mesma frase viram uma só, e a segunda costuma sumir.</li>
  <li><strong>Frase curta.</strong> Até 20 palavras. Se precisa de vírgula atrás de vírgula, quebre em duas frases.</li>
  <li><strong>Voz ativa: quem faz o quê.</strong> "Liste os erros do arquivo" é melhor que "os erros do arquivo devem ser listados".</li>
  <li><strong>Instrução no imperativo.</strong> Comece pelo verbo: liste, compare, resuma, corrija, explique.</li>
  <li><strong>Uma palavra, um significado.</strong> Se chamou de "cliente", não troque por "usuário" no meio. Para a IA, palavra nova pode ser coisa nova.</li>
  <li><strong>Diga o formato da resposta.</strong> Tabela, 5 itens, no máximo 100 palavras, só o código. Sem formato, a IA escolhe por você.</li>
  <li><strong>Diga o limite.</strong> O que ela não pode fazer: "não invente número", "se não souber, diga que não sabe", "não altere outros arquivos".</li>
  <li><strong>Peça a etiqueta do palpite.</strong> "Marque como estimativa tudo o que não foi medido." Assim você sabe o que é fato e o que é chute.</li>
</ol>

<h2>Antes e depois</h2>
<p><strong>Antes:</strong></p>
<pre><code>Dá uma olhada nesse texto do meu site e vê se dá pra melhorar, deixa mais vendedor mas sem exagerar e se tiver algum erro arruma também, e se possível sugere um título melhor.</code></pre>
<p><strong>Depois:</strong></p>
<pre><code>Revise o texto abaixo.
Corrija erros de português.
Deixe o tom mais direto. Não prometa resultado.
Sugira 3 títulos com até 60 caracteres.
Responda em 2 partes: texto revisado e lista de títulos.
Não invente dado. Se faltar informação, pergunte.</code></pre>

<h2>Bloco para colar no seu agente</h2>
<p>Cole nas instruções fixas (CLAUDE.md, instruções do projeto ou prompt do sistema):</p>
<pre><code>Escreva em frases curtas: uma ideia por frase, até 20 palavras.
Use voz ativa e verbo no imperativo nas instruções.
Use sempre o mesmo termo para a mesma coisa.
Siga o formato de resposta pedido. Sem formato pedido, use lista curta.
Marque como estimativa tudo o que não foi medido.
Se não souber, diga que não sabe. Nunca invente dado.</code></pre>

<p>Mais regras que nasceram de erro real: <strong>@andrezao.ia</strong> no Instagram.</p>
