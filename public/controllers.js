/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($rootScope, $scope) {
    // INITIALIZATION AND NAVBAR LOGIC
    
  })

  .controller('ConfirmEmailCtrl', function ($scope, $window, $stateParams) {
    $http($window.location.origin + '/api/confirm?token=' + $stateParams.token).then(
      function (response) {
        console.log(response)
      },
      function (response) {
        console.log(response)
      })
  })

  // NEW ENTRANT
  .controller('NewEntrantCtrl', function ($scope, $http, Entrant) {

    // CREATE ENTRRANT
    $scope.createEntrant = function() {   
      var entrant = new Entrant($scope.entrant);
      entrant.$save(function(data) {
        $('#afterEnter').modal('show')
        $scope.enteredRaffle = true;
      })
    }; 

  })

  //ENTRANTS
  .controller('EntrantsIndexCtrl', function ($scope, $http, Entrant) {

    // GET ENTRANTS
    Entrant.query(function(data) {
      $scope.entrants = data.results;
    });

    // DELETE A ENTRRANT
    $scope.deleteEntrant = function(entrant, index) {
      Entrant.delete({ id: entrant.objectId }, function(data) {
        $scope.entrants.splice(index, 1);
      })
    }
  });