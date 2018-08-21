require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var Bands = require("bandsintown-events");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var bands = new Bands(keys.bandsIn);

var command = process.argv[2];
var input = process.argv[3];

if (command === "concert-this") {
  concertThis(input);
} 

else if (command === "spotify-this-song") {
  spotifyThis(input);
} 

else if (command === "movie-this") {
  movieThis(input);
} 

else if (command === "do-what-it-says") {
  doThis();
} 

else {
  console.log("command unknown");
}

function concertThis(artist) {
  if (artist) {
    artist = artist;
  } else {
    artist = "Eagles";
  }

  request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${bands}`,
    function(error, response, events) {
      if (error) {
        return console.log("Error occurred: " + error);
      }
      
      var data = JSON.parse(events);
      
     //console.log(artist);
     //console.log(typeof(artist));
      //console.log(data);
      
      //console.log("");
      //console.log(artist + " Events:")
     
      for (var i = 0; i < data.length; i++) {
        console.log("--------------------------------");
        console.log("");
        console.log(data[i].venue.name);
        console.log(data[i].venue.city + ", " + data[i].venue.region);
        console.log(moment(data[i].datetime).format("MM/DD/YYYY"));
        console.log("");
        console.log("--------------------------------");
      }
    }
  );
}

function spotifyThis(query) {
  if (query) {
    query = query;
  } else {
    query = "All the small things";
  }
  //  Artist(s)
  // The song's name
  // A preview link of the song from Spotify
  // The album that the song is from
  spotify.search({ type: "track", query: query }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("");
    console.log("--------------------------------");
    console.log("");
    console.log(data.tracks.items[0].artists[0].name);
    console.log("");
    console.log(data.tracks.items[0].name);
    console.log("");
    console.log(data.tracks.items[0].external_urls.spotify);
    console.log("");
    console.log(data.tracks.items[0].album.name);
    console.log("");
    console.log("--------------------------------");
  });
}

function movieThis(movie) {
  if (movie) {
    movie = movie;
  } else {
    movie = "Mr. Nobody";
  }

  request(`http://www.omdbapi.com/?apikey=c5a8df09&t=${movie}`, function(error, response, data) {
    if (error) {
      return console.log("Error occurred: " + error);
    }

    console.log("");
    console.log("--------------------------------");
    console.log("");
    console.log(JSON.parse(data).Title);
    console.log("");
    console.log(JSON.parse(data).Year);
    console.log("");
    console.log(JSON.parse(data).imdbRating);
    console.log("");
    console.log(JSON.parse(data).Ratings[1].Value);
    console.log("");
    console.log(JSON.parse(data).Country);
    console.log("");
    console.log(JSON.parse(data).Language);
    console.log("");
    console.log(JSON.parse(data).Plot);
    console.log("");
    console.log(JSON.parse(data).Actors);
    console.log("");
    console.log("--------------------------------");
  });
}

function doThis() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) throw err;

    var dataArr = data.split(",");
    var doCommand = dataArr[0].trim();
    var doInput = dataArr[1].trim();

    //console.log(typeof(doInput));
    
     
    //console.log(doCommand);
    //console.log(doInput);
    
    if (doCommand === "concert-this") {
      var doStrip = doInput.replace(/^"(.*)"$/, '$1');
      concertThis(doStrip);
    } 
    
    else if (doCommand === "spotify-this-song") {
      spotifyThis(doInput);
    } 
    
    else if (doCommand === "movie-this") {
       movieThis(doInput);
    } 
    
    else if (doCommand === "do-what-it-says") {
      console.log("Please select another command");
    }
    else {
      console.log("command unknown");
    }
       
   });
}

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
