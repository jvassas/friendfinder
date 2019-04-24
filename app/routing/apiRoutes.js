var friendList = require("../data/friends");

module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        var user = req.body;

        for (var i = 0; i < user.answers.length; i++) {
            user.answers[i] = parseInt(user.answers[i]);
        }

        var matchIndex = 0;
        var minDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for(var j = 0; j < friends[i].answers.length; j++) {
                var difference = Math.abs(user.answers[j] - friends[i].answers[j]);
                totalDifference += difference;
            }

            if (totalDifference < minDifference) {
                matchIndex = i;
                minDifference = totalDifference;
            }
        }

        friends.push(user);

        res.json(friends[matchIndex]);


        
    });
};