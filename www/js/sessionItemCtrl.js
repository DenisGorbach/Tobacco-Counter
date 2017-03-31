starter.controller("sessionItemCtrl", function ($scope, $cordovaSQLite, $stateParams, $ionicModal, ionicDatePicker) {
  $scope.currentDate = new Date();
  $scope.members = [];
  $scope.tobaccoTastes = [];
  $scope.other = [];
  $scope.priceForOnePerson = 0;
  $scope.priceTotal = 0;
  $scope.sessionTitle = "New session";
  $scope.isCheckedShown = true;
  $scope.sessionId = 0;


  // $scope.tobaccos = [{id:1, name: "Serbetli", taste: "Apple", quantity: 15}];
  // $scope.other = [{id:1, name: "Coal", quantity: 15, price: 2}];
  // $scope.members = [{id: 1, name: "Max"}, {id: 2, name: "Alex"},{id: 3, name: "Alex"}];

  $scope.selectedDate = new Date();
  $scope.selectedDateFormatted = $scope.selectedDate.toLocaleString();

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      $scope.selectedDate = new Date(val);
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2020, 10, 30), //Optional
    inputDate: $scope.selectedDate,      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.addNewSmokeSession = function(){
    var insertSessionQuery = "INSERT INTO smoke_sessions (date) VALUES (?);";

    $cordovaSQLite.execute(db,insertSessionQuery, [$scope.selectedDate.getTime()]).then(function (res) {
      $scope.sessionId = res.insertId;
      console.log($scope.selectedDate.getTime());
    });
    var insertSessionTobaccoQuery = "INSERT INTO smoke_sessions_tastes (session_id, taste_id, tobacco_taste_count) VALUES(?,?,?);";

    $scope.tobaccoTastes.forEach(function (taste) {
      $cordovaSQLite.execute(db, insertSessionTobaccoQuery, [$scope.sessionId, taste.id, taste.quantity]).then(function (res) {
        console.log(res.insertId);
      })
    });
  };

  $scope.addMember = function () {


    $scope.members.push({id: 1, name: "Max"});
  };

  $scope.addTobaccoTaste = function(){
    $scope.tobaccoTastes.push({id:1, name: "Serbetli", taste: "Apple", quantity: 15});
  };

});
