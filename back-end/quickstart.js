var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var python_shell = require('python-shell');


//Informacion del video que quiero obtener informacion
var videoId = "QdjO0e10O_I";
var fieldsOfQuery = "items/id";
var captionFormat = 'srt';
var idCaption;

// If modifying these scopes, delete your previously saved credentials
  // at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';
console.log('TOKEN_DIR'+TOKEN_PATH);

module.exports = {
  foo : function(response) {
        return new Promise(function(resolve,reject){
          // Load client secrets from a local file.
          fs.readFile('client_secret.json', function processClientSecrets(err, content) {
            if (err) {
              console.log('Error loading client secret file: ' + err);
              reject('error loading client secret file');
            }
            // Authorize a client with the loaded credentials, then call the YouTube API.
             authorize(JSON.parse(content), getIdCaption,response,resolve);
        });
      });
    }
}




/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback,response,resolve) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
      return new Promise.reject('getNewToken');
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client,response,resolve);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function getIdCaption(auth,res,resolve){
  var service = google.youtube('v3');
  service.captions.list({
    auth: auth,
    part: "id",
    videoId: videoId,
    fields: fieldsOfQuery
  },function(err,response){
    if (err){
      console.log('The API returned an error' + err)
    }
    console.log(response);
    var body = response.body;
    console.log('response.items'+response.items[0].id);
    //var obj = JSON.parse(body);
    idCaption = String(response.items[0].id);
    console.log("El id del caption:"+ idCaption);
    res['id-caption'] = idCaption;
    getCaption(res,idCaption);
    resolve(res);
  });
}


function getCaption(response,id_caption){
  var options = {
    mode: 'text',
    pythonOptions: [],
    args: ['--captionid=heflPZxXoUIoPNMyUR3kxiATen2avRT_sza4uq4YPVo=','--action=download']
  };
  python_shell.run('captions.py',options,function(err,results){
    if (err) throw err
    console.log('finished'+results);
  });

}
