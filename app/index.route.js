( function () {
  'use strict';

  angular.module('myApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          controller: 'View1Controller',
          controllerAs: 'vm',
          templateUrl: 'view1/view1.html'
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);
    });

} )();
