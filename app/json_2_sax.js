var fs = require('fs');
var parseString = require('xml2js').parseString;
var bunyan = require('bunyan');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

// Definition du logger de la librairie
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

// Fichier à générer
var file_2_generate = __dirname+'/../tests/generatedFile.sax';

var data_sax = "";
var listOfComponentsInApp = [];

// Fonction qui permet de générer un fichier xml
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

// Fonction qui permet de générer l'entête du fichier
var create_header_xml = function(file){
	log.info('create_header_xml');

	console.log('<?xml version=\'1.0\'?>');
	console.log('<sedonaApp>');
	data_sax += '<?xml version=\'1.0\'?>\n<sedonaApp>'
	//fs.writeFileSync(file, '<?xml version=\'1.0\'?>\n<sedonaApp>', {encoding:'utf-8', flag:'w'});

	log.info('sortie create_header_xml');
}

// Fonction qui permet de générer les dépendances du fichier
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

// Fonction qui permet de générer la partie schéma
var create_schema_xml = function(file){
	log.info('create_schema_xml');

	data_sax+='\n<schema>'
	console.log('<schema>');

	create_depends_xml();

	data_sax+='\n</schema>'
	console.log('</schema>');

	log.info('sortie create_schema_xml');
}

// Fonction qui permet de générer la logique
var create_logic_xml = function(file){
	log.info('create_logic_xml');

	data_sax+='\n<app>';
  create_config_app("TestLuc");

  create_app_folder();

	data_sax+='\n</app>';

	log.info('sortie create_logic_xml');
}

// Fonction qui permet de générer les liens entre les blocs
var create_links_xml = function(file){
	log.info('create_links_xml');

	console.log('<links>');
	data_sax+='\n<links>'

	console.log('</links>');
	data_sax+='\n</links>'

	log.info('sortie create_links_xml')
}

// Fonction quipermet de générer le footer du programme
var create_footer_xml = function(file){
	log.info('create_footer_xml');

	console.log('</sedonaApp>');
	data_sax+='\n</sedonaApp>';
	fs.writeFileSync(file, data_sax, {encoding:'utf-8', flag:'w+'});

	log.info('sortie create_footer_xml');
}

var create_folder = function(name){
  log.info('create_folder');

  create_component_xml({type:'sys::Folder', name: name});

  log.info('fin create_folder');
}

var create_component_xml = function(component){
  log.info('create_component_xml');

  var _component = "";
  if(component != null){
    _component+="\n<comp ";
    _component+="name=\"";
    _component+=component.name;
    _component+="\" ";
    _component+="type=\"";
    _component+=component.type;
    _component+="\">\n";
    console.log(_component);

    _component+="</comp>";
    console.log('</comp>');
    listOfComponentsInApp.push(component);
  }
  data_sax+=_component;

  log.info('fin create_component_xml');
}

var create_config_app = function(name){
  log.info('create_config_app');

  var header = modify_value_from_xml_template(__dirname+'/../lib/sedona/templates/app_header.xml', [{name:'value', value: name}]);
  data_sax+=header;
  console.log(header);
  create_service();

  log.info('fin create_config_app');
}

var create_service = function(){
  log.info('create_service');

  var service = modify_value_from_xml_template(__dirname+'/../lib/sedona/templates/app_service.xml', [{name:'modbusActivation', value:true}]);
  data_sax+=service;
  console.log(service);

  log.info('fin create-service');
}

var create_app_folder = function(){
  create_folder("App");
}

var modify_value_from_xml_template = function(file, objects){
  log.info('modify_value_from_xml_template');
  var xml_template = "";
  var data = fs.readFileSync(file, 'utf-8');
  if(objects.length>0){
    objects.forEach(function(object, key){
      var regex = new RegExp("{{"+object.name+"}}", "gi");
      data = data.replace(regex, object.value);
    });
    xml_template="\n"+data.toString();
  }
  log.info('fin modify_value_from_xml_template');
  return xml_template;
}

exports.create_xml = create_xml;
