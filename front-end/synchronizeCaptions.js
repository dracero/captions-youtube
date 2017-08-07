var activeInterval = null;
var lastSecond = 0;
var lastPosition = 0;

function refreshTime(){
  activeInterval = setInterval(updateTime,500);
}


function stopRefreshTime(){
  if (activeInterval != null)
  clearInterval(activeInterval);
}

//pre: Recibo un caption que corresponde a  una linea.
//aca me pasan el caption que corresponde remarcar
function remarkCaption(caption){
  //Si lo que tengo que remarcar es una linea, desmarco la otra linea
  if (preselectCaption != null){
      preselectCaption.css('font-weight','normal');
      preselectCaption.css('background-color','transparent');
  }
  preselectCaption = caption;
  caption.css('font-weight','bold');
  caption.css('background-color','lightblue');
  caption.css('border-radius','5px');
  checkChapterOfChaption();
}


//Para mejorar el perfomance mas adelante uso un diccionario
function checkChapterOfChaption(){
  for (var i = 0; i < timesOfChapters.length - 1; i++) {
    var initialTime =  timesOfChapters[i];
    var finalTime =  timesOfChapters[i+1];
    if (lastSecond > initialTime && lastSecond < finalTime){
      for (var i = 0; i < chapters.length; i++) {
        if ($(chapters[i]).val() == initialTime){
          remarkChapter(chapters[i]);
          break;
        }
      }
      break;
    }
  }
}

function remarkChapter(chapter){
  if (preselectChapter != chapter && preselectChapter != null){
    preselectChapter.css('font-weight','normal');
    preselectCaption.css('background-color','transparent');
  }
  chapter.css('font-weight','bold');
  chapter.css('background-color','lightblue');
  chapter.css('border-radius','5px');
  preselectChapter = chapter;
}


function searchCaption(second){
  for (var i = lastPosition; i < captions.length; i++) {
    if ($(captions[i]).val() == second){
      console.log("Lo encontré");
      lastSecond = second;
      lastPosition = i;
      remarkCaption(captions[i]);
      setVerticalScrollbar();
      break;
    }
  }
}

function updateTime(){
  // obtengo el time actual
  var currentTime =  player.getCurrentTime();
  // redondeo el numero
  var currentSecond =  Math.floor(currentTime);
  if (lastSecond < currentSecond){
    searchCaption(currentSecond);
  }
  //Este es el caso de que el usuario retrocedio el video, seteo para que busques desde el principio
  if (currentSecond < lastSecond){
    lastPosition = 0;
    searchCaption(currentSecond);
  }
}

function setVerticalScrollbar(){
  $("#caption").animate({ scrollTop:$(captions[lastPosition]).position().top +$("#caption").scrollTop() }, "slow");
}
