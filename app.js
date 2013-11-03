
/**
 * Module dependencies.
 */

var express = require('express'),
	database = require('orm'),
	routes = require('./routes'),
	api = require('./routes/restapi'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(database.express("mysql://root@127.0.0.1:3306/portal", {
    define: function (db, models, next) {
        db.load('./db/user',function(){
        	models.user = db.models.user;        	
        });
        next();
    }
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.post('/user/registration', api.registration);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
