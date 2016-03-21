var app = angular.module('new_project',  ['mgo-angular-wizard']);
app.controller('NewProjectCtrl', ['$scope', '$q', '$timeout', 'WizardHandler', function($scope, $q, $timeout, WizardHandler){
	
	$scope.canexit=true;
	
	$scope.stepActive = true;
	
	$scope.finished = function(){
		alert('Wizard finished');
	};

	$scope.logStep = function(){
		console.log('Step continued');
	};

	$scope.goBack = function(){
		WizardHandler.wizard().goTo(0);
	};

	$scope.exitWithAPromise = function(){
		var d = $q.defer();
		$timeout(function(){
			d.resolve(true);
		}, 1000);
		return d.promise;
	};

	$scope.exitToggle = function(){
		$scope.canexit = !$scope.canexit;
	};

	$scope.stepToggle = function(){
		$scope.stepActive = !$scope.stepActive;
	};

	$scope.exitValidation = function(){
		return $scope.canexit;
	};

}]);

app.controller('ConfigurationCtrl', ['$scope', function($scope){
	
}]);