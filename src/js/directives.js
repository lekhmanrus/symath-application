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
  .directive('uiMathJax', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var keyupHandler = function() {
          if(element.val().length > 0) {
            $('#' + attrs.uiMathJax).html('`' + element.val() + '`');
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
          }
          else
            $('#' + attrs.uiMathJax).html('No data input.');
        }
        element.keyup(keyupHandler);
        keyupHandler();
      }
    };
  }]);