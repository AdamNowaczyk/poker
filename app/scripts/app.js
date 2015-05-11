var board = new Board();

$('#newGame').on('click', function () {
    board = new Board();
    board.createGame();
    board.nextAction();
    board.redraw();
});

$('#nextAction').on('click', function () {
    board.nextAction();
    board.redraw();
});

$('#toggleScoreVisibility').on('click', function () {
    board.hideScore(!board.scoreHidden);
    board.redraw();
});

$('#toggleHandsVisibility').on('click', function () {
    board.hideHands(!board.handsHidden);
    board.redraw();
});

$('#newGame').click();
$('#nextAction').click();
$('#nextAction').click();
$('#nextAction').click();
$('#nextAction').click();
