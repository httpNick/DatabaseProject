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
/*
    This javascript file handles the user creation page. There are two choices - to submit a basic user to submit
    a basic user, or submit a business owner user. Depending on which one has its form submitted it will insert the info
    filled out in the form to the database. An alert also pops up telling the user if their creation was successful or not.
 */
$(document).ready(function() {
    $('#username').val(getUrlParameter('username'));
    $('#password').val(getUrlParameter('password'));
    $('#businesshiddenusername').val(getUrlParameter('username'));
    $('#businesshiddenpassword').val(getUrlParameter('password'));
    $("#basic_user_creation").submit(function (event) {
        var uName = $('input[name=usernameinput]').val();
        var basicEmail = $('input[name=basicemail]').val();
        var basicAddress = $('input[name=basicaddress]').val();
        queryString = "INSERT INTO USER VALUES ('" + uName + "', '" + basicEmail + "', '" +  basicAddress + "');";
        conn.query(queryString, function(error, results)
        {
            if(error)
            {
                alert("User already exists, or information added is in incorrect format");
                throw error;
            } else {
                alert("Successful Creation!");
                console.log(results);
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
