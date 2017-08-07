var preselectCaption = null;
var preselectChapter = null;


  $("div").on('click', 'p', function(event){
    //Al elemento seleccionado lo pongo en negrita
    console.log("Clip p");
    var selectElement = $(this);
    if (selectElement.hasClass('line') || selectElement.hasClass('chapter')){
      $(this).css({
        "font-weight": "bold",
        'background-color':'lightblue',
        'border-radius':'5px'
      });
      var time = $(this).val();
      //var totalSeconds = getSeconds(time);
      player.seekTo(time);
      event.stopPropagation();
    }

    if (selectElement.hasClass('line')){
    if (preselectCaption != null && !preselectCaption.is(selectElement) ){
         preselectCaption.css({
         "font-weight": "normal",
         "background-color":"transparent"
         });
     }
    preselectCaption = selectElement;
    preselectCaption.position().top;
    console.log('toque en una linea:'+ preselectCaption.position().top);
    }else{
      if (selectElement.hasClass('chapter')){
        console.log('toque un capitulo');
        if(preselectChapter != null && !preselectChapter.is(selectElement)){
            console.log("pongo el capitulo en normal");
            preselectChapter.css({
             "font-weight": "normal",
             "background-color":"transparent"
          });
        }else{
          console.log("chapter es null o es igual");
        }
        preselectChapter = selectElement;
        console.log("Cambie preselectChapter:"+preselectChapter);
        //obtengo el time de la linea que tocaron
      }
    }
  });


//A esta funcion le llega el formato siguiente
//hh:mm::ss,ms
function getSeconds(time){
  //array es el del tipo ["hh","mm","ss,ms"]
  var hhMmSsArray = time.split(":");
  var secondsString = hhMmSsArray[2];
  var secondsArray = secondsString.split(",");
  var hoursInSeconds = parseInt(hhMmSsArray[0])*60*60;
  var minutesInSeconds = parseInt(hhMmSsArray[1])*60;
  var seconds = parseInt(secondsArray[0]);
  var miliseconds = parseInt(secondsArray[1])/1000;
  var time = hoursInSeconds + minutesInSeconds + seconds;
  //console.log("Son:"+time+" segundos");
  return time;
}
