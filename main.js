// ID of the Google Spreadsheet
var spreadsheetID = "1q0hlfiEuceMXcViSxVd82PGXxL5EkYr4yIG0lnDttQY";
var myAuthKey = "AIzaSyBkq-XscNcI21z--NnTnVTK0UMtaHzRHYQ";
var sheetNum = 1;

// Make sure it is public or set to Anyone with link can view & publish to web
var sheetMetaDataURL = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetID + "?includeGridData=false&key=" + myAuthKey;
var sheetContent = "https://sheets.googleapis.com/v4/spreadsheets/"+spreadSheetID+"/values/Sheet" + sheetNum + "?key=" + myAuthKey;

function callback(data){
  var cells = data.feed.entry;
  var pokedex = [];
  var caught1 = 0;
  var caught2 = 0;
  for (var i = 0; i < cells.length; i++) {
    pokedex[i] = {
      number: cells[i].gsx$number.$t,
      caught: cells[i].gsx$caught.$t,
      generation: cells[i].gsx$generation.$t,
      pokemon: cells[i].gsx$pokemon.$t
    }
    if (pokedex[i].caught == "TRUE" && pokedex[i].generation == 1) {
      caught1++;
    }else if (pokedex[i].caught == "TRUE" && pokedex[i].generation == 2) {
      caught2++;
    }
  }

  var total = caught1 + caught2;

  var pokelist = document.getElementById('pokelist')
  var count = document.getElementById('count')
  count.innerHTML = "Caught: "+total;


  for (var i = 0; i < pokedex.length; i++) {
    var elem = document.createElement("img");
      elem.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokedex[i].number+".png");
      elem.setAttribute("alt", pokedex[i].pokemon);

    var entry = document.createElement('div');
      entry.className = 'poke'
      pokelist.appendChild(entry)
      entry.appendChild(elem)
      entry.innerHTML += "<p>"+pokedex[i].number+": "+pokedex[i].pokemon+"</p>";

    if (pokedex[i].caught == "TRUE") {
      entry.style.backgroundColor =  "lightgreen"
    }

    if (pokedex[i].generation == 1) {
      entry.style.borderColor =  "#A3A3EC"
    }else if (pokedex[i].generation == 2) {
      entry.style.borderColor =  "blue"
    }
  }
}

$(document).ready(function(){

    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });

});
