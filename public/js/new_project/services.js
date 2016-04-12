/**
 * Created by Luc on 22/03/2016.
 */

app.factory('InputFactory', [function(){
    var digitalTypes = ["Chaine de sécurité", "Alarme"];
    var analogTypes = ["Régulation", "Valeur"];
    var channel = ["UI1", "UI2", "UI3", "UI4", "UI5", "UI6", "UI7", "UI8", "UI9", "UI10", "DI11", "DI12", "DI13", "DI14"];
    return{
        makeDigital: function(data){
            if(data.type === "") data.type=0;
            data.type = digitalTypes[data.type];
            if(data.channel === "") data.channel=0;
            data.channel = channel[data.channel];
            return data;
        },
        makeAnalog: function(data){
            if(data.type === "") data.type=0;
            data.type = analogTypes[data.type];
            if(data.channel === "") data.channel=0;
            data.channel = channel[data.channel];
            return data;
        }
    }
}]);

app.factory('OutputFactory', [function(){
    var digitalTypes = [""];
    var analogTypes = [""];
    var analogChannel = [""];
    var digitalChannel = [""];
    return {
        makeDigital: function(data){
            if(data.type === "") data.type = 0;
            data.type = digitalTypes[data.types];
            if(data.channel === "") data.channel = 0;
            data.channel = digitalChannel[data.channel];
            return data;
        },
        makeAnalog: function(data){
            if(data.type === "") data.type = 0;
            data.type = analogTypes[data.type];
            if(data.channel === "") data.channel = 0;
            data.channel = analogChannel[data.channel];
            return data;
        }
    }
}]);

app.factory('TemplateFactory', [function(){
    return{
        makeTemplate: function(configuration, inputs, outputs, regulation){
            var template = {
                configuration: {},
                inputs: {},
                outputs: {},
                regulation: {}
            };
            template.configuration = configuration;
            template.inputs = inputs;
            template.outputs = outputs;
            template.regulation = regulation;
            return template;
        }
    }
}]);

app.factory('ServerCommunication', ['$http',function($http){
    return{
        sendConfiguration: function(template, successCallback, errorCallback){
            $http({
                method: 'POST',
                url: '/api/create_application',
                data: template
            }).then(successCallback, errorCallback);
        },
        getTemplate: function(successCallback, errorCallback){
            $http({
                method: 'GET',
                url: '/api/templates'
            }).then(successCallback, errorCallback);
        }
    }
}]);