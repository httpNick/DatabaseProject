/**
 * Created by httpnick on 3/4/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : getUrlParameter('username'),
    password : getUrlParameter('password'),
    database : "duncan_nick_db"
});

var queryString = '';
var cUser = sessionStorage.userid;
/*
    Takes the info filled out from the html form, and submits the review into database in a query.
 */
$(document).ready(function() {
    $('#username').val(getUrlParameter('username'));
    $('#password').val(getUrlParameter('password'));
    document.getElementById('currentuser').innerHTML = "Submitting Review as: " + cUser;
    queryString = "Select Business.BusinessName " +
    "from BusinessOwner JOIN Business on BusinessOwner.BusinessOwned = Business.Businessname WHERE BusinessOwner.Username != '" + cUser + "';";
    conn.query(queryString, function (error, results) {
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


    $("form").submit(function (event) {
        var arr = $('form').serializeArray();
        queryString = 'INSERT INTO REVIEW VALUES (\"' + arr[2].value + '\", \"' +
        cUser + '\", \"' + arr[3].value + '\", ' + arr[4].value + ');';
        console.log(queryString);
        conn.query(queryString, function (error, results) {
            if (error) {
                alert("You can only review a business once!");
                throw error;
            } else {
                alert("added review successfully.");
            }
        });
        event.preventDefault();
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