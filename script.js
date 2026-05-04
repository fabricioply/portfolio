/* === Portfolio JS — Fabricio Dias === */

// --- Particles ---
(function(){
  const c=document.getElementById('particles');if(!c)return;
  const ctx=c.getContext('2d');let mx=null,my=null;
  function sz(){c.width=innerWidth;c.height=innerHeight}
  sz();addEventListener('resize',sz);
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
  const pts=[];
  class P{constructor(){this.r()}
    r(){this.x=Math.random()*c.width;this.y=Math.random()*c.height;this.s=Math.random()*1.8+.4;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.o=Math.random()*.4+.08}
    u(){this.x+=this.vx;this.y+=this.vy;if(mx!==null){const dx=mx-this.x,dy=my-this.y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){this.x-=dx*.008;this.y-=dy*.008}}if(this.x<0||this.x>c.width||this.y<0||this.y>c.height)this.r()}
    d(){ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,Math.PI*2);ctx.fillStyle=`rgba(0,229,255,${this.o})`;ctx.fill()}}
  for(let i=0;i<Math.min(60,~~(innerWidth/18));i++)pts.push(new P);
  (function loop(){ctx.clearRect(0,0,c.width,c.height);
    for(let i=0;i<pts.length;i++){pts[i].u();pts[i].d();
      for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){ctx.beginPath();ctx.strokeStyle=`rgba(0,229,255,${.06*(1-d/130)})`;ctx.lineWidth=.5;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke()}}}
    requestAnimationFrame(loop)})()
})();

// --- Nav ---
(function(){
  const nav=document.querySelector('.nav'),tog=document.querySelector('.nav-toggle'),lnk=document.querySelector('.nav-links');
  if(!nav)return;
  addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50));
  if(tog&&lnk){tog.addEventListener('click',()=>lnk.classList.toggle('active'));lnk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>lnk.classList.remove('active')))}
})();

// --- Scroll Reveal ---
(function(){
  const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
})();

// --- Typing ---
(function(){
  const el=document.getElementById('typed');if(!el)return;
  const words=['Desenvolvedor Full-Stack','Criador do Swipie','Dev Mobile e Web','Game Dev nas horas vagas','Tecnico em Hardware','Na area desde os 13 anos'];
  let wi=0,ci=0,del=false;
  function t(){const w=words[wi];
    if(del){el.textContent=w.substring(0,ci--);if(ci<0){del=false;wi=(wi+1)%words.length}}
    else{el.textContent=w.substring(0,ci++);if(ci>w.length){del=true;setTimeout(t,1800);return}}
    setTimeout(t,del?30:65)}t()
})();

// --- Timeline ---
(function(){
  document.querySelectorAll('.tl-item').forEach(item=>{
    item.addEventListener('click',()=>{
      document.querySelectorAll('.tl-item').forEach(i=>{if(i!==item)i.classList.remove('open')});
      item.classList.toggle('open');
    });
  });
})();

// --- Swipe Demo ---
(function(){
  const deck=document.getElementById('swipe-deck');if(!deck)return;
  const movies=[
    {title:'Michael',year:'2026',genre:'Musical/Drama Musical',img:'https://image.tmdb.org/t/p/w500/2FYFBgdNVVaUgVfNSh9z5WVTZ9y.jpg'},
    {title:'O Diabo Veste Prada 2',year:'2026',genre:'Comédia',img:'https://image.tmdb.org/t/p/w500/clsvqIWM5ZILUcHjobQd4WtHZdu.jpg'},
    {title:'Super Mario Galaxy: O Filme',year:'2026',genre:'',img:'https://image.tmdb.org/t/p/w500/b3WeTp42eJSRuE4UZfyPCOJW4c.jpg'},
    {title:'Cara de Um, Focinho de Outro',year:'2026',genre:'Comédia/Ficção científica',img:'https://image.tmdb.org/t/p/w500/ftPFJBGbldoWiiPrmesW96zBzdH.jpg'},
  ];
  let idx=0;
  function renderCards(){
    deck.innerHTML='';
    for(let i=Math.min(idx+2,movies.length-1);i>=idx;i--){
      if(i>=movies.length)continue;
      const m=movies[i],card=document.createElement('div');
      card.className='swipe-card';
      card.style.zIndex=movies.length-i;
      if(i>idx){card.style.transform=`scale(${1-(i-idx)*.05}) translateY(${(i-idx)*8}px)`;card.style.opacity=1-(i-idx)*.2}
      card.innerHTML=`<div class="card-poster" style="background-image:url(${m.img})"></div><div class="card-info"><h4>${m.title}</h4><p>${m.year}${m.genre ? ' / ' + m.genre : ''}</p></div>`;
      const like=document.createElement('div');like.className='swipe-feedback like';like.textContent='MATCH!';card.appendChild(like);
      const nope=document.createElement('div');nope.className='swipe-feedback nope';nope.textContent='SKIP';card.appendChild(nope);
      if(i===idx)setupDrag(card,like,nope);
      deck.appendChild(card);
    }
    if(idx>=movies.length){deck.innerHTML='<p style="text-align:center;color:var(--green);font-family:var(--display);font-size:.9rem;padding:40px">Match encontrado!</p>';
      setTimeout(()=>{idx=0;renderCards()},2000)}
  }
  function setupDrag(card,likeEl,nopeEl){
    let sx=0,cx=0,dragging=false;
    function start(e){dragging=true;sx=e.type.includes('mouse')?e.clientX:e.touches[0].clientX;card.style.transition='none'}
    function move(e){if(!dragging)return;const x=(e.type.includes('mouse')?e.clientX:e.touches[0].clientX)-sx;cx=x;
      card.style.transform=`translateX(${x}px) rotate(${x*.08}deg)`;
      if(x>0){likeEl.style.opacity=Math.min(Math.abs(x)/80,1);nopeEl.style.opacity=0}else{nopeEl.style.opacity=Math.min(Math.abs(x)/80,1);likeEl.style.opacity=0}}
    function end(){if(!dragging)return;dragging=false;card.style.transition='transform .3s ease,opacity .3s ease';
      if(Math.abs(cx)>80){card.style.transform=`translateX(${cx>0?500:-500}px) rotate(${cx>0?30:-30}deg)`;card.style.opacity='0';
        setTimeout(()=>{idx++;renderCards()},300)}
      else{card.style.transform='';likeEl.style.opacity=0;nopeEl.style.opacity=0}cx=0}
    card.addEventListener('mousedown',start);card.addEventListener('touchstart',start,{passive:true});
    addEventListener('mousemove',move);addEventListener('touchmove',move,{passive:true});
    addEventListener('mouseup',end);addEventListener('touchend',end);
  }
  renderCards();
})();

// --- Hardware Exploded View ---
(function(){
  const skills=document.querySelectorAll('.hw-skill');
  const status=document.getElementById('hw-status');
  const fill=document.getElementById('hw-fill');
  const screen=document.getElementById('hw-screen');
  if(!skills.length||!status)return;
  let installed=0;const total=skills.length;
  const msgs={
    'case':'Gabinete preparado — base estrutural montada',
    mb:'Placa-mae instalada — circuitos conectados',
    cpu:'Processador encaixado — pasta termica aplicada',
    ram:'Memoria RAM encaixada — dual-channel ativo',
    gpu:'Placa de video montada — PCIe x16 conectado',
    ssd:'SSD NVMe instalado — armazenamento pronto',
    psu:'Fonte ligada — alimentacao estavel'
  };
  skills.forEach(skill=>{
    skill.addEventListener('click',()=>{
      if(skill.classList.contains('installed'))return;
      const target=skill.dataset.target;
      const layer=document.querySelector(`.hw-layer[data-part="${target}"]`);
      if(layer)layer.classList.add('installed');
      skill.classList.add('installed');
      installed++;
      status.textContent=msgs[target]||'Componente instalado';
      status.style.color=installed>=total?'var(--green)':'var(--cyan)';
      fill.style.width=((installed/total)*100)+'%';
      if(installed>=total){
        fill.style.background='linear-gradient(90deg,var(--green),var(--gold))';
        status.textContent='Inicializando...';
        setTimeout(()=>startBootSequence(),800);
      }
    });
  });

  function startBootSequence(){
    if(!screen)return;
    // Turn on screen with CRT effect
    screen.classList.add('on','crt-on');
    const bios=document.getElementById('hw-bios');
    const xpLoad=document.getElementById('hw-xp-load');
    const xpDesktop=document.getElementById('hw-xp-desktop');

    // Phase 1: BIOS POST
    setTimeout(()=>{
      bios.classList.add('active');
      const lines=bios.querySelectorAll('.bios-line');
      lines.forEach(line=>{
        const delay=parseInt(line.dataset.delay)||0;
        setTimeout(()=>line.classList.add('show'),delay);
      });

      // Phase 2: XP Loading (after BIOS)
      setTimeout(()=>{
        bios.classList.remove('active');
        xpLoad.classList.add('active');
        status.textContent='Carregando Windows XP...';

        // Phase 3: XP Desktop (after loading)
        setTimeout(()=>{
          xpLoad.classList.remove('active');
          xpDesktop.classList.add('active');
          status.textContent='PC montado e inicializado. Pronto para codar.';
          status.style.color='var(--green)';
          // Update clock
          updateXPClock();
          setInterval(updateXPClock,60000);
        },3500);
      },3500);
    },400);
  }

  function updateXPClock(){
    const clock=document.getElementById('xp-clock');
    if(!clock)return;
    const now=new Date();
    clock.textContent=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  }
})();

// --- Modal System ---
(function(){
  const overlay=document.getElementById('modal-overlay');
  const modalBody=document.getElementById('modal-body');
  const modalTitle=document.getElementById('modal-title');
  if(!overlay)return;

  function openModal(title,html){
    modalTitle.textContent=title;
    modalBody.innerHTML=html;
    overlay.classList.add('active');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    overlay.classList.remove('active');
    document.body.style.overflow='';
  }
  overlay.addEventListener('click',(e)=>{if(e.target===overlay)closeModal()});
  document.getElementById('modal-close').addEventListener('click',closeModal);
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape')closeModal()});

  // --- VEXEL: Kanban ---
  const vexelData={
    backlog:[
      {tag:'concept',label:'Concept Art',title:'Design do menu principal'},
      {tag:'model',label:'3D Model',title:'Modelo da nave base'},
    ],
    progress:[
      {tag:'dev',label:'Dev',title:'Sistema de tarefas'},
      {tag:'concept',label:'Concept Art',title:'Mapa do mundo aberto'},
    ],
    done:[
      {tag:'dev',label:'Dev',title:'Autenticacao OAuth'},
      {tag:'dev',label:'Dev',title:'Votacao de ideias'},
      {tag:'model',label:'3D Model',title:'Armas iniciais'},
    ]
  };
  function buildKanban(){
    function col(title,items){
      let h=`<div class="kanban-col"><h4>${title}</h4>`;
      items.forEach(i=>h+=`<div class="kanban-card"><span class="kc-tag ${i.tag}">${i.label}</span><div>${i.title}</div></div>`);
      return h+'</div>';
    }
    return '<div class="kanban">'+col('Backlog',vexelData.backlog)+col('Em Progresso',vexelData.progress)+col('Concluido',vexelData.done)+'</div><p style="text-align:center;color:var(--muted);font-size:.75rem;margin-top:16px">Quadro real do projeto Vexel antes do congelamento</p>';
  }

  // --- MGC: Catalogo ---
  function buildCatalog(){
    const brands=[
      {id:'bertolini',name:'Bertolini',desc:'Solucoes inteligentes para organizar e otimizar espacos em armazens e centros de distribuicao, com foco em qualidade, tecnologia e eficiencia logistica.',products:['Autoportante','Cantilever','Dinamico','Drive-In','Estanteria','Mezanino','Porta Palete'],cat:'https://mgcrepresentacoes.com.br/wp-content/themes/customsite/Catalogos_e_SVG/Cat%C3%A1logo%20Bertolini.pdf',color:'#2563eb'},
      {id:'crown',name:'Crown',desc:'Referencia mundial em empilhadeiras e equipamentos de movimentacao de materiais, com tecnologia, seguranca e alta performance para operacoes logisticas.',products:['Empilhadeira Eletrica Contrabalancada FC','Empilhadeira Eletrica Contrabalancada SC','Empilhadeira Retratil'],cat:'https://mgcrepresentacoes.com.br/wp-content/themes/customsite/Catalogos_e_SVG/Cat%C3%A1logo%20Crown.pdf',color:'#dc2626'},
      {id:'kopron',name:'Kopron',desc:'Especializada em portas industriais e seccionais, com solucoes que facilitam montagem e desmontagem rapidas e seguras para industrias e armazens.',products:['Abrigos de Doca','Niveladoras de Doca','Portas Industriais'],cat:'https://mgcrepresentacoes.com.br/wp-content/themes/customsite/Catalogos_e_SVG/Cat%C3%A1logo%20Kopron.pdf',color:'#059669'},
      {id:'pisani',name:'Pisani',desc:'Solucoes plasticas para armazenagem e transporte, com produtos que unem durabilidade, organizacao e eficiencia para operacoes logisticas e industriais.',products:['Carrinho Smart','Garrafeiras','Hortifruti','Industrial','Pallets'],cat:'https://mgcrepresentacoes.com.br/wp-content/themes/customsite/Catalogos_e_SVG/Cat%C3%A1logo%20Pisani.pdf',color:'#d97706'},
      {id:'gondopar',name:'Gondopar',desc:'Especializada em gondolas e solucoes de armazenamento para supermercados, lojas e centros de distribuicao.',products:['Casa e Construcao','Lojas e Supermercados','Saude e Beleza'],cat:null,color:'#7c3aed'},
    ];
    let h=`<div class="mgc-catalog">
      <div class="mgc-sidebar">
        <div class="mgc-site-badge">mgcrepresentacoes.com.br</div>`;
    brands.forEach((b,i)=>h+=`<button class="mgc-brand-btn${i===0?' active':''}" data-brand="${b.id}" style="--bc:${b.color}"><span class="mgc-brand-dot" style="background:${b.color}"></span>${b.name}<span class="mgc-brand-count">${b.products.length}</span></button>`);
    h+=`</div><div class="mgc-content">`;
    brands.forEach((b,i)=>{
      h+=`<div class="mgc-panel${i===0?' active':''}" data-panel="${b.id}">
        <div class="mgc-panel-header"><h4 style="color:${b.color}">${b.name}</h4>${b.cat?`<a href="${b.cat}" target="_blank" class="mgc-pdf-link" style="--bc:${b.color}">Ver Catalogo PDF</a>`:''}</div>
        <p class="mgc-panel-desc">${b.desc}</p>
        <div class="mgc-products">`;
      b.products.forEach(p=>h+=`<div class="mgc-product"><span class="mgc-product-dot" style="background:${b.color}"></span>${p}</div>`);
      h+=`</div></div>`;
    });
    h+=`</div></div>
    <p style="text-align:center;color:var(--muted);font-size:.75rem;margin-top:16px">Dados extraidos do site real — WordPress com tema custom desenvolvido sob medida</p>`;
    return h;
  }

  function setupCatalogTabs(){
    setTimeout(()=>{
      document.querySelectorAll('.mgc-brand-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
          document.querySelectorAll('.mgc-brand-btn').forEach(b=>b.classList.remove('active'));
          document.querySelectorAll('.mgc-panel').forEach(p=>p.classList.remove('active'));
          btn.classList.add('active');
          const panel=document.querySelector(`.mgc-panel[data-panel="${btn.dataset.brand}"]`);
          if(panel)panel.classList.add('active');
        });
      });
    },50);
  }

  // --- AuthPlugin: MC Terminal ---
  function buildAuthTerminal(){
    let h=`<div class="mc-terminal" id="mc-auth-terminal">
      <div>[Server] Servidor iniciando...</div>
      <div class="mc-ok">[AuthPlugin] Plugin carregado com sucesso</div>
      <div class="mc-ok">[AuthPlugin] 247 contas registradas</div>
      <div>---</div>
      <div class="mc-info">[Server] Player_Steve entrou no servidor</div>
      <div class="mc-cmd">[AuthPlugin] Player_Steve precisa se autenticar</div>
      <div>Use /login &lt;senha&gt; para entrar</div>
      <div class="mc-cmd">[AuthPlugin] Player_Steve executou /login ****</div>
      <div class="mc-ok">[AuthPlugin] Player_Steve autenticado com sucesso</div>
      <div>---</div>
      <div class="mc-info">[Server] NovoJogador123 entrou no servidor</div>
      <div class="mc-cmd">[AuthPlugin] NovoJogador123 nao possui conta</div>
      <div>Use /register &lt;senha&gt; &lt;senha&gt; para criar conta</div>
      <div class="mc-input"><span class="mc-cmd">&gt;</span><input id="mc-cmd-input" placeholder="Digite um comando..." autocomplete="off"></div>
    </div>`;
    return h;
  }

  // --- DiscordChat: Chat sync ---
  function buildDiscordChat(){
    return `<div class="dc-chat">
      <div class="dc-header">minecraft-chat</div>
      <div class="dc-messages">
        <div class="dc-msg"><div class="dc-avatar bot">DC</div><div class="dc-msg-body"><h5>DiscordChat Bot <span>Hoje 14:32</span></h5><p>Servidor online. Sincronizacao ativa.</p></div></div>
        <div class="dc-msg"><div class="dc-avatar player">MC</div><div class="dc-msg-body"><h5>Player_Steve <span>Hoje 14:33</span></h5><p>Alguem quer farmar no nether?</p></div></div>
        <div class="dc-msg"><div class="dc-avatar bot">DC</div><div class="dc-msg-body"><h5>Maria_DC <span>via Discord 14:33</span></h5><p>To indo! Espera eu logar</p></div></div>
        <div class="dc-msg"><div class="dc-avatar server">SV</div><div class="dc-msg-body"><h5>Servidor <span>Hoje 14:34</span></h5><p>Maria_DC entrou no jogo</p></div></div>
        <div class="dc-msg"><div class="dc-avatar player">MC</div><div class="dc-msg-body"><h5>Maria_DC <span>Hoje 14:34</span></h5><p>Cheguei! Vamos nessa</p></div></div>
        <div class="dc-msg"><div class="dc-avatar bot">DC</div><div class="dc-msg-body"><h5>Pedro_DC <span>via Discord 14:35</span></h5><p>Cuidado com os ghasts, perdi tudo ontem</p></div></div>
      </div>
    </div><p style="text-align:center;color:var(--muted);font-size:.75rem;margin-top:16px">Sincronizacao bidirecional: mensagens do Minecraft aparecem no Discord e vice-versa</p>`;
  }

  // --- Bug Shooter: embed ---
  function buildBugShooter(){
    return `<div style="text-align:center"><iframe src="https://fabricioply.github.io/fabricioply/" style="width:100%;height:480px;border:1px solid var(--border);border-radius:12px;background:#000" allowfullscreen></iframe><p style="color:var(--muted);font-size:.75rem;margin-top:16px">Jogo completo rodando ao vivo — destrua os bugs com upgrades de DevOps</p></div>`;
  }

  // --- Bind clicks ---
  document.querySelectorAll('[data-modal]').forEach(card=>{
    card.addEventListener('click',(e)=>{
      e.preventDefault();
      const type=card.dataset.modal;
      switch(type){
        case'vexel':openModal('Vexel — Quadro de Tarefas',buildKanban());break;
        case'mgc':openModal('MGC Representacoes — Catalogo',buildCatalog());setupCatalogTabs();break;
        case'auth':openModal('AuthPlugin — Console do Servidor',buildAuthTerminal());setupMcInput();break;
        case'discord':openModal('DiscordChat — Chat Sincronizado',buildDiscordChat());break;
        case'bugshooter':openModal('Bug Shooter — Jogar Agora',buildBugShooter());break;
      }
    });
  });

  // MC Terminal input
  function setupMcInput(){
    setTimeout(()=>{
      const input=document.getElementById('mc-cmd-input');
      const terminal=document.getElementById('mc-auth-terminal');
      if(!input||!terminal)return;
      input.focus();
      input.addEventListener('keydown',(e)=>{
        if(e.key!=='Enter'||!input.value.trim())return;
        const cmd=input.value.trim();
        const line=document.createElement('div');
        line.classList.add('mc-cmd');
        line.textContent='> '+cmd;
        terminal.insertBefore(line,terminal.querySelector('.mc-input'));
        const resp=document.createElement('div');
        if(cmd.startsWith('/login')){resp.classList.add('mc-ok');resp.textContent='[AuthPlugin] Autenticado com sucesso';}
        else if(cmd.startsWith('/register')){resp.classList.add('mc-ok');resp.textContent='[AuthPlugin] Conta criada com sucesso';}
        else if(cmd.startsWith('/help')){resp.classList.add('mc-info');resp.textContent='Comandos: /login <senha> | /register <senha> <senha> | /changepassword <antiga> <nova>';}
        else{resp.classList.add('mc-err');resp.textContent='[Server] Comando desconhecido. Use /help';}
        terminal.insertBefore(resp,terminal.querySelector('.mc-input'));
        input.value='';
        terminal.scrollTop=terminal.scrollHeight;
      });
    },100);
  }
})();

// --- Active nav ---
(function(){
  const secs=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nav-links a');
  addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-200)cur=s.id});
    links.forEach(l=>{l.style.color='';if(l.getAttribute('href')==='#'+cur)l.style.color='#00e5ff'})});
})();
