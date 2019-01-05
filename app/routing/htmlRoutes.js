var path = require('path');

module.exports = function(app) {
  // Route that sends the user to the homepage
  app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '/../public/index.html'));
  });

  // Route that sends user to survey page
  app.get('/survey', function (req, res) {
      res.sendFile(path.join(__dirname, '/../public/survey.html'));
  });

  // Default route to homepage
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
