# Portfolio — Fabricio Dias Galvao

## Stack
- **HTML5** semantico
- **CSS3** vanilla (variaveis, grid, flex, keyframes, glassmorphism)
- **JavaScript** vanilla (IntersectionObserver, Canvas particles, touch/mouse events)
- **Fontes**: Inter, Orbitron, Press Start 2P (Google Fonts)
- **Icones tech**: Devicons via CDN (jsdelivr)
- **Deploy**: GitHub Pages (estatico, zero dependencias)

## Arquivos
| Arquivo | Descricao |
|---------|-----------|
| `index.html` | Estrutura com 7 secoes + modal global |
| `style.css` | Design system dark cyberpunk, 0 emojis |
| `script.js` | Interatividade: particles, swipe, modais, hardware, typing |
| `DOCS.md` | Esta documentacao |

## Secoes

### Hero
- Glitch effect no nome com pseudo-elements
- Typing effect rotativo com frases personalizadas
- Botoes CTA para Swipie, GitHub e LinkedIn
- Particulas interativas via Canvas (reagem ao mouse)

### Trajetoria
- Timeline vertical com gradiente cyan-magenta-gold
- Cada item expande ao clicar (max-height transition)
- Dados reais do curriculo: Teclabel, TRR, Alper, UniFECAF

### Swipie (Destaque)
- Layout split: info + demo interativo
- Swipe cards funcionais (touch e mouse)
- Feedback visual MATCH/SKIP com rotacao
- Stack completa listada (TS, React, Node, Socket.io, etc)
- Badges de plataforma (Google Play, iOS Web, App Store em breve)

### Outros Projetos (com Modais Interativos)
Cada card abre um modal unico ao ser clicado:

| Projeto | Modal | Descricao |
|---------|-------|-----------|
| **Vexel** | Kanban Board | 3 colunas (Backlog, Em Progresso, Concluido) com cards categorizados (Concept Art, Dev, 3D Model) |
| **Bug Shooter** | Iframe jogavel | Jogo embutido direto do GitHub Pages |
| **MGC Representacoes** | Catalogo de marcas | 5 cards: Bertolini, Crown, Kopron, Pisani, Gondopar |
| **AuthPlugin** | Terminal Minecraft | Console interativo com input — aceita /login, /register, /help |
| **DiscordChat** | Chat simulado | Interface Discord com mensagens Minecraft-Discord sincronizadas |

### Manutencao de Hardware — Exploded View
- **Layout**: Grid 2 colunas — PC explodido (SVG) à esquerda, lista de skills à direita
- **7 camadas SVG**: Case, Motherboard, CPU, RAM, GPU, SSD, PSU
- **Interacao estilo Apple**: Cada peça começa "explodida" (deslocada, dessaturada, opaca 20%)
- **Clique na skill**: Anima a camada correspondente para posição final (cubic-bezier .34,1.56,.64,1)
- **Feedback visual**: Checkmark verde na skill, barra de progresso, mensagem por componente
- **Boot Glow**: Ao completar 100%, brilho cyan pulsa no "monitor" do PC
- **PC sticky**: Container do PC acompanha scroll enquanto skills são visíveis
- **Responsivo**: Em mobile, layout empilha verticalmente e PC reduz de tamanho

### Tech Stack
- Grid de icones com devicons (16 tecnologias)
- Hover com filtro de saturacao e elevacao

### Contato
- Interface de terminal com dots coloridos
- Output JSON com email, telefone, GitHub, LinkedIn
- Cursor piscante animado

## Design System
- **Zero emojis** — design tecnico e profissional
- **Cores**: Cyan (#00e5ff), Magenta (#ff00e5), Gold (#ffd700), Green (#00ff88)
- **Background**: #06060f com particles
- **Cards Minecraft**: Borda #5a5a3a, fonte Press Start 2P, estetica pixel art
- **Modal**: Overlay com blur 8px, animacao fadeUp, ESC para fechar
- **Glassmorphism**: backdrop-filter blur nos cards

## Responsividade
- Mobile menu toggle
- Grid adaptativo (1 coluna em mobile)
- Kanban empilha verticalmente em telas pequenas
- Hardware parts reduzem de tamanho

## Performance
- Zero frameworks, zero build tools
- Particulas limitadas a 60 (proporcional a largura da tela)
- Imagens via CDN (devicons)
- CSS transitions em vez de JS animations onde possivel
