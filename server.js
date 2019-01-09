// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Guests variable
// =============================================================

var guests = [{
    name: "",
    phoneNumber: "",
    email: "",
    uniqueID: ""
}];

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

//Displays resercations or returns no reservations made?
app.get("/api/guests/:guest", function (req, res) {
    var chosen = req.params.guests;

    console.log(chosen);

    for (var i = 0; i < guests.length; i++) {
        if (chosen === guests[i].routeName) {
            return res.json(guests[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/guests", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newGuest = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newGuest.routeName = newGuest.name.replace(/\s+/g, "").toLowerCase();

    console.log(newGuest);

    guests.push(newGuest);

    res.json(newGuest);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
