var portalServices = angular.module("portalServices", ["ngResource"]);

portalServices.factory("LangPack", ["$resource", 
	function($resource){
		return $resource("/language/:lang.json",
			{lang:"@lang"},
			{get:
				{
					method:"GET",
					params:{lang:"@lang"}
				}
			}
		);
	}]);