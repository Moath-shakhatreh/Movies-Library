'use strict'

const express = require('express')
const movieData = require('./Movie Data/data.json')
const app = express();

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



// Home Page Endpoint: 

app.get('/', moviesHandler);
function moviesHandler(req,res){
    let result={};
    // result.title = movieData.title;
    // result.poster_path = movieData.poster_path;
    // result.overview = movieData.overview;
    let newM = new Movie (movieData.title,movieData.poster_path,movieData.overview);
    result= newM;
    res.json(result);
}
function Movie(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}



// Favorite Page Endpoint: “/favorite”

app.get('/favorite', favoriteHandler);
function favoriteHandler(req,res){
    res.send("Welcome to Favorite Page")
}




let e1 = {
    "status": 500,
"responseText": "Sorry, something went wrong"
};

app.get('/error',(req,res)=>res.send(error()));


app.use((err, req, res, next) => {
    // console.error(err.stack)
    res.status(500).send(e1)
  })




let e = {
    "status": 404,
"responseText": "Sorry, something went wrong"
}

app.use((req, res, next) => {
    res.status(404).send(e)
  })






  
