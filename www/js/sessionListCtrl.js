starter.controller("sessionListCtrl", function ($scope, $cordovaSQLite, $stateParams, $ionicModal, ionicDatePicker, $location, $state) {
  $scope.sessions = [];
  // $scope.sessions = [{"id": 1, "date": new Date(), "members": [], "tastes": []}, {"id": 1, "date": new Date(), "members": [], "tastes": []}];
  var refreshData = function () {
    var query = "SELECT * FROM smoke_sessions;";
    $cordovaSQLite.execute(db, query, []).then(function(res) {
      for (var i = 0; i < res.rows.length; i++) {
        $scope.sessions.push({
          id: res.rows.item(i).id,
          date: res.rows.item(i).date
        })
      }
      console.log($scope.sessions);
    });
  };

  refreshData();
  $scope.addNewSmokeSession = function () {
    $state.go("app.smokeSessionItem");
  };

  $scope.refreshSessions = function () {
    refreshData();
  }
});
