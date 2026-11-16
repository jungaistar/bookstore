/* Hongmunwon Bookstore. Browser-only commerce demo, no payment credentials. */
(() => {
  'use strict';
  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => [...root.querySelectorAll(q)];
  const money = n => new Intl.NumberFormat('ko-KR').format(Math.round(n));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const STORE_KEY = 'hongmunwon_bookstore_v1';
  const books = [
    {id:1,title:'AI와 일하는 새로운 방식',subtitle:'도구를 넘어, 함께 생각하는 동료로',author:'홍문원 편집부',category:'AI·IT',paper:19800,regular:22000,ebook:15400,cover:'book-01.svg',caption:'더 나은 질문이 더 나은 내일을 만듭니다.',rank:1,date:'2026-11-12',pages:248,description:'반복되는 일을 줄이고 생각하는 시간을 넓히는 AI 활용 안내서. 일의 맥락을 정리하고, 좋은 질문을 설계하며, 결과를 검토하는 과정을 차근차근 소개합니다. 기술보다 먼저 사람의 판단을 이야기합니다.'},
    {id:2,title:'데이터의 언어',subtitle:'숫자 사이에서 진짜 이야기를 찾는 법',author:'홍문원 데이터랩',category:'AI·IT',paper:23400,regular:26000,ebook:18200,cover:'book-02.svg',caption:'숫자 너머의 이야기를 읽는 힘.',rank:2,date:'2026-11-10',pages:312,description:'표 한 장과 그래프 하나에도 이야기가 있습니다. 데이터를 모으고, 질문을 세우고, 맥락을 살피는 방법을 구체적인 일상의 예로 풀어냅니다. 도구의 사용법과 생각하는 방법을 함께 배우는 데이터 입문서입니다.'},
    {id:3,title:'조금 더 단단한 나',subtitle:'나의 속도로 자라는 마음에 관하여',author:'홍문원 라이프 에디터',category:'자기계발',paper:15300,regular:17000,ebook:11900,cover:'book-03.svg',caption:'서두르지 않아도, 우리는 자라고 있으니까.',rank:3,date:'2026-10-28',pages:224,description:'비교의 속도를 내려놓고 나에게 맞는 기준을 세우는 작은 연습들. 잘해내려는 마음을 다독이며 하루를 오래 지탱할 습관을 찾습니다. 완벽한 변화보다 어제보다 조금 더 나다운 오늘을 위한 책입니다.'},
    {id:4,title:'모든 시작에는 이유가 있다',subtitle:'내일을 여는 작은 용기의 기록',author:'홍문원 에세이 스튜디오',category:'인문·에세이',paper:16200,regular:18000,ebook:12600,cover:'book-04.svg',caption:'새로운 시작 앞에 선 당신에게.',rank:4,date:'2026-11-07',pages:236,description:'처음이라는 문턱에 서면 낯섦과 기대가 함께 찾아옵니다. 서툴렀던 시도와 그 안에서 발견한 가능성을 담은 에세이. 거창한 결심이 없어도 우리가 다시 시작할 수 있는 이유를 다정하게 전합니다.'},
    {id:5,title:'일상을 설계하는 작은 습관',subtitle:'꾸준함을 만드는 가장 현실적인 방법',author:'홍문원 라이프 에디터',category:'자기계발',paper:17100,regular:19000,ebook:13300,cover:'book-05.svg',caption:'작은 반복이 만드는 커다란 변화.',rank:5,date:'2026-11-14',pages:256,description:'목표는 선명한데 실천이 어려울 때, 필요한 것은 더 큰 의지보다 더 작은 시작일지 모릅니다. 환경을 정돈하고 행동의 문턱을 낮추며, 기록을 통해 자신의 리듬을 발견하는 습관 설계 안내서입니다.'},
    {id:6,title:'좋은 질문의 기술',subtitle:'생각의 깊이를 바꾸는 질문 수업',author:'홍문원 비즈니스랩',category:'경제·경영',paper:18000,regular:20000,ebook:14000,cover:'book-06.svg',caption:'답을 찾기 전, 질문을 다시 바라봅니다.',rank:6,date:'2026-11-03',pages:272,description:'회의, 기획, 배움의 출발점에는 언제나 질문이 있습니다. 모호함을 줄이고 핵심을 발견하는 질문의 구조를 살펴봅니다. 상대를 평가하는 말 대신 함께 생각하게 하는 말을 만드는 실전 연습을 담았습니다.'},
    {id:7,title:'웹을 만드는 사람들',subtitle:'아이디어에서 첫 번째 웹사이트까지',author:'홍문원 개발 스튜디오',category:'AI·IT',paper:25200,regular:28000,ebook:19600,cover:'book-07.svg',caption:'머릿속 아이디어가 화면이 되는 순간.',rank:7,date:'2026-11-15',pages:336,description:'HTML, CSS, JavaScript가 서로 연결되는 과정을 하나의 작은 웹사이트로 배웁니다. 사용자가 원하는 흐름을 생각하고, 읽기 쉬운 화면을 설계하며, 직접 작동하는 결과물을 만드는 과정을 안내합니다.'},
    {id:8,title:'느린 계절의 기록',subtitle:'마음이 머무는 곳에서 쓰는 일기',author:'홍문원 에세이 스튜디오',category:'인문·에세이',paper:14400,regular:16000,ebook:11200,cover:'book-08.svg',caption:'흘려보낸 하루에서 발견하는 아름다움.',rank:8,date:'2026-10-23',pages:208,description:'창가의 빛, 식어가는 차, 익숙한 골목의 새로운 표정. 무심히 지나친 장면을 기록하며 하루의 결을 다시 만나는 산문집입니다. 특별한 일이 없는 날에도 쓰고 싶은 문장이 있다는 사실을 조용히 알려줍니다.'}
  ];
  const grades = [
    {name:'리더',en:'READER',min:0,rate:.01},
    {name:'플러스',en:'PLUS',min:100000,rate:.03},
    {name:'프리미엄',en:'PREMIUM',min:300000,rate:.05},
    {name:'블루',en:'BLUE',min:500000,rate:.07}
  ];
  const freshState = () => ({version:1,members:[],current:null,cart:[],orders:[],wish:[],reading:{}});
  let state = freshState();
  let storageAvailable = true;
  try {
    const loaded = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (loaded && loaded.version === 1 && ['members','cart','orders','wish'].every(k => Array.isArray(loaded[k]))) state = {...freshState(),...loaded};
  } catch (_) { storageAvailable = false; }
  const save = () => {
    try { localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
    catch (_) { if (storageAvailable) toast('브라우저 저장 공간을 사용할 수 없어 이번 화면에서만 유지됩니다.'); storageAvailable = false; }
  };
  const getBook = id => books.find(b => b.id === Number(id));
  const user = () => state.members.find(m => m.id === state.current) || null;
  const gradeFor = m => [...grades].reverse().find(g => (m?.spent || 0) >= g.min);
  const owned = (id, m = user()) => !!m && state.orders.some(o => o.user === m.id && o.items.some(i => i.id === Number(id) && i.format === 'ebook'));
  const unitPrice = item => getBook(item.id)[item.format];
  state.cart = state.cart.filter(i => getBook(i.id) && ['paper','ebook'].includes(i.format) && Number.isInteger(i.qty) && i.qty > 0 && i.qty <= 99).map(i => ({...i,qty:i.format === 'ebook' ? 1 : i.qty}));
  const modal = $('#modal');
  const modalContent = $('#modal-content');
  const drawer = $('#cart-drawer');
  let toastTimer, authNext = null, reader = null, checkoutBusy = false;
  let filter = {type:'all',category:'all',query:'',sort:'featured',expanded:false};
  let lastModalFocus = null;

  function toast(message) {
    const el = $('#toast'); el.textContent = message; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'),3500);
  }
  function openModal(html, kind = '') {
    if (drawer.open) drawer.close();
    if (!modal.open) lastModalFocus = document.activeElement;
    modal.className = `modal ${kind}`;
    modalContent.innerHTML = html;
    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    requestAnimationFrame(() => { const target = $('[autofocus]',modalContent) || $('.dialog-close',modal); target?.focus({preventScroll:true}); });
  }
  function closeModal() { if(modal.open) modal.close(); }
  modal.addEventListener('close',() => { reader = null; if($('#auth-form',modalContent))authNext=null; lastModalFocus?.focus?.({preventScroll:true}); });
  for (const dialog of [modal,drawer]) dialog.addEventListener('click',e => {
    if (e.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close();
  });

  function renderHeader() {
    const m = user(); $('#account-label').textContent = m ? `${m.name}님` : '로그인 / 회원가입';
    $('.header-action[data-action="account"]').setAttribute('aria-label',m?`${m.name}님 마이페이지`:'로그인 / 회원가입');
    const count = state.cart.reduce((sum,i) => sum+i.qty,0);
    $('#cart-count').textContent = count; $('.cart-button').setAttribute('aria-label',`장바구니 ${count}권`);
  }
  function renderBooks() {
    let list = books.filter(b => (filter.type === 'all' || !!b[filter.type]) && (filter.category === 'all' || b.category === filter.category) && (!filter.query || `${b.title} ${b.subtitle} ${b.author} ${b.category}`.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase())));
    const key = filter.type === 'ebook' ? 'ebook' : 'paper';
    if (filter.sort === 'low') list.sort((a,b) => a[key]-b[key]);
    if (filter.sort === 'high') list.sort((a,b) => b[key]-a[key]);
    if (filter.sort === 'new') list.sort((a,b) => b.date.localeCompare(a.date));
    if (filter.sort === 'best' || filter.sort === 'featured') list.sort((a,b) => a.rank-b.rank);
    const total = list.length;
    const showAll = filter.expanded || filter.query || filter.category !== 'all';
    $('#books-heading').textContent = filter.sort==='best' ? '지금, 가장 사랑받는 이야기' : '지금, 당신에게 건네는 책';
    if (!showAll) list = list.slice(0,4);
    $('#book-grid').innerHTML = list.length ? list.map(b => {
      const wished = state.wish.includes(b.id), price = b[key];
      return `<article class="book-card"><div class="book-art"><span class="book-rank">${String(b.rank).padStart(2,'0')}</span><button class="cover-button" data-action="detail" data-id="${b.id}" data-format="${key}" aria-label="${b.title} 상세 보기"><img src="img/${b.cover}" alt="${b.title} 표지" loading="lazy" width="300" height="432"></button><button class="wish-button ${wished?'is-wished':''}" data-action="wish" data-id="${b.id}" aria-pressed="${wished}" aria-label="${b.title} 관심 도서 ${wished?'해제':'추가'}">${icon('heart')}</button><button class="quick-cart" data-action="quick-add" data-id="${b.id}" data-format="${key}" aria-label="${b.title} ${key==='ebook'?'전자책':'종이책'} 장바구니 담기">${icon('bag')}</button></div><div class="format-labels">${filter.type!=='ebook'?'<span>종이책</span>':''}${filter.type!=='paper'?'<span class="ebook">eBook</span>':''}</div><button class="book-title" data-action="detail" data-id="${b.id}" data-format="${key}">${b.title}</button><p class="book-author">${b.author} · 홍문원</p><p class="book-price">${key==='paper'?'<span class="discount">10%</span>':''}<span>${money(price)}<small>원</small></span>${key==='paper'?`<del>${money(b.regular)}원</del>`:''}</p><p class="book-caption">${b.caption}</p></article>`;
    }).join('') : `<div class="empty-state">${icon('search')}<h3>아직 만날 책을 찾지 못했어요.</h3><p>다른 제목이나 분야로 검색해 보세요.</p><button class="btn btn-outline" data-action="clear-filters">전체 도서 보기</button></div>`;
    $$('.type-tabs button').forEach(b => {const active=b.dataset.type===filter.type;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $$('#category-chips button').forEach(b => {const active=b.dataset.category===filter.category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    const result=$('#search-results'); result.hidden=!filter.query;
    result.textContent = filter.query ? `“${filter.query}” 검색 결과 ${total}권` : '';
    $('#show-more').hidden = total <= 4 || !!filter.query || filter.category !== 'all';
    $('#show-more').innerHTML = filter.expanded ? '접어서 보기 <span>−</span>' : '더 많은 이야기 만나기 <span>+</span>';
    $('#sort-select').value=filter.sort;
  }
  function browse(type = 'all', category = 'all') {
    filter={...filter,type,category,query:'',expanded:false}; $('#search-input').value='';
    closeModal(); if(drawer.open)drawer.close(); renderBooks(); $('#books').scrollIntoView({behavior:'smooth'});
  }
  function detail(id, preferred = 'paper') {
    const b=getBook(id); if(!b)return;
    const format=preferred==='ebook'?'ebook':'paper';
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">HONGMUNWON SELECTED BOOK</p><div class="detail-top"><div class="detail-cover"><img src="img/${b.cover}" alt="${b.title} 표지"></div><div class="detail-copy"><div class="format-labels"><span>${b.category}</span><span class="ebook">체험용 도서</span></div><h2 id="modal-title">${b.title}</h2><p class="subtitle">${b.subtitle}</p><p class="book-author">${b.author} 지음 · 홍문원</p><div class="format-picker"><label class="format-option"><input type="radio" name="book-format" value="paper" ${format==='paper'?'checked':''}><span>종이책<small>${money(b.paper)}원 · 배송 상품</small></span></label><label class="format-option"><input type="radio" name="book-format" value="ebook" ${format==='ebook'?'checked':''}><span>전자책<small>${money(b.ebook)}원 · 즉시 열람</small></span></label></div><p class="detail-amount" id="detail-amount">${money(b[format])}<small>원</small></p><p class="point-hint" id="detail-points"></p><div class="detail-actions"><button class="btn btn-outline" data-action="detail-add" data-id="${b.id}">${icon('bag')} 장바구니</button><button class="btn btn-blue" data-action="detail-buy" data-id="${b.id}">바로 구매</button></div><button class="detail-preview" data-action="read" data-id="${b.id}" data-sample="true">${icon('book')} 구매 전 미리 읽기 ↗</button></div></div><div class="detail-description"><h3>이 책을 소개합니다</h3><p>${b.description}</p><div class="detail-meta"><span>분야 ${b.category}</span><span>예시 분량 ${b.pages}쪽</span><span>체험 등록일 ${b.date}</span></div><div class="notice warm">전시용 가상 도서입니다. 표지와 본문은 이 쇼핑몰을 위해 제작한 샘플이며 실제 상품 주문은 발생하지 않습니다.</div></div></div>`,'wide');
    const update=()=>{const f=$('input[name="book-format"]:checked',modalContent).value;$('#detail-amount').innerHTML=`${money(b[f])}<small>원</small>`;$('#detail-points').textContent=`${gradeFor(user()).name} 등급 기준 ${money(Math.floor(b[f]*gradeFor(user()).rate))}P 적립 예정`;};
    $$('input[name="book-format"]',modalContent).forEach(i=>i.addEventListener('change',update)); update();
  }
  function addCart(id, format='paper') {
    const b=getBook(id); if(!b)return false;
    if(format==='ebook' && owned(id)){toast('이미 내 서재에 있는 전자책입니다.');return false;}
    const row=state.cart.find(i=>i.id===Number(id)&&i.format===format);
    if(row && format==='ebook'){toast('전자책은 한 권씩 담을 수 있어요.');return true;}
    if(row){if(row.qty>=99){toast('한 상품은 최대 99권까지 담을 수 있어요.');return false;}row.qty++;}
    else state.cart.push({id:Number(id),format,qty:1});
    save();renderHeader();toast('장바구니에 담았어요.');return true;
  }
  function cartTotals(points=0) {
    const subtotal=state.cart.reduce((s,i)=>s+unitPrice(i)*i.qty,0);
    const paper=state.cart.filter(i=>i.format==='paper').reduce((s,i)=>s+unitPrice(i)*i.qty,0);
    const shipping=paper>0&&paper<30000?3000:0;
    const used=Math.min(Math.max(0,Math.floor(Number(points)||0)),subtotal,user()?.points||0);
    const cash=subtotal-used;
    return{subtotal,paper,shipping,used,cash,total:cash+shipping,earned:Math.floor(cash*gradeFor(user()).rate)};
  }
  function openCart() {
    closeModal(); renderCart(); if(!drawer.open)drawer.showModal();
  }
  function renderCart() {
    $('#drawer-count').textContent=state.cart.reduce((s,i)=>s+i.qty,0);
    const t=cartTotals();
    if(!state.cart.length){$('#cart-content').innerHTML=`<div class="empty-state">${icon('bag')}<h3>다음 이야기를 담아보세요.</h3><p>아직 장바구니가 비어 있어요.</p><button class="btn btn-blue" data-action="filter" data-type="all">책 둘러보기 ${icon('arrow')}</button></div>`;return;}
    $('#cart-content').innerHTML=`<div class="cart-items">${state.cart.map((i,n)=>{const b=getBook(i.id);return `<article class="cart-item"><img src="img/${b.cover}" alt="${b.title} 표지"><div><h3>${b.title}</h3><p>${i.format==='ebook'?'전자책 · 구매 후 바로 읽기':'종이책 · 배송 상품'}</p><span class="cart-line-price">${money(unitPrice(i)*i.qty)}원</span><br>${i.format==='paper'?`<div class="quantity"><button data-action="qty" data-index="${n}" data-delta="-1" aria-label="${b.title} 수량 줄이기">−</button><span>${i.qty}</span><button data-action="qty" data-index="${n}" data-delta="1" aria-label="${b.title} 수량 늘리기">+</button></div>`:'<p>1권 · 중복 구매 방지</p>'}</div><button class="cart-remove" data-action="remove-cart" data-index="${n}" aria-label="${b.title} 삭제">${icon('close')}</button></article>`;}).join('')}</div>${t.paper>0?`<div class="shipping-progress">${t.paper>=30000?'종이책 무료배송 혜택이 적용되었어요.':`종이책 ${money(30000-t.paper)}원 더 담으면 무료배송`}<div class="shipping-track"><span style="width:${Math.min(100,t.paper/30000*100)}%"></span></div></div>`:''}<div class="cart-summary"><div class="money-line"><span>도서 금액</span><span>${money(t.subtotal)}원</span></div><div class="money-line"><span>배송비</span><span>${t.shipping?money(t.shipping)+'원':'무료'}</span></div><div class="money-line total"><span>주문 금액</span><span>${money(t.total)}원</span></div><p class="muted-text">포인트는 주문서에서 사용할 수 있어요.<br>체험 결제로 진행되며 실제 요금은 청구되지 않습니다.</p><button class="btn btn-blue full" data-action="checkout">주문서 작성 ${icon('arrow')}</button><button class="cart-add-more" data-action="close-cart">계속 둘러보기</button></div>`;
  }

  function openAuth(mode='login', next=null) {
    if(next)authNext=next;
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">WELCOME TO YOUR BOOKSTORE</p><h2 id="modal-title">${mode==='signup'?'당신의 첫 페이지를 열어요.':'다시 만나 반가워요.'}</h2><p class="auth-description">${mode==='signup'?'새로운 독서의 시작에 2,000P를 선물합니다.':'홍문원과 함께 다음 이야기를 이어가세요.'}</p><div class="auth-tabs"><button data-action="login" class="${mode==='login'?'active':''}">로그인</button><button data-action="signup" class="${mode==='signup'?'active':''}">회원가입</button></div><form id="auth-form">${mode==='signup'?'<label class="form-field"><span>이름 / 닉네임</span><input name="name" placeholder="어떻게 불러드릴까요?" minlength="2" maxlength="20" required autocomplete="nickname" autofocus></label>':''}<label class="form-field"><span>이메일</span><input type="email" name="email" placeholder="reader@example.com" maxlength="100" required autocomplete="username" ${mode==='login'?'autofocus':''}></label><label class="form-field"><span>비밀번호</span><input type="password" name="password" placeholder="${mode==='signup'?'8자 이상 입력해 주세요':'비밀번호를 입력해 주세요'}" minlength="8" maxlength="128" required autocomplete="${mode==='signup'?'new-password':'current-password'}"></label>${mode==='signup'?'<label class="checkbox-line"><input type="checkbox" name="consent" required><span>브라우저에만 저장되는 체험 계정을 만드는 데 동의합니다. 실제 개인정보와 다른 서비스의 비밀번호는 입력하지 마세요.</span></label>':''}<p class="form-error" id="auth-error" role="alert"></p><button class="btn btn-blue full" type="submit">${mode==='signup'?'회원가입하고 2,000P 받기':'로그인'}</button></form><div class="auth-divider">간편하게 먼저 둘러보세요</div><button class="demo-login" data-action="demo-login">체험 계정으로 시작하기 ${icon('arrow')}</button><p class="notice">체험 계정은 현재 브라우저에만 저장됩니다. 실제 회원 인증 서비스와 연결되어 있지 않습니다.</p></div>`,'small');
    $('#auth-form').addEventListener('submit',e=>submitAuth(e,mode));
  }
  async function hashPassword(password, salt) {
    if(!globalThis.crypto?.subtle)throw new Error('이 브라우저는 안전한 비밀번호 처리를 지원하지 않습니다. 체험 계정으로 시작해 주세요.');
    const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
    const raw=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new Uint8Array(salt),iterations:120000,hash:'SHA-256'},key,256);
    return [...new Uint8Array(raw)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  function uid(){return globalThis.crypto?.randomUUID?.() || `hmw-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;}
  async function submitAuth(e,mode) {
    e.preventDefault();const form=e.target;if(!form.reportValidity())return;
    const data=new FormData(form), email=String(data.get('email')).trim().toLocaleLowerCase(),password=String(data.get('password'));
    const button=$('button[type="submit"]',form);button.disabled=true;$('#auth-error').textContent='';
    try {
      let member=state.members.find(m=>m.email===email);
      if(mode==='signup'){
        if(member)throw new Error('이미 등록된 이메일입니다. 로그인해 주세요.');
        const name=String(data.get('name')).trim();if(name.length<2)throw new Error('이름은 공백을 제외하고 2자 이상 입력해 주세요.');
        const salt=[...crypto.getRandomValues(new Uint8Array(16))];
        const hash=await hashPassword(password,salt);
        member={id:uid(),name,email,salt,hash,points:2000,spent:0,created:new Date().toISOString()};
        state.members.push(member);
      }else{
        if(!member||!member.hash)throw new Error('이메일 또는 비밀번호를 확인해 주세요.');
        const hash=await hashPassword(password,member.salt);
        if(hash!==member.hash)throw new Error('이메일 또는 비밀번호를 확인해 주세요.');
      }
      state.current=member.id;save();renderHeader();finishAuth(mode==='signup'?'가입을 환영합니다. 2,000P가 적립되었어요.':'로그인되었습니다.');
    } catch(error){if($('#auth-error'))$('#auth-error').textContent=error.message;}
    finally{button.disabled=false;}
  }
  function demoLogin(){
    let m=state.members.find(x=>x.demo);
    if(!m){m={id:uid(),name:'책읽는 당신',email:'demo@example.com',demo:true,points:3000,spent:120000,created:new Date().toISOString()};state.members.push(m);}
    state.current=m.id;save();renderHeader();finishAuth('체험 계정으로 로그인했어요.');
  }
  function finishAuth(message){const next=authNext;authNext=null;toast(message);if(next==='checkout')openCheckout();else if(next==='library')openLibrary();else openAccount();}
  function openCheckout(){
    if(!state.cart.length){openCart();return;}
    if(!user()){openAuth('login','checkout');return;}
    const blocked=state.cart.filter(i=>i.format==='ebook'&&owned(i.id));
    if(blocked.length){state.cart=state.cart.filter(i=>!(i.format==='ebook'&&owned(i.id)));save();renderHeader();toast('보유 중인 전자책을 장바구니에서 제외했어요.');if(!state.cart.length){openLibrary();return;}}
    const m=user(),hasPaper=state.cart.some(i=>i.format==='paper');
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">A NEW BOOK IS WAITING</p><h2 id="modal-title">다음 이야기를 주문해요.</h2><p class="muted-text">${esc(m.name)}님 · ${gradeFor(m).name} 등급 · ${gradeFor(m).rate*100}% 적립</p><div class="notice">체험 주문입니다. 실제 청구·배송은 발생하지 않으며 카드번호나 결제 비밀번호를 받지 않습니다.</div><form id="checkout-form"><div class="checkout-grid"><div class="checkout-part"><h3>주문자 정보</h3><div class="form-row"><label class="form-field"><span>이름</span><input name="buyer" required maxlength="30" value="${esc(m.name)}"></label><label class="form-field"><span>이메일</span><input type="email" name="email" value="${esc(m.email)}" maxlength="100" required></label></div>${hasPaper?'<h3>배송지 정보 <small>(체험용)</small></h3><div class="form-row"><label class="form-field"><span>받는 분</span><input name="recipient" placeholder="체험용 이름" required maxlength="30"></label><label class="form-field"><span>연락처</span><input name="phone" type="tel" placeholder="010-0000-0000" pattern="[0-9+() -]{9,20}" maxlength="20" required></label></div><label class="form-field"><span>주소</span><input name="address" placeholder="실제 주소 대신 체험용 주소를 입력하세요" maxlength="150" required></label><label class="form-field"><span>배송 메모 (선택)</span><input name="memo" placeholder="예: 문 앞에 놓아주세요" maxlength="100"></label>':'<div class="notice warm">전자책 주문입니다. 배송지 입력 없이 구매 후 내 서재에서 바로 읽을 수 있어요.</div>'}<h3>포인트 사용</h3><div class="points-field"><label class="sr-only" for="points-input">사용할 포인트</label><input id="points-input" class="input" type="number" name="points" min="0" max="${Math.min(m.points,cartTotals().subtotal)}" step="1" value="0" inputmode="numeric"><button type="button" data-action="all-points">전액 사용</button></div><p class="points-available">보유 ${money(m.points)}P · 배송비를 제외한 도서 금액에 사용 가능</p><h3>결제 수단 <small>(연동 체험)</small></h3><div class="payment-options"><label><input type="radio" name="payment" value="신용·체크카드" checked><span>신용 · 체크카드</span></label><label><input type="radio" name="payment" value="간편결제"><span>간편결제</span></label><label><input type="radio" name="payment" value="계좌이체"><span>계좌이체</span></label><label><input type="radio" name="payment" value="포인트 복합결제"><span>포인트 복합결제</span></label></div><label class="checkbox-line"><input name="agree" type="checkbox" required><span>체험 주문 내역과 샘플 전자책 즉시 제공을 확인했습니다. 실제 요금이 청구되지 않는 데 동의합니다.</span></label><p class="form-error" id="checkout-error" role="alert"></p></div><aside class="checkout-aside"><h3>주문 요약</h3><div class="checkout-order">${state.cart.map(i=>`<div><span>${getBook(i.id).title}<br><small>${i.format==='ebook'?'전자책':'종이책'} · ${i.qty}권</small></span><span>${money(unitPrice(i)*i.qty)}원</span></div>`).join('')}</div><div id="checkout-totals"></div><button class="btn btn-blue full" id="pay-button" type="submit"></button><p class="muted-text" style="font-size:9px;margin-top:12px">실제 결제 승인 대신 주문·포인트·서재 반영을 체험합니다.</p></aside></div></form></div>`,'wide');
    $('#points-input').addEventListener('input',updateCheckout);$('#checkout-form').addEventListener('submit',completeOrder);updateCheckout();
  }
  function updateCheckout(){
    const input=$('#points-input');if(!input)return;
    const t=cartTotals(input.value);
    $('#checkout-totals').innerHTML=`<div class="money-line"><span>도서 합계</span><span>${money(t.subtotal)}원</span></div><div class="money-line"><span>배송비</span><span>${t.shipping?money(t.shipping)+'원':'무료'}</span></div><div class="money-line"><span>포인트 사용</span><span>−${money(t.used)}P</span></div><div class="money-line total"><span>체험 결제금액</span><span>${money(t.total)}원</span></div><p class="point-hint" style="margin:13px 0 18px">${money(t.earned)}P 적립 예정</p>`;
    $('#pay-button').textContent=`${money(t.total)}원 체험 결제`;
  }
  function completeOrder(e){
    e.preventDefault();if(checkoutBusy)return;const form=e.target;if(!form.reportValidity())return;
    const m=user();if(!m||!state.cart.length){toast('주문 상태를 다시 확인해 주세요.');return;}
    const points=Number($('#points-input').value),max=Math.min(m.points,cartTotals().subtotal);
    if(!Number.isInteger(points)||points<0||points>max){$('#checkout-error').textContent=`포인트는 0부터 ${money(max)}P까지 정수로 입력해 주세요.`;return;}
    const data=new FormData(form);checkoutBusy=true;$('#pay-button').disabled=true;
    const t=cartTotals(points),oldGrade=gradeFor(m),now=new Date();
    const items=state.cart.map(i=>({...i,price:unitPrice(i)}));
    // This is the demo transaction boundary. Production must perform this on a server after a verified PG webhook.
    const order={id:'HMW-'+now.getTime().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase(),user:m.id,date:now.toISOString(),items,payment:String(data.get('payment')),subtotal:t.subtotal,shipping:t.shipping,used:t.used,earned:t.earned,total:t.total,grade:oldGrade.name,status:'체험 결제 완료'};
    state.orders.unshift(order);m.points=m.points-t.used+t.earned;m.spent+=t.cash;state.cart=[];save();renderHeader();checkoutBusy=false;
    const newGrade=gradeFor(m),ebooks=items.filter(i=>i.format==='ebook');
    openModal(`<div class="dialog-pad success-content"><div class="success-icon">${icon('check')}</div><p class="dialog-kicker">YOUR NEXT CHAPTER IS READY</p><h2 id="modal-title">새로운 이야기가 도착했어요.</h2><p class="muted-text" style="margin-top:10px">체험 결제가 완료되었습니다.<br>실제 요금은 청구되지 않았습니다.</p><div class="success-order"><p>주문번호 ${order.id}</p><p>${items.map(i=>`${getBook(i.id).title} (${i.format==='ebook'?'전자책':'종이책'} ${i.qty}권)`).join('<br>')}</p><div class="money-line total"><span>체험 결제 금액</span><span>${money(t.total)}원</span></div><p style="color:var(--blue)">${money(t.earned)}P 적립 · 잔여 ${money(m.points)}P</p>${newGrade.name!==oldGrade.name?`<p style="color:var(--blue)">축하합니다. ${newGrade.name} 등급으로 올라갔어요!</p>`:''}</div>${ebooks.length?`<button class="btn btn-blue full" data-action="library">구매한 전자책 바로 읽기 ${icon('book')}</button>`:'<button class="btn btn-blue full" data-action="account">주문 내역 보기</button>'}<button class="cart-add-more" data-action="close">계속 둘러보기</button></div>`,'small');
  }

  function openAccount(){
    if(!user()){openAuth();return;}const m=user(),grade=gradeFor(m),next=grades[grades.indexOf(grade)+1],orders=state.orders.filter(o=>o.user===m.id);
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">MY HONGMUNWON</p><h2 id="modal-title">나의 독서가 쌓이는 곳</h2><div class="account-heading"><span class="account-avatar">${esc(m.name.slice(0,1))}</span><div><h3>${esc(m.name)}님, 안녕하세요.</h3><p>${esc(m.email)}${m.demo?' · 체험 계정':''}</p></div></div><div class="account-stats"><div>회원 등급<strong>${grade.name}</strong></div><div>사용 가능 포인트<strong>${money(m.points)}<small>P</small></strong></div><div>적립률<strong>${grade.rate*100}<small>%</small></strong></div></div><div class="account-progress">누적 도서 실결제액 ${money(m.spent)}원<br>${next?`${next.name}까지 ${money(next.min-m.spent)}원 남았어요.`:'가장 깊은 독서의 혜택, 블루 등급입니다.'}<div class="shipping-track"><span style="width:${next?Math.min(100,m.spent/next.min*100):100}%"></span></div></div><div class="account-actions"><button class="btn btn-blue" data-action="library">내 서재 ${icon('book')}</button><button class="btn btn-outline" data-action="wishlist">관심 도서 ${icon('heart')}</button></div><h3 class="section-mini">최근 주문 <small>(${orders.length})</small></h3>${orders.length?orders.slice(0,5).map(o=>`<article class="order-record"><div class="order-record-head"><span>${new Date(o.date).toLocaleDateString('ko-KR')}</span><span>${o.id}</span></div><h4>${o.items.map(i=>`${getBook(i.id)?.title||'도서'} (${i.format==='ebook'?'전자책':'종이책'} ${i.qty}권)`).join(' · ')}</h4><p>${o.status} · ${money(o.total)}원 · ${money(o.earned)}P 적립${o.items.some(i=>i.format==='paper')?' · 종이책 배송 체험':''}</p></article>`).join(''):'<p class="muted-text">아직 주문 내역이 없습니다. 나의 첫 책을 만나보세요.</p>'}<button class="logout-button" data-action="logout">로그아웃</button><div class="notice">이 브라우저에서 만든 체험 정보입니다. 다른 기기와 연동되지 않습니다.</div></div>`);
  }
  function readingKey(id){return `${user()?.id||'guest'}:${id}`;}
  function progressFor(id){return state.reading[readingKey(id)] || {chapter:0,bookmark:null,font:17,dark:false};}
  function setProgress(id,value){const key=readingKey(id);state.reading[key]={...progressFor(id),...value};save();}
  function openLibrary(){
    if(!user()){openAuth('login','library');return;}
    const ids=[...new Set(state.orders.filter(o=>o.user===user().id).flatMap(o=>o.items.filter(i=>i.format==='ebook').map(i=>i.id)))];
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">YOUR LIBRARY, EVERYWHERE</p><h2 id="modal-title">나의 서재</h2><p class="muted-text">책을 펼치면, 나만의 시간이 시작됩니다.</p><div class="library-tabs"><span class="active">구매한 전자책 ${ids.length}권</span><span>읽던 위치 자동 저장</span></div>${ids.length?`<div class="shelf-list">${ids.map(id=>{const b=getBook(id),p=progressFor(id),percent=Math.round((p.chapter+1)/4*100);return `<article class="shelf-item"><img src="img/${b.cover}" alt="${b.title} 표지"><div><h3>${b.title}</h3><p>${b.author} · 체험 본문</p><div class="shelf-progress"><span style="width:${p.started?percent:0}%"></span></div><p>${p.started?`${p.chapter+1} / 4장 · ${percent}%`:'아직 펼치지 않은 이야기'}${p.bookmark!==null?' · 책갈피 저장됨':''}</p></div><button class="btn btn-blue" data-action="read" data-id="${b.id}">${p.started?'이어 읽기':'바로 읽기'} ${icon('arrow')}</button></article>`;}).join('')}</div>`:`<div class="empty-state">${icon('book')}<h3>이 서재의 첫 책을 기다립니다.</h3><p>전자책을 체험 결제하면 바로 서재에 추가돼요.</p><button class="btn btn-blue" data-action="filter" data-type="ebook">전자책 만나보기 ${icon('arrow')}</button></div>`}<div class="notice warm">전자책 즉시 지급과 열람 흐름을 위한 체험 서재입니다. 제공되는 글은 원작 도서가 아닌 제작용 샘플 본문입니다.</div></div>`);
  }
  function wishlist(){
    const list=books.filter(b=>state.wish.includes(b.id));
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">SAVED FOR A QUIET MOMENT</p><h2 id="modal-title">다음에 읽고 싶은 책</h2>${list.length?`<div class="shelf-list">${list.map(b=>`<article class="shelf-item"><img src="img/${b.cover}" alt="${b.title} 표지"><div><h3>${b.title}</h3><p>${b.caption}</p><p>${money(b.paper)}원 · 전자책 ${money(b.ebook)}원</p></div><button class="btn btn-outline" data-action="detail" data-id="${b.id}">책 살펴보기</button></article>`).join('')}</div>`:'<div class="empty-state">마음에 드는 책의 하트를 눌러 보세요.</div>'}</div>`);
  }

  // Original, short demonstration manuscripts, not copies of published books.
  const chapterTitles=['한 페이지에서 시작하는 일','작은 질문이 만드는 변화','나의 속도로 이어가기','다음 장을 향한 약속'];
  const commonChapters=[
    ['새로운 책을 펼칠 때 우리는 종종 달라진 내일을 기대합니다. 하지만 변화는 책을 다 읽은 뒤에만 찾아오는 것이 아닙니다. 첫 문장 앞에서 잠시 멈춰 지금의 나에게 필요한 것을 묻는 순간, 이미 다음 이야기가 시작됩니다.','책상 위에 작은 여백을 만들어 보세요. 알림을 잠시 끄고, 한 줄이라도 마음에 남는 문장을 찾아봅니다. 많은 분량보다 중요한 것은 그 문장과 나의 하루가 만나는 지점입니다. 오늘의 경험을 떠올리며 읽으면 같은 문장도 다른 얼굴로 다가옵니다.','배움은 낯선 것을 익숙하게 만드는 과정이면서 익숙한 것을 다시 낯설게 바라보는 일이기도 합니다. 잘 안다고 생각했던 일에 새 질문 하나를 더해 보세요. 짧은 독서가 오래된 습관을 부드럽게 흔들 수 있습니다.'],
    ['답을 서두르기 전에 질문을 조금 더 구체적으로 바꾸어 봅니다. 무엇을 알고 싶은지, 지금 어떤 상황인지, 무엇을 확인할 수 있는지를 나누어 적으면 복잡했던 생각이 한결 선명해집니다.','예를 들어 오늘 할 일이 너무 많다는 생각이 들었다면, 모든 일을 한꺼번에 해결하려고 애쓰기보다 가장 먼저 끝낼 수 있는 작은 일을 고릅니다. 끝내는 데 필요한 조건을 적고, 다른 사람에게 확인할 내용을 한 줄의 질문으로 만들어 보세요.','좋은 질문은 정답을 보장하지 않습니다. 대신 다음 행동을 분명하게 만들어 줍니다. 틀렸다는 사실을 빨리 발견할 수 있는 질문, 서로 다른 관점을 들을 수 있는 질문을 가까이 두면 배움은 조금 더 넓어집니다.'],
    ['다른 사람의 속도는 참고가 될 수 있지만 나의 기준을 대신할 수는 없습니다. 지금 사용할 수 있는 시간과 에너지를 살펴보고 무리 없이 이어갈 수 있는 크기로 계획을 줄여 봅니다.','매일 같은 시간에 책을 펴기 어렵다면 이미 하고 있는 행동 뒤에 독서를 붙여 보세요. 차를 준비한 뒤 한 문단을 읽거나, 컴퓨터를 닫기 전에 오늘 배운 것을 한 줄 적는 식입니다. 작은 행동이 반복되면 시작하는 데 필요한 힘이 줄어듭니다.','놓친 날이 있어도 기록 전체를 지울 필요는 없습니다. 쉬어 간 자리도 자신의 생활을 이해하는 자료가 됩니다. 왜 어려웠는지 살펴보고 다음 시도를 조금 더 쉽게 만들어 주세요. 꾸준함은 중단 없는 직선보다 다시 돌아오는 힘에 가깝습니다.'],
    ['책을 덮기 전에 한 가지를 골라 봅니다. 오늘 배운 것 중 내일 실제로 해 볼 수 있는 일은 무엇일까요. 거창한 약속보다 시간과 장소가 떠오르는 작은 행동이면 충분합니다.','노트의 빈칸에 다음 세 문장을 채워 보세요. 오늘 새롭게 발견한 것은 무엇인지, 여전히 궁금한 것은 무엇인지, 다음에 시도할 일은 무엇인지. 그 기록은 다음 독서가 시작될 때 좋은 이정표가 됩니다.','모든 페이지를 기억할 필요는 없습니다. 한 문장이 생각의 방향을 바꾸었다면, 작은 실천 하나가 내일을 조금 다르게 만들었다면 그 독서는 이미 자신의 것이 되었습니다. 당신의 다음 페이지에도 새로운 가능성이 기다리고 있습니다.']
  ];
  const introductions={1:'AI와 함께 일한다는 것은 생각을 맡기는 일이 아니라 생각을 더 분명하게 표현하는 연습입니다. 목적과 자료, 확인할 기준을 정리할수록 도구는 더 쓸모 있는 동료가 됩니다.',2:'데이터를 읽는 출발점은 숫자가 아니라 질문입니다. 무엇을 세었는지, 어떤 맥락에서 모았는지, 빠져 있는 것은 무엇인지 살펴보면 표 너머의 이야기가 보이기 시작합니다.',3:'단단함은 흔들리지 않는 상태보다 흔들린 뒤 자신에게 돌아오는 힘에 가깝습니다. 오늘의 마음을 있는 그대로 살피고 나에게 맞는 속도로 다음 발을 내딛어 보세요.',4:'시작에는 완벽한 이유보다 작은 호기심 하나가 더 큰 힘이 되기도 합니다. 아직 능숙하지 않다는 사실은 포기할 근거가 아니라 지금 배우고 있다는 표시일 수 있습니다.',5:'작은 습관은 큰 결심보다 가까운 곳에 있습니다. 오늘 이미 하고 있는 행동 뒤에 한 가지를 더하면 내일의 시작이 조금 쉬워집니다.',6:'질문 하나를 바꾸면 대화의 방향도 달라집니다. 왜 안 되는지 묻는 대신 무엇이 필요할지 함께 살피면 새로운 선택지가 열립니다.',7:'웹사이트는 화면을 그리는 코드와 사용자 행동을 연결하는 코드가 만나는 곳입니다. 가장 작은 페이지에서 시작해 한 가지 기능을 끝까지 연결해 보세요.',8:'계절의 변화를 알아차리는 데 먼 여행이 꼭 필요한 것은 아닙니다. 같은 창문으로 들어오는 빛의 길이, 어제와 조금 다른 바람 속에도 기록할 이야기가 있습니다.'};
  function chapterParagraphs(b,index){return index===0?[introductions[b.id],...commonChapters[index]]:commonChapters[index];}
  function openReader(id,sample=false,chapter=null){
    const b=getBook(id);if(!b)return;
    if(!sample&&!owned(id)){openAuth('login','library');return;}
    const p=progressFor(id);reader={id:Number(id),sample,chapter:chapter??p.chapter,font:p.font||17,dark:!!p.dark};
    renderReader();
  }
  function renderReader(){
    if(!reader)return;const r={...reader},b=getBook(r.id),p=progressFor(r.id),index=r.sample?0:Math.max(0,Math.min(3,r.chapter));
    if(!r.sample)setProgress(r.id,{chapter:index,started:true});
    openModal(`<div class="reader-layout"><header class="reader-header"><div><h2 id="modal-title">${b.title}</h2><p>${r.sample?'구매 전 미리 읽기 · 1장 샘플':'내 서재 · 구매한 체험 전자책'} / ${b.author}</p></div><div class="reader-tools"><button data-action="reader-toc" aria-label="목차 보기">목차</button><button data-action="font-small" aria-label="글자 작게">A−</button><button data-action="font-big" aria-label="글자 크게">A+</button><button data-action="reader-theme" aria-label="${r.dark?'밝은 배경':'어두운 배경'}으로 전환">${r.dark?'☀':'☾'}</button><button class="${p.bookmark===index?'active':''}" data-action="bookmark" aria-pressed="${p.bookmark===index}" aria-label="이 장 책갈피">${icon('bookmark')}</button>${!r.sample?`<button data-action="download-book" aria-label="체험 전자책 HTML 다운로드">${icon('download')}</button>`:''}</div></header><div class="reader-scroll" id="reader-scroll"><article class="reader-page" style="font-size:${r.font}px"><p class="reader-chapter">CHAPTER ${String(index+1).padStart(2,'0')} · HONGMUNWON</p><h3>${chapterTitles[index]}</h3>${chapterParagraphs(b,index).map(text=>`<p>${text}</p>`).join('')}<blockquote>“${b.caption}”</blockquote><p class="reader-sample-note">이 글은 쇼핑몰의 전자책 열람 기능을 확인하기 위해 직접 작성한 샘플 원고입니다. 전시용 도서의 실제 출판 본문을 의미하지 않습니다.${r.sample?' 구매 흐름을 체험하면 내 서재에서 4개 장 전체를 열 수 있습니다.':''}</p></article></div><footer class="reader-footer"><button data-action="reader-prev" ${index===0?'disabled':''}>${icon('chevron','flipped')} 이전 장</button><span>${index+1} / ${r.sample?'1':'4'}장 · ${r.sample?'미리보기':Math.round((index+1)/4*100)+'%'}</span>${r.sample?`<button data-action="detail" data-id="${b.id}" data-format="ebook">전자책 보기 ${icon('arrow')}</button>`:`<button data-action="reader-next" ${index===3?'disabled':''}>다음 장 ${icon('chevron')}</button>`}</footer></div>`,'reader-modal'+(r.dark?' dark':''));
    reader=r;
  }
  function readerTOC(){
    if(!reader)return;const r={...reader},b=getBook(r.id),p=progressFor(r.id);
    openModal(`<div class="dialog-pad"><p class="dialog-kicker">TABLE OF CONTENTS</p><h2 id="modal-title">${b.title}</h2><div class="reader-toc">${chapterTitles.map((t,i)=>`<button class="toc-button" data-action="toc-chapter" data-id="${b.id}" data-index="${i}" data-sample="${r.sample}" ${r.sample&&i>0?'disabled':''}><span>${String(i+1).padStart(2,'0')} &nbsp; ${t}</span><span>${p.bookmark===i?icon('bookmark'):icon('arrow')}</span></button>`).join('')}</div><button class="btn btn-blue full" data-action="toc-chapter" data-id="${b.id}" data-index="${r.chapter}" data-sample="${r.sample}">읽던 곳으로 돌아가기</button></div>`,'small');reader=r;
  }
  function downloadBook(){
    if(!reader||reader.sample||!owned(reader.id))return;const b=getBook(reader.id);
    const html=`<!DOCTYPE html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${b.title} — 체험 전자책</title><style>body{max-width:680px;padding:45px 25px;margin:auto;background:#fbfaf6;color:#24334b;font:17px/2 Georgia,"Malgun Gothic",serif}h1{font-size:32px}h2{margin-top:70px;font-size:25px}small{font:12px/1.8 sans-serif;color:#8290a4}@media print{h2{break-before:page}}</style><h1>${b.title}</h1><p>${b.subtitle}</p><small>${b.author} · 홍문원 북스토어<br>이 파일은 직접 작성한 체험용 샘플 원고입니다. 실제 출판 도서가 아닙니다.</small>${chapterTitles.map((title,i)=>`<h2>${i+1}. ${title}</h2>${chapterParagraphs(b,i).map(p=>`<p>${p}</p>`).join('')}`).join('')}</html>`;
    const blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=`홍문원_체험전자책_${b.id}.html`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('체험 전자책 파일을 다운로드합니다.');
  }

  function info(title,body){openModal(`<div class="dialog-pad"><p class="dialog-kicker">HONGMUNWON GUIDE</p><h2 id="modal-title">${title}</h2><div class="policy-text">${body}</div></div>`,'small');}
  const policies={
    'shipping-info':['책을 기다리는 즐거움','<h3>배송비 안내</h3><p>종이책 합계 30,000원 이상 무료배송, 미만 주문은 3,000원으로 구성했습니다. 전자책 구매금액은 종이책 무료배송 기준에 포함되지 않습니다.</p><h3>현재 버전</h3><p>주문 화면을 위한 예시 정책입니다. 실제 상품 출고나 배송은 이루어지지 않습니다.</p>'],
    'points-info':['읽을수록 커지는 혜택','<h3>등급별 적립률</h3><p>리더 1% · 플러스 3% · 프리미엄 5% · 블루 7%입니다. 누적 도서 실결제액이 각각 10만·30만·50만 원 이상이면 다음 등급이 됩니다.</p><h3>적립과 사용</h3><p>1P는 1원으로, 1P부터 사용할 수 있습니다. 배송비와 포인트 사용액을 제외한 도서 실결제액에 주문 직전 등급 적립률을 적용하고 소수점은 버립니다. 체험 결제 완료 시 적립과 등급을 즉시 반영합니다.</p><h3>체험 안내</h3><p>체험 포인트는 현금 가치가 없으며 이 브라우저에서만 사용할 수 있습니다. 실제 서비스의 유효기간·취소·환불 정책은 운영 시 별도 확정해야 합니다.</p>'],
    'terms':['체험 이용 안내','<h3>서비스 범위</h3><p>이 사이트는 홍문원 북스토어의 디자인과 구매 과정을 확인하는 프런트엔드 체험 버전입니다. 전시된 도서는 가상 상품이며 실제 결제·출고·배송은 발생하지 않습니다.</p><h3>전자책</h3><p>체험 결제 후 내 서재에 전자책이 추가되고 4개 장의 샘플 원고를 열람할 수 있습니다. 이 파일의 접근 제한은 실제 유료 콘텐츠 보호를 위한 인증 체계가 아닙니다.</p><h3>실제 서비스 전환</h3><p>회원 인증, 결제대행사, 주문 관리, 결제 검증, 배송과 전자책 다운로드 권한을 운영 서버에 연결해야 합니다. 사업자 정보와 이용약관도 운영 내용에 맞게 등록해야 합니다.</p>'],
    'privacy':['체험 정보 저장 안내','<h3>이 브라우저에 저장되는 정보</h3><p>체험 회원의 이름·이메일·비밀번호의 해시와 개별 salt, 포인트, 주문 내역, 관심 도서와 읽던 위치를 localStorage에 저장합니다. 비밀번호 원문은 저장하지 않습니다. 비밀번호는 PBKDF2-SHA-256 120,000회로 처리합니다.</p><h3>저장하지 않는 정보</h3><p>배송지·전화번호·배송 메모는 주문 화면의 필수 입력 흐름을 보여주기 위한 것이며 주문 내역에 저장하지 않습니다. 카드번호나 결제 비밀번호는 수집하지 않습니다.</p><h3>삭제</h3><p>푸터의 ‘체험 데이터 초기화’를 사용하면 이 사이트의 체험 데이터를 모두 지울 수 있습니다. 실제 개인정보나 다른 서비스에서 사용하는 비밀번호는 입력하지 마세요.</p>']
  };

  const slides=[
    {kicker:'A NEW CHAPTER BEGINS',title:'다음 페이지에서,<br>새로운 나를 만나다.',desc:'종이의 온기와 디지털의 자유.<br>당신의 내일을 여는 한 권을 만나보세요.',cta:'나의 다음 책 찾기',type:'all'},
    {kicker:'YOUR LIBRARY, EVERYWHERE',title:'읽고 싶은 순간,<br>이미 당신의 서재에.',desc:'기다림 없이 시작하는 전자책.<br>어디서든 나만의 이야기를 이어가세요.',cta:'전자책 만나보기',type:'ebook'},
    {kicker:'SLOW DOWN, READ A LITTLE',title:'마음을 쉬게 하는<br>한 페이지의 여유.',desc:'바쁜 하루의 끝, 나를 위한 작은 시간.<br>오래 곁에 두고 싶은 이야기를 골랐어요.',cta:'오늘의 책 둘러보기',type:'all'},
    {kicker:'BETTER IDEAS START HERE',title:'배움이 깊어질수록,<br>가능성은 넓어지니까.',desc:'새로운 생각이 필요한 당신에게.<br>일과 일상을 바꾸는 배움을 전합니다.',cta:'배움의 책 발견하기',type:'all',category:'AI·IT'}
  ];
  let slideIndex=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,slideTimer=null;
  function showSlide(index){
    slideIndex=(index+slides.length)%slides.length;const s=slides[slideIndex];
    $$('.hero-slide').forEach((el,i)=>{el.classList.toggle('is-active',i===slideIndex);el.setAttribute('aria-hidden',i!==slideIndex);});
    $('#hero-kicker').textContent=s.kicker;$('#hero-title').innerHTML=s.title;$('#hero-desc').innerHTML=s.desc;$('#hero-number').textContent=String(slideIndex+1).padStart(2,'0');$('#hero-progress').style.width=`${(slideIndex+1)/4*100}%`;
    $('#hero-cta').innerHTML=s.cta+icon('arrow');$('#hero-cta').dataset.type=s.type;$('#hero-cta').dataset.category=s.category||'all';
    $$('#hero-dots button').forEach((el,i)=>{el.classList.toggle('active',i===slideIndex);if(i===slideIndex)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current');});
  }
  function startSlides(){clearInterval(slideTimer);if(!paused&&!document.hidden)slideTimer=setInterval(()=>showSlide(slideIndex+1),6500);}
  function updatePause(){const button=$('#hero-pause');button.textContent=paused?'▷':'Ⅱ';button.setAttribute('aria-label',paused?'슬라이드 자동 재생 시작':'슬라이드 자동 재생 정지');}
  document.addEventListener('visibilitychange',startSlides);
  $('.hero').addEventListener('mouseenter',()=>clearInterval(slideTimer));$('.hero').addEventListener('mouseleave',startSlides);
  $('.hero').addEventListener('focusin',()=>clearInterval(slideTimer));$('.hero').addEventListener('focusout',e=>{if(!$('.hero').contains(e.relatedTarget))startSlides();});
  $('#search-form').addEventListener('submit',e=>{e.preventDefault();filter.query=$('#search-input').value.trim();filter.category='all';filter.expanded=true;renderBooks();$('#books').scrollIntoView({behavior:'smooth'});});
  $('#search-input').addEventListener('search',()=>{if(!$('#search-input').value){filter.query='';renderBooks();}});
  $('#sort-select').addEventListener('change',e=>{filter.sort=e.target.value;renderBooks();});
  let scrollPending=false;window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(()=>{$('#back-top').classList.toggle('visible',window.scrollY>600);scrollPending=false;});}},{passive:true});

  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-action]');if(!button||button.disabled)return;
    const a=button.dataset.action,id=Number(button.dataset.id),index=Number(button.dataset.index);
    if(a==='filter'){browse(button.dataset.type,button.dataset.category||'all');return;}
    if(a==='category'){filter.category=button.dataset.category;renderBooks();return;}
    if(a==='bestseller'){filter.sort='best';browse('all');$('#books-heading').textContent='지금, 가장 사랑받는 이야기';return;}
    if(a==='more'){filter.expanded=!filter.expanded;renderBooks();return;}
    if(a==='clear-filters'){filter={type:'all',category:'all',query:'',sort:'featured',expanded:false};$('#search-input').value='';renderBooks();return;}
    if(a==='detail'){detail(id,button.dataset.format);return;}
    if(a==='quick-add'){addCart(id,button.dataset.format);return;}
    if(a==='detail-add'||a==='detail-buy'){
      const format=$('input[name="book-format"]:checked',modalContent)?.value||'paper';
      if(addCart(id,format)){if(a==='detail-buy')openCheckout();else openCart();}return;
    }
    if(a==='wish'){
      const found=state.wish.indexOf(id);if(found>=0)state.wish.splice(found,1);else state.wish.push(id);save();renderBooks();toast(found>=0?'관심 도서에서 해제했어요.':'관심 도서에 저장했어요.');return;
    }
    if(a==='wishlist'){wishlist();return;}
    if(a==='cart'){openCart();return;}
    if(a==='close-cart'){drawer.close();return;}
    if(a==='remove-cart'){state.cart.splice(index,1);save();renderHeader();renderCart();return;}
    if(a==='qty'){const row=state.cart[index];if(row){row.qty=Math.max(1,Math.min(99,row.qty+Number(button.dataset.delta)));save();renderHeader();renderCart();}return;}
    if(a==='checkout'){openCheckout();return;}
    if(a==='all-points'){$('#points-input').value=Math.min(user().points,cartTotals().subtotal);updateCheckout();return;}
    if(a==='login'||a==='signup'){openAuth(a);return;}
    if(a==='demo-login'){demoLogin();return;}
    if(a==='account'){openAccount();return;}
    if(a==='logout'){state.current=null;authNext=null;save();renderHeader();closeModal();toast('로그아웃했어요.');return;}
    if(a==='library'){openLibrary();return;}
    if(a==='sample'){openReader(1,true,0);return;}
    if(a==='read'){openReader(id,button.dataset.sample==='true');return;}
    if(a==='close'){closeModal();return;}
    if(a==='reader-next'||a==='reader-prev'){if(reader&&!reader.sample){reader.chapter=Math.max(0,Math.min(3,reader.chapter+(a==='reader-next'?1:-1)));renderReader();}return;}
    if(a==='font-small'||a==='font-big'){if(reader){reader.font=Math.max(14,Math.min(24,reader.font+(a==='font-big'?1:-1)));setProgress(reader.id,{font:reader.font});const position=$('#reader-scroll')?.scrollTop||0;renderReader();$('#reader-scroll').scrollTop=position;}return;}
    if(a==='reader-theme'){if(reader){reader.dark=!reader.dark;setProgress(reader.id,{dark:reader.dark});const position=$('#reader-scroll')?.scrollTop||0;renderReader();$('#reader-scroll').scrollTop=position;}return;}
    if(a==='bookmark'){if(reader){const p=progressFor(reader.id);setProgress(reader.id,{bookmark:p.bookmark===reader.chapter?null:reader.chapter});const position=$('#reader-scroll')?.scrollTop||0;renderReader();$('#reader-scroll').scrollTop=position;toast(p.bookmark===reader.chapter?'책갈피를 해제했어요.':'이 장에 책갈피를 남겼어요.');}return;}
    if(a==='reader-toc'){readerTOC();return;}
    if(a==='toc-chapter'){openReader(id,button.dataset.sample==='true',index);return;}
    if(a==='download-book'){downloadBook();return;}
    if(a==='hero-next'||a==='hero-prev'){showSlide(slideIndex+(a==='hero-next'?1:-1));startSlides();return;}
    if(a==='hero-goto'){showSlide(index);startSlides();return;}
    if(a==='hero-pause'){paused=!paused;updatePause();startSlides();return;}
    if(a==='top'){window.scrollTo({top:0,behavior:'smooth'});return;}
    if(policies[a]){info(...policies[a]);return;}
    if(a==='reset'){
      info('체험 데이터를 지울까요?','<p>이 브라우저의 체험 회원, 포인트, 장바구니, 주문, 관심 도서와 읽던 위치가 모두 삭제됩니다. 삭제 후에는 되돌릴 수 없습니다.</p><button class="btn btn-navy full" data-action="confirm-reset" style="margin-top:25px">모든 체험 데이터 삭제</button>');return;
    }
    if(a==='confirm-reset'){state=freshState();save();authNext=null;renderHeader();renderBooks();closeModal();toast('체험 데이터를 초기화했어요.');}
  });
  renderHeader();renderBooks();showSlide(0);updatePause();startSlides();
})();
