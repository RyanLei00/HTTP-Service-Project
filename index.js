/* 
Ryan Lei
February 3, 2023
Section 86 Web Dev
*/

const express = require('express');
const app = express();
app.use(express.json());

const genres = [
    { id: 1, genre: 'Rock', song: 'Bohemian Rhapsody', artist: 'Queen', month:'October', year:'1975'},
    { id: 2, genre: 'Pop', song: 'Blinding Lights', artist: 'The Weeknd', month:'November', year:'2019'},
    { id: 3, genre: 'Hip-Hop', song: '4L', artist: '21 Savage', month:'December', year:'2018'},
    { id: 4, genre: 'Drill', song: 'Flexin', artist: 'Pop Smoke', month:'January', year:'2019'},
    { id: 5, genre: 'K-Pop', song: 'OMG', artist: 'NewJeans', month:'January', year:'2023'},
    { id: 6, genre: 'J-Pop', song: 'Matsuri', artist: 'Fujii Kaze', month:'March', year:'2022'},
    { id: 7, genre: 'Soul', song: 'Just the Two of Us', artist: 'Bill Withers and Grover Washington, Jr.', month:'February', year:'1981'},
];

app.listen(3000, () => {
    console.log('Listening on port 3000...')
});

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/api', (req, res) => {
    res.send("Welcome to my HTTP Backend Project about song genres made by RYAN LEI.");
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});
app.get('/api/genres/:id', (req, res) => {
    const music = genres.find(c => c.id === parseInt(req.params.id));
    if (!music) {
        res.status(404).send("This song with the given ID was not found");
        return;
    }
    res.send(music);
});
app.get('/api/genres/filtermonth/:month', (req, res) => {
    let matchMonth = [];
    for (let music of genres) {
        if (music.month == req.params.month) {
            matchMonth.push(music);
        }
    }
    if (matchMonth.length !== 0) {
        res.send(matchMonth);
        return;
    } 
    res.status(404).send("Songs with the given month was not found");
});
app.get('/api/genres/filteryear/:year', (req, res) => {
    let matchYear = [];
    for (let music of genres) {
        if (music.year == req.params.year) {
            matchYear.push(music);
        }
    }
    if (matchYear.length !== 0){
        res.send(matchYear);
        return;
    }
    res.status(404).send("Songs with the given year was not found");
});

//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/genres', (req, res) => {
    if (req.body.genre.length < 3 || req.body.genre.length >= 20) {
        res.status(404).send("Please input a song that is greater than 2 characters long and less than 20 characters long");
        return;
    }
    else if (req.body.genre.length >= 3 && req.body.genre.length < 20){
        music = {
            id: genres.length + 1,
            genre: req.body.genre,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        }
        genres.push(music);
        res.send(genres);
    }
});    

//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/api/genres/:id', (req,res)=>{
    let original = genres[req.body.id - 1];
    if (original == undefined || (req.body.genre.length < 3 || req.body.genre.length >= 20)) {
        res.status(404).send("Please input a song that is greater than 2 characters long and less than 20 characters long");
        return;
    }
    else if(original !== undefined && (req.body.genre.length >= 3 && req.body.genre.length < 20)){
        music = {
            id: original.id,
            genre: req.body.genre,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        }
        genres[original.id - 1] = music;
        res.send(music);
    }
});

//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/genres/:id', (req, res) => {
    original = genres[req.body.id - 1];
    if (!original){
        res.status(404).send("Song with that ID does not exist");
        return;
    }
    else if (original !== undefined) {
        genres.splice(genres.indexOf(original), 1);
        res.send(original);
    } 
})


/*
1. Different programs can communicate with each other by using backend HTTP requests. These programs would relay 
information to one another to update each other.
2. I learned how to us Postman to test my backend assignment as well as how to implement this skill into the real world.
3. In Postman, there are many more routes that we have not implemented like COPY, PATCH, LOCK, etc. and I would like to
learn more about these routes.
*/
