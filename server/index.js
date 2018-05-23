import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import getFiles from './utils/getFiles';
import fs from 'fs';
import glob from 'glob';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import url from 'url';


var srcPath = __dirname + '/scss';
var destPath = __dirname + '/public/styles';

let app = express();
app.server = http.createServer(app);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname, '/views');

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(middleware({ config }));

app.get('/', function(req, res){
	var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  var baseURL = 'http://' + hostname;

	getFiles(__dirname + '/data/*.json').then(files => {
	  res.render('views/files', {
	  	files,
	  	baseURL
	  });
	});
});

app.get('/files/:file?', function(req, res){
	var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  var baseURL = 'http://' + hostname;

	const filename = req.params.file;
	fs.readFile(__dirname + `/data/${filename}.json`, 'utf8', function(err, contents) {
	   if(!contents){
	   	res.redirect('/')
	   } else {
	   	let json = JSON.parse(contents);

	   	res.render('views/index', {
	   				baseURL,
		  	json,
		  	filename
		  });
	   }
	});		
	
	
});

app.get('/new', function(req, res){
	var hostname = req.headers.host; // hostname = 'localhost:8080'
  var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  var baseURL = 'http://' + hostname;

 	res.render('views/new', {
 		baseURL,
  	json : {
  		string:'bar',
  		array: [1,2,3],
  		arrayOfObjects : [{foo:'bar'}, {foo:'bar'}],
  		object: {
  			foo: 'bar'
  		}
  	}
  });
	 
});

// app.get('*', function(req, res){
// 	res.redirect('/') 
// });

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
