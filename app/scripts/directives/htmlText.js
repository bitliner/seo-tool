'use strict';

angular.module('seoToolApp')
.directive('htmlText', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			//if (typeof model!=='undefined'){
				model.$formatters.push(function(val){
					return val;
				});

				model.$parsers.push(function(val){

					model.$modelValue = val;	

				});
			//111}
		}
	};
});
