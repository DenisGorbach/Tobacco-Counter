// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var tobaccosFromDb = [];
var starter = angular.module('starterApp', ['ionic', 'ngCordova', 'ionic-datepicker'])

  .config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      // controller: 'tobaccosCtrl'
    })

    .state('app.tobaccos', {
      url: '/tobaccos',
      views: {
        'menuContent': {
          templateUrl: 'templates/tobaccos.html',
          controller: 'tobaccosCtrl'
        }
      }
    })
    .state('app.smokeSessionList', {
      url: '/smoke-session-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/smoke-session-list.html',
          controller: 'sessionListCtrl'
        }
      }
    })
    .state('app.smokeSessionItem', {
      url: '/smoke-session-item/:sessionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/smoke-session.html',
          controller: 'sessionItemCtrl'
        }
      }
    })
    .state('app.members', {
      url: '/members',
      views: {
        'menuContent': {
          templateUrl: 'templates/members.html',
          controller: 'membersCtrl'
        }
      }
    })
    .state('app.tastes', {
      url: '/tastes/:tobaccoId',
      views: {
        'menuContent': {
          templateUrl: 'templates/tastes.html',
          controller: 'tastesCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tobaccos');
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
})

  .run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      db = $cordovaSQLite.openDB({name: "tobacco.db", location: "default"});
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tobaccos (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name	TEXT, quantity	REAL, price	REAL)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `tastes` (`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,`name`	TEXT,`quantity`	REAL,`price`	REAL,`tobacco-id`	INTEGER, FOREIGN KEY (`tobacco-id`) REFERENCES tobaccos(id));)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `members` (`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `name`	TEXT);");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `smoke_sessions` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `date` TEXT)");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `smoke_sessions_members` (`session_id` INTEGER, `member_id` INTEGER,PRIMARY KEY(session_id, member_id))");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `smoke_sessions_tastes` (`session_id` INTEGER,`taste_id` INTEGER,`tobacco_taste_count` REAL, PRIMARY KEY(session_id,taste_id))");
      // $cordovaSQLite.execute(db, "DELETE FROM smoke_sessions;");
      // $cordovaSQLite.execute(db, "INSERT INTO smoke_sessions (date) VALUES (1489501491074);");

      var query = "SELECT * FROM tobaccos;";
      $cordovaSQLite.execute(db, query, []).then(function(res) {
        for (var i = 0; i < res.rows.length; i++) {
          tobaccosFromDb.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            quantity: res.rows.item(i).quantity,
            price: res.rows.item(i).price
          })
        }
      });
    });
  });


