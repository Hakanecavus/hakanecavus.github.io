'use strict';

const { colors, cards, byId, rewards, shuffle, evaluate, combinations, rewardFor } = Okey;
const get = (id) => document.getElementById(id);
const storageKey = 'hec-okey-tracker-v1';
const sections = { takip: 'Kart Takibi', antrenman: 'Antrenman', rehber: 'Puan Rehberi', 'kral-takip': 'Kralı Yakala / Not Defteri', 'kral-antrenman': 'Kralı Yakala / Antrenman' };

function loadTracker() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return new Set(Array.isArray(saved) ? saved.filter((id) => Object.hasOwn(byId, id)) : []);
  } catch {
    return new Set();
  }
}

let tracked = loadTracker();
let previousTracker = null;
let game = newGame();
let selected = [];
let lastDiscard = null;
let discardMode = false;
let playTimer = null;
let message = '';

function newGame() {
  return { deck: shuffle(), hand: [], score: 0, history: [], started: false };
}

function buildTracker() {
  get('tracker-grid').innerHTML = colors.map((color) => `
    <div class="color-row">
      <div class="row-label"><i class="dot ${color.id}"></i>${color.label}</div>
      <div class="card-grid">
        ${cards.filter((card) => card.color === color.id).map((card) => `
          <button type="button" class="track-card ${card.color}" data-card="${card.id}" aria-label="${card.label} ${card.rank}" aria-pressed="false">
            <span class="card-corner" aria-hidden="true"></span><span>${card.rank}</span>
          </button>`).join('')}
      </div>
    </div>`).join('');
}

function renderTracker() {
  const remaining = 24 - tracked.size;
  get('tracker-remaining').textContent = remaining;
  setProgress('tracker-progress', remaining, 24);
  get('tracker-undo').disabled = previousTracker === null;
  get('tracker-reset').disabled = !tracked.size;
  document.querySelectorAll('.track-card').forEach((button) => {
    button.setAttribute('aria-pressed', tracked.has(button.dataset.card));
  });
  get('tracker-breakdown').innerHTML = colors.map((color) => {
    const count = cards.filter((card) => card.color === color.id && !tracked.has(card.id)).length;
    return `<div class="breakdown-row"><span><i class="dot ${color.id}"></i>${color.label}</span><strong>${count}<small> / 8</small></strong></div>`;
  }).join('');
}

function saveTracker() {
  try { localStorage.setItem(storageKey, JSON.stringify([...tracked])); } catch { /* Keep the current session usable. */ }
  renderTracker();
}

function editTracker(update) {
  previousTracker = new Set(tracked);
  update();
  saveTracker();
}

function setProgress(id, value, maximum) {
  const progress = get(id);
  const bounded = Math.min(value, maximum);
  progress.setAttribute('aria-valuenow', bounded);
  progress.firstElementChild.style.width = `${bounded / maximum * 100}%`;
}

function miniCards(ids) {
  return ids.map((id) => {
    const card = byId[id];
    return `<span class="mini-card ${card.color}" aria-label="${card.label} ${card.rank}">${card.rank}</span>`;
  }).join('');
}

function populateGuide() {
  document.querySelectorAll('[data-rewards]').forEach((element) => {
    element.innerHTML = rewards.map((reward) => `
      <div class="reward-row"><span class="reward-icon ${reward.id}" aria-hidden="true"></span>
      <div><strong>${reward.label} Sandık</strong><small>${reward.range} puan</small></div></div>`).join('');
  });
  const examples = [
    ['red6', 'red7', 'red8'],
    ['red8', 'yellow8', 'blue8'],
    ['red6', 'yellow7', 'blue8'],
  ];
  get('guide-table').innerHTML = examples.map((ids) => {
    const combo = evaluate(ids);
    return `<div class="guide-row"><strong>${combo.label}</strong><div class="mini-group">${miniCards(ids)}</div><span>${combo.points} puan</span></div>`;
  }).join('');
}

function renderRoute() {
  const hash = location.hash.slice(1);
  const page = Object.hasOwn(sections, hash) ? hash : 'takip';
  for (const id of Object.keys(sections)) get(id).hidden = page !== id;
  document.querySelectorAll('[data-page]').forEach((link) => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  get('breadcrumb').textContent = sections[page];
  const link = get('hero-link');
  const kingPage = page.startsWith('kral-');
  const practice = page.endsWith('antrenman');
  const target = practice ? 'takip' : 'antrenman';
  link.href = '#'+ (kingPage ? 'kral-' : '') + target;
  link.firstChild.nodeValue = practice ? (kingPage ? 'Not defterine geç ' : 'Kart takibine geç ') : 'Antrenmana geç ';
  get('hero').classList.toggle('king-hero', kingPage);
  get('hero-title').textContent = kingPage ? 'Kralı Yakala' : 'Okey Masası';
  get('hero-event').textContent = kingPage ? 'METİN2 KRALI YAKALA ETKİNLİĞİ' : 'METİN2 OKEY ETKİNLİĞİ';
  get('hero-description').textContent = kingPage ? 'Açılan kartları not et veya kendi tahtanda kralı ara.' : 'Kartlarını takip et, hamlelerini antrenmanda dene.';
  get('hero-credit').textContent = kingPage ? 'METİN2 · ETKİNLİK GÖRSELİ' : 'METİN2 · OYUN İÇİ GÖRÜNTÜ';
}

function renderCard(id, onTable = false) {
  if (!id) return '<span class="sim-slot" aria-hidden="true"><i></i></span>';
  const card = byId[id];
  const action = discardMode ? 'at' : onTable ? 'eline döndür' : 'masaya indir';
  return `<button class="play-card ${card.color}" type="button" data-play-card="${id}"
    aria-label="${card.label} ${card.rank}, ${action}" ${playTimer === null ? '' : 'disabled'}>
    <span class="card-corner" aria-hidden="true"></span><strong>${card.rank}</strong><small>${card.label}</small></button>`;
}

function renderSimulator(focusCard) {
  const available = combinations(game.hand);
  const finished = !game.deck.length && !available.length;
  const reward = rewardFor(game.score);
  const playing = playTimer !== null;
  get('antrenman').classList.toggle('discard-mode', discardMode);
  get('sim-table').classList.toggle('is-valid', playing);
  get('sim-table').classList.toggle('is-invalid', selected.length === 3 && !playing);
  get('sim-hand').innerHTML = Array.from({ length: 5 }, (_, index) => {
    const id = game.hand[index];
    return renderCard(selected.includes(id) ? null : id);
  }).join('');
  get('sim-tray').innerHTML = Array.from({ length: 3 }, (_, index) => renderCard(selected[index], true)).join('');
  get('table-count').textContent = `${selected.length} / 3`;
  get('sim-score').textContent = game.score;
  get('sim-deck').textContent = `Destede ${game.deck.length} kart`;
  setProgress('sim-progress', game.score, 400);
  get('sim-reward').textContent = game.started ? `${reward.label} sandık seviyesi` : 'Altın sandık hedefi · 400 puan';
  get('sim-draw').textContent = game.started ? 'Kart çek' : 'Kart dağıt';
  get('sim-draw').disabled = playing || discardMode || selected.length > 0 || !game.deck.length || game.hand.length === 5;
  get('sim-discard').disabled = playing || !game.hand.length;
  get('sim-discard').setAttribute('aria-pressed', discardMode);
  get('sim-discard').textContent = discardMode ? 'Atmayı iptal et' : 'Kart atma';
  get('sim-undo').disabled = playing || !lastDiscard;
  let status = message || 'Geçerli üçlü tamamlanınca otomatik oynanır.';
  if (!game.started) status = 'İlk beş kartı dağıtarak başla.';
  if (selected.length && !playing && !message) status = selected.length === 3
    ? 'Geçersiz üçlü. Bir karta dokunarak eline döndür.'
    : 'Bir karta tekrar dokunarak eline döndürebilirsin.';
  if (finished) status = `Tur tamamlandı · ${game.score} puan · ${reward.label} sandık seviyesi`;
  if (discardMode) status = 'Atmak istediğin karta dokun.';
  get('sim-status').textContent = status;
  get('combo-count').textContent = available.length;
  get('sim-combos').innerHTML = available.length ? available.map((combo, index) => `
    <button class="combo" type="button" data-combo="${index}" ${playing || discardMode ? 'disabled' : ''}>
      <span class="mini-group">${miniCards(combo.ids)}</span><span>${combo.label}</span><strong>+${combo.points}</strong>
    </button>`).join('') : '<p>Bu elde oynanabilir üçlü yok.</p>';
  get('sim-history').innerHTML = game.history.length ? [...game.history].reverse().map((entry) => `
    <div class="history-row"><span class="mini-group">${miniCards(entry.ids)}</span><strong>${entry.points ? '+' + entry.points : 'Atıldı'}</strong></div>`
  ).join('') : '<p class="muted">Henüz hamle yapılmadı.</p>';
  if (focusCard) document.querySelector(`[data-play-card="${focusCard}"]`)?.focus({ preventScroll: true });
}

get('tracker-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-card]');
  if (!button) return;
  const id = button.dataset.card;
  editTracker(() => tracked.has(id) ? tracked.delete(id) : tracked.add(id));
});
get('tracker-reset').addEventListener('click', () => editTracker(() => tracked.clear()));
get('tracker-undo').addEventListener('click', () => {
  if (!previousTracker) return;
  tracked = previousTracker;
  previousTracker = null;
  saveTracker();
});

function stageCards(ids, focusCard) {
  selected = ids;
  message = '';
  const match = evaluate(selected);
  if (match) {
    message = `+${match.points} puan · ${match.label}`;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    playTimer = window.setTimeout(() => {
      game.hand = game.hand.filter((id) => !match.ids.includes(id));
      game.score += match.points;
      game.history.push(match);
      selected = [];
      lastDiscard = null;
      playTimer = null;
      renderSimulator();
      if (!get('antrenman').hidden) {
        const nextControl = get('sim-draw').disabled
          ? get('sim-hand').querySelector('button') || get('sim-reset')
          : get('sim-draw');
        nextControl.focus({ preventScroll: true });
      }
    }, reducedMotion ? 0 : 380);
  }
  renderSimulator(focusCard);
}

function discardCard(id) {
  const index = game.hand.indexOf(id);
  if (index === -1 || playTimer !== null) return;
  lastDiscard = { id, index };
  game.hand.splice(index, 1);
  game.history.push({ ids: [id], points: 0 });
  selected = selected.filter((item) => item !== id);
  discardMode = false;
  const card = byId[id];
  message = `${card.label} ${card.rank} atıldı.`;
  renderSimulator();
  get('sim-undo').focus({ preventScroll: true });
}

get('antrenman').addEventListener('click', (event) => {
  const button = event.target.closest('[data-play-card]');
  if (!button || playTimer !== null) return;
  const id = button.dataset.playCard;
  if (discardMode) {
    discardCard(id);
  } else if (selected.includes(id)) {
    stageCards(selected.filter((item) => item !== id), id);
  } else if (selected.length < 3) {
    stageCards([...selected, id], id);
  }
});
get('antrenman').addEventListener('contextmenu', (event) => {
  const card = event.target.closest('[data-play-card]');
  if (!card) return;
  event.preventDefault();
  discardCard(card.dataset.playCard);
});
get('antrenman').addEventListener('keydown', (event) => {
  if (event.key !== 'Delete' || event.repeat) return;
  const card = event.target.closest('[data-play-card]');
  if (!card) return;
  event.preventDefault();
  discardCard(card.dataset.playCard);
});
get('sim-combos').addEventListener('click', (event) => {
  const button = event.target.closest('[data-combo]');
  if (!button || discardMode || playTimer !== null) return;
  const combo = combinations(game.hand)[Number(button.dataset.combo)];
  stageCards(combo.ids);
});
get('sim-draw').addEventListener('click', () => {
  game.started = true;
  game.hand.push(...game.deck.splice(0, 5 - game.hand.length));
  lastDiscard = null;
  message = '';
  renderSimulator(game.hand[0]);
});
get('sim-discard').addEventListener('click', () => {
  discardMode = !discardMode;
  renderSimulator();
});
get('sim-undo').addEventListener('click', () => {
  if (!lastDiscard) return;
  const { id, index } = lastDiscard;
  game.hand.splice(index, 0, id);
  game.history.pop();
  lastDiscard = null;
  discardMode = false;
  message = 'Son atılan kart geri alındı.';
  renderSimulator(id);
});
get('sim-reset').addEventListener('click', () => {
  window.clearTimeout(playTimer);
  playTimer = null;
  game = newGame();
  selected = [];
  lastDiscard = null;
  discardMode = false;
  message = '';
  renderSimulator();
  get('sim-draw').focus();
});

document.querySelectorAll('.brand, .nav a, #hero-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    renderRoute();
    window.scrollTo(0, 0);
  });
});
window.addEventListener('hashchange', renderRoute);
buildTracker();
populateGuide();
renderTracker();
renderSimulator();
renderRoute();
