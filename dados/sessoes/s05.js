SESSOES[5] = {
  objetivos: [
    ['Descrever', 'a estrutura de um endereço IPv4: 32 bits e 4 octetos'],
    ['Converter', 'números de binário para decimal'],
    ['Converter', 'números de decimal para binário'],
    ['Reconhecer', 'as diferenças principais entre IPv4 e IPv6']
  ],
  plano: [['15′', 'Estrutura do IPv4'], ['25′', 'Binário ↔ decimal'], ['20′', 'Jogo do binário'], ['20′', 'Exercícios + quiz'], ['10′', 'IPv6']],
  blocos: [
    {
      tipo: 'secao', titulo: 'O que é um endereço IPv4?',
      html: `<p>Cada equipamento numa rede IP tem um <b>endereço IP</b>, como uma morada. Um endereço IPv4 tem <b>32 bits</b>, divididos em <b>4 octetos</b> de 8 bits. Para os humanos lerem, escreve-se cada octeto em decimal, separado por pontos (<b>notação decimal pontuada</b>):</p>
      <pre><code>  192    .   168    .    1     .   10
11000000 . 10101000 . 00000001 . 00001010</code></pre>
      <p>Cada octeto vai de <b>0</b> (<code>00000000</code>) a <b>255</b> (<code>11111111</code>). Por isso <code>192.168.1.300</code> <b>não é</b> um IP válido!</p>
      <p>Com 32 bits há 2<sup>32</sup> ≈ <b>4,3 mil milhões</b> de endereços. Parece muito, mas já se esgotaram. Foi por isso que nasceram o IPv6 e os endereços privados.</p>`
    },
    {
      tipo: 'secao', titulo: 'Binário → decimal',
      html: `<p>Cada posição de um octeto tem um <b>peso</b>, que é uma potência de 2. Soma os pesos onde há <b>1</b>:</p>
      <div class="tabela-wrap"><table><thead><tr><th>Peso</th><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
      <tbody><tr><td>Bits</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr></tbody></table></div>
      <p><code>10101000</code> = 128 + 32 + 8 = <b>168</b></p>
      <div class="nota dica"><span class="ic">💡</span><div>Decora os pesos: <b>128 · 64 · 32 · 16 · 8 · 4 · 2 · 1</b>. Cada um é o dobro do da direita.</div></div>`
    },
    {
      tipo: 'secao', titulo: 'Decimal → binário (método das subtrações)',
      html: `<p>Percorre os pesos da esquerda para a direita. Se o peso <b>cabe</b> no que resta, escreve <b>1</b> e subtrai. Se não cabe, escreve <b>0</b>.</p>
      <p>Exemplo: <b>200</b></p>
      <pre><code>200 ≥ 128 → 1   resta 72
 72 ≥ 64  → 1   resta 8
  8 ≥ 32? → 0
  8 ≥ 16? → 0
  8 ≥ 8   → 1   resta 0
  0 → 0, 0, 0
200 = 11001000</code></pre>`
    },
    {
      tipo: 'widget', titulo: 'Jogo do binário', nome: 'binario',
      intro: 'Primeiro brinca no modo livre. Depois carrega em <b>🎮 Modo desafio</b>: aparece um número e tens de ligar os bits certos. Faz <b>10 seguidas</b> para ganhar a conquista 🥷 <b>Ninja do binário</b>.'
    },
    {
      tipo: 'exercicio', titulo: 'Converte (no caderno, sem calculadora!)',
      html: `<ol>
        <li>Binário → decimal: <code>11111111</code> · <code>00001111</code> · <code>11000000</code> · <code>10000001</code></li>
        <li>Decimal → binário: <code>10</code> · <code>127</code> · <code>172</code> · <code>254</code></li>
        <li>Converte o IP completo para binário: <code>172.16.254.1</code></li>
      </ol>`,
      solucao: `<ol>
        <li>255 · 15 · 192 · 129</li>
        <li>00001010 · 01111111 · 10101100 · 11111110</li>
        <li>10101100.00010000.11111110.00000001</li>
      </ol>`
    },
    {
      tipo: 'quiz', id: 's05-q1', titulo: 'IPv4 e binário',
      perguntas: [
        { t: 'mc', p: 'Quantos bits tem um endereço IPv4?', op: ['32', '64', '128', '8'], c: 0, exp: '4 octetos × 8 bits = 32 bits.' },
        { t: 'preencher', p: 'Quanto é <code>11000000</code> em decimal?', c: ['192'], exp: '128 + 64 = 192.' },
        { t: 'preencher', p: 'Escreve <b>168</b> em binário (8 bits).', c: ['10101000'], exp: '128 + 32 + 8 = 168 → 10101000.' },
        { t: 'mc', p: 'Qual destes <b>não</b> é um endereço IPv4 válido?', op: ['192.168.1.256', '10.0.0.1', '172.31.255.254', '8.8.4.4'], c: 0, exp: 'Cada octeto vai de 0 a 255. O 256 não cabe em 8 bits.' },
        { t: 'preencher', p: 'Qual é o maior valor que um octeto pode ter?', c: ['255'], exp: '11111111 = 255.' },
        { t: 'vf', p: 'O IPv6 usa endereços de 128 bits escritos em hexadecimal.', c: true, exp: 'Ex.: 2001:0db8:85a3::8a2e:0370:7334.' }
      ]
    },
    {
      tipo: 'tabela', titulo: 'E o IPv6?',
      intro: 'Como os endereços IPv4 se esgotaram, criou-se o <b>IPv6</b>. Os dois convivem hoje na Internet (<i>dual stack</i>). Corre <code>ipconfig</code> e vê se tens um endereço IPv6!',
      cab: ['', 'IPv4', 'IPv6'],
      linhas: [
        ['Tamanho', '32 bits', '128 bits'],
        ['Escrita', 'Decimal com pontos: <code>192.168.1.10</code>', 'Hexadecimal com dois pontos: <code>2001:db8::1</code>'],
        ['Quantidade', '≈ 4,3 mil milhões', '≈ 3,4 × 10<sup>38</sup> (dá para cada grão de areia da Terra ter milhões!)'],
        ['Configuração automática', 'DHCP', 'SLAAC (autoconfiguração) ou DHCPv6'],
        ['Loopback', '<code>127.0.0.1</code>', '<code>::1</code>']
      ]
    },
    {
      tipo: 'desafio', id: 's05-d1', titulo: 'Ninja do binário', xp: 25,
      html: '<p>Consegue a conquista 🥷 (10 seguidas no jogo) e depois converte <b>de cabeça</b> o teu IP (vê-o com <code>ipconfig</code>) para binário. Mostra ao professor.</p>'
    },
    {
      tipo: 'resumo',
      itens: ['IPv4 = 32 bits = 4 octetos, cada um de 0 a 255.', 'Pesos de um octeto: 128, 64, 32, 16, 8, 4, 2, 1.', 'Binário → decimal: somar os pesos onde há 1.', 'Decimal → binário: subtrair os pesos que cabem, da esquerda para a direita.', 'IPv6 = 128 bits em hexadecimal, criado porque os endereços IPv4 se esgotaram.']
    }
  ]
};
