/**
 * Created by Luc on 22/04/2016.
 */



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