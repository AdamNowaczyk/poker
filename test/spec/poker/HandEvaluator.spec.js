'use strict';

fdescribe('HandEvaluator test', function () {

    var handEvaluator, result;

    var createCards = function (cards) {
        return cards.map(function (card) {
            return new Card(card.charAt(0), card.charAt(1));
        })
    };

    beforeEach(function () {
        handEvaluator = HandEvaluator();
    });
    afterEach(function () {
        console.log(result.highest.score.toString(16) + ' [' + result.highest.bestHand + ']: ' + result.highest.message);
    });

    it('straight flush', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '2H', '3H', 'KC', 'AH', '3D']));
        expect(result.highest.message).toEqual('straight flush');
    });

    it('four of a kind', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '5D', '5C', '5S', 'AH', '3D']));
        expect(result.highest.message).toEqual('four of a kind');
    });

    it('full house', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '5D', '4C', '5S', 'AH', '3D']));
        expect(result.highest.message).toEqual('full house');
    });

    it('flush', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '2H', '3H', 'KC', 'JH', '3D']));
        expect(result.highest.message).toEqual('flush');
    });

    it('straight flush', function () {
        result = handEvaluator.calculate(createCards(['5H', '4D', '2H', '3H', 'KC', 'AH', '3D']));
        expect(result.highest.message).toEqual('straight');
    });

    it('three of a kind', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '9D', '5C', '5S', 'AH', '3D']));
        expect(result.highest.message).toEqual('three of a kind');
    });

    it('two pairs', function () {
        result = handEvaluator.calculate(createCards(['AC', 'AH', '7H', '5H', '5C', 'JH', '3D']));
        expect(result.highest.message).toEqual('two pairs');
    });

    it('one pairs', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', '5D', 'JC', '8S', 'AH', '3D']));
        expect(result.highest.message).toEqual('one pair');
    });

    it('high card', function () {
        result = handEvaluator.calculate(createCards(['5H', '4H', 'QD', 'JC', '8S', 'AH', '3D']));
        expect(result.highest.message).toEqual('high card');
    });

});
