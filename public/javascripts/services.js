var portalServices = angular.module("portalServices", ["ngResource"]);

portalServices.factory("langPack", ["$resource", 
	function($resource){
		return $resource("/language/:lang.json",
			{lang:"@lang"},
			{get:
				{
					method:"GET",
					params:{
						lang:"@lang",
						UUID:"@UUID"
					}
				}
			}
		);
	}]);

portalServices.factory("userFunctions", ["$resource", 
	function($resource){
		return {
			getUser : function (){
				return $resource("/user/:UUID/:id",
						{
							id:"@id",
							UUID:"@UUID"
						},
						{get:
							{
								method:"GET",
								params:{
									id:"@id",
									UUID:"@UUID"
								}
							}
						}
					);
			},
			checkUser : function(){
				return $resource("/user/checkUser",
						{},
						{get:
							{
								method:"POST",
								params:{
									email:"@email",
									password : "@password"
								}
							}
						}
					);
			}
		};
	}]);