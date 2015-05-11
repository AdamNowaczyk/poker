var WinnerEvaluator = function () {

    return {
        calculate: function (results) {
            var winner = results.reduce(function (acc, result, index) {
                if (result.highest.score > acc.result.score) {
                    acc.index = index;
                    acc.result = result.highest;
                }
                return acc;
            }, {
                index: -1,
                result: {
                    score: -1
                }
            });
            results[winner.index].winner = true;
            return results;
        }
    }
};