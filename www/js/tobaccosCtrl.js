starter.controller('tobaccosCtrl', function($scope, $cordovaSQLite, $ionicSideMenuDelegate, $ionicModal, $state){
    $scope.tobaccos = tobaccosFromDb;
    $ionicModal.fromTemplateUrl('templates/add-tobacco.html', function(modal) {
      $scope.addTobaccoModal = modal;
    }, {
      scope: $scope,
      animation: 'scale-in'
    });

    $scope.refreshData = function () {
      $scope.tobaccos = [];
      var query = "SELECT * FROM tobaccos;";
      $cordovaSQLite.execute(db, query, []).then(function(res) {
        for (var i = 0; i < res.rows.length; i++) {
          $scope.tobaccos.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            quantity: res.rows.item(i).quantity,
            price: res.rows.item(i).price
          })
        }
      });
    };

    $scope.showTobaccoModal = function () {
      $scope.addTobaccoModal.show();
    };

    $scope.hideTobaccoModal = function () {
      $scope.addTobaccoModal.hide();
    };

    $scope.toggleMenu = function(){
      $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.addTobacco = function (tobacco) {
      var query = "INSERT INTO tobaccos (name, quantity, price) VALUES (?,?,?)";
      $cordovaSQLite.execute(db, query, [tobacco.name, tobacco.quantity, tobacco.price]).then(function (res) {
        $scope.tobaccos.push({
          id: res.insertId,
          name: tobacco.name,
          quantity: tobacco.quantity,
          price: tobacco.price
        });
        $scope.hideTobaccoModal();
      });
    };

    $scope.removeTobacco = function (tobacco) {
      var query = "DELETE FROM tobaccos WHERE id = ?";
      $cordovaSQLite.execute(db, query, [tobacco.id]).then(function (res) {
        $scope.refreshData();
      });
    };

    $scope.openTobaccoTaste = function (tobaccoId) {
      $state.go("app.tastes", {tobaccoId: tobaccoId});
    }
  });



