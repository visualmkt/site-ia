---
palavra: "IAS"
title: "As IAs grátis que eu uso, e para quê"
description: "A lista das IAs e ferramentas grátis que produzem os meus conteúdos: texto, voz, transcrição, imagem, vídeo e áudio. Com o uso de cada uma e o cuidado que evita dor de cabeça. Grátis, do @andrezao.ia."
lead: "Meus reels, roteiros e legendas saem de uma cadeia de IAs grátis. Esta é a lista, com o que cada uma faz no meu dia a dia. Conferida em outubro de 2026."
botao: "Quero a lista"
pubDate: 2026-10-29
---

<p>Limite de plano grátis muda sem aviso. Por isso a regra número 1 é ter sempre uma reserva para cada tarefa: se uma IA cair, a próxima assume.</p>

<h2>Texto (roteiro, legenda, revisão)</h2>
<ul>
  <li><strong>Cohere</strong>: escreve o primeiro rascunho dos roteiros.</li>
  <li><strong>Groq</strong>: muito rápida; revisa o texto de outra IA e dá nota.</li>
  <li><strong>Cloudflare Workers AI</strong>: reserva quando as duas primeiras batem no limite do dia.</li>
  <li><strong>OpenRouter</strong> (modelos grátis): última reserva; instável em horário de pico.</li>
</ul>
<p>Dica: uma IA escreve e <strong>outra</strong> corrige. A mesma IA revisando o próprio texto deixa passar os mesmos erros.</p>

<h2>Voz e transcrição</h2>
<ul>
  <li><strong>Azure Speech</strong> (camada grátis): vozes neurais em português, com o tempo de cada palavra para a legenda.</li>
  <li><strong>Edge TTS</strong>: as mesmas vozes, sem chave; ferramenta não oficial, então uso como reserva.</li>
  <li><strong>Whisper</strong> (whisper.cpp, no seu computador): transcreve áudio e vídeo com o tempo de cada palavra.</li>
</ul>

<h2>Imagem</h2>
<ul>
  <li><strong>Cloudflare Workers AI</strong> (modelo FLUX): imagem por API, com cota diária grátis.</li>
  <li><strong>Hugging Face Spaces</strong> (FLUX.1 schnell): reserva; comece o pedido com "sem texto, sem letras", senão ela escreve na imagem.</li>
</ul>

<h2>Vídeo e áudio</h2>
<ul>
  <li><strong>HyperFrames</strong>: transforma uma página HTML em vídeo. Texto, número e gráfico animados, no seu computador.</li>
  <li><strong>ffmpeg</strong>: corta, junta, comprime e coloca legenda. Faz quase tudo, de graça.</li>
  <li><strong>YouTube Audio Library</strong>: música de fundo sem problema de direito autoral.</li>
</ul>

<h2>3 cuidados</h2>
<ol>
  <li>Chave de API mora só no arquivo <code>.env</code>. Nunca no código nem no chat.</li>
  <li>Teste com 1 item antes de rodar o lote.</li>
  <li>Grátis tem limite: anote o limite de cada uma e tenha a reserva pronta.</li>
</ol>

<p>Mais bastidores da produção automática: <strong>@andrezao.ia</strong> no Instagram.</p>
