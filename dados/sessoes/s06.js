SESSOES[6] = {
  objetivos: [
    ['Identificar', 'a classe de um endereço IPv4 pelo primeiro octeto'],
    ['Distinguir', 'endereços públicos, privados e especiais'],
    ['Explicar', 'para que serve a máscara de rede'],
    ['Calcular', 'o endereço de rede com a operação AND']
  ],
  plano: [['20′', 'Classes'], ['15′', 'Privados e especiais'], ['30′', 'Máscara e AND'], ['15′', 'Lab: o teu IP'], ['10′', 'Quiz']],
  blocos: [
    {
      tipo: 'tabela', titulo: 'Classes de endereços IPv4',
      intro: 'No início da Internet os endereços eram divididos em <b>classes</b>. Hoje usa-se CIDR (próxima sessão), mas as classes continuam a aparecer em testes e equipamentos. A classe vê-se pelo <b>primeiro octeto</b>:',
      cab: ['Classe', 'Bits iniciais', '1.º octeto', 'Máscara padrão', 'Hosts por rede', 'Uso'],
      linhas: [
        ['<b>A</b>', '0', '1 – 126', '255.0.0.0 (/8)', '16 777 214', 'Redes enormes'],
        ['<b>B</b>', '10', '128 – 191', '255.255.0.0 (/16)', '65 534', 'Redes médias/grandes'],
        ['<b>C</b>', '110', '192 – 223', '255.255.255.0 (/24)', '254', 'Redes pequenas'],
        ['<b>D</b>', '1110', '224 – 239', '—', '—', 'Multicast (um para vários)'],
        ['<b>E</b>', '1111', '240 – 255', '—', '—', 'Experimental']
      ],
      depois: '<p class="muted">O 127 não aparece na classe A porque está reservado para o <b>loopback</b>.</p>'
    },
    {
      tipo: 'tabela', titulo: 'Endereços privados e especiais',
      intro: 'Os endereços <b>privados</b> (RFC 1918) podem ser usados livremente dentro de qualquer rede local, mas <b>não circulam na Internet</b>. Para sair, o router troca-os pelo IP público (é o <b>NAT</b>). É por isso que milhões de casas podem usar <code>192.168.1.x</code> ao mesmo tempo.',
      cab: ['Endereço / intervalo', 'Tipo', 'Significado'],
      linhas: [
        ['<code>10.0.0.0 – 10.255.255.255</code>', 'Privado (A)', '/8, redes de empresas'],
        ['<code>172.16.0.0 – 172.31.255.255</code>', 'Privado (B)', '/12'],
        ['<code>192.168.0.0 – 192.168.255.255</code>', 'Privado (C)', '/16, redes de casa e escola'],
        ['<code>127.0.0.1</code>', 'Loopback', 'O próprio PC ("localhost"). É o que usas no XAMPP!'],
        ['<code>169.254.x.x</code>', 'APIPA', 'O PC deu IP a si próprio porque o DHCP não respondeu'],
        ['<code>0.0.0.0</code>', 'Especial', '"Este host" / qualquer endereço / rota por omissão'],
        ['<code>255.255.255.255</code>', 'Broadcast', 'Para todos os hosts da rede local']
      ]
    },
    {
      tipo: 'quiz', id: 's06-q1', titulo: 'Classes e tipos',
      perguntas: [
        { t: 'classificar', p: 'De que classe é cada endereço?', categorias: ['A', 'B', 'C'], itens: [{ txt: '10.20.30.40', cat: 'A' }, { txt: '120.1.1.1', cat: 'A' }, { txt: '172.20.5.9', cat: 'B' }, { txt: '150.10.0.1', cat: 'B' }, { txt: '192.168.1.1', cat: 'C' }, { txt: '200.1.2.3', cat: 'C' }], exp: 'A: 1–126 · B: 128–191 · C: 192–223.' },
        { t: 'classificar', p: 'Público ou privado?', categorias: ['Privado', 'Público'], itens: [{ txt: '10.1.1.1', cat: 'Privado' }, { txt: '172.16.0.5', cat: 'Privado' }, { txt: '192.168.50.2', cat: 'Privado' }, { txt: '8.8.8.8', cat: 'Público' }, { txt: '172.32.0.1', cat: 'Público' }, { txt: '193.136.1.1', cat: 'Público' }], exp: 'Atenção ao 172: só de 172.16 a 172.31 é privado. O 172.32.0.1 é público!' },
        { t: 'mc', p: 'Abres <code>http://127.0.0.1</code> no browser com o XAMPP ligado. A que máquina estás a aceder?', op: ['Ao teu próprio PC', 'Ao router da escola', 'Ao servidor do professor', 'A um site na Internet'], c: 0, exp: '127.0.0.1 é o loopback, também chamado localhost.' }
      ]
    },
    {
      tipo: 'secao', titulo: 'A máscara de rede',
      html: `<p>Um endereço IP tem duas partes: a <b>parte de rede</b> (que rede é) e a <b>parte de host</b> (que equipamento é, dentro dessa rede). Quem diz onde acaba uma e começa a outra é a <b>máscara</b>:</p>
      <ul><li>bits a <b>1</b> na máscara → parte de <b>rede</b></li><li>bits a <b>0</b> na máscara → parte de <b>host</b></li></ul>
      <pre><code>IP       192.168.1.10   11000000.10101000.00000001.00001010
Máscara  255.255.255.0  11111111.11111111.11111111.00000000
                        |←────────── rede ─────────→|← host →|</code></pre>
      <p>Para obter o <b>endereço de rede</b> faz-se um <b>AND</b> bit a bit entre o IP e a máscara: o resultado só é 1 se os <b>dois</b> bits forem 1.</p>
      <div class="tabela-wrap"><table style="max-width:300px"><thead><tr><th>A</th><th>B</th><th>A AND B</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td><b>1</b></td></tr></tbody></table></div>
      <p>Em cada rede há dois endereços que <b>não se dão a nenhum equipamento</b>:</p>
      <ul><li><b>Endereço de rede</b>: todos os bits de host a 0, ex.: <code>192.168.1.0</code></li><li><b>Broadcast</b>: todos os bits de host a 1, ex.: <code>192.168.1.255</code></li></ul>`
    },
    {
      tipo: 'widget', titulo: 'Calculadora IP: vê o AND a acontecer', nome: 'calculadoraip', opcoes: { ip: '172.16.45.200', prefixo: 16 },
      intro: 'Muda o IP e o prefixo e vê os bits de rede (ciano) e de host (laranja). Experimenta <code>10.20.30.40</code> com /8 e <code>192.168.5.77</code> com /24.'
    },
    {
      tipo: 'exercicio', titulo: 'Classes, rede e broadcast',
      html: `<p>Para cada endereço, com a máscara padrão da classe, indica: <b>classe</b>, <b>máscara</b>, <b>endereço de rede</b>, <b>broadcast</b> e se é <b>público ou privado</b>.</p>
      <ol type="A"><li><code>10.20.30.40</code></li><li><code>172.20.5.9</code></li><li><code>192.168.100.37</code></li><li><code>200.15.8.1</code></li></ol>`,
      solucao: `<ol type="A">
        <li>A · 255.0.0.0 · rede 10.0.0.0 · broadcast 10.255.255.255 · privado</li>
        <li>B · 255.255.0.0 · rede 172.20.0.0 · broadcast 172.20.255.255 · privado</li>
        <li>C · 255.255.255.0 · rede 192.168.100.0 · broadcast 192.168.100.255 · privado</li>
        <li>C · 255.255.255.0 · rede 200.15.8.0 · broadcast 200.15.8.255 · público</li></ol>`
    },
    {
      tipo: 'lab', id: 's06-lab', titulo: 'Analisa o teu próprio IP', ferramenta: 'Linha de Comandos', modo: 'individual', tempo: '15 min', xp: 30,
      passos: [
        'Corre <code>ipconfig</code> e anota o teu <b>IPv4</b> e a <b>máscara</b>.',
        'À mão, converte o IP e a máscara para binário e faz o AND. Qual é o teu <b>endereço de rede</b>?',
        'Qual é o <b>broadcast</b> da tua rede? Quantos <b>hosts</b> cabem nela?',
        'O teu IP é público ou privado? E qual é o <b>IP público</b> com que sais para a Internet? (Pesquisa "qual é o meu ip" no browser.) Porque são diferentes?',
        'Confirma os resultados na calculadora acima e entrega a resolução em Tarefas do Teams.'
      ]
    },
    {
      tipo: 'quiz', id: 's06-q2', titulo: 'Máscara e AND',
      perguntas: [
        { t: 'mc', p: 'Na máscara, os bits a <b>1</b> indicam…', op: ['A parte de rede', 'A parte de host', 'O broadcast', 'O gateway'], c: 0, exp: '1 = rede, 0 = host.' },
        { t: 'preencher', p: 'Qual é o endereço de rede de <code>192.168.7.130</code> com a máscara <code>255.255.255.0</code>?', c: ['192.168.7.0'], exp: 'Os três primeiros octetos mantêm-se e o último fica a 0.' },
        { t: 'preencher', p: 'Qual é o broadcast da rede <code>172.16.0.0/16</code>?', c: ['172.16.255.255'], exp: 'Os bits de host (os dois últimos octetos) ficam todos a 1.' },
        { t: 'preencher', p: 'Quanto é <code>1 AND 0</code>?', c: ['0'], exp: 'O AND só dá 1 quando os dois bits são 1.' },
        { t: 'vf', p: 'O endereço de broadcast pode ser atribuído a uma impressora.', c: false, exp: 'O endereço de rede e o broadcast nunca se atribuem a equipamentos.' }
      ]
    },
    {
      tipo: 'entrega', titulo: 'Laboratório S06 · o teu IP', criterio: 'Resolução de Problemas', prazo: 'Até à próxima aula', modo: 'individual',
      itens: ['Foto ou digitalização da conta feita à mão (IP e máscara em binário, AND, rede, broadcast e hosts)', 'Resposta: porque é que o IP público é diferente do teu IP?']
    },
    {
      tipo: 'resumo',
      itens: ['Classes: A (1–126), B (128–191), C (192–223); D é multicast e E é experimental.', 'Privados: 10.x, 172.16–31.x, 192.168.x. Não circulam na Internet: o NAT troca-os pelo IP público.', 'Especiais: 127.0.0.1 (loopback), 169.254.x.x (APIPA), 255.255.255.255 (broadcast).', 'Máscara: 1 = rede, 0 = host. IP AND máscara = endereço de rede.', 'O endereço de rede (host a 0) e o broadcast (host a 1) não se dão a equipamentos.']
    }
  ]
};
