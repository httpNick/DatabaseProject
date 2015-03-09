/**
 * Created by httpnick on 3/3/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "duncan_nick_db"
});
/*
    On the main page (if the user is a business owner) it will display the reviews for the business they own. This
    file queries the database and creates the HTML table to be inserted onto the page.
 */
$(document).ready(function() {
    document.getElementById('userid').innerHTML = "You are currently: " + getUrlParameter('chooseuser');
    sessionStorage.userid = getUrlParameter('chooseuser');
    var queryString = "SELECT REVIEW.Username, REVIEW.ReviewText, REVIEW.Rating" +
    " FROM BusinessOwner JOIN REVIEW on BusinessOwner.BusinessOwned = REVIEW.BusinessName " +
    "WHERE BusinessOwner.Username='" + getUrlParameter('chooseuser')+ "';";
    console.log(queryString);
    conn.query(queryString, function(error, results) {
        if (error) {
            alert("Problem connecting to database.");
            throw error;
        } else {
            if (results.length > 0) {
            var myTable = "<thead><tr align='left'>";
            for (var col in results[0]) {
                myTable += "<th>" + col + "</th>";
            }
            myTable += '</tr></thead><tbody><tr>';
            for (var i = 0; i < results.length; i++) {
                myTable += "</tr><tr>";
                for (var col in results[i]) {
                    myTable += "<td>" + results[i][col] + "</td>";
                }
            }
            myTable += "</tr></tbody>";
            document.getElementById('thetable').className = 'sortable CSSTableGenerator';
            document.getElementById('thetable').innerHTML = myTable;
            var thenewtable = document.getElementById('thetable');
            sorttable.makeSortable(thenewtable);
        } else {
                document.getElementById('nodata').innerHTML = "Currently no reviews to show for your business, or you are not a business owner!";
            }
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