require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Spotify = require("node-spotify-api");
var Bands = require("bandsintown-events");

var spotify = new Spotify(keys.spotify);
var bands = new Bands(keys.bandsIn);

var command = process.argv[2];
var input = process.argv[3];

if (command === "concert-this") {
  concertThis();
} else if (command === "spotify-this-song") {
  spotifyThis(input);
} else if (command === "movie-this") {
  movieThis(input);
} else if (command === "do-what-it-says") {
  doThis();
} else {
  console.log("command unknown");
}

function concertThis(artist) {
  if (artist) {
    artist = artist;
  } else {
    artist = "Eagles";
  }

  request(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bands}`,
    function(error, response, events) {
      if (error) {
        return console.log("Error occurred: " + error);
      }

      var eventsData = JSON.stringify(events, null, " ");

      var data = eventsData;
      console.log(data[0].venue.name);
      console.log(data[0].venue.city + ", " + data[0].venue.region);
      console.log(data[0].datetime);
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

    //console.log(data.tracks.items[0]);
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

  request(`http://www.omdbapi.com/?apikey=c5a8df09&t=${movie}`, function(
    error,
    response,
    data
  ) {
    if (error) {
      return console.log("Error occurred: " + error);
    }

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
  console.log("do what is working");
}

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// var dataB = [{"offers":[{"type":"Tickets","url":"https:\/\/www.bandsintown.com\/t\/1008455137?app_id=[object Object]&came_from=267","status":"available"}],"venue":{"name":"Talking Stick Resort Arena","country":"United States","region":"AZ","city":"Phoenix","latitude":"33.4457369","longitude":"-112.0712006"},"datetime":"2018-09-08T20:00:00","on_sale_datetime":"2018-01-09T16:55:00","description":"","lineup":["Eagles"],"id":"1008455137","artist_id":"26649","url":"https:\/\/www.bandsintown.com\/e\/1008455137?app_id=[object Object]&came_from=267"},{"offers":[{"type":"Tickets","url":"https:\/\/www.bandsintown.com\/t\/1008455002?app_id=[object Object]&came_from=267","status":"available"}],"venue":{"name":"AT&T Park","country":"United States","region":"CA","city":"San Francisco","latitude":"37.7783889","longitude":"-122.3911567"},"datetime":"2018-09-20T17:00:00","on_sale_datetime":"2018-01-19T18:00:00","description":"Event takes place 'Rain or Shine'","lineup":["Eagles","Zac Brown Band"],"id":"1008455002","artist_id":"26649","url":"https:\/\/www.bandsintown.com\/e\/1008455002?app_id=[object Object]&came_from=267"},{"offers":[{"type":"Tickets","url":"https:\/\/www.bandsintown.com\/t\/1008454804?app_id=[object Object]&came_from=267","status":"available"}],"venue":{"name":"Petco Park","country":"United States","region":"CA","city":"San Diego","latitude":"32.70586","longitude":"-117.157008"},"datetime":"2018-09-22T17:00:00","on_sale_datetime":"2018-01-16T17:55:00","description":"Doors open at 3PM. Event starts at 5PM sharp.","lineup":["Eagles","Zac Brown Band"],"id":"1008454804","artist_id":"26649","url":"https:\/\/www.bandsintown.com\/e\/1008454804?app_id=[object Object]&came_from=267"}]

// var dataK = JSON.stringify(dataB, null, ' ');

// //console.log(dataK);
// var dataJ = [
//     {
//      "offers": [
//       {
//        "type": "Tickets",
//        "url": "https://www.bandsintown.com/t/1008455137?app_id=[object Object]&came_from=267",
//        "status": "available"
//       }
//      ],
//      "venue": {
//       "name": "Talking Stick Resort Arena",
//       "country": "United States",
//       "region": "AZ",
//       "city": "Phoenix",
//       "latitude": "33.4457369",
//       "longitude": "-112.0712006"
//      },
//      "datetime": "2018-09-08T20:00:00",
//      "on_sale_datetime": "2018-01-09T16:55:00",
//      "description": "",
//      "lineup": [
//       "Eagles"
//      ],
//      "id": "1008455137",
//      "artist_id": "26649",
//      "url": "https://www.bandsintown.com/e/1008455137?app_id=[object Object]&came_from=267"
//     },
//     {
//      "offers": [
//       {
//        "type": "Tickets",
//        "url": "https://www.bandsintown.com/t/1008455002?app_id=[object Object]&came_from=267",
//        "status": "available"
//       }
//      ],
//      "venue": {
//       "name": "AT&T Park",
//       "country": "United States",
//       "region": "CA",
//       "city": "San Francisco",
//       "latitude": "37.7783889",
//       "longitude": "-122.3911567"
//      },
//      "datetime": "2018-09-20T17:00:00",
//      "on_sale_datetime": "2018-01-19T18:00:00",
//      "description": "Event takes place 'Rain or Shine'",
//      "lineup": [
//       "Eagles",
//       "Zac Brown Band"
//      ],
//      "id": "1008455002",
//      "artist_id": "26649",
//      "url": "https://www.bandsintown.com/e/1008455002?app_id=[object Object]&came_from=267"
//     },
//     {
//      "offers": [
//       {
//        "type": "Tickets",
//        "url": "https://www.bandsintown.com/t/1008454804?app_id=[object Object]&came_from=267",
//        "status": "available"
//       }
//      ],
//      "venue": {
//       "name": "Petco Park",
//       "country": "United States",
//       "region": "CA",
//       "city": "San Diego",
//       "latitude": "32.70586",
//       "longitude": "-117.157008"
//      },
//      "datetime": "2018-09-22T17:00:00",
//      "on_sale_datetime": "2018-01-16T17:55:00",
//      "description": "Doors open at 3PM. Event starts at 5PM sharp.",
//      "lineup": [
//       "Eagles",
//       "Zac Brown Band"
//      ],
//      "id": "1008454804",
//      "artist_id": "26649",
//      "url": "https://www.bandsintown.com/e/1008454804?app_id=[object Object]&came_from=267"
//     }
//    ]

//    console.log(dataJ[0].venue.name);
//    console.log(dataJ[0].venue.city + ", " + dataJ[0].venue.region)
//    console.log(dataJ[0].datetime)
