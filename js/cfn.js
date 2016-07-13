/*
 * Provides functionality for Cockroach, Foot, Nuke 
 * 
 * @name   cfn
 * @author lhernandezcruz
 * @version 0.1
 */

// will hold the user information wins, ties, losses, totalPlayed
var user = {
    wins: 0
    , ties: 0
    , losses: 0
    , totalPlayed: 0
}

// rules 
// cockcroach ties with cockroach, loses to foot, and wins to nuke
var rules = {
    "cockroach": {
        "cockroach": "tie"
        , "foot": "loss"
        , "nuke": "win"
    }
    , "foot": {
        "cockroach": "win"
        , "foot": "tie"
        , "nuke": "loss"
    }
    , "nuke": {
        "cockroach": "loss"
        , "foot": "win"
        , "nuke": "tie"
    }
}



$(document).ready(function () {
    $("button").on("click", function () {
        // get user choice and ai choice
        var userChoice = this.id;
        var randNum = Math.floor(Math.random() * 3);
        var ai = "";
        switch (randNum) {
        case 0:
            ai = "cockroach";
            break;
        case 1:
            ai = "foot";
            break;
        case 2:
            ai = "nuke";
            break;

        }
        
        // update html and database based on win or loss or tie
        $("#choice").html("You chose " + userChoice + ". AI chose " + ai + ". <br>" + rules[userChoice][ai].toUpperCase());

        if (rules[userChoice][ai] === "win") {
            user.wins = user.wins + 1;
            user.totalPlayed = user.totalPlayed + 1;
            
            // update wins in database
            database.ref('/data/wins').transaction(function (wins) {
                if (wins != null){
                    return wins + 1;
                }
                
            });
            
            // update totalPlayed in database
            database.ref('/data/totalPlayed').transaction(function (totalPlayed) {
                if (totalPlayed != null ){
                    return totalPlayed + 1;
                }
                
            });
            $("#wins").html(user.wins);
            $("#total").html(user.totalPlayed);

        } else if (rules[userChoice][ai] === "loss") {
            user.losses = user.losses + 1;
            user.totalPlayed = user.totalPlayed + 1;
            
            // update losses in database
            database.ref('/data/losses').transaction(function (losses) {
                if (losses != null){
                    return losses + 1;
                }
                
            });
            
            // update total in database
            database.ref('/data/totalPlayed').transaction(function (totalPlayed) {
                if (totalPlayed != null ){
                    return totalPlayed + 1;
                }
                
            });
            $("#losses").html(user.losses);
            $("#total").html(user.totalPlayed);
        } else {
            user.ties += 1;
            user.totalPlayed += 1;
            
            // update ties in database
            database.ref('/data/ties').transaction(function (ties) {
                if (ties != null){
                    return ties + 1;
                }
                
            });

            // update totalPlayed in database
            database.ref('/data/totalPlayed').transaction(function (totalPlayed) {
                if (totalPlayed != null ){
                    return totalPlayed + 1;
                }
                
            });
            $("#ties").html(user.ties);
            $("#total").html(user.totalPlayed);
        }

    });

});