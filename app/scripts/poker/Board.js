var Board = function () {
    this.$el = $('#board');
    this.game = null;

    //this.phases = ['NEW', 'HANDS', 'FLOP', 'TURN', 'RIVER', 'END'];
    this.phase = 'HANDS';

    this.result = undefined;

    this.handsHidden = true;
    this.scoreHidden = true;
};

Board.prototype.createGame = function () {
    this.game = new Game();
    this.result = undefined;
    this.handsHidden = false;
    this.scoreHidden = false;
    this.game.addPlayer(new Player('Player #1'));
    this.game.addPlayer(new Player('Player #2'));
    this.game.addPlayer(new Player('Player #3'));
    this.game.addPlayer(new Player('Player #4'));
};

Board.prototype.nextAction = function () {
    switch (this.phase) {
        case 'NEW':
            this.createGame();
            this.phase = 'HANDS';
            this.nextAction();
            break;
        case 'HANDS':
            this.game.dealHands();
            this.phase = 'FLOP';
            break;
        case 'FLOP':
            this.game.dealFlop();
            this.phase = 'TURN';
            break;
        case 'TURN':
            this.game.dealTurn();
            this.phase = 'RIVER';
            break;
        case 'RIVER':
            this.game.dealRiver();
            this.phase = 'END';
            break;
        case 'END':
            this.handsHidden = false;
            this.scoreHidden = false;
            this.phase = 'NEW';
            break;
    }
    this.result = this.game.calculateScore();
};

Board.prototype.hideHands = function (hidden) {
    this.handsHidden = hidden;
};
Board.prototype.hideScore = function (hidden) {
    this.scoreHidden = hidden;
};

Board.prototype.redraw = function () {
    var self = this;
    self.$el.empty();
    this.game.players.forEach(function (player, index) {
        var playerDiv = $('<div>');
        playerDiv.addClass('player');
        playerDiv.addClass('_' + (index + 1));
        playerDiv.append('<h1 class="name">' + player.name + '</h1>');
        player.cards.forEach(function (card) {
            var cardDiv = $('<div>');
            cardDiv.addClass('card');
            if (!self.handsHidden) {
                cardDiv.addClass('_' + card.rank + card.suit);
            }
            playerDiv.append(cardDiv);
        });
        if (self.result && !self.handsHidden && !self.scoreHidden) {
            var resultDiv = $('<div>');
            resultDiv.addClass('result');
            if (self.result[index].winner) {
                resultDiv.addClass('winner');
            }
            //resultDiv.text(JSON.stringify(self.result[index].highest));
            resultDiv.html('<ul>' +
            '<li>' + self.result[index].highest.message + '</li>' +
            '<li>' + self.result[index].highest.score.toString(16) + '</li>' +
            '<li>' + JSON.stringify(self.result[index].highest.bestHand) + '</li>' +
            '</ul>');
            playerDiv.append(resultDiv);
        }
        self.$el.append(playerDiv);
    });

    var tableDiv = $('<div>');
    tableDiv.addClass('table');
    this.game.table.cards.forEach(function (card) {
        var cardDiv = $('<div>');
        cardDiv.addClass('card');
        cardDiv.addClass('_' + card.rank + card.suit);
        tableDiv.append(cardDiv);
    });
    self.$el.append(tableDiv);
};