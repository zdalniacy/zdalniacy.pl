angular.module('dashboard',[]);
angular.module('zdalniacyAdmin',['ngRoute','dashboard']);

angular.module('zdalniacyAdmin').config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: '/app/admin/dashboard/dashboard.html',
        controller: 'DashboardController'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
}]);