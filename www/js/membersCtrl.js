starter.controller("membersCtrl", function ($scope, $cordovaSQLite, $stateParams, $ionicModal) {
  $scope.members = [{id: 1, name: "Max"}, {id: 2, name: "Alex"}];
  // $scope.tobaccoId = $stateParams.tobaccoId;
  //
  // $ionicModal.fromTemplateUrl('templates/add-taste.html', function(modal) {
  //   $scope.addTasteModal = modal;
  // }, {
  //   scope: $scope,
  //   animation: 'scale-in'
  // });
  // $scope.addTaste = function (taste) {
  //   var query = "INSERT INTO `tastes`(`name`,`quantity`,`price`,`tobacco-id`) VALUES (?,?,?,?);";
  //   $cordovaSQLite.execute(db, query, [taste.name, taste.quantity, taste.price, $scope.tobaccoId]).then(function (res) {
  //     $scope.tastes.push({
  //       id: res.insertId,
  //       name: taste.name,
  //       quantity: taste.quantity,
  //       price: taste.pricetastesCtrl
  //     });
  //     $scope.hideTasteModal();
  //     refreshData();
  //   });
  // };
  //
  // function refreshData() {
  //   $scope.tastes = [];
  //   var query = "SELECT * from tastes where `tobacco-id` = ?;";
  //   $cordovaSQLite.execute(db, query, [$scope.tobaccoId]).then(function(res) {
  //     for (var i = 0; i < res.rows.length; i++) {
  //       $scope.tastes.push({
  //         id: res.rows.item(i).id,
  //         name: res.rows.item(i).name,
  //         quantity: res.rows.item(i).quantity,
  //         price: res.rows.item(i).price
  //       })
  //     }
  //   });
  // }
  //
  // refreshData();
  //
  // $scope.getTastesById = function (tobaccoId) {
  //   var query = "SELECT * from tastes where `tobacco-id` = ? ";
  //   $cordovaSQLite.execute(db, query, [tobaccoId]).then(function (res) {
  //     $scope.tastes.push({
  //       id: res.rows.item(i).id,
  //       name: res.rows.item(i).name,
  //       quantity: res.rows.item(i).quantity,
  //       price: res.rows.item(i).price
  //     });
  //     $scope.hideTasteModal();
  //   });
  // };
  //
  // $scope.showTasteModal = function () {
  //   $scope.addTasteModal.show();
  // };
  //
  // $scope.hideTasteModal = function () {
  //   $scope.addTasteModal.hide();
  // };
});
