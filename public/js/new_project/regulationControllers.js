/**
 * Created by Luc on 22/04/2016.
 */

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

    $rootScope.regulationSteps = [];

    $scope.regulation = {
        roue_recuperation: {
            valid: false,
            title: 'Roue de récupération'
        },
        vanne_froide: {
            valid: false,
            title: 'Vanne froide'
        },
        vanne_chaude: {
            valid: false,
            title: 'Vanne chaude'
        },
        registre_an: {
            valid: false,
            title: 'Registre air neuf'
        },
        registre_melange: {
            valid: false,
            title: 'Registre de mélange'
        }
    };

    var regulation_Template = {
        title:'',
        templateUrl: '/templates/new_project/modal/regulation_mode.html',
        hasForm: true,
        isolatedScope: true,
        controller: 'RegulFormCtrl'
    };

    $scope.createModal = function(){
        console.log($scope.regulation);
        console.log($rootScope.inputsArray);
        var okInput = true;
        var okOutput = true;
        var okModes = true;
        var okRegulation = true;

        $rootScope.regulationSteps = [];

        if($rootScope.inputsArray === undefined)
            alert('Vous n\'avez pas choisi d\'entrées');
        else okInput = true;

        if($rootScope.outputsArray === undefined)
            alert('Vous n\'avez pas choisi de sorties');
        else okOutput = true;

        if(!$scope.modes.ete && !$scope.modes.freecooling && !$scope.modes.hiver){
            alert('Vous n\'avez pas choisi de mode de régulation!');
        }
        else okModes = true;

        if(!$scope.regulation.roue_recuperation && !$scope.regulation.vanne_chaude
            && !$scope.regulation.vanne_froide && !$scope.regulation.registre_an
            && !$scope.regulation.registre_melange){
            alert('Vous n\'avez pas choisi de régulation!');
        }
        else okRegulation = true;

        if(okInput && okOutput && okModes && okRegulation){
            console.log($scope.regulation);
            for(var regul in $scope.regulation) {
                if ($scope.regulation[regul].valid) {
                    regulation_Template.title = $scope.regulation[regul].title;
                    $rootScope.regulationSteps.push(angular.copy(regulation_Template));
                }
            }
        }

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

app.controller('RegulModalCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
    $scope.$on('$includeContentLoaded', function(event){
        if($rootScope.regulationSteps.length>0)
            $('#modal').openModal();
    });

    $scope.model = {
        name: '',
        input: {},
        output: {}
    };

    $rootScope.regulationModes = [];
    $rootScope.regulationFormattedModes = [];

    $scope.cancel = function(){
        $rootScope.regulationModes = [];
        $rootScope.regulationFormattedModes = [];
    };

    $scope.finish = function(){
        $('#modal').closeModal();
        console.log($rootScope.regulationModes);
        $location.path('/new_project');
    };
}]);

app.controller('RegulFormCtrl', ['$scope', 'multiStepFormScope', '$rootScope', function($scope, multiStepFormScope, $rootScope){
    $scope.model = angular.copy(multiStepFormScope.model);
    console.log(multiStepFormScope.inputsArray);
    $scope.inputs = angular.copy(multiStepFormScope.inputsArray);
    $scope.$on('$destroy', function(){
        if($scope.model.input !== undefined
            && $scope.model.output !== undefined){
            multiStepFormScope.regulationModes.push(angular.copy($scope.model));
        }
    });
}]);

app.controller('RecapRegulCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.regulation = $rootScope.regulationModes;
}]);