---
palavra: "LEGENDA"
title: "Legenda palavra por palavra de graça: o passo a passo"
description: "Como fazer aquela legenda que acende palavra por palavra, sem pagar editor nem aplicativo: tempo de cada palavra, blocos curtos, destaque e render. Grátis, do @andrezao.ia."
lead: "A legenda que acende palavra por palavra prende a atenção. Dá para fazer de graça, no seu computador, em 5 passos. É assim que os meus reels são feitos."
botao: "Quero o passo a passo"
pubDate: 2026-10-29
---

<p>O segredo é um só: saber em que momento cada palavra é falada. Com esse tempo, o resto é desenhar o texto na hora certa.</p>

<h2>Os 5 passos</h2>
<ol>
  <li><strong>Pegue o tempo de cada palavra.</strong>
    <ul>
      <li>Voz gerada por IA: a voz neural da Microsoft (Azure Speech, que tem camada grátis) devolve o início de cada palavra junto com o áudio.</li>
      <li>Vídeo gravado: use o Whisper no seu computador (whisper.cpp, grátis). Com <code>--max-len 1 --split-on-word</code>, ele devolve uma palavra por linha, com início e fim.</li>
    </ul>
  </li>
  <li><strong>Junte em blocos de 2 a 4 palavras.</strong> Uma palavra por vez cansa; uma frase inteira não dá tempo de ler. Quebre o bloco na pausa natural da fala.</li>
  <li><strong>Destaque a palavra falada.</strong> O bloco fica na tela, e a palavra do momento muda de cor ou cresce um pouco.</li>
  <li><strong>Posicione fora da interface.</strong> No Instagram, a parte de baixo da tela fica coberta pela legenda do post e pelos botões. Use o meio da tela, com letra grossa e contorno escuro.</li>
  <li><strong>Renderize.</strong> Dois caminhos grátis:
    <ul>
      <li><strong>ffmpeg + legenda ASS</strong> (efeito karaokê, abaixo).</li>
      <li><strong>Página HTML virando vídeo</strong> (HyperFrames): mais liberdade de animação. É o que eu uso.</li>
    </ul>
  </li>
</ol>

<h2>Exemplo com ffmpeg (karaokê)</h2>
<p>No arquivo <code>legenda.ass</code>, cada <code>{\k}</code> diz quanto tempo (em centésimos de segundo) a palavra fica destacada:</p>
<pre><code>Dialogue: 0,0:00:01.00,0:00:02.20,Padrao,,0,0,0,,{\k40}Meu {\k35}agente {\k45}errou</code></pre>
<p>Depois, um comando junta a legenda no vídeo:</p>
<pre><code>ffmpeg -i video.mp4 -vf "ass=legenda.ass" -c:a copy saida.mp4</code></pre>

<h2>Dica que evita retrabalho</h2>
<p>Se o texto for narrado por IA, escreva em português comum. Termo em inglês faz a voz errar a pronúncia, e aí a legenda mostra uma palavra e o áudio fala outra.</p>

<p>Mais bastidores de como os vídeos se fazem sozinhos: <strong>@andrezao.ia</strong> no Instagram.</p>
