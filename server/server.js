var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"../app/dist")));

var filePath = path.join(__dirname, '../app/dist/data.json');

// Get Json data
app.get('/getData', function (req, res) {
    
    fs.readFile( filePath, 'utf8', function (err, data) {
    res.end( data );
   });
   
});

// Update Json
app.post('/updateData', function (req, res) {
    console.log("hello")
    console.log(req.body);
var file = require(filePath);
    
    for (var i=0;i<file.length;i++){
        
        if (file[i].Id == req.body.Id) {
            
            file[i].feasability = req.body.feasability;
        } 
    }

fs.writeFile(filePath, JSON.stringify(file), function (err,data) {
  if (err) return console.log(err);

    res.end(JSON.stringify(file));
});
    
});


app.listen(80,function(){
    console.log("Started listening on port", 80);
})