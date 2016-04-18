/**
 * Created by Luc on 04/04/2016.
 */

var request = require('request');
var expect = require('chai').expect;
var server;
var port = process.env.PORT || 1337;

describe('Server', function(){
    var url = 'http://localhost:1337';

    before(function(){
        server = require('../../server.js')();
        server.listen(port);
        console.log('Server is listening on port: '+port);
    });

    it('Server available on port 1337', function(done){
        request(url, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    describe('Index page', function(){
        it('should be a html page', function(done){
            request(url, function(error, response, body){
                expect(response.headers).to.have.property('content-type').and.equal('text/html; charset=utf-8');
                expect(body).to.contain('<title>CTA Maker</title>');
                done();
            });
        });
    });

    describe('Api', function(){

        it('should return application object', function(done){
           request.post({
               uri: url+'/api/create_application',
               form:{
                   configuration:[{
                       application_name: 'TestLuc',
                       device_name: 'SCC-410M',
                       modbus_enabled: true
                   }],
                   inputs:[
                       {
                           channel:'',
                           name:'Test',
                           type:''
                       },
                       {
                           channel:'',
                           name:'Temp',
                           type:''
                       }
                   ],
                   outputs:[
                       {
                           channel:'',
                           name:'out1',
                           type:''
                       },
                       {
                           channel:'',
                           name:'out2',
                           type:''
                       }
                   ],
                   regulation:null
               }
           }, function(err, res, body){
               expect(res.statusCode).to.equal(200);
               expect(JSON.parse(body)).to.be.a('object');
               done();
           });
        });

        it('should be a json object', function(done){
            request(url+'/api/templates', function(error, response, body){
                expect(response.headers).to.have.property('content-type').and.equal('application/json; charset=utf-8');
                done();
            });
        });

        it('should be return templates configuration file', function(done){
            request(url+'/api/templates', function(err, res, body){
                expect(JSON.parse(body)).to.have.property('templates').to.be.a('array');
                done();
            });
        });

        it('should add template to applicationTag', function(done){
            var templates = ['test'];
            request.put({
                uri: url+'/api/templates',
                form:{
                    templates: templates
                }
            }, function(err, res, body){
                expect(res.statusCode).to.equal(200);
                expect(JSON.parse(body)).to.have.property('message').to.equal('templates added correctly');
                done();
            })
        });

        it('should return detail of ete template', function(done){
            request(url+'/api/template/detail/template_ete', function(err, res, body){
                expect(JSON.parse(body)).to.have.property('name').to.equal('template_mode_ete');
                done();
            });
        });

        it('should return detail of input template', function(done){
            request(url+'/api/template/detail/template_input', function(err, res, body){
                expect(JSON.parse(body)).to.have.property('name').to.equal('template_input_scc410');
                done();
            });
        });

        it('should return 503 error because of an unknown template', function(done){
            request(url+'/api/template/detail/test', function(err, res, body){
                expect(res.statusCode).to.equal(503);
                expect(JSON.parse(body)).to.have.property('message');
                done();
            });
        });

        it('should be a json object', function(done){
            request(url+'/api/config', function(err, res, body){
                expect(res.headers).to.have.property('content-type').and.equal('application/json; charset=utf-8');
                done();
            });
        });

        it('should be return configuration file', function(done){
            request(url+'/api/config', function(err, res, body){
                expect(JSON.parse(body)).to.have.property('app').to.have.property('title');
                done();
            });
        });

        describe('Update template configuration file', function(){
            it('should update property in config file', function(done){
               request.post({
                   uri: url+'/api/templates',
                   form: {
                       directory: 'C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\templates'
                   }
               }, function(err, res, body){
                   expect(JSON.parse(body)).to.have.property('template_directory').to.equal('C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\templates');
                   done();
               })
            });
            it('should return updated property in config file', function(done){
                request(url+'/api/templates', function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('template_directory').to.equal('C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\templates');
                    done();
                });
            });
        });

        describe('Update configuration file', function(){
            it('should update property in config file', function(done){
                request.post({
                    uri: url+'/api/config',
                    form: {
                        app:{
                            title: 'CTA Maker'
                        }
                    }
                },function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('app').to.have.property('title').to.equal('CTA Maker');
                    done();
                });
            });

            it('should return updated property in config file', function(done){
                request(url+'/api/config',function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('app').to.have.property('title').to.equal('CTA Maker');
                    done();
                });
            });
        });

        describe('Make CTA file', function(){

            var inputs = JSON.stringify([{"inputs":"inputs"}]);
            var outputs = JSON.stringify([{"outputs":"outputs"}]);
            var templates = JSON.stringify([{"templates":"templates"}]);
            it('should return 503 error in case of malformed value', function(done){
               request.post({
                   uri: url+'/api/make_cta',
                   form:{
                       inputs:inputs,
                       outputs:"",
                       templates:null
                   }
               }, function(err, res, body){
                  expect(res.statusCode).to.equal(503);
                   done();
               });
            });

            it('should return 200 and should return json', function(done){
                request.post({
                    uri: url+'/api/make_cta',
                    form:{
                        inputs: inputs,
                        outputs : outputs,
                        templates: templates
                    }
                }, function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('inputs').to.be.a('array');
                    expect(JSON.parse(body)).to.have.property('outputs').to.be.a('array');
                    expect(JSON.parse(body)).to.have.property('templates').to.be.a('array');
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            });
        });
    });

});