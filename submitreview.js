/**
 * Created by httpnick on 3/4/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "db_project"
});

var queryString = '';
var cUser = sessionStorage.userid;

$(document).ready(function() {
    document.getElementById('currentuser').innerHTML = "Submitting Review as: " + cUser;
    queryString = "Select BusinessName " +
    "from Review WHERE Review.Username != '" + cUser + "';";
    conn.query(queryString, function(error, results) {
        if (error) {
            alert("Problem connecting to database.");
            throw error;
        } else {
            var optionArray = [];
            for (var i = 0; i < results.length; i++) {
                if (optionArray.indexOf(results[i].BusinessName) === -1) {
                    optionArray.push(results[i].BusinessName);
                }
            }
            var myOptionMenu = "";
            for (var i = 0; i < optionArray.length; i++) {
                myOptionMenu += "<option> " + optionArray[i] + " </option>";
            }
            document.getElementById('name').innerHTML = myOptionMenu;
        }
    });
});

$("form").submit(function(event) {
    var arr = $('form').serializeArray();
    console.log(arr);
    queryString = "INSERT INTO REVIEW VALUES ('" + arr[0].value + "', '" +
       cUser + "', '" + arr[1].value + "', " +  arr[2].value + ");";
    console.log(queryString);
    conn.query(queryString, function(error, results) {
       if (error) {
           alert("Problem with inserting data");
           throw error;
       } else {
           console.log("added review successfully.");
       }
    });
event.preventDefault();
});