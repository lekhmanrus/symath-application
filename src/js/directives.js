'use strict';

/* Directives */


angular.module('symathApp.directives', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])

.directive('uiFloatingMenu', [function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var i = 0;
      $(element).find('li').each(function() {
        $(this).css("margin-top", (i++) * 50 + 'px');
      });
    }
  };
}])