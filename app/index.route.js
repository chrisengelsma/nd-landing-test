( function () {
  'use strict';

  angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('main', {
          url: '/main',
          controller: 'View1Controller',
          controllerAs: 'vm',
          templateUrl: 'view1/view1.html'
        });

      $urlRouterProvider.when('/', '/main');
      $urlRouterProvider.otherwise('/main');
    });

} )();
