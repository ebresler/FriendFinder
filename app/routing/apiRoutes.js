var friends = require('../data/friends.js');

module.exports = function (app) {
  // API path to get the friends data, responds with a json object (an array of friends)
  app.get('/api/friends', function (req,res) {
      res.json(friends);
  });

  // Updates friends array and sends back the JSON of the most compatible new friend
  app.post('/api/friends', function (req, res) {
   
      var newFriend = req.body;

      // compute best match using absolute value and a for loop that replaces best match as it cycles through friends array
      var bestMatch = {};

      for(var i = 0; i < newFriend.scores.length; i++) {
        if(newFriend.scores[i] == "1 (Strongly Disagree)") {
          newFriend.scores[i] = 1;
        } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores[i] = 5;
        } else {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }
      }

      var bestMatchIndex = 0;
      var bestMatchDifference = 40;

      for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;

        for(var index = 0; index < friends[i].scores.length; index++) {
          var differenceOneScore = Math.abs(friends[i].scores[index] - newFriend.scores[index]);
          totalDifference += differenceOneScore;
        }

        if (totalDifference < bestMatchDifference) {
          bestMatchIndex = i;
          bestMatchDifference = totalDifference;
        }
      }

      bestMatch = friends[bestMatchIndex];

      // push new friend from survey to friends array
      friends.push(newFriend);

      // return the best match friend
      res.json(bestMatch);
  });

};
