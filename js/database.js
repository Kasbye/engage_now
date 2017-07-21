/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('database', ['firebase'])

//Runs immidiately once the app gets set up
.run(function(){ 
        // Initialize Firebase
    var config = {
            apiKey: "AIzaSyB5XKm9t9XgetkfKFdOrDsl9VBvjzeZdos",
            authDomain: "kasbye-b961c.firebaseapp.com",
            databaseURL: "https://kasbye-b961c.firebaseio.com",
            projectId: "kasbye-b961c",
            storageBucket: "kasbye-b961c.appspot.com",
            messagingSenderId: "441919008983"
        };
        firebase.initializeApp(config);
    }
)

.service('Database', ['$firebaseArray', '$location', function($firebaseArray){

    
    var ref = firebase.database().ref().child('organizations');
    var sites = $firebaseArray(ref);
    
    var ref2 = firebase.database().ref().child('users').child('activities');
    var activities = $firebaseArray(ref2);
    
    var ref3 = firebase.database().ref().child('users').child('notifications');
    var notifications = $firebaseArray(ref3);
    
    var refr = firebase.database().ref().child("users").child("recommendations");
    var recoms = $firebaseArray(refr);
    
    var refp = firebase.database().ref().child("users").child("profiles");
    var profiles = $firebaseArray(refp);
    
    //https://stackoverflow.com/questions/39945284/looping-through-a-collection-of-firebase-database-records
    //https://stackoverflow.com/questions/41366954/need-to-iterate-through-firebase-data
    //https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
    
    var acts = [];
    ref2.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var GPS = {"lat": childSnapshot.val().Latitude, "lng": childSnapshot.val().Longitude};
            var id = childSnapshot.val().ID;
            acts.push(id);
        }); 
        // alert("sites.length: " + sites.length);
        // alert(sites[0].lat);
    });
    
    var notifs = [];
    var notifKeys = {};
    ref3.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.getKey();
            var id = childSnapshot.val().ID;
            notifs.push(id);
            notifKeys[id] = key;
        }); 
        // alert("sites.length: " + sites.length);
        // alert(sites[0].lat);
    });
    
    var organizations = {
        'profiles': profiles,
        // 'types': types,
        returnSites: function(){
            var sites = [];
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var s = {"id": childSnapshot.val().ID, "name": childSnapshot.val().Name, "description": childSnapshot.val().Description, 
                        "address": childSnapshot.val().Address, "city": childSnapshot.val().City, "state": childSnapshot.val().State, 
                        "zip": childSnapshot.val().Zip5, "phone": childSnapshot.val().Phone, "lat": childSnapshot.val().Latitude, 
                        "lng": childSnapshot.val().Longitude, "causeArea": childSnapshot.val().causeArea
                    };
                    // var GPS = {"lat": childSnapshot.val().Latitude, "lng": childSnapshot.val().Longitude};
                    sites.push(s);
                }); 
            });
            return sites;
        },
        returnProfiles: function(){
            var profiles = [];
            refp.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var p = {"id": childSnapshot.val().id,
                            "name": childSnapshot.val().name,
                            "location": childSnapshot.val().location, 
                            "password": childSnapshot.val().password,
                            "email": childSnapshot.val().email,
                            "score": childSnapshot.val().score,
                            "b10h": childSnapshot.val().b10h,
                            "b20h": childSnapshot.val().b20h,
                            "b2c": childSnapshot.val().b2c,
                            "b5c": childSnapshot.val().b5c,
                            };
                    // var GPS = {"lat": childSnapshot.val().Latitude, "lng": childSnapshot.val().Longitude};
                    profiles.push(p);
                }); 
            });
            //alert(activities.length);
            return profiles;
        },
        returnNotifications: function(){
            var notifs = [];
            ref3.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var n = {"id": childSnapshot.val().ID, "uId": childSnapshot.val().uId, "name": childSnapshot.val().Name, "date": childSnapshot.val().Date};
                    notifs.push(n);
                }); 
            });
            // alert(cause_areas.length);
            return notifs;
        },
        returnRecommendations: function(){
            var recoms = [];
            refr.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var r = {
                            "uid": childSnapshot.val().uid,
                            "survey": childSnapshot.val().survey,
                            "animals": childSnapshot.val().animals,
                            "blooddonation": childSnapshot.val().bloodDonation,
                            "boarddevelopment": childSnapshot.val().boardDevelopment,
                            "childrenyouth": childSnapshot.val().childrenYouth,
                            "communitydevelopment": childSnapshot.val().communityDevelopment,
                            "disasterrelief": childSnapshot.val().disasterRelief,
                            "educationliteracy": childSnapshot.val().educationLiteracy,
                            "emergencysafety": childSnapshot.val().emergencySafety,
                            "environment": childSnapshot.val().environment,
                            "faithbased": childSnapshot.val().faithBased,
                            "healthmedicine": childSnapshot.val().healthMedicine,
                            "homelesshousing": childSnapshot.val().homelessHousing,
                            "hunger": childSnapshot.val().hunger,
                            "legal": childSnapshot.val().legal,
                            "lgbt": childSnapshot.val().lgbt,
                            "peopledisabilities": childSnapshot.val().peopleDisabilities,
                            "politics": childSnapshot.val().politics,
                            "seniors": childSnapshot.val().seniors,
                            "sportsrecreation": childSnapshot.val().sportsRecreation,
                            "veteransmilitaryfamilies": childSnapshot.val().veteransMilitaryFamilies,
                            "women": childSnapshot.val().women
                            
                    };
                    // var GPS = {"lat": childSnapshot.val().Latitude, "lng": childSnapshot.val().Longitude};
                    recoms.push(r);
                }); 
            });
            // alert(activities.length);
            // alert(recoms.length);
            return recoms;
        },
        addAct: function(siteId, userId, date, hour, score, city){
            // alert(siteId + "," + userId + "," + date + "," + score + "," + city);
            acts.push(acts.length +1);
            activities.$add({
                'ID': (acts.length),
                'User': userId,
                'Location': siteId,
                'City': city,
                'Date': date,
                'Hour': hour,
                'Score': score
            })
        },
        addNotif: function(userId, date, name){
            // alert("I'm called!");
            notifs.push(notifs.length + 1);
            notifications.$add({
                'ID': notifs.length,
                'uId': userId,
                'Name': name,
                'Date': date
            })
        },
        deleteNotif: function(id){
            //item is the key in the database
            // for(var n in notifs)
            // alert(notifKeys[id]);
            notifications.$remove(notifications.$indexFor(notifKeys[id]));
            notifs.pop();
            // $location.path("/users/notifications");
        }
        // deleteSite: function(item){
        //     //item is the key in the database
        //     items.$remove(items.$indexFor(item));
        //     $location.path("/organizations");
            
        // },
        // updateSite: function(item, newV){
        //     //item is the key in the database
        //     items[items.$indexFor(item)].finished = newV;
        //     // item.finished = newV;
        //     items.$save(items[items.$indexFor(item)]);
        // }
    }
    
    return organizations;

}]);