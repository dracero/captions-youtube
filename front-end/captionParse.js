//Dado un caption entero, lo formateo
//Ejemplo
/*135
00:07:57,530 --> 00:08:03,310
descomposiciÃ³n que querÃ­amos
(linea vacia)
Me genera  4 lineas mas

Por eso hago res.length / 4
De esas 4 lineas, solo me interesa el time y el texto, por eso hago for 1 a 2
*/

var captions = [];
var timesOfChapters = [];
var chapters = [];

function parserCaption(caption){
  var res = caption.split("\n");
  var len = res.length / 4;
  var elementForLine = 4;
  for (var i = 0; i < len -1; i++) {
      var line = $("<p></p>");
      var array = (res[i*elementForLine +1]).split("-->");
      var second = getSeconds(array[0]);
      line.val(second);
      //Aca me fijo si mi caption es un indice o un caption
      var caption = res[i*elementForLine + 2];
      var n = caption.search("Tema:");
      //Si no es un indice
      //Codificacion para que aparezcan normalmente las tildes
      if (n == -1){
        line.text('    ' + decodeURIComponent(escape(res[ i*elementForLine + 2 ])));
        line.addClass('line');
        $("#caption").append(line);
        captions.push(line);
      }else{
        console.log("Type"+typeof line);
        var chapter_name = caption.toString().split(":")[1];
        line.text(chapter_name);
        console.log("chapter_name:"+chapter_name);
        line.addClass('chapter');
        $("#chapters").append(line);
        timesOfChapters.push(second);
        chapters.push(line);
      }


    }


  }
