/**
 * Created by Luc on 22/04/2016.
 */
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
            $scope.model.type="analog";
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
            $scope.model.type="digital";
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