'use strict';

const King = (() => {
  const size = 5;
  const cellCount = size ** 2;
  const ranks = [1, 2, 3, 4, 5, 6];
  const counts = [7, 4, 5, 5, 3, 1];
  const hand = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6];
  const label = (rank) => rank === 6 ? 'K' : String(rank);
  const lines = Array.from({ length: size * 2 }, (_, index) =>
    Array.from({ length: size }, (_, offset) =>
      index < size ? index * size + offset : offset * size + index - size
    )
  );
  const rewards = [
    { id: 'bronze', label: 'Bronz Kral Ganimeti', min: 10, range: '10–399' },
    { id: 'silver', label: 'Gümüş Kral Ganimeti', min: 400, range: '400–549' },
    { id: 'gold', label: 'Altın Kral Ganimeti', min: 550, range: '550+' },
  ];

  function neighbors(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    return Array.from({ length: cellCount }, (_, cell) => cell).filter((cell) =>
      index !== cell && Math.abs(Math.floor(cell / size) - row) <= 1 && Math.abs(cell % size - col) <= 1
    );
  }

  const adjacent = Array.from({ length: cellCount }, (_, index) => neighbors(index));

  function hasClosedFiveNeighbor(game, index) {
    return adjacent[index].some((cell) => game.board[cell] === 5 && !game.captured.has(cell));
  }

  function createGame(random = Math.random) {
    const board = ranks.flatMap((rank, index) => Array(counts[index]).fill(rank));
    for (let index = board.length - 1; index > 0; index--) {
      const other = Math.floor(random() * (index + 1));
      [board[index], board[other]] = [board[other], board[index]];
    }
    return { board, captured: new Set(), lineCells: new Set(), turn: 0, score: 0, last: null };
  }

  function play(game, index) {
    if (!Number.isInteger(index) || index < 0 || index >= cellCount ||
      game.turn >= hand.length || game.captured.has(index)) return null;
    const own = hand[game.turn];
    const revealed = game.board[index];
    const nearFive = hasClosedFiveNeighbor(game, index);
    const trapped = own === 5 && nearFive;
    const captured = own === 6 ? revealed === 6 : !trapped && own >= revealed;
    const points = captured ? revealed === 6 ? 100 : revealed * 10 : 0;
    let bingo = 0;
    if (captured) {
      game.captured.add(index);
      for (const line of lines) {
        if (line.includes(index) && line.every((cell) => game.captured.has(cell))) {
          bingo += 10;
          line.forEach((cell) => game.lineCells.add(cell));
        }
      }
    }
    if (!captured || own === revealed) game.turn++;
    game.score += points + bingo;
    game.last = { index, own, revealed, nearFive, trapped, captured, points, bingo };
    return game.last;
  }

  function rewardFor(score) {
    return rewards.findLast((reward) => score >= reward.min);
  }

  return { cellCount, ranks, counts, hand, label, adjacent, hasClosedFiveNeighbor, rewards, createGame, play, rewardFor };
})();

if (typeof module !== 'undefined') module.exports = King;
