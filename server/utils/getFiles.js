import glob from 'glob';
import fs from 'fs';
import path from 'path';


function getFileContents (file) {
	return new Promise((resolve, reject) => {
  	const filename = path.basename(file, path.extname(file))
  	
		fs.readFile(file, 'utf8', function (err, data) { // Read each file
	    if(err) {
	      reject("cannot read the file, something goes wrong with the file");
	    }
	    var obj = JSON.parse(data);
	   
	   	resolve({
	   		filename,
	   		data: obj
	   	})
	  });

	})
}

export default function (src) {
	return new Promise ((resolve,reject) => { 
		glob(src, function(err, files) { // read the folder or folders if you want: example json/**/*.json
		  if(err) {
		    reject("cannot read the folder, something goes wrong with glob");
		  }
		  Promise.all(files.map(file => getFileContents(file)))
		  .then(files => {
		  	resolve(files)
		  })
		  .catch(err => {
		  	reject(err)
		  })
		});
	})
}