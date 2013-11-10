angular.module("portal",['ngResource','ngCookies']);

function RegistrCtrl($scope,$http){
	$scope.submit = function () {
		var userObject = {
				firstName : "Alex",
		        lastName : "Fedorov",
		        age : 16,
		       	email : "test@gmail.com",
		        birthDate : new Date(),
		        male : true,
		        nickName : "test1",
		        APIToken : "testToken"
			};

		$http({
			method: "POST",
			url : "/user/registration",
			data : userObject,
			responseType : "json"
		}).
		success(function(data){
			console.log(data);
		});
	}
}

function SubmitCtrl($scope,$http){
	$scope.submit = function () {
		var userObject = {
				firstName : "Alex",
		        lastName : "Fedorov",
		        age : 16,
		       	email : "test@gmail.com",
		        birthDate : new Date(),
		        male : true,
		        nickName : "test1",
		        APIToken : "testToken"
			},
			response = $http({
				method: "POST",
				url : "/user/registration",
				data : userObject
			});
	}
}