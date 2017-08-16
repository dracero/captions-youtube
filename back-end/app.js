var express  = require('express');
var quickstart = require('./quickstart');

const app = express();

app.get('/:video_id',function (req,res){
  var video_id = req.params.video_id;
  console.log('El video_id es:'+video_id);
  var response = {};
  quickstart.foo(response)
  .then(function(){
    console.log('El response de quickstart:' + response['id-caption']);
    res.send('El id-caption es:'+response['id-caption']);
  })
})


app.listen(3050, function(){
  console.log('Ya se lanzó el server');
})
