/* Shared logic: cart, wishlist, search, cards, reveal, sliders */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const rupee = n => '₹' + Number(n).toLocaleString('en-IN');
  const find = id => PRODUCTS.find(p => p.id === id);
  const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
  const FREE_SHIP = 999;

  /* ---------- storage ---------- */
  const KEY = 'aura_cart_v2', WKEY = 'aura_wish_v2';
  const load = k => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  let cart = load(KEY), wish = load(WKEY);
  Object.keys(cart).forEach(id => { if (!find(id) || !(cart[id] > 0)) delete cart[id]; });

  window.rupee = rupee; window.stars = stars; window.findProduct = find;

  /* ---------- toast ---------- */
  const toast = document.createElement('div');
  toast.className = 'toast-box'; document.body.appendChild(toast);
  let tt;
  window.showToast = (msg, icon = 'check-circle-fill') => {
    toast.innerHTML = `<i class="bi bi-${icon}"></i>${msg}`;
    toast.classList.add('show'); clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  /* ---------- cart panel ---------- */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="offcanvas offcanvas-end cart-canvas" id="cartCanvas" tabindex="-1">
    <div class="offcanvas-header"><h5 class="serif m-0">Your Cart <small class="text-muted fs-6">(<span class="cart-count-txt">0</span>)</small></h5><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
    <div class="offcanvas-body d-flex flex-column p-0"><div id="cartItems" class="flex-grow-1 px-3"></div><div id="cartFoot" class="p-3"></div></div>
  </div>
  <div class="modal fade" id="searchModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content p-3">
    <div class="input-group mb-2"><span class="input-group-text bg-white"><i class="bi bi-search"></i></span><input id="searchInput" class="form-control" placeholder="Search perfumes, agarbatti..." autocomplete="off"></div>
    <div id="searchResults" class="search-results"></div></div></div></div>`);

  function openCart() { bootstrap.Offcanvas.getOrCreateInstance($('#cartCanvas')).show(); }
  window.openCart = openCart;

  function count() { return Object.values(cart).reduce((a, b) => a + b, 0); }
  function total() { return Object.entries(cart).reduce((s, [id, q]) => s + find(id).price * q, 0); }

  function renderCart() {
    const n = count();
    $$('.cart-badge').forEach(b => { b.textContent = n; });
    $$('.cart-count-txt').forEach(b => { b.textContent = n; });
    const ids = Object.keys(cart);
    $('#cartItems').innerHTML = ids.length ? ids.map(id => {
      const p = find(id), q = cart[id];
      return `<div class="cart-row"><a href="product.html?id=${id}"><img src="${p.img}" alt="${p.name}"></a>
        <div class="flex-fill"><a href="product.html?id=${id}" class="fw-medium d-block" style="font-size:13px">${p.name}</a><small class="text-muted">${p.sub}</small>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <div class="qty qty-sm"><button data-cq="dec" data-id="${id}">−</button><span>${q}</span><button data-cq="inc" data-id="${id}">+</button></div>
          <b style="font-size:13px">${rupee(p.price * q)}</b></div></div>
        <button class="cart-rm" data-cq="rm" data-id="${id}" title="Remove"><i class="bi bi-x-lg"></i></button></div>`;
    }).join('') : `<div class="text-center text-muted py-5"><i class="bi bi-bag fs-1 d-block mb-2"></i>Your cart is empty.<br><a href="index.html" class="btn-green d-inline-block mt-3">Continue Shopping</a></div>`;
    const t = total();
    $('#cartFoot').innerHTML = ids.length ? `
      <div class="ship-note mb-2">${t >= FREE_SHIP ? '<i class="bi bi-check-circle-fill text-success me-1"></i>You get <b>free shipping</b>!' : `Add <b>${rupee(FREE_SHIP - t)}</b> more for free shipping`}</div>
      <div class="progress mb-3" style="height:5px"><div class="progress-bar" style="width:${Math.min(100, t / FREE_SHIP * 100)}%;background:var(--gold)"></div></div>
      <div class="d-flex justify-content-between mb-3"><span>Subtotal</span><b>${rupee(t)}</b></div>
      <button class="btn-green w-100" id="checkoutBtn">Checkout</button>
      <button class="btn btn-link w-100 text-muted mt-1" id="clearCart" style="font-size:12px">Clear cart</button>` : '';
  }
  const bump = () => $$('.cart-badge').forEach(b => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });

  window.Cart = {
    add(id, q = 1, silent) {
      const p = find(id); if (!p) return;
      cart[id] = (cart[id] || 0) + q; save(KEY, cart); renderCart(); bump();
      if (!silent) showToast(`${p.name}${q > 1 ? ' ×' + q : ''} added to cart`);
    }
  };

  /* ---------- wishlist ---------- */
  function paintWish() {
    $$('[data-wish]').forEach(b => {
      const on = !!wish[b.dataset.wish];
      b.classList.toggle('on', on);
      const i = $('i', b); if (i) { i.classList.toggle('bi-heart-fill', on); i.classList.toggle('bi-heart', !on); }
    });
  }
  window.paintWish = paintWish;
  window.isWished = id => !!wish[id];

  /* ---------- card builders ---------- */
  window.cardHTML = (p, o = {}) => `
  <div class="${o.col || 'col-6 col-md-3'}" data-reveal><div class="pcard">
    <button class="wish" data-wish="${p.id}"><i class="bi bi-heart"></i></button>
    <a href="product.html?id=${p.id}" class="pimg"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
    <div class="pbody"><h6><a href="product.html?id=${p.id}">${p.name}</a></h6><div class="sub">${p.tags}</div>
    <div class="rating">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
    <div class="price">${rupee(p.price)}${o.mrp && p.mrp ? `<del>${rupee(p.mrp)}</del>` : ''}</div>
    <button class="btn-cart" data-add="${p.id}"><i class="bi bi-cart2 me-1"></i>Add to Cart</button></div></div></div>`;
  window.miniHTML = p => `
  <div class="col-6 col-md-3" data-reveal><div class="mini-card">
    <a href="product.html?id=${p.id}" class="pimg"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
    <h6><a href="product.html?id=${p.id}">${p.name}</a></h6><div class="sub">${p.tags}</div><div class="price">${rupee(p.price)}</div>
    <button class="btn-cart" data-add="${p.id}" style="font-size:10px"><i class="bi bi-cart2 me-1"></i>Add to Cart</button></div></div>`;

  /* ---------- search ---------- */
  function runSearch(q) {
    q = q.trim().toLowerCase();
    const list = PRODUCTS.filter(p => !q || (p.name + ' ' + p.tags + ' ' + p.type + ' ' + p.short).toLowerCase().includes(q));
    $('#searchResults').innerHTML = list.length ? list.map(p => `<a class="sr-row" href="product.html?id=${p.id}"><img src="${p.img}"><div><b>${p.name}</b><br><small class="text-muted">${p.sub}</small></div><span class="ms-auto fw-medium">${rupee(p.price)}</span></a>`).join('') : '<div class="text-muted p-3">No products found.</div>';
  }
  $('#searchInput').addEventListener('input', e => runSearch(e.target.value));

  /* ---------- global clicks ---------- */
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      Cart.add(add.dataset.add, 1);
      if (!add.dataset.keep) { const old = add.innerHTML; add.innerHTML = '<i class="bi bi-check2 me-1"></i>Added'; add.disabled = true; setTimeout(() => { add.innerHTML = old; add.disabled = false; }, 1100); }
      return;
    }
    const w = e.target.closest('[data-wish]');
    if (w) {
      e.preventDefault();
      const id = w.dataset.wish; wish[id] ? delete wish[id] : (wish[id] = 1); save(WKEY, wish); paintWish();
      showToast(wish[id] ? 'Added to wishlist' : 'Removed from wishlist', wish[id] ? 'heart-fill' : 'heart');
      return;
    }
    if (e.target.closest('.js-cart')) { e.preventDefault(); openCart(); return; }
    if (e.target.closest('.js-search')) {
      e.preventDefault(); runSearch('');
      const m = bootstrap.Modal.getOrCreateInstance($('#searchModal')); m.show();
      setTimeout(() => $('#searchInput').focus(), 400); return;
    }
    const cq = e.target.closest('[data-cq]');
    if (cq) {
      const id = cq.dataset.id, a = cq.dataset.cq;
      if (a === 'inc') cart[id]++; else if (a === 'dec') cart[id] = Math.max(1, cart[id] - 1); else delete cart[id];
      save(KEY, cart); renderCart(); return;
    }
    if (e.target.id === 'clearCart') { cart = {}; save(KEY, cart); renderCart(); return; }
    if (e.target.id === 'checkoutBtn') { showToast('Demo store: checkout is not connected', 'info-circle-fill'); return; }
    const soon = e.target.closest('[data-soon]');
    if (soon) { e.preventDefault(); showToast(soon.dataset.soon, 'info-circle-fill'); }
  });

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      $$('.bar i', e.target).forEach(i => (i.style.width = i.dataset.w));
      io.unobserve(e.target);
    }
  }), { threshold: .12 });
  window.observeReveal = () => {
    $$('[data-stagger]').forEach(p => [...p.children].forEach((c, i) => c.style.setProperty('--d', i * .1 + 's')));
    $$('[data-reveal]:not(.in)').forEach(el => io.observe(el));
  };

  /* ---------- header / to-top ---------- */
  const header = $('.site-header');
  const top = document.createElement('button');
  top.className = 'to-top'; top.innerHTML = '<i class="bi bi-arrow-up"></i>';
  top.onclick = () => scrollTo({ top: 0 });
  document.body.appendChild(top);
  addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', scrollY > 30);
    top.classList.toggle('show', scrollY > 500);
  });

  /* ---------- hero slider ---------- */
  const slides = $$('.hero .slide'), dots = $$('.hero-dots button');
  if (slides.length) {
    let i = 0, timer;
    const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === i)); dots.forEach((d, k) => d.classList.toggle('on', k === i)); };
    const reset = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 5000); };
    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); reset(); }));
    go(0); reset();
  }

  /* ---------- testimonial slider ---------- */
  const ts = $$('.t-slide');
  if (ts.length) {
    let t = 0, tm;
    const show = n => { t = (n + ts.length) % ts.length; ts.forEach((s, k) => s.classList.toggle('on', k === t)); $$('.t-dots i').forEach((d, k) => d.classList.toggle('on', k === t)); };
    const rs = () => { clearInterval(tm); tm = setInterval(() => show(t + 1), 6000); };
    $('#tPrev')?.addEventListener('click', () => { show(t - 1); rs(); });
    $('#tNext')?.addEventListener('click', () => { show(t + 1); rs(); });
    show(0); rs();
  }

  /* ---------- newsletter ---------- */
  $$('.news-form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('input', f).value.trim();
    if (/^\S+@\S+\.\S+$/.test(v)) { showToast('Thanks for subscribing!'); f.reset(); }
    else showToast('Please enter a valid email address', 'exclamation-circle-fill');
  }));

  addEventListener('DOMContentLoaded', () => { renderCart(); paintWish(); observeReveal(); });
})();
