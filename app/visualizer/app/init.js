define(['jquery'], function (jQuery) {
    //function getUrlVar(key) {
    //    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    //    return result && unescape(result[1]) || "";
    //}

    // To convert it to a jQuery plug-in, you could try something like this:
    (function ($) {
        $.getUrlVar = function (key) {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
            return result && unescape(result[1]) || "";
        };
    })(jQuery);

    if (window.console && console.log) {
        var old = console.log;
        console.log = function () {
            var value = arguments[0];
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            $('#console').append(value);
            old.apply(this, arguments)
        }
    }

});