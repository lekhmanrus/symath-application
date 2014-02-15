'use strict';

/* Directives */


angular.module('symathApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('uiFloatingMenu', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $($window).scroll(function() {
          var top = $(document).scrollTop();
          if(top < 95) {
            element.css({top: '0px', position: 'absolute'});
            /*$(element).find('.hint, [data-hint]').each(function() {
              $(this).css({position: 'fixed'});
              console.log($(this));
            });*/
          }
          else {
            /*$(element).find('.hint, [data-hint]').each(function() {
              $(this).css({position: 'fixed'});
              console.log($(this));
            });*/
            element.css({top: '0px', position: 'fixed'});
          }
        });
        var i = 0;
        $(element).find('li:not(:first)').each(function() {
          $(this).css("margin-top", (i++) * 96 + 'px');
        });
      }
    };
  }])
  .directive('scrollSpy', ['$window', function($window) {
    return {
      restrict: 'A',
      controller: function($scope) {
        $scope.spies = [];
        $scope.test = 0;
        setTimeout(function(){$scope.test = 8}, 1000)
        this.addSpy = function(spyObj) {
          $scope.spies.push(spyObj);
        };
      },
      link: function(scope, elem, attrs) {
        var spyElems = [];
        scope.$watch('spies', function(spies) {
          for (var _i = 0; _i < spies.length; _i++) {
            var spy = spies[_i];
            if (spyElems[spy.id] == null) {
              spyElems[spy.id] = (elem.find('#' + spy.id));
            }
          }
        }, true);

        $($window).scroll(function() {
          var highlightSpy, pos, spy, _i, _len, _ref;
          highlightSpy = null;
          _ref = scope.spies;

          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            spy = _ref[_i];
            spy.out();
            spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
            if (spyElems[spy.id].length !== 0) {
              if ((pos = spyElems[spy.id].offset().top) - $window.scrollY  - 150 <= 0) {
                spy.pos = pos;
                if (highlightSpy == null) {
                  highlightSpy = spy;
                }
                if (highlightSpy.pos < spy.pos) {
                  highlightSpy = spy;
                }
              }
            }
          }
          return highlightSpy != null ? highlightSpy["in"]() : void 0;
        });
      }
    };
  }])
  .directive('spy', ['$window', function($window) {
    return {
      restrict: "A",
      require: "^scrollSpy",
      link: function(scope, elem, attrs, scrollSpy) {
        if (attrs.spyClass == null) {
          attrs.spyClass = "cbp-vicurrent";
        }
        elem.click(function() {
          scope.$apply(function() {
            $window.location.hash(attrs.spy);
          });
        });
        scrollSpy.addSpy({
          id: attrs.spy,
          in: function() {
            elem.addClass(attrs.spyClass);
          },
          out: function() {
            elem.removeClass(attrs.spyClass);
          }
        });
      }
    };
  }]);