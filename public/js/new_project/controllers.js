/**
 * Created by Luc on 22/03/2016.
 */

'use strict';

/**
 * Controller de la page d'index de nouveau projet
 */
app.controller('IndexCtrl', ['$scope', '$rootScope', 'TemplateFactory', 'ServerCommunication', function($scope, $rootScope, TemplateFactory, ServerCommunication){
    $scope.controller = "IndexCtrl";
    $scope.generate = function(){
        console.log("Génération en cours...");
        var inputs = angular.copy($rootScope.inputsArray);
        if(inputs === undefined || inputs.length<1){
            alert('erreur inputs');
        }
        var outputs = angular.copy($rootScope.outputsArray);
        if(outputs === undefined || outputs.length<1){
            alert('erreur outputs');
        }

        console.log($rootScope.configurationArray);
        console.log($rootScope.inputsArray);
        console.log($rootScope.outputsArray);

        $rootScope.template = TemplateFactory.makeTemplate($rootScope.configurationArray, $rootScope.inputsArray, $rootScope.outputsArray, null);
        console.log($rootScope.template);

        //TODO: Vérifier la configuration a envoyer, configuration, inputs, outputs & regulation
        ServerCommunication.sendConfiguration($rootScope.template,
            function(res){
                console.log(res);
            }, function(err){
                console.log(err);
            }
        );
    };
}]);

app.controller('RecapGeneralCtrl', ['$scope', '$rootScope', 'ServerCommunication', function($scope, $rootScope, ServerCommunication){
    console.log($rootScope.template.configuration);
}]);