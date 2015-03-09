/**
 * Created by httpnick on 3/8/15.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "duncan_nick_db"
});
var queryString = "";
$(document).ready(function() {
    queryString = "Select Category " +
    "from Business ";
    conn.query(queryString, function(error, results) {
        if (error) {
            alert("Problem connecting to database.");
            throw error;
        } else {
            var optionArray = [];
            for (var i = 0; i < results.length; i++) {
                if (optionArray.indexOf(results[i].Category) === -1) {
                    optionArray.push(results[i].Category);
                }
            }
            var myOptionMenu = "";
            for (var i = 0; i < optionArray.length; i++) {
                myOptionMenu += "<option> " + optionArray[i] + " </option>";
            }
            document.getElementById('categorychoice').innerHTML = myOptionMenu;
        }
    });
});

$("form").submit(function( event ) {
    var arr = $('form').serializeArray();
    console.log(arr);
    if (arr[1].value === 'Not yet Rated') {
        queryString = "Select Business.BusinessName " +
        "from Business " +
        "where Category = \"" + arr[0].value + "\"" +  ";";
    } else {
        queryString = "Select Business.BusinessName " +
        "from Business JOIN REVIEW on Business.BusinessName = REVIEW.BusinessName " +
        "where Category = \"" + arr[0].value + "\"" +
        " AND Rating >= " + arr[1].value + ";";
    }
    console.log(queryString);
    conn.query(queryString, function(error, results)
    {
        if(error)
        {
            alert("Both text fields are not filled out, or have incorrect parameters.");
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
    event.preventDefault();
});