var Table = function () {
    this.cards = [];
};
Table.prototype.giveCard = function (card) {
    this.cards.push(card);
};
