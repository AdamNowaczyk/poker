define(['jquery', 'app/editor', 'app/renderObjects'], function ($, editor, renderObjects) {

    window.renderObjects = renderObjects;
    $('#run').on('click', function () {
        var jsCode = editor.getValue();

        // ugly stuff to get param names
        var renderObjectsString = /renderObjects(.*);/g.exec(jsCode);
        if (renderObjectsString) {
            var params = renderObjectsString [1];
            window.params = params.substr(1, params.length - 2).split(/\s*,\s*/);
        }

        // ugly way to invoke the code :D
        eval.call(window, jsCode);
    });

});