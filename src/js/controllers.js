'use strict';

angular.module('symathApp.controllers', [])

.controller('indexCtrl', ['$scope', '$modal', '$timeout', '$sce', 'cookbook', function($scope, $modal, $timeout, $sce, cookbook) {
  
  $scope.nw = typeof window.outsideNW == 'undefined';
  $scope.currentOutput = '';

  $scope.docs = function() {
    var modal = $modal({scope: $scope, template: 'partials/modal/docs.tpl.html', animation: 'scale-fade', position: 'center'});
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
      //modal.show = false;
      modal.hide();
      $scope.calculate();
    };
  };

  $scope.changeMode = function() {
    if($scope.inputExpr && $scope.inputExpr != "")
      $scope.calculate();
  };

  $scope.addOutputToInput = function() {
    $scope.inputExpr = $scope.currentOutput;
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
  };

  $scope.highlightError = function(loc) {
    if(!loc) {
      return;
    }
    
    var text = '&gt; ';
    text += $scope.inputExpr.substr(0, loc.start);
    text += '<b>' + $scope.inputExpr.substr(loc.start, loc.end - loc.start) + '</b>';
    text += $scope.inputExpr.substr(loc.end);
    
    return $sce.trustAsHtml(text);
  };

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
      if(/partial\[(.+),(.+)\]/g.test($scope.inputExpr)) {
        var p = /partial\[(.+),(.+)\]/g.exec($scope.inputExpr);
        expression = new lib.Expression(p[1].trim()).optimize().differentiate(p[2].trim()).nice($scope.mode || 'expanced');
      }
      else
        expression = new lib.Expression($scope.inputExpr).optimize().nice($scope.mode || 'expanced');
    } catch(e) {
      console.warn(e);
      return $scope.setError(e.message, $scope.highlightError(e.loc));
    }
    
    if(expression.getRoot()) {
      $scope.showOutputTeX = false;
      $scope.outputTeX = '\\begin{equation}' + expression.getRoot().serializeTeX() + '\\end{equation}';
      $scope.currentOutput = expression.getRoot().serializeText();

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
  };
  
  $scope.save = function() {
    $('input#savefile').val("");
    console.log("before " + $('input#savefile').val());
    $('input#savefile').click();
  };

  $scope.clear = function() {
    $scope.showOutputTeX = false;
    $scope.outputTeX = undefined;
    $scope.errorMsg = undefined;
    $scope.inputExpr = '';
  };

  Mousetrap.bind(['enter', 'command+e', 'ctrl+e', '=', 'e'], function() {
    $timeout(function() {
      $scope.calculate();
    });
    return false;
  });
  Mousetrap.bind(['command+s', 'ctrl+s'], function() {
    $timeout(function() {
      $scope.save();
    });
    return false;
  });
  Mousetrap.bind(['del', 'backspace'], function() {
    $timeout(function() {
      $scope.clear();
    });
    return false;
  });
  Mousetrap.bind(['f1', 'ctrl+h', 'h'], function() {
    $timeout(function() {
      $scope.docs();
    });
    return false;
  });
  Mousetrap.bind(['ctrl+i', 'i'], function() {
    $timeout(function() {
      $scope.about();
    });
    return false;
  });

}]);
