'use strict';

describe('Game test', function () {

    var game;

    var createCards = function (cards) {
        return cards.map(function (card) {
            return new Card(card.charAt(0), card.charAt(1));
        })
    };

    beforeEach(function () {
        game = new Game();
        var player = new Player();
        player.cards = createCards(['5H', '4H']);
        game.players = [player];
        var table = new Table();
        table.cards = createCards(['2H', '3H', 'KC', 'AH', '3D']);
        game.table = table;
    });

    it('we have flush', function () {
        var result = game.calculateScore();
        expect(result[0].flush).toBeTruthy();
        //expect(result[0].flush.length).toBeGreaterThan(1);
        expect(result[0].straight.count).not.toBeLessThan(5);
    });

});
