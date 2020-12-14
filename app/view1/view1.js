( function () {
  'use strict'

  function View1Controller() {
    var vm = this;
    vm.debugMode = false;
  }

  angular.module('myApp')
    .controller('View1Controller', View1Controller);
} )();
