---
palavra: "FALHA"
title: "5 alarmes para sua automação não falhar calada"
description: "Automação que quebra sem avisar é o pior tipo de erro. Os 5 alarmes que eu coloco em toda automação, com exemplo e uma regra para colar no seu agente. Grátis, do @andrezao.ia."
lead: "Erro que aparece na tela é fácil. O problema é a automação que para de funcionar e ninguém percebe por dias. Estes são os 5 alarmes que eu coloco em todas as minhas."
botao: "Quero os 5 alarmes"
pubDate: 2026-10-29
---

<p>Já aconteceu comigo: uma rotina de publicação rodou todos os dias com "sucesso", e só 2 de 20 posts tinham saído de verdade. Nenhum erro na tela. Desde então, toda automação minha tem estes alarmes.</p>

<h2>Os 5 alarmes</h2>
<ol>
  <li><strong>Esperado × realizado.</strong> Ao fim de cada rodada, compare quantos itens deviam sair com quantos saíram de verdade. Diferença = aviso.</li>
  <li><strong>O zero também é alarme.</strong> Conta que parou, relatório sem linhas, campanha com zero clique: zero não é "nada de novo". Muitas vezes é a coleta que quebrou.</li>
  <li><strong>"Sucesso" do passo não é entrega.</strong> O passo pode terminar verde e o resultado não existir. Confira o resultado final: o post existe no perfil, o e-mail saiu, a linha está na planilha.</li>
  <li><strong>Nenhum erro engolido.</strong> Todo erro capturado vai para um log E para um aviso (Telegram, e-mail, WhatsApp). Bloco de erro vazio no código é proibido.</li>
  <li><strong>Alarme do alarme.</strong> Se o relatório diário não chegou no horário, isso já é o aviso. Automação que morre de vez não manda erro nenhum.</li>
</ol>

<h2>Exemplo do alarme 1</h2>
<pre><code>const esperado = 20;
const publicados = await contarPublicadosHoje();
if (publicados &lt; esperado) {
  await avisar(`Publicou ${publicados} de ${esperado}. Conferir.`);
}</code></pre>

<h2>Antes de culpar o resultado</h2>
<p>Número caiu de repente? Antes de mexer na campanha ou no conteúdo, confira se a <strong>coleta</strong> dos dados ainda funciona. Queda brusca costuma ser coleta quebrada, não resultado ruim.</p>

<h2>Regra para colar no seu agente</h2>
<pre><code>Toda automação compara o esperado com o realizado e me avisa quando divergem.
Nunca deixe um bloco de erro vazio: registre e avise.
"Sucesso" de um passo não prova entrega. Confira o resultado final.
Se o aviso diário não chegar, trate como falha.</code></pre>

<p>Mais travas que nasceram de erro real: <strong>@andrezao.ia</strong> no Instagram.</p>
