/**
 * Created by httpnick on 3/4/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "duncan_nick_db"
});

var queryString = '';
/*
    This javascript file handles the user creation page. There are two choices - to submit a basic user to submit
    a basic user, or submit a business owner user. Depending on which one has its form submitted it will insert the info
    filled out in the form to the database. An alert also pops up telling the user if their creation was successful or not.
 */
$(document).ready(function() {
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

    $("#business_user_creation").submit(function (event) {
        var buName = $('input[name=businessusernameinput]').val();
        var businessName = $('input[name=businessname]').val();
        var category = $('input[name=category]').val();
        var businessEmail = $('input[name=businessemail]').val();
        var businessuserAddress = $('input[name=businessuseraddress]').val();
        var businessAddress = $('input[name=businessuseraddress]').val();

        queryString = "INSERT INTO USER VALUES ('" + buName + "', '" + businessEmail + "', '" +  businessuserAddress + "');";
        console.log(queryString);
        conn.query(queryString, function(error, results)
        {
            if(error)
            {
                alert("User already exists, or information added is in incorrect format");
                throw error;
            } else {
                alert("Successful Creation of a User!");
                queryString = "INSERT INTO Business VALUES ('" + businessName + "', '" + category + "', '"
                + businessAddress + "');";
                console.log(queryString);
                conn.query(queryString, function(error, results)
                {
                    if(error)
                    {
                        alert("Business User already exists, or information added is in incorrect format");
                        throw error;
                    } else {
                        alert("Successful Creation of a Business!");
                        queryString = "INSERT INTO BusinessOwner VALUES ('" + buName + "', '" + businessName + "');";
                        console.log(queryString);
                        conn.query(queryString, function(error, results)
                        {
                            if(error)
                            {
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
