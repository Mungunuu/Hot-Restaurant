// Dependencies
// =============================================================
var express = require('express')
var path = require('path')

// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var guestInfo = []
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });
  
  // Displays all characters
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT)
})

// {/* <script type="text/javascript"> */}
    $("#search-btn").on("click", function() {
      var searchedCharacter = $("#character-search").val().trim();

      // Using a RegEx Pattern to remove spaces from searchedCharacter
      // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
      searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();

      $.get("/api//" + searchedCharacter, function(data) {
        console.log(data);
        if (data) {
          $("#stats").show();
          $("#name").text(data.name);
          $("#role").text(data.role);
          $("#age").text(data.age);
          $("#force-points").text(data.forcePoints);
        }
        else {
          $("#name").text("The force is not strong with this one. Your character was not found.");
          $("#stats").hide();
        }
      });
    });
//   </script>