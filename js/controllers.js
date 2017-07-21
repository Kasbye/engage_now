angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {
    
    $scope.userData = $ionicUser.details;

    $scope.logout = function(){
        $ionicAuth.logout();
        $state.go('login');
    }

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', function ($scope, $stateParams, $ionicAuth, $ionicUser, $state) {
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        
        $scope.error = '';

        $ionicAuth.signup($scope.data).then(function() {
            // `$ionicUser` is now registered
            $ionicAuth.login('basic', $scope.data).then(function(){
              $state.go('intro');
            });
        }, function(err) {
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {

    $scope.data = {
        'email': '',
        'password': ''
    }
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        $state.go('menu.dashboard'); 
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.dashboard');
        }, function(){
            $scope.error = 'Error logging in.';
        });
    };
}])
   
.controller('introCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('surveyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.data={
        'Animals':0, 
        'BloodDonation':0, 
        'BoardDevelopment':0, 
        'ChildrenandYouth':0, 
        'CommunityDevelopment':0, 
        'DisasterRelief':0, 
        'EducationandLiteracy':0, 
        'EmergencyandSafety':0, 
        'Environment':0, 
        'FaithBased':0, 
        'HealthandMedicine':0, 
        'HomelessandHousing':0, 
        'Hunger':0, 
        'Legal':0, 
        'LGBT':0, 
        'PeoplewithDisabilities':0, 
        'Politics':0, 
        'Seniors':0, 
        'SportsandRecreation':0, 
        'VeteransandMilitaryFamilies':0, 
        'Women':0
    }
    $scope.clickYes1 = function(){
        $scope.data.Animals=1,
        $scope.data.EducationandLiteracy=1
        
    };
    $scope.clickYes2 = function(){
        $scope.data.Hunger=1
    };
    $scope.clickYes3 = function(){
        $scope.data.Animals=1,
        $scope.data.LGBT=1,
        $scope.data.PeoplewithDisabilities=1,
        $scope.data.Seniors=1,
        $scope.data.Women=1
    };
    $scope.clickYes4 = function(){
        $scope.data.DisasterRelief=1,
        $scope.data.EmergencyandSafety=1
    };
    $scope.clickYes5 = function(){
        $scope.data.Politics=1,
        $scope.data.Legal=1
    };
    $scope.clickYes6 = function(){
        $scope.data.CommunityDevelopment=1
    };
    $scope.clickYes7 = function(){
        $scope.data.VeteransandMilitaryFamilies=1
    };
    $scope.clickYes8 = function(){
        $scope.data.BloodDonation=1
    };
    $scope.clickYes9 = function(){
        $scope.data.FaithBased=1
    };
    $scope.clickYes10= function(){
        $scope.data.BoardDevelopment=1
    };
    $scope.clickYes11 = function(){
        $scope.data.Environment=1
    };
    $scope.clickYes12 = function(){
        $scope.data.HealthandMedicine=1
    };
    $scope.clickYes13 = function(){
        $scope.data.SportsandRecreation=1
    };

}])
   
.controller('dashboardCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', 'Database', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, Database, $ionicModal) {

     //Sobhan Code
    $scope.notifications = Database.returnNotifications();
    var userId = 150;
    
    $scope.options = ['Yes', 'No'];
    $scope.causes = ['Animals', 'Blood Donation', 'Children and Youth', 'Community and Development', 'Disaster Relief', 'Education and Literacy', 
        'Emergency and Safety', 'Environment', 'Faith Based', 'Health and Medicine', 'Homeless and Housing', 'Hunger', 'Legal', 'People with Disabilities',
        'Seniors', 'Veterans and Military Families', 'Women', 'Youth and Children'];
    
    $scope.feedback = {
        
    }
    
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
          "<h1 class='title'>Volunteering Feedback</h1>" + 
        //   '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
          "</ion-header-bar>" +
          "<ion-content class='padding'>" + 
            "<div class='item item-input'><label><b>Title:&nbsp;&nbsp;</b></label><input type='text' placeholder='' ng-model='feedback.title' /></div>" +
            "<div class='item item-input'><label><b>Type:&nbsp;&nbsp;</b></label><input type='text' placeholder='' ng-model='feedback.type' /></div>" +
            "<div class='item item-input'><label><b>Date:&nbsp;&nbsp;</b></label><input type='text' placeholder='' ng-model='feedback.date' /></div>" +
            "<div class='item item-input'><label><b>Did you visit this place?:&nbsp;&nbsp;</b></label><select ng-model='feedback.visit' ng-options='x for x in options' /></div>" +
            "<div class='item item-input'><label><b>Best tag?&nbsp;&nbsp;</b></label><select ng-model='feedback.OtherType' ng-options='x for x in causes' /></div>" +
            "<div class='item item-input'><label><b>Suggest Tags:&nbsp;&nbsp;</b></label><input type='text' placeholder='Separate by comma' ng-model='feedback.otherTags' /></div>" +
            "<button ng-click='applyFeedback()' class='button button-balanced button-block'>Submit</button>"+
            "<button ng-click='closeModal()' class='button button-assertive button-block'>Cancel</button>"+
          "</ion-content>" +
        "</ion-modal-view>",{
            scope: $scope,
            animation: 'slide-in-up'
    })
    
    $scope.showModal = function(title, type, date){
        $scope.modal.show();
        $scope.feedback.title = title;
        $scope.feedback.type  = type;
        $scope.feedback.date  = date;
    }
    
    $scope.closeModal = function(par){
        if(par != 'submit')
            if(window.confirm("Are you sure you want to cancel this?") === false)
                return false;
        $scope.feedback.title = '';
        $scope.feedback.type = '';
        $scope.feedback.date = '';
        $scope.feedback.OtherType = '';
        $scope.feedback.otherTags = '';
        $scope.modal.hide(); 
        return true;
    }
    
    $scope.applyFeedback = function(){
        //apply feedback into database
        $scope.closeModal('submit');
        
    }
    
    $scope.checkNotif = function(){
        $scope.notifications = Database.returnNotifications();
        for(var i=0;i<$scope.notifications.length;i++){
            var notif = $scope.notifications[i];
            if(notif.uId == userId){
                // alert("There is a match for " + notif.name);
                var timeNow = Date.now();
                if(Number(timeNow) - Number(notif.date) > 86400000)
                    if(window.confirm("Are you ready to provide feedback for: " + notif.name + "?") === true){
                        var d = new Date(Number(notif.date));
                        var dt = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
                        var res = $scope.showModal(notif.name.split(':')[0], notif.name.split(':')[1], dt);
                        if(res)
                            Database.deleteNotif(notif.id);
                    }
                    else{
                        Database.deleteNotif(notif.id);
                        // alert(notif.uId + "," + (Number(notif.date) + 86400000) + "," + notif.name);
                        Database.addNotif(notif.uId, (Date.now() + 86400000), notif.name);
                    }
            }
        }
    }
}])
   
.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('recommendationsCtrl', ['$scope', '$stateParams', 'uiGmapGoogleMapApi', '$cordovaGeolocation', 'Database', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, uiGmapGoogleMapApi, $cordovaGeolocation, Database, $ionicModal) {
    
    //Hide map at start
    var child = document.getElementsByTagName("divMap")[0];
    child.style.visibility = 'hidden';
    // $scope.showList();
    $scope.recommendations = Database.returnRecommendations();
    $scope.sites = Database.returnSites();
    
    // $scope.items = Database.items;
    // $scope.sites = Database.sites;
    
    $scope.newVol = {
        // 'title': ''
    }
    
    $scope.markerIds = {};
    
    
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
          "<h1 class='title'>Volunteering Check-in</h1>" + 
        //   '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
          "</ion-header-bar>" +
          "<ion-content class='padding'>" + 
            "<div class='item item-input'><label><b>Title:&nbsp;&nbsp;</b></label><input type='text' placeholder='' ng-model='newVol.title' /></div>" +
            "<div class='item item-input'><label><b>Type:&nbsp;&nbsp;</b></label><input type='text' placeholder='' ng-model='newVol.type' /></div>" +
            "<div class='item item-input'><label><b>Date:&nbsp;&nbsp;</b></label><input type='date' placeholder='' ng-model='newVol.date' /></div>" +
            "<div class='item item-input'><label><b>Start Time:&nbsp;&nbsp;</b></label><input type='time' placeholder='' ng-model='newVol.start' /></div>" +
            "<div class='item item-input'><label><b>Hours:&nbsp;&nbsp;</b></label><input type='number' placeholder='' ng-model='newVol.hours' /></div>" +
            "<button ng-click='addActivity()' class='button button-balanced button-block'>Submit</button>"+
            "<button ng-click='closeModal()' class='button button-assertive button-block'>Cancel</button>"+
          "</ion-content>" +
        "</ion-modal-view>",{
            scope: $scope,
            animation: 'slide-in-up'
    })
    
    $scope.showModal = function(id){
        $scope.modal.show();
        $scope.newVol.title = $scope.markerIds[id].name;
        $scope.newVol.type  = $scope.markerIds[id].causeArea;
        $scope.newVol.siteId = $scope.markerIds[id].id;
        $scope.newVol.userId = 150;
        $scope.newVol.city =  $scope.markerIds[id].city;
    }
    
    $scope.closeModal = function(par){
        if(par != 'submit')
            if(window.confirm("Are you sure you want to cancel this?") === false)
                return;
        $scope.newVol.title = '';
        $scope.newVol.type = '';
        $scope.newVol.date = '';
        $scope.newVol.start = '';
        $scope.newVol.hours = '';
        $scope.modal.hide(); 
    }
    
    $scope.addActivity = function(){
        // siteId, userId, date, hour, score, city
        var start = new Date($scope.newVol.start.toString());
        start.setUTCDate($scope.newVol.date.getDate());
        start.setUTCMonth($scope.newVol.date.getMonth());
        start.setFullYear($scope.newVol.date.getFullYear());
        
        var date = ($scope.newVol.date.getMonth()+1) + "/" + $scope.newVol.date.getDate() + "/" + $scope.newVol.date.getFullYear();
        Database.addAct($scope.newVol.siteId, $scope.newVol.userId, date, $scope.newVol.hours, $scope.newVol.hours*10, $scope.newVol.city);
        Database.addNotif($scope.newVol.userId, start.getTime(), $scope.newVol.title + ": " + $scope.newVol.type.split(',')[0]);//id, userId, date, name){
        $scope.closeModal('submit');
        alert('You have successfully checked-in!');
    }
    
    uiGmapGoogleMapApi.then(function(maps){
        // Configuration needed to display the road-map with traffic
        $scope.map = {
            center: {
              latitude: 41,
              longitude: -83
            },
            zoom: 8,
            markers: [],
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi
                    //without forcing of calling the google.map helper outside of the function
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                zoomControl: false
            },
            showTraficLayer:true,
            //Given from: https://stackoverflow.com/questions/30910883/add-marker-in-angular-google-maps
            events: {
                click: function (map, eventName, originalEventArgs) {
                    // var e = originalEventArgs[0];
                    // var lat = e.latLng.lat(),lng = e.latLng.lng();
                    // var marker = {
                    //     id: Date.now(),
                    //     coords: {
                    //         latitude: lat,
                    //         longitude: lng
                    //     },
                    //     options:{
                    //         icon: 'http://maps.google.com/mapfiles/kml/pal3/icon38.png'
                    //     },
                    //     events: {
                    //         click: function(marker, eventName, originalEventArgs){
                    //             //Do something
                    //         }
                    //     }
                    // };
                    // $scope.map.markers.push(marker);
                    // $scope.$apply();
                }
            }
        };

    });
    
    $scope.setCenter = function(){
        // this.map.zoom = 10;
        // navigator.geolocation.getCurrentPosition(onSuccessGetPos, onErrorGetPos, {timeout: 1000, enableHighAccuracy: true});
        $scope.getLocation();
        
        // var input = this.inputCenter.replace(" ", "");
        // this.inputCenter = "";
        // var lat = Number(input.split(',')[0]);
        // var lng = Number(input.split(',')[1]);   
        // if(isNaN(lat) || isNaN(lng))
        //     return;
        // this.map.center = {latitude: lat, longitude: lng};
        
        // var myLatLng = {lat: Number(input.split(',')[0]) , lng: Number(input.split(',')[1])};
        // var marker = new google.maps.Marker({
        //     position: myLatLng,
        //     map: this.map,
        //     title: "I'm the center!"
        // });
        
    }
    
    $scope.map = this.map;
    
    //given from: https://github.com/apache/cordova-plugin-geolocation
    function onSuccessGetPos (position) {
        $scope.map.center = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        // $scope.setCenter_CallBack(position.coords.latitude, position.coords.longitude);
    }
    function onErrorGetPos(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    
    
    //To learn how to work with cordova native geo-location plug-in: https://forum.ionicframework.com/t/how-to-user-ngcordova-with-ionic-creator/68619

    $scope.getLocation = function() {
        
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.setCenter_CallBack(position.coords.latitude, position.coords.longitude);
            }, function(err) {
          // error
        });
    }
    
    $scope.setCenter_CallBack = function(lat, lng){
        this.map.center = {latitude: lat, longitude: lng};
        this.map.zoom = 12;
    }
    
    // var watchOptions = {
    //     frequency : 1000,
    //     timeout : 3000,
    //     enableHighAccuracy: false // may cause errors if true
    // };
    function onSuccessWatch(position) {
        if(position.coords.speed === 0)
            alert("Move a little!");
        alert("Speed: " + position.coords.speed);
        alert("New Position: " + position.coords.latitude + "," + position.coords.longitude)
    }

    // onError Callback receives a PositionError object
    //
    function onErrorWatch(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    
    $scope.watchMe = function(){
        return navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch, {timeout: 10000, frequency : 1000 });    
    }
    
    
    $scope.defineIcons = function(){
        var baseUrl = 'http://maps.google.com/mapfiles/kml/';
        var icons = {};
        
        //Get icons from: https://mapicons.mapsmarker.com/ and http://kml4earth.appspot.com/icons.html
        
        //Animals
        icons['Animals'] = baseUrl; 
        icons['bloodDonation'] = baseUrl + 'pal4/icon63.png'; 
        icons['childrenYouth'] = ''; 
        icons['communityDevelopment'] = ''; 
        icons['disasterRelief'] = ''; 
        icons['educationLiteracy'] = 'https://cdn0.iconfinder.com/data/icons/activities-1/24/236-24.png'; 
        icons['emergencySafety'] = ''; 
        icons['Environment'] = 'http://maps.google.com/mapfiles/kml/shapes/terrain.png'; 
        icons['faithBased'] = '';  //something related to church?
        icons['healthMedicine'] = ''; 
        icons['homelessHousing'] = ''; 
        icons['hunger'] = ''; 
        icons['legal'] = ''; //something related to court? 
        icons['peopleDisabilities'] = baseUrl + 'shapes/wheel_chair_accessible.png'; 
        icons['seniors'] = 'https://cdn1.iconfinder.com/data/icons/pictograms-glyphs/48/92-24.png'; 
        icons['veteransMilitaryFamilies'] = ''; 
        icons['women'] = 'http://maps.google.com/mapfiles/kml/shapes/woman.png';
        
        return icons;
    }
    
    $scope.showOrganizations = function(){
        var sites = Database.returnSites();
        
        //Get icons
        var icons = $scope.defineIcons();
        // this.map.center = {latitude: 35, longitude: 51};
        // $scope.map.center = {latitude: sites[0].lat, longitude: sites[0].lng};
        $scope.setCenter();
        $scope.map.zoom = 14;
        var count = 0;
        for(var i=0;i<$scope.sites.length;i++){
            var s = $scope.sites[i];
            var img = icons[s.causeArea];
            if(img.length === 0)
                img = 'http://maps.google.com/mapfiles/kml/paddle/D.png';
            var icon = {
                url: img,
                scaledSize: new google.maps.Size(35, 35), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
            
            
            var marker = {
                id: s.id,
                coords: {
                    latitude: s.lat,
                    longitude: s.lng
                },
                title: s.name,
                options: {
                    icon: icon
                },
                events: {
                    click: function(marker, eventName, originalEventArgs){
                        var message = "This is '" +  $scope.markerIds[originalEventArgs.idKey].name + "'\n" + 
                            "\nAre you ready for a volunteering?";
                        $scope.doVolunteer(window.confirm(message), originalEventArgs.idKey);
                        // $scope.map.markers[$scope.map.markers.length-1].infowindow.close();
                    } 
                }
            };
            
            if(s.id in $scope.markerIds)
                continue;
            $scope.map.markers.push(marker);
            $scope.markerIds[s.id] = $scope.sites[i];
        }
        
        // alert($scope.map.markers.length);
    }
    
    $scope.doVolunteer  = function(confirm, id){
        if(confirm === true){
            // alert("Thanks!");
            $scope.showModal(id);
            // alert(title);
        }
        // else
        //     alert("No worries! Maybe next time!");
    }
    
    $scope.showList = function(){
        
        if(document.getElementsByTagName("divMap").length > 0){
            var child = document.getElementsByTagName("divMap")[0];
            child.style.visibility = 'hidden';
            
        }
        
        var child2 = document.getElementsByTagName("divList")[0];
        child2.style.visibility = 'visible';
        
        $scope.recommendations = Database.returnRecommendations();
        $scope.sites = Database.returnSites();
        
        $scope.userRecoms = [];
        
        var userID = 10;
        for(var i=0;i<$scope.recommendations.length;i++){
            var r = $scope.recommendations[i];
            if(Number(r.uid) == userID){
                //generate preference based recommendations
                for(var j=0;j<$scope.sites.length;j++){
                    var s = $scope.sites[j];
                    if(Number(r[s.causeArea.toLowerCase()]) == 1)
                        $scope.userRecoms.push(s);
                }
                break;
            }
        }
    }
    
     $scope.showMap = function(){
        
        if(document.getElementsByTagName("divList").length > 0){
            var child = document.getElementsByTagName("divList")[0];
            child.style.visibility = 'hidden';
            
        }
        
        var child2 = document.getElementsByTagName("divMap")[0];
        child2.style.visibility = 'visible';
        
        $scope.showOrganizations();
    }
}])
   
.controller('myEventsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('leaderboardCtrl', ['$scope', '$stateParams', 'Database', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Database) {

    $scope.profiles = Database.profiles;

}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('aboutCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {


}])
 