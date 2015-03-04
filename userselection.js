/**
 * Created by httpnick on 3/3/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "db_project"
});

var queryString = "";

$(document).ready(function() {
    queryString = "Select Username " +
    "from USER ";
    conn.query(queryString, function(error, results) {
        if (error) {
            alert("Problem connecting to database.");
            throw error;
        } else {
            var optionArray = [];
            for (var i = 0; i < results.length; i++) {
                if (optionArray.indexOf(results[i].Username) === -1) {
                    optionArray.push(results[i].Username);
                }
            }
            var myOptionMenu = "";
            for (var i = 0; i < optionArray.length; i++) {
                myOptionMenu += "<option> " + optionArray[i] + " </option>";
            }
            document.getElementById('chooseuser').innerHTML = myOptionMenu;
        }
    });
});