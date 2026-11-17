# Site da UC00241 · Configurar protocolos e serviços de rede

Site estático (HTML + CSS + JavaScript, sem servidor nem base de dados) para os alunos do 10.º O.

## Ver localmente

Faz duplo clique em `index.html` ou, para um ambiente igual ao publicado, corre na pasta `site`:

```
python -m http.server 8765
```

Depois abre http://localhost:8765.

## Publicar no GitHub Pages (uma vez)

1. Cria uma conta gratuita em https://github.com.
2. Num terminal, dentro desta pasta `site`:
   ```
   gh auth login
   git init -b main
   git add .
   git commit -m "Site UC00241"
   gh repo create uc00241 --public --source . --push
   ```
3. No GitHub: repositório → **Settings → Pages → Branch: main / (root) → Save**.
4. Ao fim de 1–2 minutos o site fica em `https://<o-teu-utilizador>.github.io/uc00241/`.

Para as atualizações seguintes: `git add . && git commit -m "Sessões X–Y" && git push`.

## Adicionar ao Teams

Em cada canal de turno: **+ (Adicionar separador) → Site web**. Cola o link do GitHub Pages e dá o nome "UC00241".

## Estrutura

| Ficheiro | O que é |
|---|---|
| `index.html` | Página única. Inclui os ficheiros das sessões. |
| `dados/curso.js` | Módulos, as 34 sessões (33 × 90 min + 1 × 45 min), critérios, conquistas, níveis e recursos. |
| `dados/sessoes/sNN.js` | Conteúdo de cada sessão (objetivos, blocos, quizzes, laboratórios, entregas). |
| `js/app.js` | Navegação, progresso, XP e conquistas (guardados no `localStorage` do aluno). |
| `js/quiz.js` | Motor dos mini-quizzes: `mc`, `multi`, `vf`, `preencher`, `ordenar`, `classificar`. |
| `js/widgets.js` | Interativos: `osi`, `encapsulamento`, `handshake`, `binario`, `calculadoraip`, `treinosubredes`. |
| `recursos/` | Apresentações .pptx para download. |

## Acrescentar uma sessão

1. Copia um `dados/sessoes/sNN.js` existente para o número novo e altera o conteúdo.
2. Acrescenta `<script src="dados/sessoes/sNN.js"></script>` no `index.html`.
3. As sessões sem ficheiro aparecem como "🔒 em breve".

Tipos de bloco: `secao`, `cartoes`, `tabela`, `nota`, `widget`, `quiz`, `lab`, `exercicio`, `entrega`, `desafio`, `resumo`.

> Nota: as respostas dos mini-quizzes e as soluções dos exercícios estão no código-fonte. Isto não é problema, porque não contam para a nota. As soluções das fichas de avaliação e os testes ficam fora do site.
