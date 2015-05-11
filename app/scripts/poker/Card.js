var Card = function (rank, suit) {
    this.rank = rank;
    this.suit = suit;
};
Card.prototype.toString = function () {
    return '' + this.rank + this.suit;
};