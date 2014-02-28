'use strict';

angular.module('symathApp.controllers', [])
  .controller('indexCtrl', ['$scope', '$modal', '$timeout', function($scope, $modal, $timeout) {

    $scope.docs = function() {
      $scope.title = 'Documentation';
      $scope.items = [
                      {index: 0, title: 'Addition', content: ['7 + 14 = 21', '21 * d + 3 * d = 24 * d']},
                      {index: 1, title: 'Substraction', content: ['127 - 8 = 119', '21 * d - 3 * d = 18 * d']},
                      {index: 2, title: 'Multiplication', content: ['15 * 3 = 45', '30 * b *c  * c = 30 * b * c^2']},
                      {index: 3, title: 'Division', content: ['33 / 11 = 3', '3*a / a = 3']},
                      {index: 4, title: 'Involution', content: ['2^5 + 3^2']},
                      {index: 5, title: 'Operations with fractions', content: ['For operations with fractions, just write numbers, using slash and press the button.', '7/8 + 4/8 =11/8']},
                      {index: 6, title: 'Trigonometry', content: ['sin(?)', 'tan(60)', '5*cos(0.56)']},
                      {index: 7, title: 'Solve equations', content: ['x^2 + 3*x1 - 4 = 0']},
                      {index: 8, title: 'Integrals', content: ['int (x+y) dx']},
                      {index: 9, title: 'Derivatives', content: ['partial x/dx (x^2 + 5)']},
                      {index: 10, title: 'Ñomplex numbers', content: ['5 + 3i']}
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