define(['jquery', 'ace/ace', 'ace/theme-monokai', 'ace/mode-javascript'], function ($, ace) {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.$blockScrolling = Infinity;

    return editor;
});