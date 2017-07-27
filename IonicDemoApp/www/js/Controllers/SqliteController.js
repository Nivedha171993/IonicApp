IonicShowcase_App.Controller("SqliteController",function($scope,$ionicLoading,$cordovaToast){
    $scope.formdetails={
        UserName:"",
        Password:""
    };
    $scope.saveRequest=function(){
        $scope.showLoader();
        Console.log($scope.formdetails);
        $scope.openDb();
        mDB.transaction(function(tx){
            tx.executeSql('INSERT INTO UserDetails VALUES (?,?)', [$scope.formDetails.UserName,$scope.formDetails.Password]);   
        },function(error){
            console.log('ERROR IN ADDING RECORD-' + error.message);
            $scope.dismissLoader();
            $scope.closeDb();
            $cordovaToast.showShortCenter(MSG_RECORD_SAVE_ERROR);
            $scope.clearAllFields();
        },function() {
            console.log('RECORD ADDED');
            $scope.dismissLoader();
            $scope.closeDb();
            $cordovaToast.showShortCenter(MSG_RECORD_ADDED);
            $scope.clearAllFields();
        });
    };
    $scope.openDb=function(){
          mDb = window.sqlitePlugin.openDatabase({name: 'ionicdb', location: 'default'});
    };

    $scope.closeDb=function(){
          mDb.close(function () {
                  console.log("DB CLOSED");
              }, function (error) {
                  console.log("ERROR IN CLOSING DB: " + error.message);
          });
    };

    $scope.showLoader=function(){
        $ionicLoading.show({
        template: '<ion-spinner icon="crescent" class="spinner-positive"></ion-spinner>',
        animation: 'fade-in',
        showBackdrop: true,
        });
    };

    $scope.dismissLoader=function(){
        $ionicLoading.hide();
    };

    $scope.clearAllFields=function(){
        $scope.formDetails.UserName="";
        $scope.formDetails.Password=""
    };
})