'use strict';

angular.module('symathApp.controllers', [])

.controller('indexCtrl', ['$scope', '$modal', '$timeout', '$sce', function($scope, $modal, $timeout, $sce) {
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
                    {index: 10, title: '�omplex numbers', content: ['5 + 3i']}
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
  
  $scope.setError = function(text, loc) {
    $scope.showOutputTeX = false;
    $scope.outputTeX = undefined;
    
    $scope.errorMsg = [ text ];
    if(loc) {
      $scope.errorMsg.push(loc);
    } 
  }
  $scope.highlightError = function(loc) {
    if(!loc) {
      return;
    }
    
    var text = '&gt; ';
    text += $scope.inputExpr.substr(0, loc.start);
    text += '<b>' + $scope.inputExpr.substr(loc.start, loc.end - loc.start) + '</b>';
    text += $scope.inputExpr.substr(loc.end);
    
    return $sce.trustAsHtml(text);
  }
  $scope.calculate = function() {
    if(!$scope.inputExpr || $scope.inputExpr === '') {
      return $scope.setError('No data input.');
    }
    else {
      $scope.errorMsg = undefined;
    }
    
    var lib = require('libsymath'),
        expression;
    
    try {
      expression = new lib.Expression($scope.inputExpr);
      expression.optimize();
    } catch(e) {
      console.warn(e);
      return $scope.setError(e.message, $scope.highlightError(e.loc));
    }
    
    if(expression.getRoot()) {
      $scope.showOutputTeX = false;
      $scope.outputTeX = '\\begin{equation}' + expression.getRoot().serializeTeX() + '\\end{equation}';
      
      $timeout(function() {
        MathJax.Hub.Queue(
          ["setRenderer", MathJax.Hub, "SVG"],
          ["Typeset", MathJax.Hub],
          
          $timeout.bind(undefined, function() {
            $scope.showOutputTeX = true;
          })
        );
      });
    }
    
    else {
      return $scope.setError('Internal error!');
    }
  }
  
  $scope.clear = function() {
    $scope.showOutputTeX = false;
    $scope.outputTeX = undefined;
    $scope.errorMsg = undefined;
    $scope.inputExpr = '';
  }
}]);
