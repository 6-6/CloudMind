
app.controller('NavBarCtrl', ['$scope', '$state', 'NodeStore', function($scope, $state, NodeStore) {

    initNavBarCtrl();

    function initNavBarCtrl(){
        $scope.navBarCallback = function(_state){
            $scope.state = _state;
        };
        $scope.state = false;
        NodeStore.registerNavbarCallback($scope.navBarCallback);
    }

    $scope.goRootList = function(){
        NodeStore.setRootList(function(){
            $state.go('app.list');
        });
    }
}]);

app.controller('DropdownCtrl', ['$scope', function ($scope) {

    $scope.toggleDropdown = function ($event, state) {
        if(!state) $event.stopPropagation();
        $scope.newName='';
    };

    $scope.toggled = function(open){
        console.log(open);
    };

}]);

app.controller('UserCtrl', ['$scope', 'HttpSvc', function($scope, HttpSvc) {

    $scope.isEditmode = false;

    initUser();

    $scope.clickEditName = function(){
        $scope.isEditmode = true;
        $scope.newName = $scope.username;
    };

    $scope.updateName = function(){
        $scope.isEditmode = false;
        if(!$scope.newName)
            return;

        HttpSvc.updateName($scope.newName)
            .success(function (res) {
                if (res.success) {
                    $scope.username = $scope.newName;
                }
                else throw new Error;
            })
            .error(function (err) {
                console.log(err);
            });
    };

    $scope.clickCancelBtn = function(){
        $scope.isEditmode = false;
    };

    $scope.updatePicture = function($event){
        // angular.element('#fileBtn').trigger('click');
        window.open("https://plus.google.com/me",'_blank');

    };

    $scope.logout = function() {
        location.href="/logout";
    };

    function initUser() {
        HttpSvc.getProfile()
            .success(function (res) {
                if (res.success) {
                    $scope.username = res.profile.name;
                    $scope.useremail = res.profile.email;
                    $scope.profile_url = res.profile.profile_url;
                }
                else throw new Error;
            })
            .error(function (err) {
                console.log(err);
            });
    }

}]);