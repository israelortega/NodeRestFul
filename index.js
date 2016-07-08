var express = require("express");
var bodyParser = require("body-parser");
var _ = require('underscore');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
	res.send("Hello World");
});

app.get("/datos", function(req, res) {
	var data = [{
		name: 'Microsoft Internet Explorer',
		y: 56.33
	}, {
		name: 'Chrome',
		y: 24.03
	}, {
		name: 'Firefox',
		y: 10.38
	}, {
		name: 'Safari',
		y: 4.77
	}, {
		name: 'Opera',
		y: 0.91
	}, {
		name: 'Proprietary or Undetectable',
		y: 0.2
	}]

	return res.send(data);
});

app.get("/pokemons", function(req, res) {
	var fs = require('fs');
	var pokemons = JSON.parse(fs.readFileSync('./pokemons.json', 'utf8'));

	return res.send(pokemons);
});

app.get("/count_pokemons_bytype", function(req, res) {
	var fs = require('fs');
	var pokemons = JSON.parse(fs.readFileSync('./pokemons.json', 'utf8'));

	//Recuperamos el arreglo con los tipos diferentes
	//Ojo el tipo esta dentro de un arreglo

	var lookup = {};
	var result = [];

	for (var item, i = 0; item = pokemons[i++];) {
		var tipos = item.type;

		for (var elemento, j=0; elemento = tipos[j++];){
			if (!(elemento in lookup)) {
				lookup[elemento] = 1;
				result.push(elemento);
			}
		}
	}
	//Imprime el arreglo con los tipos diferentes
	//console.log(result);


	var jsonData = {};

	for (var type, i = 0; type = result[i++];) {
		var results = pokemons.filter(function (pokemon) {
			return pokemon.type.some(function (t) {
				return t === type;
			});
		});

		 jsonData[type] = results.length;

	}

	return res.send(jsonData);

});


app.get("/count_species", function(req, res) {
	var fs = require('fs');
	var pokemons = JSON.parse(fs.readFileSync('./pokemons.json', 'utf8'));
	var counts = _.countBy(pokemons,'species');


	return res.send(counts);
});


var server = app.listen(3000, function () {
	console.log("Listening on port %s...", server.address().port);
});