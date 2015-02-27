var p = require('path');
var req = require('request');
var mysql = require('mysql');
console.log(p.join(process.cwd(), 'static', '/index.html'));
var conn = mysql.createConnection({
host : "localhost",
user : "root",
password : "",
database : "cape_codd"
});
var queryString = "Select * from INVENTORY";

$("form").submit(function( event ) {
var arr = $('form').serializeArray();
queryString = "Select " + arr[0].value +", " + arr[1].value + " from INVENTORY";
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
		myTable+='</tr></thead><tbody><tr>'
			for (var i = 0; i < results.length; i++) {
				myTable+="</tr><tr>";
				for (var col in results[i]) {
				myTable+="<td>" + results[i][col] + "</td>";
				} }
		myTable+="</tr></tbody>";
		document.getElementById('thetable').innerHTML = myTable;
	}
});
event.preventDefault();
});

