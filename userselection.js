/**
 * Created by httpnick on 3/3/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : getUrlParameter('username'),
    password : getUrlParameter('password'),
    database : "duncan_nick_db"
});

var queryString = "";
/*
    Queries the database and fills the HTML select object with all usernames you can log-in as.
 */
$(document).ready(function() {
    $('#username').val(getUrlParameter('username'));
    $('#password').val(getUrlParameter('password'));
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

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}