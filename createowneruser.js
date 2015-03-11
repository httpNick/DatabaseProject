/**
 * Created by httpnick on 3/10/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : getUrlParameter('username'),
    password : getUrlParameter('password'),
    database : "duncan_nick_db"
});

$('document').ready(function() {
    $('#username').val(getUrlParameter('username'));
    $('#password').val(getUrlParameter('password'));
    $("#business_user_creation").submit(function (event) {
        var buName = $('input[name=businessusernameinput]').val();
        var businessName = $('input[name=businessname]').val();
        var category = $('input[name=category]').val();
        var businessEmail = $('input[name=businessemail]').val();
        var businessuserAddress = $('input[name=businessuseraddress]').val();
        var businessAddress = $('input[name=businessuseraddress]').val();

        queryString = "INSERT INTO USER VALUES ('" + buName + "', '" + businessEmail + "', '" + businessuserAddress + "');";
        console.log(queryString);
        conn.query(queryString, function (error, results) {
            if (error) {
                alert("User already exists, or information added is in incorrect format");
                throw error;
            } else {
                alert("Successful Creation of a User!");
                queryString = "INSERT INTO Business VALUES ('" + businessName + "', '" + category + "', '"
                + businessAddress + "');";
                console.log(queryString);
                conn.query(queryString, function (error, results) {
                    if (error) {
                        alert("Business User already exists, or information added is in incorrect format");
                        throw error;
                    } else {
                        alert("Successful Creation of a Business!");
                        queryString = "INSERT INTO BusinessOwner VALUES ('" + buName + "', '" + businessName + "');";
                        console.log(queryString);
                        conn.query(queryString, function (error, results) {
                            if (error) {
                                alert("BusinessUser already exists, or information added is in incorrect format");
                                throw error;
                            } else {
                                alert("Successful Creation of a Business User!");
                                console.log(results);
                            }
                        });
                    }
                });
            }
        });
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