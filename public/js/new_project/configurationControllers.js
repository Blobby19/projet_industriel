/**
 * Created by Luc on 22/04/2016.
 */

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
