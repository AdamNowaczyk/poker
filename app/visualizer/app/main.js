define(['jquery', 'app/editor', 'app/visualizer', 'app/init'], function ($, editor) {

    var fileName = $.getUrlVar('file');
    $.ajax('/rest/visualizer/' + fileName).then(function (response) {
        editor.setValue(response, -1);
    });

});