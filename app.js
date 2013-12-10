
/**
 * Module dependencies.
 */

var express = require('express'),
	database = require('orm'),
	routes = require('./routes'),
	userApi = require('./routes/userapi'),
    guildApi = require('./routes/guildapi'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(database.express("mysql://root@127.0.0.1:3306/portal", {
    define: function (db, models, next) {
        db.load('./db/user',function(){
        	models.user = db.models.user;        	
        });
        db.load('./db/group',function(){
            models.group = db.models.group;           
        });
        db.load('./db/meeting',function(){
            models.meeting = db.models.meeting;           
        });
        db.load('./db/groupmember',function(){
            models.groupmember = db.models.groupmember;           
        });
        next();
    }
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.post('/user/registration', userApi.registration);

app.get('/user/:uuid/:id', userApi.loginUser);
app.get('/guild/:id', guildApi.getGuild);
app.post('/guild/list', guildApi.getGuilds);
app.post('/guild/add', guildApi.addGuild);
app.post('/user/checkuser', userApi.checkUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
