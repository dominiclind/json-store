import { version } from '../../package.json';
import { Router } from 'express';
import fs from 'fs';

export default ({ config, db }) => {
	let api = Router();


	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	// perhaps expose some API metadata at the root
	api.post('/save', (req, res) => {

		fs.writeFileSync('server/workouts.json', JSON.stringify(req.body));  
		res.json({ version });
	});


	// perhaps expose some API metadata at the root
	api.get('/workouts', (req, res) => {
		let rawdata = fs.readFileSync('server/workouts.json');  
		let json = JSON.parse(rawdata);  
		res.json({ json });
	});

	return api;
}
