starter.controller("sessionCtrl", function ($scope, $cordovaSQLite, $stateParams, $ionicModal, ionicDatePicker) {
  $scope.currentDate = new Date();
  $scope.members = [{id: 1, name: "Max"}, {id: 2, name: "Alex"},{id: 3, name: "Alex"}];
  $scope.tobaccos = [{id:1, name: "Serbetli", taste: "Apple", quantity: 15}];
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

});
