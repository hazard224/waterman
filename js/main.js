/* Waterman Center for the Arts: site behavior
   Menu, search, class and event lists, donation amounts and the demo donation form. */
(function () {
  var W = window.WATERMAN || {};
  var CLASSES = W.classes || [], EVENTS = W.events || [], TYPEC = W.typeColors || {};
  var PAGE_NAMES = { home: 'Home', call: 'Call for Artists', classes: 'Classes', gallery: 'Gallery & Events', visit: 'Visit', about: 'About', donate: 'Support the Waterman' };
  var PAGE_COLORS = { home: 'var(--charcoal)', call: 'var(--purple)', classes: 'var(--magenta)', gallery: 'var(--purple)', visit: 'var(--cobalt)', about: 'var(--cobalt)', donate: 'var(--rust)' };
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- menu ---------- */
  var nav = $('#nav'), mb = $('.menu-btn');
  function closeMenu() { if (!nav) return; nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = 'Menu'; }
  if (mb) mb.addEventListener('click', function () {
    closeSearch(false);
    var o = nav.classList.toggle('open');
    mb.setAttribute('aria-expanded', o ? 'true' : 'false'); mb.textContent = o ? 'Close' : 'Menu';
  });

  /* ---------- search ---------- */
  var sBtn = $('.search-btn'), sPanel = $('#search-panel'), q = $('#q'), sRes = $('#search-results'), sStat = $('#search-status');
  var HINT = 'Try “clay”, “kids”, “open house” or “hours”.';
  var INDEX = [];
  CLASSES.forEach(function (c) {
    INDEX.push({ t: c.t, u: 'classes.html', p: 'classes', d: c.type + ', ' + c.ages + '. ' + c.when + '. ' + c.d, col: TYPEC[c.type],
      k: (c.t + ' ' + c.type + ' ' + c.ages + ' ' + c.age + ' ' + c.d + ' ' + c.day + ' class').toLowerCase() });
  });
  EVENTS.forEach(function (e) {
    INDEX.push({ t: e.t, u: 'gallery.html', p: 'gallery', d: e.x, col: 'var(--purple)', k: (e.t + ' ' + e.x + ' event').toLowerCase() });
  });
  (window.WATERMAN_PAGES || []).forEach(function (x) {
    INDEX.push({ t: x.t, u: x.u, p: x.p, d: x.d, col: PAGE_COLORS[x.p], k: (x.t + ' ' + x.d + ' ' + PAGE_NAMES[x.p]).toLowerCase() });
  });
  function openSearch() { sPanel.hidden = false; sBtn.setAttribute('aria-expanded', 'true'); closeMenu(); q.focus(); }
  function closeSearch(back) { if (!sPanel || sPanel.hidden) return; sPanel.hidden = true; sBtn.setAttribute('aria-expanded', 'false'); if (back) sBtn.focus(); }
  if (sBtn) {
    sBtn.addEventListener('click', function () { sPanel.hidden ? openSearch() : closeSearch(true); });
    $('.search-close').addEventListener('click', function () { closeSearch(true); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(true); });
    q.addEventListener('input', function () {
      var terms = q.value.toLowerCase().split(/\s+/).filter(Boolean);
      sRes.innerHTML = '';
      if (!terms.length) { sStat.textContent = HINT; return; }
      var hits = INDEX.filter(function (x) { return terms.every(function (t) { return x.k.indexOf(t) > -1; }); });
      hits.sort(function (a, b) {
        var ta = terms.every(function (t) { return a.t.toLowerCase().indexOf(t) > -1; });
        var tb = terms.every(function (t) { return b.t.toLowerCase().indexOf(t) > -1; });
        return (tb ? 1 : 0) - (ta ? 1 : 0) || (a.p === 'home') - (b.p === 'home');
      });
      var seen = {};
      hits = hits.filter(function (x) { var key = x.u + '|' + x.t; if (seen[key]) return false; seen[key] = 1; return true; }).slice(0, 8);
      sStat.textContent = hits.length ? hits.length + (hits.length === 1 ? ' result' : ' results') : 'No results. Try another word, or email us.';
      hits.forEach(function (x) {
        var li = document.createElement('li'), a = document.createElement('a');
        a.href = x.u;
        a.innerHTML = '<span class="sq" aria-hidden="true"></span><b></b><small></small>';
        a.querySelector('.sq').style.background = x.col || 'var(--charcoal)';
        a.querySelector('b').textContent = x.t;
        a.querySelector('small').textContent = PAGE_NAMES[x.p] + (x.d ? ': ' + x.d : '');
        li.appendChild(a); sRes.appendChild(li);
      });
    });
  }

  /* ---------- classes ---------- */
  function item(c) {
    return '<article class="cli"><div><h3>' + esc(c.t) + '</h3><p class="meta"><span class="sq" style="background:' + TYPEC[c.type] + '" aria-hidden="true"></span>' + esc(c.type) + ', ' + esc(c.ages) + '</p><p class="desc">' + esc(c.d) + '</p><span class="tag">Sample</span></div>' +
      '<dl><dt>When</dt><dd>' + esc(c.when) + '</dd><dt>Starts</dt><dd>' + esc(c.starts) + '</dd><dt>Price</dt><dd>' + esc(c.price) + '</dd></dl>' +
      '<div class="act"><p class="spots">' + esc(c.spots) + '</p><a class="btn ' + (c.full ? 'btn-outline' : 'btn-classes') + '" href="mailto:Gureckipatty4@gmail.com?subject=' + encodeURIComponent((c.full ? 'Waitlist: ' : 'Register: ') + c.t) + '">' + (c.full ? 'Join waitlist' : 'Register') + '<span class="sr"> for ' + esc(c.t) + '</span></a></div></article>';
  }
  var list = $('#class-list');
  if (list) {
    var state = { age: 'all', type: 'all' };
    var renderClasses = function () {
      var d = $('#f-day').value;
      var items = CLASSES.filter(function (c) {
        return (state.age === 'all' || c.age.split(' ').indexOf(state.age) > -1) && (state.type === 'all' || c.type === state.type) && (d === 'all' || c.day === d);
      });
      list.innerHTML = items.length ? items.map(item).join('') : '<p class="empty">No classes match. <a href="mailto:Gureckipatty4@gmail.com?subject=Class%20request">Tell us what you would like to take.</a></p>';
      $('#class-count').textContent = items.length + (items.length === 1 ? ' class' : ' classes');
    };
    $$('[data-tabs] button').forEach(function (b) {
      b.addEventListener('click', function () {
        state.age = b.dataset.age;
        $$('[data-tabs] button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        renderClasses();
      });
    });
    $$('#f-type button').forEach(function (b) {
      b.addEventListener('click', function () {
        state.type = b.dataset.type;
        $$('#f-type button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        renderClasses();
      });
    });
    $('#f-day').addEventListener('change', renderClasses);
    renderClasses();
  }

  /* ---------- events ---------- */
  var evList = $('#event-list');
  if (evList) {
    var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var LOC = 'Waterman Center for the Arts, Liberty Street, Bath, NY 14810';
    var tm = function (t) { var h = +t.slice(0, 2), m = t.slice(3), ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; return h + (m !== '00' ? ':' + m : '') + ' ' + ap; };
    var st = function (ev, t) { return ev.d.replace(/-/g, '') + 'T' + t.replace(':', '') + '00'; };
    evList.innerHTML = EVENTS.map(function (ev) {
      var p = ev.d.split('-'), m = +p[1] - 1, day = +p[2];
      var g = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(ev.t) + '&dates=' + st(ev, ev.s) + '/' + st(ev, ev.e) + '&ctz=America/New_York&details=' + encodeURIComponent(ev.x) + '&location=' + encodeURIComponent(LOC);
      return '<div class="ev"><div class="date" aria-hidden="true"><b>' + day + '</b><small>' + MON[m] + '</small></div><div><h3>' + esc(ev.t) + '</h3><p class="when">' + MONL[m] + ' ' + day + ', ' + p[0] + ', ' + tm(ev.s) + ' to ' + tm(ev.e) + '</p><p>' + esc(ev.x) + '</p><div class="links"><a href="' + g + '" target="_blank" rel="noopener">Add to Google Calendar</a><span class="tag">Sample</span></div></div></div>';
    }).join('');
  }

  /* ---------- homepage gift amounts ---------- */
  var give = $('[data-give]');
  if (give) {
    $$('[data-amts] button').forEach(function (b) {
      b.addEventListener('click', function () {
        var amt = b.dataset.amt;
        $$('[data-amts] button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        give.textContent = 'Give $' + amt;
        give.href = 'support.html?amount=' + amt;
      });
    });
  }

  /* ---------- donation form (demo) ---------- */
  var form = $('#giveform');
  if (form) {
    var preset = new URLSearchParams(location.search).get('amount');
    if (preset) {
      var r = form.querySelector('input[name=amt][value="' + preset + '"]');
      if (r) r.checked = true; else { $('#aother').checked = true; $('#other-amt').value = preset; }
    }
    var curAmt = function () { var v = form.querySelector('input[name=amt]:checked').value; return v === 'other' ? (+$('#other-amt').value || 0) : +v; };
    var updateSum = function () {
      var v = form.querySelector('input[name=amt]:checked').value;
      $('#other-wrap').hidden = v !== 'other';
      $('#sum-amt').textContent = '$' + curAmt().toLocaleString();
      $('#sum-per').textContent = form.querySelector('input[name=freq]:checked').value === 'month' ? 'per month' : 'one time';
    };
    form.addEventListener('change', updateSum); form.addEventListener('input', updateSum); updateSum();
    $('#tribute').addEventListener('change', function (e) { $('#tribute-wrap').hidden = !e.target.checked; });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); var ok = true, first = null;
      function chk(id, err, cond, msg) {
        var el = $('#' + id), er = $('#' + err);
        if (!cond) { el.setAttribute('aria-invalid', 'true'); er.textContent = msg; ok = false; first = first || el; }
        else { el.removeAttribute('aria-invalid'); er.textContent = ''; }
      }
      if (form.querySelector('input[name=amt]:checked').value === 'other') chk('other-amt', 'err-other', curAmt() >= 5, 'Enter an amount of $5 or more.');
      chk('fn', 'err-fn', $('#fn').value.trim(), 'Enter your first name.');
      chk('ln', 'err-ln', $('#ln').value.trim(), 'Enter your last name.');
      chk('em', 'err-em', /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#em').value.trim()), 'Enter an email address like name@example.com.');
      if (!ok) { first.focus(); return; }
      var d = document.createElement('div'); d.className = 'done'; d.tabIndex = -1;
      d.innerHTML = '<h2></h2><p class="lede"></p><p class="muted" style="margin:0">Demo only. On the live site this step opens secure payment.</p>';
      d.querySelector('h2').textContent = 'Thank you, ' + $('#fn').value.trim() + '.';
      d.querySelector('.lede').textContent = 'Your gift of $' + curAmt().toLocaleString() + ' is ready for payment.';
      form.replaceWith(d); d.focus();
    });
  }
})();
