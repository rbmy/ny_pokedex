// ID of the Google Spreadsheet
var spreadsheetID = "188Cgfk6t5uXRIX8vMw38R3wzmJkbBNERcl40_07FL10";

// Make sure it is public or set to Anyone with link can view & publish to web
var JSONURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

//var JSONURL = 'https://spreadsheets.google.com/feeds/list/188Cgfk6t5uXRIX8vMw38R3wzmJkbBNERcl40_07FL10/1/public/basic?alt=json';

function callback(data){
  var cells = data.feed.entry;
  var pokedex = [];
  for (var i = 0; i < cells.length; i++) {
    pokedex[i] = {
      number: cells[i].gsx$number.$t,
      caught: cells[i].gsx$caught.$t,
      generation: cells[i].gsx$generation.$t,
      pokemon: cells[i].gsx$pokemon.$t
    }
  }
  for (var i = 0; i < pokedex.length; i++) {
    var elem = document.createElement("img");
      elem.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pokedex[i].number+".png");
      elem.setAttribute("alt", pokedex[i].pokemon);

    var pokelist = document.getElementById('pokelist')

    var entry = document.createElement('div');
      entry.className = 'poke'
      pokelist.appendChild(entry)
      entry.appendChild(elem)
      entry.innerHTML += "<br>"+pokedex[i].number+": "+pokedex[i].pokemon;

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
