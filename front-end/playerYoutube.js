  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;

  function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: '390',
      width: '100%',
      videoId: videoId,
      playerVars: { 'autoplay': 1, 'controls': 1 ,'rel':0 ,'modestbranding':1,'showinfo':0,'fs':0},
      events: {
        //dado los eventos, indico a que funciones llamo. aca deberia hacer dado
        //que se esta reproduciendo, llamar a una funcion mia.
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
      });
  }


//Si ya se buffereo todo, lo reproduzco
function onPlayerReady(event){
        event.target.playVideo();
        refreshTime();
}




//Dado que esta reproduciendo
function onPlayerStateChange(event){
  if (event.data == YT.PlayerState.PLAYING) {
    refreshTime();
  }else {
    stopRefreshTime();
  }
}

function stopVideo() {
        player.stopVideo();
}
