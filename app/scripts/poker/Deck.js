var Deck = function () {
    this.cards = [];
    this.createDeck();
};
Deck.suites = ['D', 'H', 'S', 'C'];
Deck.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
Deck.prototype.createDeck = function () {
    var i, j;
    for (i = 0; i < Deck.suites.length; i++) {
        for (j = 0; j < Deck.ranks.length; j++) {
            this.cards.push(new Card(Deck.ranks[j], Deck.suites[i]));
        }
    }
};
Deck.prototype.shuffle = function () {
    var i, j;
    for (i = 0; i < this.cards.length - 1; i++) {
        j = Math.floor(Math.random() * this.cards.length);
        var temp = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = temp;
    }
};
Deck.prototype.popCard = function () {
    return this.cards.pop();
};
