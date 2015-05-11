var Game = function () {
    this.table = new Table();
    this.players = [];

    this.deck = new Deck();
    this.deck.shuffle();

    this.handEvaluator = HandEvaluator();
    this.winnerEvaluator = WinnerEvaluator();
};
Game.prototype.addPlayer = function (player) {
    this.players.push(player);
};
Game.prototype.dealHands = function () {
    var i;
    var self = this;
    this.players.forEach(function (player) {
        player.giveCard(self.deck.popCard());
        player.giveCard(self.deck.popCard());
    });
    console.log('hands dealt');
};
Game.prototype.dealFlop = function () {
    this.table.giveCard(this.deck.popCard());
    this.table.giveCard(this.deck.popCard());
    this.table.giveCard(this.deck.popCard());
    console.log('flop dealt');
};
Game.prototype.dealTurn = function () {
    this.table.giveCard(this.deck.popCard());
    console.log('turn dealt');
};
Game.prototype.dealRiver = function () {
    this.table.giveCard(this.deck.popCard());
    console.log('river dealt');
};

Game.prototype.calculateScore = function () {
    var self = this;
    var results = this.players.map(function (player) {
        return self.handEvaluator.calculate(player.cards.concat(self.table.cards));
    });
    results = this.winnerEvaluator.calculate(results);
    console.log(results);
    return results;
};