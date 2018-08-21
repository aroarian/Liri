# LIRI Node.js App
LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get your latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.

# Installs
The package.json lists dependent node packages. I have also listed the required npm installs and commands below.

BandsinTown:
npm install bandsintown-events

Spotify:
npm install node-spotify-api

Moment.js:
npm install moment

Request:
npm install request

FS:
npm install fs


# Get Started

Get events from a Band

node liri concert-this "Example Band"

Get a song's information from Spotify

node liri spotify-this-song "Example Song"

Get a movie's info from OMDB

node liri movie-this "Example Movie"

Read and execute a command and input from a text file

Open random.txt and edit with valid commands and a input value

Exmaple - spotify-this-song, "Under the bridge"
node liri do-what-it-says
