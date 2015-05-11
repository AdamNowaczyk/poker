var Player = function (name) {
    this.name = name;
    this.cards = [];
};
Player.prototype.giveCard = function (card) {
    this.cards.push(card);
};
