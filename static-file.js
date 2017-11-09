var express = require('express');
var path = require('path');
var app = express();

app.use('/cssFiles', express.static(__dirname + '/css'));

app.get('/', function(req, resp) {
    resp.sendFile('index.html', {root: path.join(__dirname, './pages')});
})

app.listen(1337, function(){
    console.log('Listening at Port 3000');
});