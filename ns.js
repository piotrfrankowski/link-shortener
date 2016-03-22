/**
 * Modules
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Config
 */

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/**
  * Here are stored our addresses
  */
  
var links = [];

/**
 * Routes
 */

// index
app.get('/', function(req, res){
	res.render('index');
});

// JSON API
app.post('/shorten', function(req, res) {
	var link = req.body.link;
	
	if(link.indexOf('http://') != 0 && link.indexOf('https://') != 0)
		link = '//' + req.body.link;
	
	links.push(link);
	
	var ret_val = links.length - 1;
	
	console.log('Address: "' + link + '" shortened and saved under ' + ret_val);
	
	res.json({
		addr: ret_val
	});
});

app.get('/link/:addr', function(req, res) {
	var index = req.params.addr;
	
	console.log('Redirecting to: "' + links[index] + '"');
	
	res.redirect(links[index]);
});

app.get('*', function(req, res){
	res.render('index');
});


/**
 * Start Server
 */
 
http.createServer(app).listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});

/**
  * Error handlers
  */
  
function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
};

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Internal server Error!' });
	} else {
		next(err);
	}
};

function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
  
	res.status(500);
	res.render('error', { error: err });
};