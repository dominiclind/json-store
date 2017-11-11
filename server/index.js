import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import fs from 'fs';


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


app.use(middleware({ config }));

app.get('/', function(req, res){

	let rawdata = fs.readFileSync(__dirname + '/workouts.json');  
	let json = JSON.parse(rawdata);  

  res.render('views/index', {
  	json
  });
});

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
