var express = require('express'); // include express module
var path = require('path'); // include path module
var http = require('http'); // include http module
var favicon = require('serve-favicon'); 
var logger = require('morgan'); // include morgan module for logging
var cookieParser = require('cookie-parser'); // include cookie-parser module 
var bodyParser = require('body-parser'); // include body-parser module
var post = require('./routes/posts'); // include posts script for CRUD operation with MongoDB

// Create object for the express()
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Starting of Web App
app.use(express.static(path.join(__dirname, 'public')));


app.get('/posts', post.findAll); // Fetch all posts from Post Document
app.get('/posts/:id', post.findById); // Fetch particular Post from the Id
app.post('/posts', post.addPost); // Add new Post
app.put('/posts/:id', post.updatePost); // Update the existing Post
app.delete('/posts/:id', post.deletePost); // Delete the Post from the document model

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Exporting the app object
module.exports = app;
