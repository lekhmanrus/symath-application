'use strict';

angular.module('symathApp.controllers', [])

.controller('indexCtrl', ['$scope', '$modal', '$timeout', '$sce', 'cookbook', function($scope, $modal, $timeout, $sce, cookbook) {

  $scope.docs = function() {
    $scope.title = 'Cookbook';
    $scope.items = cookbook;
    $scope.current = 0;
    $scope.content = $scope.items[$scope.current].content;
    $scope.show = function(id) {
      $scope.current = id;
      $scope.content = $scope.items[id].content;
    };
    $scope.loadCookbookExpression = function(val) {
      $scope.inputExpr = val;
      $scope.calculate();
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
