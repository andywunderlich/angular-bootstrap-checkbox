"use strict";

angular.module("ui.checkbox", []).directive("checkbox", function() {
  return {
    scope: {
      triState: '='
    },
    require: "ngModel",
    restrict: "E",
    replace: "true",
    template: "<button type=\"button\" ng-style=\"stylebtn\" class=\"btn btn-default\" ng-class=\"{'btn-xs': size==='default', 'btn-sm': size==='large', 'btn-lg': size==='largest', 'checked': checked===true}\">" +
			"<span ng-style=\"styleicon\" class=\"fa\" ng-class=\"{'fa-check': checked===true, 'fa-minus': checked===undefined}\"></span>" +
			"</button>",
    link: function(scope, elem, attrs, modelCtrl) {
      // Default state
      scope.checked = false;

      scope.size = "default";
      // Default Button Styling
      scope.stylebtn = {};
      // Default Checkmark Styling
      scope.styleicon = {"width": "10px", "left": "-1px"};

      // If size is undefined, Checkbox has normal size (Bootstrap 'xs')
      if(attrs.large !== undefined) {
        scope.size = "large";
        /*scope.stylebtn = {"padding-top": "2px", "padding-bottom": "2px", "height": "30px"};
         scope.styleicon = {"width": "8px", "left": "-5px", "font-size": "17px"};*/
      }
      if(attrs.larger !== undefined) {
        scope.size = "larger";
        /*scope.stylebtn = {"padding-top": "2px", "padding-bottom": "2px", "height": "34px"};
         scope.styleicon = {"width": "8px", "left": "-8px", "font-size": "22px"};*/
      }
      if(attrs.largest !== undefined) {
        scope.size = "largest";
        /*scope.stylebtn = {"padding-top": "2px", "padding-bottom": "2px", "height": "45px"};
         scope.styleicon = {"width": "11px", "left": "-11px", "font-size": "30px"};*/
      }

      var trueValue = true;
      var falseValue = false;
      var triState = {'false': 0, '0': true, 'true': false};

      // If defined set true value
      if(attrs.ngTrueValue !== undefined) {
        trueValue = attrs.ngTrueValue;
      }
      // If defined set false value
      if(attrs.ngFalseValue !== undefined) {
        falseValue = attrs.ngFalseValue;
      }

      // Check if name attribute is set and if so add it to the DOM element
      if(scope.name !== undefined) {
        elem.name = scope.name;
      }

      // Update element when model changes
      scope.$watch(function() {
        if (!scope.triState) {
          if(modelCtrl.$modelValue === trueValue || modelCtrl.$modelValue === true) {
            modelCtrl.$setViewValue(trueValue);
          } else {
            modelCtrl.$setViewValue(falseValue);
          }
        }
        return modelCtrl.$modelValue;
      }, function() {
        //scope.checked = modelCtrl.$modelValue === trueValue;
        scope.checked = modelCtrl.$modelValue;
      }, true);

      // On click swap value and trigger onChange function
      elem.bind("click", function() {
        if (!_.isUndefined(attrs.preventClick)) {
          return;
        }
        scope.$apply(function() {
          if (scope.triState) {
            modelCtrl.$setViewValue(triState[''+modelCtrl.$modelValue]);
          } else {
            if(modelCtrl.$modelValue === falseValue) {
              modelCtrl.$setViewValue(trueValue);
            } else {
              modelCtrl.$setViewValue(falseValue);
            }
          }
        });
      });
    }
  };
});