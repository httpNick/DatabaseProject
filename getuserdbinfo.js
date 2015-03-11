/**
 * Created by httpnick on 3/10/15.
 */
var username = '';
var password = '';
$(document).ready(function() {
    $('form').submit(function (event) {
        console.log("submitting");
        username = $('input[name=username]').val();
        password = $('input[name=password]').val();
        //event.preventDefault();
    });
});