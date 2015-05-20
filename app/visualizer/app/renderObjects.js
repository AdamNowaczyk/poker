define(['jquery', 'app/DrawLine'], function ($, DrawLine) {
    var renderObject = function (obj, name) {
        name = name || obj.constructor.name + '.prototype';

        var div = $('<div class="obj"></div>');
        var table = $('<table><thead><tr><th colspan="2">' + name + '</th></tr></thead><tbody></tbody></table>');

        div.append(table);

        var proto = 'null';
        if (Object.getPrototypeOf(obj) != null) {
            proto = renderObject(Object.getPrototypeOf(obj));
        }
        table.find('tbody').append('<tr><td>[[Prototype]]</td><td class="proto"></td></tr>')
        if (proto != 'null') {
            div.append(proto.find('table'));
        } else {
            table.find('.proto').text('null');
        }
        for (key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            var value = obj[key];
            if (typeof value === 'string') {
                value = '"' + value + '"';
            }
            if (typeof value === 'function') {
                value = '[[Function]]'
            }
            table.find('tbody').first().append('<tr><td>' + key + '</td><td>' + value + '</td></tr>')
        }
        return div;
    };

    var renderObjects = function () {
        $('#objects').empty();
        var i = 0;
        for (i = 0; i < arguments.length; i++) {
            $('#objects').append(renderObject(arguments[i], params[i]));
        }
        $('.obj').each(function () {
            var div = $(this);

            var xPos = [];
            var yPos = [];
            div.find('.proto').map(function () {
                xPos.push($(this).position())
            });
            div.find('th').map(function () {
                yPos.push($(this).position())
            });
            var i = 0;
            for (i = 0; i < xPos.length - 1; i++) {
                var x = xPos[i];
                var y = yPos[i + 1];

                var xMiddle = (y.left - x.left) / 2;

                DrawLine(div, x.left + 15, x.top + 10, x.left + xMiddle, x.top + 10);
                DrawLine(div, x.left + xMiddle, x.top + 10, x.left + xMiddle, y.top - 20);
                DrawLine(div, x.left + xMiddle, y.top - 20, y.left + 30, y.top - 20);
                DrawLine(div, y.left + 30, y.top - 20, y.left + 30, y.top);
            }
        });
    };

    return renderObjects;
});