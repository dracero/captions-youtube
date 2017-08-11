var express  = require('express');
var quickstart = require('./quickstart');

const app = express();

app.get('/',function (req,res){
  res.send('Hello word');
})


app.listen(3050, function(){
  console.log('Ya se lanzó el server');
  var response = {};
  quickstart.foo(response);

  console.log('El response de quickstart' + response['id-caption']);
})
