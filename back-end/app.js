var express  = require('express');
var quickstart = require('./quickstart');

const app = express();
app.get('/favicon.ico', function(req, res) {
    res.send('favicon.ico');
    res.status(204);
});


app.get('/:video_id',function (req,res){
  var video_id = req.params.video_id;
  console.log('El video_id es:'+video_id);
  var response = {
    'id-caption':'',
    'video-title':'',
    'caption':''
  };
  quickstart.foo(response,video_id)
  .then(function(response){
    console.log('El response de quickstart:' + response['id-caption']);
    res.status(200);
    //res.setHeader('Content-type','json');
    res.send(response);
  })
})



app.listen(3050, function(){
  console.log('Ya se lanzó el server');
})
