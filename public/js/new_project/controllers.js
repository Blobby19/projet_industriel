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

/**
 * Controller de la page de configuration des entrées
 */
app.controller('InputCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.controller = "InputCtrl";
    $scope.showModal = false;
    $rootScope.inputs = {
        numberAI: 1,
        numberDI: 1
    };

    $rootScope.inputSteps = [];

    var AI_template = {
        templateUrl: '/templates/new_project/modal/analog_input.html',
        hasForm: true,
        isolatedScope: true,
        controller: 'AnalogInputFormCtrl'
    };

    var DI_template = {
        templateUrl: '/templates/new_project/modal/digital_input.html',
        hasForm: true,
        isolatedScope: true,
        controller: 'DigitalInputFormCtrl'
    };

    var recap_template = {
        templateUrl: '/templates/new_project/modal/recap_input.html',
        controller: 'RecapInputCtrl'
    };

    $scope.createModal = function(){
        for(var AI = 0; AI<$rootScope.inputs.numberAI; AI++){
            $rootScope.inputSteps.push(AI_template);
        }
        for(var DI = 0; DI<$rootScope.inputs.numberDI; DI++)
            $rootScope.inputSteps.push(DI_template);

        $rootScope.inputSteps.push(recap_template);

        if(!$scope.showModal){
            $scope.showModal = true;
            $scope.template = {
                modal: 'modal.html'
            };
        }
        else{
            $('#modal').openModal();
        }
    };

}]);

/**
 * Controller des entrées analogiques
 */
app.controller('AnalogInputFormCtrl', ['$scope', 'multiStepFormScope', 'InputFactory', function($scope, multiStepFormScope, InputFactory){
    $scope.model = angular.copy(multiStepFormScope.model);
    $scope.$on('$destroy', function(){
        if($scope.model.name !== ""){
            multiStepFormScope.inputsArray.push(angular.copy($scope.model));
            $scope.model = InputFactory.makeAnalog($scope.model);
            multiStepFormScope.inputsFormattedArray.push(angular.copy($scope.model));
        }
    });
}]);

/**
 * Controller des entrées digitales
 */
app.controller('DigitalInputFormCtrl', ['$scope', 'multiStepFormScope', 'InputFactory', function($scope, multiStepFormScope, InputFactory){
    $scope.model = angular.copy(multiStepFormScope.model);
    $scope.$on('$destroy', function(){
        if($scope.model.name !== ""){
            multiStepFormScope.inputsArray.push(angular.copy($scope.model));
            $scope.model = InputFactory.makeDigital($scope.model);
            multiStepFormScope.inputsFormattedArray.push(angular.copy($scope.model));
        }
    });
}]);

/**
 * Controller de la fenêtre modale de configuration des entrées
 */
app.controller('InputModalCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $scope.$on('$includeContentLoaded', function(event){
        if($rootScope.inputSteps.length>0)
            $('#modal').openModal();
    });

    $scope.model = {
        name:"",
        type:"",
        channel:""
    };

    $rootScope.inputsArray = [];
    $rootScope.inputsFormattedArray = [];

    $scope.cancel = function(){
        alert('Cancel');
        $rootScope.inputsArray=[];
        $rootScope.inputsFormattedArray=[];
    };

    $scope.finish = function(){
        $('#modal').closeModal();
        $location.path('/new_project');
    };
}]);

/**
 * Controller de récapitulation des entrées
 */
app.controller('RecapInputCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.inputs = $rootScope.inputsFormattedArray;
}]);

/**
 * Controller de la page de configuration des sorties
 */
app.controller('OutputCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.controller = "OutputCtrl";
    $rootScope.outputs = {
        numberAO: 1,
        numberDO: 1
    };

    $rootScope.outputSteps = [];

    var AO_template = {
        templateUrl: '/templates/new_project/modal/analog_output.html',
        hasForm: true,
        isolatedScope: true,
        controller: 'AnalogOutputFormCtrl'
    };

    var DO_template = {
        templateUrl: '/templates/new_project/modal/digital_output.html',
        hasForm: true,
        isolatedScope: true,
        controller: 'DigitalOutputFormCtrl'
    };

    var recap_template = {
        templateUrl: '/templates/new_project/modal/recap_output.html',
        controller: 'RecapOutputCtrl'
    };

    $scope.createModal = function(){
        for(var AO = 0; AO<$rootScope.outputs.numberAO; AO++)
            $rootScope.outputSteps.push(AO_template);

        for(var DO = 0; DO<$rootScope.outputs.numberDO; DO++)
            $rootScope.outputSteps.push(DO_template);

        $rootScope.outputSteps.push(recap_template);

        if(!$scope.showModal){
            $scope.showModal = true;
            $scope.template = {
                modal: 'modal.html'
            };
        }
        else{
            $('#modal').openModal();
        }
    }

}]);

/**
 * Controller de la fenetre modale de configuration des sorties
 */
app.controller('OutputModalCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $scope.$on('$includeContentLoaded', function(event){
        if($rootScope.outputSteps.length>0)
            $('#modal').openModal();
    });

    $scope.model ={
        name:"",
        type:"",
        channel:""
    };

    $rootScope.outputsArray = [];
    $rootScope.outputsFormattedArray = [];

    $scope.cancel = function(){
        alert('Cancel');
        $rootScope.outputsArray = [];
        $rootScope.outputsFormattedArray = [];
    };

    $scope.finish = function(){
        $('#modal').closeModal();
        $location.path('/new_project');
    };

}]);

/**
 * Controller des sorties analogiques
 */
app.controller('AnalogOutputFormCtrl', ['$scope', 'multiStepFormScope', 'OutputFactory', function($scope, multiStepFormScope, OutputFactory){
    $scope.model = angular.copy(multiStepFormScope.model);
    $scope.$on('$destroy', function(){
        if($scope.model.name !== ""){
            multiStepFormScope.outputsArray.push(angular.copy($scope.model));
            $scope.model = OutputFactory.makeAnalog($scope.model);
            multiStepFormScope.outputsFormattedArray.push(angular.copy($scope.model));
        }
    });
}]);

/**
 * Controller des sorties digitales
 */
app.controller('DigitalOutputFormCtrl', ['$scope', 'multiStepFormScope', 'OutputFactory', function($scope, multiStepFormScope, OutputFactory){
    $scope.model = angular.copy(multiStepFormScope.model);
    $scope.$on('$destroy', function(){
        if($scope.model.name !== ""){
            multiStepFormScope.outputsArray.push(angular.copy($scope.model));
            $scope.model = OutputFactory.makeDigital($scope.model);
            multiStepFormScope.outputsFormattedArray.push(angular.copy($scope.model));
        }
    });
}]);

/**
 * Controller de récapitulation des sorties
 */
app.controller('RecapOutputCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.outputs = $rootScope.outputsFormattedArray;
}]);

/**
 * Controller de la page de configuration
 */
app.controller('ConfigCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $scope.controller = 'ConfigCtrl';

    $rootScope.configurationArray = [];
    var configuration = {
        application_name:"",
        device_name:"",
        modbus_enabled: false
    };

    $scope.createConfiguration = function(){
        if($scope.application_name === "") alert('Pas de nom');
        if($scope.device_name === "") alert("Pas de nom!");
        configuration.application_name = $scope.application_name;
        configuration.device_name =$scope.device_name;
        configuration.modbus_enabled = $scope.modbus_enable;
        $rootScope.configurationArray.push(configuration);
        $location.path('/new_project');
    };
}]);

/**
 * Controller de la page de modes de régulation
 */
app.controller('ModesCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.controller = "ModesCtrl";

    $scope.modes={
        ete: false,
        hiver: false,
        freecooling: false
    };

    $scope.regulation = {
        roue_recuperation: false,
        vanne_froide: false,
        vanne_chaude: false,
        registre_an: false,
        registre_melange: false
    };

    $scope.createModal = function(){
        console.log($scope.regulation);
        console.log($rootScope.inputsArray);
        if($rootScope.inputsArray === undefined)
            alert('Vous n\'avez pas choisi d\'entrées');
        if($rootScope.outputsArray === undefined)
            alert('Vous n\'avez pas choisi de sorties');

    };
}]);


app.controller('RecapGeneralCtrl', ['$scope', '$rootScope', 'ServerCommunication', function($scope, $rootScope, ServerCommunication){
    console.log($rootScope.template.configuration);
}]);