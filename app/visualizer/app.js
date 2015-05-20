// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    //baseUrl: '../bower_components/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        //ace: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/ace',
        ace: '../bower_components/ace-builds/src-min',
        app: 'app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);