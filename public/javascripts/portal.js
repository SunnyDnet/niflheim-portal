angular.module("portal",['ngResource','ngCookies']);

function RegistrCtrl($scope,$http){
	$scope.submit = function () {
		var userObject = {
				firstName : "Alex",
		        lastName : "Fedorov",
		        age : new Date(),
		        registrationDate : new Date(),
		        male : true
			},
			response = $http({
				method: "POST",
				url : "/user/registration",
				data : userObject
			});
	}
}