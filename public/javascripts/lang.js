angular.module("lang",['ngResource','ngCookies']);

function LanguageCtrl($scope,$resource,$cookies){
	$scope.lang = $resource("./language/:lang",
		{lang:"@lang"},
		{get:{method:"POST",
			params:{lang:"@lang"}
			}
		});
	var cookieLang = $cookies.lang;
	if (cookieLang != undefined && cookieLang != null){
		$scope.language = $scope.lang.get({lang:cookieLang});
	} else {
		$cookies.lang = "eu";
		$scope.language = $scope.lang.get({lang:"eu"});
	}
	
	$scope.ukr = function () {
		$scope.language = $scope.lang.get({lang:"ukr"});
		$cookies.lang = "ukr";
	}
	$scope.eng = function () {
		$scope.language = $scope.lang.get({lang:"eu"});
		$cookies.lang = "eu";
	}
}