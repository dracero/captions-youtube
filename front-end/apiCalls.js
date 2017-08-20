// Load the API and make an API call.  Display the results on the screen.
var captionFormat = "srt";
var fieldsOfQuery = "items/id"
var doneCaption = false;

//En esta funcion obtengo el titulo del video que me interesa.
function getTitle(){
  gapi.client.youtube.videos.list({
    part: "snippet",
    id: videoId,
    fields: "items/snippet/title"
  }).then(function(response){
    //respuesta de la query
    console.log("responde of title:"+response);
    var body = response.body;
    console.log("body:"+body);
    var obj = JSON.parse(body);
    var title = String(obj.items[0].snippet.title);
    console.log("El titulo es:"+title);
    $("#title_of_video").text(title);
  });
}



//En esta funcion obtengo el id del caption que me interesa
function getIdCaption(){
  gapi.client.youtube.captions.list({
    part: "id",
    //id del video que me interesa
    videoId: videoId,
    //solicito solo el campo de id del caption
    fields : fieldsOfQuery
  }).then(function(response){
    console.log(response);
    var body = response.body;
    console.log(body);
    var obj = JSON.parse(body);
    var idCaption = String(obj.items[0].id);
    console.log("El id del Caption:"+idCaption);
    getCaption(idCaption);
  });
}

//En esta funcion dado que ya obtuve el id del caption, ahora descargo el
//caption
function getCaption(idCaption){
  gapi.client.youtube.captions.download({
    id:idCaption,
    //formato del subtitulo
    tfmt: captionFormat
  }).then(function(response){
      var caption = response.body;
      //var encodedCaption = decodeURIComponent(escape(response.body));
      //console.log(encodedCaption);
      parserCaption(caption);
  });
}
