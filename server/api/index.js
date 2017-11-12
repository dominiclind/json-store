import { version } from '../../package.json';
import { Router } from 'express';
import fs from 'fs';
import uuid from 'node-uuid';

export default ({ config, db }) => {
	let api = Router();


	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	// perhaps expose some API metadata at the root
	api.post('/save', (req, res) => {

		let filename = req.body.filename;

		if(filename == 'new'){
			filename = uuid.v4();
		}

		if(filename){
			console.log(filename);
			fs.writeFile(process.cwd() + `/server/data/${filename}.json`, JSON.stringify(req.body.data), 'utf8', function (err) {
		    if (err) {
	        return console.log(err);
		    }
				res.json({
					success: true,
					path: `/files/${filename}`
				}); 
			}); 
		} else{
			//fs.writeFileSync('data/workouts.json', JSON.stringify(req.body));  
			res.json({ version });
		}
	});


	// perhaps expose some API metadata at the root
	api.get('/:file?', (req, res) => {

		// let rawdata = fs.readFileSync('server/workouts.json');  
		// let json = JSON.parse(rawdata);  
		// res.json({ ...json });

		const filename = req.params.file;
		fs.readFile(process.cwd() + `/server/data/${filename}.json`, 'utf8', function(err, contents) {
		  if(!contents){
		  	res.redirect('/')
		  } else {
		  	let json = JSON.parse(contents);
		  	res.json({...json});
		  }
		});		
	});

	return api;
}
