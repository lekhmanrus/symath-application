'use strict';

/* Directives */


angular.module('symathApp.directives', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])

.directive('appSymathInput', ['$timeout', function($timeout) {
  return function(scope, elm, attrs) {
    $(elm).on('keydown', function(event) {
      event = event || window.event
      if((event.shiftKey == false && ((event.which || event.charCode) == 61 || (event.which || event.charCode) == 187)) || // =
          (event.ctrlKey == true && (event.which || event.charCode) == 69) // ctrl+e
        ) {
        $timeout(function() {
          scope.calculate();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 83) { // ctrl+s
        $timeout(function() {
          scope.save();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 82) { // ctrl+r
        $timeout(function() {
          scope.clear();
        });
        return false;
      }
      else if((event.ctrlKey == true && (event.which || event.charCode) == 72) || // ctrl+h
          (event.keyCode == 112) // F1
        ) {
        $timeout(function() {
          scope.docs();
        });
        return false;
      }
      else if(event.ctrlKey == true && (event.which || event.charCode) == 73) { // ctrl+i
        $timeout(function() {
          scope.about();
        });
        return false;
      }
    });
  };
}]);