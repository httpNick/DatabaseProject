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

$(document).ready(function() {
    queryString = "Select * " +
    "from BusinessOwner " +
    "WHERE Username='" + getUrlParameter('chooseuser')+ "';";
    console.log(queryString);
    conn.query(queryString, function(error, results) {
        if (error) {
            alert("Problem connecting to database.");
            throw error;
        } else {
            var myTable = "<thead><tr align='left'>";
            for (var col in results[0]) {
                myTable+="<th>" + col + "</th>";
            }
            myTable+='</tr></thead><tbody><tr>';
            for (var i = 0; i < results.length; i++) {
                myTable+="</tr><tr>";
                for (var col in results[i]) {
                    myTable+="<td>" + results[i][col] + "</td>";
                } }
            myTable+="</tr></tbody>";
            document.getElementById('thetable').className = 'sortable CSSTableGenerator';
            document.getElementById('thetable').innerHTML = myTable;
            var thenewtable = document.getElementById('thetable');
            sorttable.makeSortable(thenewtable);
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