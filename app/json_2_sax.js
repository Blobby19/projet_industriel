var fs = require('fs');
var parseString = require('xml2js').parseString;
var bunyan = require('bunyan');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

var log = bunyan.createLogger({
  name:'json_2_sax',
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

var file_2_generate = __dirname+'/../tests/generatedFile.sax';

var data_sax = "";

var create_xml = function(){
	log.info('create_xml');

	data_sax="";
	create_header_xml(file_2_generate);
	create_schema_xml(file_2_generate);
	create_logic_xml(file_2_generate);
	create_links_xml(file_2_generate);
	create_footer_xml(file_2_generate);

	log.info('sortie create_xml');
};

var create_header_xml = function(file){
	log.info('create_header_xml');

	console.log('<?xml version=\'1.0\'?>');
	console.log('<sedonaApp>');
	data_sax += '<?xml version=\'1.0\'?>\n<sedonaApp>'
	//fs.writeFileSync(file, '<?xml version=\'1.0\'?>\n<sedonaApp>', {encoding:'utf-8', flag:'w'});

	log.info('sortie create_header_xml');
}

var create_depends_xml = function(file){
	log.info('create_depends_xml');
	
	var stat = fs.statSync(__dirname+'/../lib/sedona/kits');
	if(stat.isDirectory()){
		var files = fs.readdirSync(__dirname+'/../lib/sedona/kits');
		files.forEach(function(file){
			var data = fs.readFileSync(__dirname+'/../lib/sedona/kits'+'\\'+file, 'utf-8');
			if(data){
				try{
					var json = JSON.parse(data);
					data_sax+='\n<kit name="'+json.kitManifest.$.name+'" checksum="'+json.kitManifest.$.checksum+'"/>';
					console.log('<kit name="'+json.kitManifest.$.name+'" checksum="'+json.kitManifest.$.checksum+'"/>');
				}
				catch (exception){
					log.error(file);
					log.error(exception);
				}
			}
			else log.error('No data');
		});
	}

	log.info('sortie create_depends_xml');
};

var create_schema_xml = function(file){
	log.info('create_schema_xml');
	
	data_sax+='\n<schema>'
	console.log('<schema>');

	create_depends_xml();
	
	data_sax+='\n</schema>'
	console.log('</schema>');
	
	log.info('sortie create_schema_xml');
}

var create_logic_xml = function(file){
	log.info('create_logic_xml');

	data_sax+='\n<app>';

	

	data_sax+='\n</app>';

	log.info('sortie create_logic_xml');
}

var create_elements_xml = function(){

}

var create_links_xml = function(file){
	log.info('create_links_xml');

	console.log('<links>');
	data_sax+='\n<links>'

	console.log('</links>');
	data_sax+='\n</links>'

	log.info('sortie create_links_xml')
}

var create_footer_xml = function(file){
	log.info('create_footer_xml');

	console.log('</sedonaApp>');
	data_sax+='\n</sedonaApp>';
	fs.writeFileSync(file, data_sax, {encoding:'utf-8', flag:'w+'});

	log.info('sortie create_footer_xml');
}

exports.create_xml = create_xml;