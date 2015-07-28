(function(){
	'use strict';
  /**
   * @ngdoc directive
   * @name gumga.core:GumgaRangeDate
   * @restrict A
   * @element input[type='date']
	 * @function
   * @scope false
   * @description
	 * O componente GumgaRangeDate serve para validar datas mínimas e máximas para entradas em formulários com campos do tipo date.
	 */
	 RangeDate.$inject = ['$filter'];
	 function RangeDate($filter) {
	 	return {
	 		restrict: 'A',
	 		require: 'ngModel',
	 		link: function (scope, elm, attr, ctrl) {
	 			if (attr.type != 'date') {
	 				throw 'Esta diretiva suporta apenas inputs do tipo date';
	 			}
	 			if (!attr.gumgaRangeDate) {
	 				throw "O valor da diretiva gumga-range-date não foi informado.";
	 			}
        // if (!GumgaDateService.validateFormat('YMD', attr.gumgaMaxDate)) {
        //   throw 'O valor da diretiva não corresponde ao formato yyyy-mm-dd';
        // }
        var validateRangeDate = function (inputValue) {
          var format = 'yyyy-MM-dd';
          var range = scope.$eval(attr.gumgaRangeDate);
        	var input = $filter('date')(inputValue, format);
          var min = $filter('date')(range.min, format);
        	var max = $filter('date')(range.max, format);
        	var isValid = input >= min && input <= max;
        	ctrl.$setValidity('rangedate', isValid);
        	return inputValue;
        };
        ctrl.$parsers.unshift(validateRangeDate);
        ctrl.$formatters.push(validateRangeDate);
        attr.$observe('gumgaRangeDate', function () {
        	validateRangeDate(ctrl.$viewValue);
        });
      }
    }
  }
  angular.module('gumga.directives.form.range.date',[])
  .directive('gumgaRangeDate',RangeDate);
})();