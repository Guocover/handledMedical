var express = require('express')
  , tpl = require('express-micro-tpl')
  , valid = require('url-valid')
  //, passport = require('passport')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , LocalStrategy = require('passport-local').Strategy
  , serveStatic = require('serve-static')
  , middlewarePipe = require('middleware-pipe')
  , tplPlugin = require('./gulp/tpl')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io')(server)
  , router = require('./controller/router')
  , orm = require('orm');


//web socket 监听
var  http = require('http');


var server_ws = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    console.log('Listening at: http://localhost:8080');
});
server_ws.listen(9999, function() {
    console.log('websocket start listening at port 9999');
});
var  socketIO = require('socket.io')(server_ws);

var  log4js = require('log4js'),
    logger = log4js.getLogger();

var argv = process.argv.slice(2);
if(argv.indexOf('--debug') >= 0){
    logger.setLevel('DEBUG');
    GLOBAL.DEBUG = true;
}else {
    logger.setLevel('INFO');
}


app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', tpl.__express);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 30 * 60 * 1000 } }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/css', middlewarePipe('./static/css',
    /\.css$/, function (url) {
      return url.replace(/\.css$/, '.scss');
    })
);
app.use('/js', middlewarePipe('./static/js',
    /\.tpl\.js$/, function (url) {
      return url.replace(/\.js/, '.html');
    }).pipe(function () {
      return tplPlugin();
    })
);

app.use(serveStatic('static'));


var msqlUrl = "";


msqlUrl ="mysql://root:123456@localhost:3306/handheldMedical";

if(GLOBAL.DEBUG){
    console.log(msqlUrl);
}


app.use(orm.express(msqlUrl, {
  define: function (db, models, next) {

        db.use(require("orm-transaction"));
        models.userDao = require('./dao/UserDao')(db);
//        console.log(models.userDao);
        models.articleDao = require('./dao/ArticleDao')(db);
        models.doctorDao = require('./dao/DoctorDao')(db);
//        models.userApplyDao = require('./dao/UserApplyDao')(db);
//        models.statisticsDao = require('./dao/StatisticsDao')(db);
        models.db = db;

        global.models = models;
        console.log("mysql dao");
        next();
  }}));

app.use(function (err, req, res, next) {
    res.send(err.stack);
});


router(app);
server.listen(80);
logger.info('start handheldMedical , listen 80 ...');



// Chatroom

// usernames which are currently connected to the chat
var userNames = {};
var numUsers = 0;

socketIO.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            userName: socket.userName,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (userName) {
        // we store the username in the socket session for this client
        socket.userName = userName;
        // add the client's username to the global list
        userNames[userName] = userName;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            userName: socket.userName,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            userName: socket.userName
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            userName: socket.userName
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // remove the username from global usernames list
        if (addedUser) {
            delete userNames[socket.userName];
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                userName: socket.userName,
                numUsers: numUsers
            });
        }
    });
});