(function() {
  "use strict";

    var DashboardController = function($scope){
        $scope.helloWorld = "Hello world";
    };
        
    DashboardController.$inject = ['$scope'];
    angular.module('dashboard').controller('DashboardController',DashboardController);
}());