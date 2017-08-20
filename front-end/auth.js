//El proyecto es 'Titulos embedidos'
var apiKey = 'AIzaSyDzoMsJhn_M0SxmINUzW9lJ7cEXNHJOfCA';
//Es para identificar que API y versión voy a utilizar
var discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
//Id User de la cuenta cead.fiuba14@gmail.com
var clientId = '223976978127-44snhsbc4if0gv075383rg6974fgfdfb.apps.googleusercontent.com';
//Scope de youtube que voy a utilizar, determinar que si voy a administrador
//información y/o visualizarla, en este caso accedo a información privada.
var scopes = 'https://www.googleapis.com/auth/youtube.force-ssl';


var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');


function handleClientLoad() {
  // Load the API client and auth2 library
  gapi.load('client:auth2', initClient);
}


function initClient() {
  gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes,
  }).then(function () {
      // // Listen for sign-in state changes.
     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
     // // Handle the initial sign-in state.
     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
     authorizeButton.onclick = handleAuthClick;
     signoutButton.onclick = handleSignoutClick;
    gapi.auth2.authorize({
      client_id: clientId,
      scope: 'email profile openid',
      response_type: 'token',
      promt: 'none'
    }, function(response) {
      if (response.error) {
      // An error happened!
      console.log('An error happened:'+response.error);
    }
  // The user authorized the application for the scopes requested.
    var accessToken = response.access_token;
    var idToken = response.id_token;
    console.log('Tudo beim');
    console.log('response:'+response.access_token);
    console.log('response:'+response.id_token);
    updateSigninStatus(true);
  // You can also now use gapi.client to perform authenticated requests.
});

  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    //primer llamado a la API
    getTitle();
    getIdCaption();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}


//Flujo de los clicks
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}


function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
