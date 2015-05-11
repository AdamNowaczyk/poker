'use strict';

var HandEvaluator = function () {

    var getRanks = function (cards) {
        return cards.reduce(function (acc, card) {
            if (typeof acc[card.rank] === 'undefined') {
                acc[card.rank] = 1;
            } else {
                acc[card.rank]++;
            }
            return acc;
        }, {});
    };
    var getSuits = function (cards) {
        return cards.reduce(function (acc, card) {
            if (typeof acc[card.suit] === 'undefined') {
                acc[card.suit] = 1;
            } else {
                acc[card.suit]++;
            }
            return acc;
        }, {});
    };
    var isFlush = function (suits, cards) {
        return Object.keys(suits).reduce(function (acc, suit) {
            if (suits[suit] >= 5) {
                acc.flush = true;
                acc.suit = suit;
                acc.cards = cards;
            }
            return acc;
        }, {flush: false});
    };
    var isStraight = function (ranks) {
        var initial = ranks['A'] > 0 ? {count: 1, ranks: ['A']} : {count: 0, ranks: []};
        return Deck.ranks.reduce(function (acc, rank) {
            if (ranks[rank] && ranks[rank] > 0) {
                acc.count++;
                acc.ranks.push('' + rank);
            } else if (acc.count < 5) {
                acc.count = 0;
                acc.ranks.length = 0;
            }
            return acc;
        }, initial);
    };
    var sameRank = function (ranks, howMany) {
        return Object.keys(ranks).filter(function (rank) {
            return ranks[rank] === howMany;
        });
    };

    var highest = function (result) {
        var response = {
            score: 0,
            bestHand: [],
            message: ''
        };
        if (result.straight.count >= 5 && result.flush.flush) {
            response.message = 'straight flush';
            response.bestHand = result.straight.ranks.slice(0, 5);
            response.score = 0x800000;
        } else if (result.four.length > 0) {
            response.message = 'four of a kind';
            response.bestHand = result.kickers.slice(-1).concat(result.four).concat(result.four).concat(result.four).concat(result.four);
            response.score = 0x700000;
        } else if (result.three.length > 0 && result.pairs.length > 0) {
            response.message = 'full house';
            response.bestHand = result.pairs.slice(-1).concat(result.pairs.slice(-1)).concat(result.three).concat(result.three).concat(result.three);
            response.score = 0x600000;
        } else if (result.flush.flush) {
            response.message = 'flush';
            response.bestHand = result.flush.cards.filter(function (card) {
                return card.suit === result.flush.suit;
            }).slice(-5).map(function (card) {
                return card.rank;
            }).sort(function (a, b) {
                return Deck.ranks.indexOf(a) - Deck.ranks.indexOf(b);
            });
            response.score = 0x500000;
        } else if (result.straight.count >= 5) {
            response.message = 'straight';
            response.bestHand = result.straight.ranks.slice(0, 5);
            response.score = 0x400000;
        } else if (result.three.length > 0) {
            response.message = 'three of a kind';
            response.bestHand = result.kickers.slice(-2).concat(result.three).concat(result.three).concat(result.three);
            response.score = 0x300000;
        } else if (result.pairs.length >= 2) {
            response.message = 'two pairs';
            result.pairs.sort(function (a, b) {
                return Deck.ranks.indexOf(a) - Deck.ranks.indexOf(b);
            });
            var higherPair = result.pairs.slice(-2)[1];
            var lowerPair = result.pairs.slice(-2)[0];
            response.bestHand = result.kickers.slice(-1).concat([lowerPair, lowerPair]).concat([higherPair, higherPair]);
            response.score = 0x200000;
        } else if (result.pairs.length === 1) {
            response.message = 'one pair';
            var higherPair = result.pairs.slice(-1)[0];
            response.bestHand = result.kickers.slice(-3).concat([higherPair, higherPair]);
            response.score = 0x100000;
        } else {
            response.message = 'high card';
            response.bestHand = result.kickers.slice(-5);
            response.score = 0x000000;
        }
        response.score = response.bestHand.reduce(function (acc, rank, index) {
            return acc + (Deck.ranks.indexOf(rank) + 2) * Math.pow(0x10, index);
        }, response.score);
        return response;
    };

    return {
        calculate: function (cards) {
            var ranks = getRanks(cards);
            var suits = getSuits(cards);
            var flush = isFlush(suits, cards);
            var straight = isStraight(ranks);
            var four = sameRank(ranks, 4);
            var three = sameRank(ranks, 3);
            var pairs = sameRank(ranks, 2);
            var full = three.concat(pairs);
            full = full.length === 5 ? full : [];
            var kickers = sameRank(ranks, 1);
            kickers.sort(function (a, b) {
                return Deck.ranks.indexOf(a) - Deck.ranks.indexOf(b);
            });


            var result = {
                //ranks: ranks,
                //suits: suits,
                flush: flush,
                straight: straight,
                full: full,
                four: four,
                three: three,
                pairs: pairs,
                kickers: kickers
            };

            result.highest = highest(result);

            return result;
        }
    }
};
