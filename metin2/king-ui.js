'use strict';

(() => {
  const { cellCount, ranks, counts, hand, label, adjacent, hasClosedFiveNeighbor, rewards, createGame, play, rewardFor } = King;
  const notesKey = 'hec-king-notes-v1';
  const blankNotes = () => Array.from({ length: cellCount }, () => ({ rank: null, clue: null }));
  const coordinate = (index) => `${'ABCDE'[Math.floor(index / 5)]}${index % 5 + 1}`;
  const cardImage = (rank) => `<img src="assets/king/card-${label(rank).toLowerCase()}.png" alt="" width="50" height="36">`;
  const emptyCard = '<i class="king-glyph" aria-hidden="true"></i>';

  function loadNotes() {
    try {
      const saved = JSON.parse(localStorage.getItem(notesKey));
      if (Array.isArray(saved) && saved.length === cellCount) return saved.map((cell) => ({
        rank: ranks.includes(cell?.rank) ? cell.rank : null,
        clue: ['yes', 'no'].includes(cell?.clue) ? cell.clue : null,
      }));
    } catch { /* Notes are available for the current session. */ }
    return blankNotes();
  }

  let game = createGame();

  function cellButton(index, content, description, classes, attributes = '') {
    return `<button type="button" class="king-cell ${classes}" data-king-cell="${index}"
      aria-label="${coordinate(index)}, ${description}" ${attributes}>
      <span class="king-coordinate" aria-hidden="true">${coordinate(index)}</span>${content}</button>`;
  }

  function mountNotebook(root, persist = false) {
    root.append(get('king-notebook-fields').content.cloneNode(true));
    const field = (name) => root.querySelector(`[data-notebook="${name}"]`);
    let notes = persist ? loadNotes() : blankNotes();
    let selectedCell = null;
    let previousNotes = null;
    let noteMessage = '';

    function renderNotes() {
      const countsUsed = ranks.map((rank) => notes.filter((cell) => cell.rank === rank).length);
      const picked = notes[selectedCell];
      const safe = new Set();
      const possible = new Set();
      const nearKnown = new Set();
      notes.forEach(({ clue, rank }, index) => {
        if (clue === 'no') adjacent[index].forEach((cell) => safe.add(cell));
        if (clue === 'yes') adjacent[index].forEach((cell) => possible.add(cell));
        if (rank === 5) adjacent[index].forEach((cell) => nearKnown.add(cell));
      });
      field('king-notes').innerHTML = notes.map(({ rank, clue }, index) => {
        const state = rank ? 'known' : safe.has(index) ? 'safe' : possible.has(index) ? 'risk' : 'hidden-card';
        const description = rank ? `kart ${label(rank)}` : state === 'safe' ? '5 yok' : state === 'risk' ? '5 olabilir' : 'bilinmiyor';
        const signal = clue ? `<span class="king-signal" aria-hidden="true">${clue === 'yes' ? '5+' : '5−'}</span>` : '';
        const clueText = clue ? (clue === 'yes' ? ', yakında 5 var' : ', yakında 5 yok') : '';
        const nearText = nearKnown.has(index) ? ', bilinen 5’e komşu' : '';
        return cellButton(index, (rank ? cardImage(rank) : emptyCard) + signal, description + clueText + nearText,
          state + (nearKnown.has(index) ? ' near-known' : ''), `aria-pressed="${index === selectedCell}"`);
      }).join('');
      field('king-note-cell').textContent = picked ? `${coordinate(selectedCell)} karesi` : 'Kare seç';
      field('king-palette').innerHTML = ranks.map((rank, index) => {
        const available = counts[index] - countsUsed[index];
        const isCurrent = picked?.rank === rank;
        return `<button type="button" class="king-choice" data-king-rank="${rank}" aria-label="Kart ${label(rank)}" aria-pressed="${isCurrent}" ${picked && (available > 0 || isCurrent) ? '' : 'disabled'}>${cardImage(rank)}<small>${available} kaldı</small></button>`;
      }).join('');
      root.querySelectorAll('[data-king-clue]').forEach((button) => {
        button.disabled = !picked;
        button.setAttribute('aria-pressed', picked?.clue === button.dataset.kingClue);
      });
      field('king-clear').disabled = !picked || (!picked.rank && !picked.clue);
      field('king-reset').disabled = notes.every((cell) => !cell.rank && !cell.clue);
      field('king-undo').disabled = previousNotes === null;
      if (persist) {
        get('king-unmarked').textContent = cellCount - countsUsed.reduce((sum, used) => sum + used, 0);
        get('king-remaining').innerHTML = ranks.map((rank, index) => `
          <div class="breakdown-row"><span>${cardImage(rank)} Kart ${label(rank)}</span><strong>${counts[index] - countsUsed[index]}<small> / ${counts[index]}</small></strong></div>
        `).join('');
      }
      field('king-note-status').textContent = noteMessage;
    }

    function saveNotes() {
      if (persist) {
        try { localStorage.setItem(notesKey, JSON.stringify(notes)); } catch { /* Keep the current session usable. */ }
      }
      renderNotes();
    }

    function changeNotes(next, message) {
      previousNotes = notes;
      notes = next;
      noteMessage = message;
      saveNotes();
    }

    function editNote(index, update, message) {
      changeNotes(notes.map((cell, cellIndex) => cellIndex === index ? { ...cell, ...update } : cell), message);
    }

    const noteBoard = field('king-notes');
    const noteButton = (index) => noteBoard.querySelector(`[data-king-cell="${index}"]`);
    noteBoard.addEventListener('click', (event) => {
      const button = event.target.closest('[data-king-cell]');
      if (!button) return;
      selectedCell = Number(button.dataset.kingCell);
      noteMessage = '';
      renderNotes();
      noteButton(selectedCell).focus({ preventScroll: true });
    });
    noteBoard.addEventListener('contextmenu', (event) => {
      const button = event.target.closest('[data-king-cell]');
      if (!button) return;
      event.preventDefault();
      const index = Number(button.dataset.kingCell);
      if (!notes[index].rank && !notes[index].clue) return;
      selectedCell = index;
      editNote(index, { rank: null, clue: null }, `${coordinate(index)} temizlendi.`);
      noteButton(index).focus({ preventScroll: true });
    });
    field('king-palette').addEventListener('click', (event) => {
      const button = event.target.closest('[data-king-rank]');
      if (!button || selectedCell === null) return;
      const rank = Number(button.dataset.kingRank);
      editNote(selectedCell, { rank }, `${coordinate(selectedCell)} karesine ${label(rank)} kaydedildi.`);
      field('king-palette').querySelector(`[data-king-rank="${rank}"]`).focus({ preventScroll: true });
    });
    root.querySelectorAll('[data-king-clue]').forEach((button) => {
      button.addEventListener('click', () => {
        const clue = notes[selectedCell].clue === button.dataset.kingClue ? null : button.dataset.kingClue;
        editNote(selectedCell, { clue }, clue ? 'Komşu karelerin işaretleri güncellendi.' : 'İpucu kaldırıldı.');
      });
    });
    field('king-clear').addEventListener('click', () => {
      editNote(selectedCell, { rank: null, clue: null }, `${coordinate(selectedCell)} temizlendi.`);
      noteButton(selectedCell).focus({ preventScroll: true });
    });
    field('king-reset').addEventListener('click', () => {
      selectedCell = null;
      changeNotes(blankNotes(), 'Not defteri sıfırlandı.');
    });
    field('king-undo').addEventListener('click', () => {
      if (!previousNotes) return;
      notes = previousNotes;
      previousNotes = null;
      noteMessage = 'Son değişiklik geri alındı.';
      saveNotes();
    });
    renderNotes();
    return {
      reset() {
        notes = blankNotes();
        selectedCell = null;
        previousNotes = null;
        noteMessage = '';
        renderNotes();
      },
      record(index, rank, clue) {
        const limit = counts[rank - 1];
        const used = notes.filter((cell, cellIndex) => cellIndex !== index && cell.rank === rank).length;
        selectedCell = index;
        if (used >= limit) {
          noteMessage = 'Bu kartın tüm adetleri işaretli. Önce önceki notlarını kontrol et.';
          renderNotes();
          return;
        }
        editNote(index, { rank, clue }, `${coordinate(index)} karesine ${label(rank)} kaydedildi.`);
      },
    };
  }

  mountNotebook(get('king-live-notebook'), true);
  const practiceNotes = mountNotebook(get('king-practice-notebook'));

  function gameMessage(finished) {
    const last = game.last;
    if (!last) return 'Başlamak için tahtadaki kapalı kartlardan birini aç.';
    const { index, own, revealed, trapped, nearFive, captured, points, bingo } = last;
    const result = captured ? `+${points} puan${bingo ? ` · Bingo +${bingo}` : ''}` : 'Puan yok';
    const clue = trapped ? ' · Komşu 5, elindeki 5’i düşürdü' : nearFive && own < 6 ? ' · Yakında kapalı 5 var' : '';
    const turn = finished ? ' · Tur bitti' : '';
    return `${coordinate(index)} karesinde ${label(revealed)} açıldı. ${result}${clue}${turn}.`;
  }

  function renderGame() {
    const rank = hand[game.turn];
    const finished = !rank;
    const playingFive = rank === 5;
    const last = game.last;
    const warning = !finished && !playingFive && last?.nearFive && last.own < 6 && !last.trapped;
    const litNeighbors = warning ? adjacent[last.index] : [];
    const trapSquares = new Set();
    if (playingFive) {
      game.board.forEach((_, index) => {
        if (!game.captured.has(index) && hasClosedFiveNeighbor(game, index)) trapSquares.add(index);
      });
    }
    const trapGuide = get('king-trap-guide');
    trapGuide.hidden = !playingFive;
    trapGuide.textContent = playingFive
      ? (trapSquares.size
        ? 'Elinde 5 var. Kırmızı Tuzak karelerinden kaçın. Orada 5’in düşer ve 0 puan alırsın.'
        : 'Elinde 5 var. Tahtada komşu 5 tuzağı kalmadı.')
      : '';
    get('king-five-alert').hidden = !warning;
    get('king-note-last').disabled = !last;
    const reward = rewardFor(game.score);
    get('king-current').innerHTML = finished ? '<strong>Tur bitti</strong>' : `${cardImage(rank)}<span>Kartım <strong>${label(rank)}</strong></span>`;
    get('king-hand').innerHTML = ranks.map((value) => {
      const count = hand.slice(game.turn + 1).filter((item) => item === value).length;
      return `<span aria-label="${label(value)} kartı, ${count} adet">${cardImage(value)}<small>×${count}</small></span>`;
    }).join('');
    get('king-board').innerHTML = game.board.map((card, index) => {
      const captured = game.captured.has(index);
      const peek = game.last?.index === index && !captured;
      const description = captured ? `${label(card)} yakalandı` : finished || peek ? `${label(card)} açıldı` : 'kapalı kart';
      let classes = captured ? `known ${game.lineCells.has(index) ? 'bingo' : ''}` : peek ? 'miss' : finished ? 'unclaimed' : 'hidden-card';
      const highlighted = !captured && litNeighbors.includes(index);
      if (highlighted) classes += ' five-neighbor';
      const trapped = trapSquares.has(index);
      if (trapped) classes += ' five-trap';
      const face = captured || finished || peek ? cardImage(card) : emptyCard;
      const badge = trapped ? '<span class="king-trap-label" aria-hidden="true">Tuzak</span>' : '';
      const hint = trapped ? ', Tuzak, 0 puan' : highlighted ? ', 5 arama alanı' : '';
      return cellButton(index, face + badge, description + hint, classes, captured || finished ? 'disabled' : '');
    }).join('');
    get('king-score').textContent = game.score;
    setProgress('king-progress', game.score, 550);
    get('king-reward').textContent = reward?.label || 'Ganimet için en az 10 puan';
    get('king-game-status').textContent = gameMessage(finished);
  }

  const gameBoard = get('king-board');
  gameBoard.addEventListener('click', (event) => {
    const button = event.target.closest('[data-king-cell]');
    if (!button || !play(game, Number(button.dataset.kingCell))) return;
    const keyboard = event.detail === 0;
    renderGame();
    if (keyboard) (gameBoard.querySelector('button:not(:disabled)') || get('king-new-game')).focus({ preventScroll: true });
  });
  get('king-new-game').addEventListener('click', () => {
    game = createGame();
    practiceNotes.reset();
    renderGame();
  });
  get('king-note-last').addEventListener('click', () => {
    const { index, revealed, nearFive, own } = game.last;
    practiceNotes.record(index, revealed, own === 6 ? null : nearFive ? 'yes' : 'no');
  });
  get('king-rewards').innerHTML = rewards.map((reward) => `
    <div class="reward-row"><span class="reward-icon king-reward-icon ${reward.id}" aria-hidden="true"></span>
    <div><strong>${reward.label}</strong><small>${reward.range}</small></div></div>
  `).join('');

  renderGame();
})();
