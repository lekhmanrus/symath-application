'use strict';

angular.module('symathApp.controllers', [])
  .controller('indexCtrl', ['$scope', '$modal', '$timeout', function($scope, $modal, $timeout) {

    $scope.docs = function() {
      $scope.title = 'Documentation';
      $scope.items = [
                        {index: 0, title: 'some', content: 'tra'},
                        {index: 1, title: '11111', content: '1111111111111111111111111'},
                        {index: 2, title: '2', content: '222'}
                    ];
      $scope.current = 0;
      $scope.content = $scope.items[$scope.current].content;
      $scope.show = function(id) {
        $scope.current = id;
        $scope.content = $scope.items[id].content;
      };
      var modal = $modal({scope: $scope, template: 'partials/modal/docs.tpl.html', animation: 'scale-fade', position: 'center'});
    };

    $scope.about = function() {
      var modal = $modal({scope: $scope, template: 'partials/modal/about.tpl.html', animation: 'scale-fade', position: 'center'});
    };
    
    $scope.calculate = function() {
      if(!$scope.inputText) {
        return;
      }
      
      var lib = require('libsymath'),
          expression;
      
      expression = new lib.Expression($scope.inputText);
      expression.optimize();
      
      $scope.output = '\\begin{equation}' + expression.getRoot().serializeTeX() + '\\end{equation}';
      $scope.ready = false;
      
      $timeout(function() {
        MathJax.Hub.Queue(
          ["setRenderer", MathJax.Hub, "SVG"],
          ["Typeset", MathJax.Hub]
        );
        
        $scope.ready = true;
      });
    }

  }]);