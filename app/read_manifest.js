var AdmZip = require('adm-zip');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var bunyan = require('bunyan');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

var log = bunyan.createLogger({
  name:'read_zip',
  streams:[
    {
      level:'info',
      stream: process.stdout
    },
    {
      level:'error',
      path: log_error
    }
  ]
});

// Permet de lire les fichiers
var read_zip = function(zipFile, callback){
  log.info('read_zip');

  fs.stat(zipFile, function(err, stats){
  	if(err){
  		log.error(err.toString());
  		throw err;
  	}

	var file = new AdmZip(zipFile);

	var zipEntries = file.getEntries();

	zipEntries.forEach(function(zipEntry){
	  //console.log(zipEntry.toString());
	  if(zipEntry.entryName == "manifest.xml"){
	    callback(zipEntry.getData().toString());
	  }
	});
  });

  log.info('sortie read_zip');
}

// Fonction qui permet de lire le dossier sedona
var read_folder = function(folderName, version){
  console.log(folderName);
  log.info('read_folder');
  fs.exists(folderName, function(exist){
    if(!exist){
      log.error(err);
      throw err;
    }
    fs.readdir(folderName, function(err, files){
      files.forEach(function(folder){
        fs.stat(folderName+'\\'+folder, function(err, stats){
          if(err){
            log.error(err);
            throw err;
          }
          if(stats.isDirectory()){
            fs.readdir(folderName+'\\'+folder, function(err, files){
              if(err){
                log.error(err);
                throw err;
              }
              files.forEach(function(file){
                if(file.match(/.+-1.2.28.kit/gi)){
                  read_zip(folderName+'\\'+folder+'\\'+file, function(data){
                    parseString(data, function(err, result){
                      fs.writeFile('./lib/sedona/kits/'+get_name_of_kit(file)+'.json', JSON.stringify(result), function(err){
                        if (err){
                          log.error(err);
                          throw err;
                        }
                        log.info('New file '+get_name_of_kit(file)+'.json created');
                      });
                    });
                  });
                }
              });
            });
          }
        });
      });
    });
  });
  log.info('sortie read_folder');
}

// Récupere le nom des kits
var get_name_of_kit = function(data){
  return data.replace(/-[0-9a-z]+-1.2.28.kit/gi, '');
}

exports.read_zip = read_zip;
exports.read_folder = read_folder;
