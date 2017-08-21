var ip;
var port;

function serverCall() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'http://'+ip+':'+port+'/'+videoId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
}
