'use strict'                                      // for jshint
/* ==========================================================
 * Include required packages / Module Dependencies
 * ========================================================== */
var express         = require('express')          // https://npmjs.org/package/express
  , http            = require('http')             // http://nodejs.org/docs/v0.3.1/api/http.html
  , path            = require('path')             // http://nodejs.org/docs/v0.3.1/api/path.html
  , lessMiddleware  = require('less-middleware')  // https://npmjs.org/package/less-middleware
  , socketio        = require('socket.io')        // https://npmjs.org/package/socket.io
  , wine            = require('./routes/wines')
  , utils           = require('./utils');

var app = express();

app.configure(function () {
    /* =================================================
        Complile the Less code to css 
    =================================================== */
    // When we get a request for a css file the less middleware 
    // sees if exists.  If not it looks for a similarly named 
    // Less file and compiles it.  Example:
    // GET /styles.css will cause styles.less > styles.css
    app.use(lessMiddleware({ 
     dest: __dirname + '/public/css'
    , src: __dirname + '/less'
    , prefix: '/css'
    , compress: true
    , debug: false
    }));
    /* =================================================
    NOTE: The port environment variable is process.env.PORT, 
    assign its value to the port variable, or assign 3000 if 
    environment variable is not set (doesn't exist).
    =================================================== */
    app.set('port', process.env.PORT || 3000);

    /* =================================================
    Other Middleware 
    =================================================== */
    // logging (by placing it above static and active routing all activity is logged)
    app.use(express.logger('dev'));     // 'default', 'short', 'tiny', 'dev' 
    // parse request bodies (req.body)
    app.use(express.bodyParser());
    // support _method (PUT in forms etc)
    app.use(express.methodOverride());

    /* =================================================
    Serving Static Files / Favicon
    =================================================== */
    // express on its own has no notion of a "file". The express.static()
    // middleware checks for a file matching the `req.path` within the directory
    // that you pass it. In this case "GET /js/app.js" will look for "./public/js/app.js".

    // if you want to serve files from several directories, you can use express.static()
    // multiple times! Here we're passing "./public/css", this will allow "GET /style.css" 
    // instead of "GET /css/style.css".  This means we can put our assets in sub-directories
    // but keep this stuff of out HTML /js /css /ico  etc.

    // Order is important! You may `app.use(app.router)` before or after 
    // static() middleware. If placed before them your routes will be matched 
    // BEFORE file serving takes place. 

    app.use(express.compress());     // for GZIP compression
    app.use(express.favicon('/public/ico/favicon.ico'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public/css')));
    app.use(express.static(path.join(__dirname, 'public/ico')));
    app.use(express.static(path.join(__dirname, 'public/img')));
});

/* ==============================================================
    Launch the server
=============================================================== */
// Bundle and minify and  our .js files
// Not sure this is the best way anymore. Used to be that serving one
// big .js file was faster than requesting a bunch of small ones
utils.bundle();

// Launch Server
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

/* =======================================================
 *  Wine API
 * ======================================================= */
app.post('/wines', wine.addWine);          // (C)reate One
app.get('/wines/:id', wine.findById);      // (R)ead One
app.get('/wines', wine.findAll);           // (R)ead All
app.put('/wines/:id', wine.updateWine);    // (U)pdate One
app.delete('/wines/:id', wine.deleteWine); // (D)elete One

/* ==============================================================
    Socket.io Configuration
=============================================================== */
//https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO 

// flashsocket will not activate on Chrome or other browsers that 
// fully support WebSockets, even if flashsocket is specified as 
// the only transport. To test flashsocket, use IE 8 or IE 9, or 
// other browsers that don't natively support WebSockets.

// If you are using a hosting provider that doesn't allow you start servers 
// other then on port 80 or the provided port and you still want to support 
// flashsockets you can set the flash policy port to -1 before you set the 
// transports option.  This will instruct the policyfile server to only serve 
// inline policy file requests over your supplied HTTP server. This affect 
// the the initial connection time because the flash player will still search 
// for a dedicated policy file server before it falls back to requesting the 
// policy file inline over the supplied connection.

var io = socketio.listen(server, {
  //'flash policy port': -1                  // may need for flashsocket
});

io.configure('production', function(){
  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 1);                    // reduce logging
  io.set("polling duration", 10);            // increase polling frequency
  io.set('transports', [                     // Manage transports
      'websocket'
    //, 'flashsocket'                        // needed for IE 8, 9?
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
  ]);
  io.set('authorization', function (handshakeData, callback) {
    if (handshakeData.xdomain) {
        callback('Cross-domain connections are not allowed');
    } else {
        callback(null, true);
    }
  });
});

io.configure('development', function(){
  io.set('log level', 1);                    // reduce logging
  io.set('transports', [
    'websocket'                              // Let's just use websockets for development
  ]);
  io.set('authorization', function (handshakeData, callback) {
    if (handshakeData.xdomain) {
        callback('Cross-domain connections are not allowed');
    } else {
        callback(null, true);
    }
  });      
});

io.sockets.on('connection', function (socket) {
    // for real-time metrics
    socket.on('message', function (message) {
        //console.log("Got message: " + message);
        var ip = socket.handshake.address.address;
        var url = message;
        io.sockets.emit('pageview', { 'connections': Object.keys(io.connected).length, 'ip': ip, 'url': url, 'xdomain': socket.handshake.xdomain, 'timestamp': new Date()});
    });
    // for real-time metrics
    socket.on('disconnect', function () {
        //console.log("Socket disconnected");
        io.sockets.emit('pageview', { 'connections': Object.keys(io.connected).length});
    });
});