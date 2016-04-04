/**
 * Created by Luc on 04/04/2016.
 */

var request = require('request');
var expect = require('chai').expect;
var server;

describe('Server', function(){
    var url = 'http://localhost:1337';

    before(function(){
        server = require('../../server.js');
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
                expect(body).to.contain('<title>test</title>');
                done();
            });
        });
    });

    describe('Api page', function(){
        it('should be a json object', function(done){
            request(url+'/api/templates', function(error, response, body){
                expect(response.headers).to.have.property('content-type').and.equal('application/json; charset=utf-8');
                done();
            });
        });

        it('should be return templates configuration file', function(done){
            request(url+'/api/templates', function(err, res, body){
                expect(JSON.parse(body)).to.have.property('templates').to.be.array;
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
                expect(JSON.parse(body)).to.have.property('name');
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
                        name: 'test'
                    }
                },function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('name').to.equal('test');
                    done();
                });
            });
            it('should return updated property in config file', function(done){
                request(url+'/api/config',function(err, res, body){
                    expect(JSON.parse(body)).to.have.property('name').to.equal('test');
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

    after(function(){
        server.closeServer();

    });
});