'use strict';

const Okey = (() => {
  const colors = [
    { id: 'red', label: 'Kırmızı' },
    { id: 'yellow', label: 'Sarı' },
    { id: 'blue', label: 'Mavi' },
  ];
  const cards = colors.flatMap((color) =>
    Array.from({ length: 8 }, (_, index) => ({
      id: color.id + (index + 1),
      color: color.id,
      label: color.label,
      rank: index + 1,
    }))
  );
  const byId = Object.fromEntries(cards.map((card) => [card.id, card]));
  const rewards = [
    { id: 'bronze', label: 'Bronz', min: 0, range: '0–299' },
    { id: 'silver', label: 'Gümüş', min: 300, range: '300–399' },
    { id: 'gold', label: 'Altın', min: 400, range: '400+' },
  ];

  function shuffle(random = Math.random) {
    const deck = cards.map((card) => card.id);
    for (let index = deck.length - 1; index > 0; index--) {
      const other = Math.floor(random() * (index + 1));
      [deck[index], deck[other]] = [deck[other], deck[index]];
    }
    return deck;
  }

  function evaluate(ids) {
    if (ids.length !== 3 || new Set(ids).size !== 3 || ids.some((id) => !Object.hasOwn(byId, id))) return null;
    const ordered = ids.map((id) => byId[id]).sort((a, b) => a.rank - b.rank);
    const [first, second, third] = ordered;
    if (first.rank === third.rank) {
      return { ids: ordered.map((card) => card.id), label: 'Aynı sayı', points: 10 * (first.rank + 1) };
    }
    if (second.rank !== first.rank + 1 || third.rank !== second.rank + 1) return null;
    const sameColor = first.color === second.color && second.color === third.color;
    return {
      ids: ordered.map((card) => card.id),
      label: sameColor ? 'Aynı renk seri' : 'Karışık renk seri',
      points: first.rank * 10 + (sameColor ? 40 : 0),
    };
  }

  function combinations(hand) {
    const result = [];
    for (let i = 0; i < hand.length - 2; i++) {
      for (let j = i + 1; j < hand.length - 1; j++) {
        for (let k = j + 1; k < hand.length; k++) {
          const match = evaluate([hand[i], hand[j], hand[k]]);
          if (match) result.push(match);
        }
      }
    }
    return result.sort((a, b) => b.points - a.points);
  }

  function rewardFor(score) {
    return rewards.findLast((reward) => score >= reward.min);
  }

  return { colors, cards, byId, rewards, shuffle, evaluate, combinations, rewardFor };
})();

if (typeof module !== 'undefined') module.exports = Okey;
