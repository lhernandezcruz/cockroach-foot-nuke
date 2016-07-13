/*
 * Uses google firebase database
 * 
 * @name firebase
 * @version 0.1
 */


// global object to connect to database
var config = {
    apiKey: ""
    , authDomain: "cockroach-foot-nuke.firebaseapp.com"
    , databaseURL: "https://cockroach-foot-nuke.firebaseio.com"
    , storageBucket: "cockroach-foot-nuke.appspot.com"
, };
firebase.initializeApp(config);
var database = firebase.database();

// Sign the user in anonymously.
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    console.log("A firebase error occured:"
            + "\nCode: " + error.code
            + "\nMessage: " + error.message);
});

// Register a listener for sign changes.
firebase.auth().onAuthStateChanged(function(user) {
  isSignedIn = user.isAnonymous ? true : false;
});

// register listener for database
database.ref('/data').on('value', function(snapshot) {
    // get wins, losses, ties and totalPlayed
    // display it on main page
    
    var snapshot = snapshot.val();
    var totalWins = snapshot.wins;
    var totalLosses = snapshot.losses;
    var totalTies = snapshot.ties;
    var totalPlayed = snapshot.totalPlayed;
    $("#totalWins").html(totalWins);
    $("#totalLosses").html(totalLosses);
    $("#totalTies").html(totalTies);
    $("#totalPlayed").html(totalPlayed);
});
