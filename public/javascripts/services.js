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

portalServices.factory("userFuctions", ["$resource", 
	function($resource){
		return {
			getUser : function (){
				return $resource("/user/:id",
						{id:"@id"},
						{get:
							{
								method:"GET",
								params:{id:"@id"}
							}
						}
					);
			}
		};
	}]);