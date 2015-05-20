var loader = function (promise) {
    $('#loader').show();
    promise.always(function () {
        $('#loader').hide();
    });
};

loader($.ajax('/rest/items').then(function (response) {
    console.log(response);
}));
