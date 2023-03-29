'use strict'

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
const movieData = require('./Movie Data/data.json');
const password = process.env.PASSWORD;
const { Client } = require('pg')
let url = `postgres://moath:${password}@localhost:5432/movies`;
const client = new Client(url);
const app = express();

app.use (cors());
const port = process.env.PORT ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const apiKey = process.env.API_KEY;


app.get('/', moviesHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending',trendingHandler);
app.get('/search',searchHandler);
app.get('/genre',genreHandler);
app.get('/upComingMovie',upComingMovieHandler);
app.post('/addMovies',addMoviesHandler);
app.get('/getMovies',getMoviesHandler);
app.put('/updateMovies/:id',handleUpdate);//params
app.delete('/deleteMovies/:id', handleDelete);
app.get('/getMovie/:id',getMovieHandler);
app.get('/error',(req,res)=>res.send(error()));

function  getMovieHandler (req,res){
    let movieID = req.params.id 
    let sql=`SELECT *
    FROM movies
    WHERE id = $1;`
    let values = [movieID];
    client.query(sql,values).then((result)=>{
        res.json(result.rows)
    }

    ).catch()
}


function handleUpdate(req,res){
    // console.log(11111111,req.params);
    let movieID = req.params.id // params
    let {name,comments,id} = req.body;
    let sql=`UPDATE movies SET name = $1, comments = $2, id=$3 
    WHERE id = $4 RETURNING *;`;
    let values = [name,comments,id,movieID];
    client.query(sql,values).then(result=>{
        console.log(result.rows);
        res.send(result.rows)
    }).catch()

}

function handleDelete(req,res){
    let movieID = req.params.id; 
    let sql=`DELETE FROM movies WHERE id = $1;` ;
    let value = [movieID];
    client.query(sql,value).then(result=>{
        res.status(204).send("deleted");
    }).catch()


}





function  getMoviesHandler (req,res){
    let sql=`SELECT * FROM movies;`
    client.query(sql).then((result)=>{
        res.json(result.rows)
    }

    ).catch()
}

function addMoviesHandler(req,res){
    let {name,comments} = req.body ;
    let sql = `INSERT INTO movies (name,comments)
    VALUES ($1,$2) RETURNING *;`
    let values = [name,comments];
    client.query(sql,values).then((result)=>{
        res.status(201).json(result.rows)

    }
    ).catch() 
}
 
 
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

function favoriteHandler(req,res){
    res.send("Welcome to Favorite Page")
}

function trendingHandler (req,res){
        //axios.get(url).then().catch()
        let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
//https://api.spoonacular.com/recipes/random?apiKey=${apikey} 
        axios.get(url)
        .then((result)=>{
    
            let datatrending = result.data.results.map((trending)=>{
                return new Requets(trending.id, trending.title,trending.release_date,trending.poster_path,trending.overview)
            })
            res.json(datatrending);
        })
        .catch((err)=>{
            console.log(err);
        })
    
} 

function searchHandler (req,res){
        let movieName = req.query.name;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&The&page=2`;
//https://api.spoonacular.com/recipes/random?apiKey=${apikey} 
        axios.get(url)
        .then((result)=>{
    
            let dataSearch = result.data.results.map((search)=>{
                return new Requets(search.id, search.title,search.release_date,search.poster_path,search.overview)
            })
            // console.log(result.data.results)
            res.json(dataSearch);
        })
        .catch((err)=>{
            console.log(err);
        })
    
    } 


function genreHandler (req,res){
        //axios.get(url).then().catch()
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
//https://api.spoonacular.com/recipes/random?apiKey=${apikey} 
        axios.get(url)
        .then((result)=>{
    
            res.json(result.data.genres);
        })
        .catch((err)=>{
            console.log(err);
        })
    
    } 

    function upComingMovieHandler (req,res){
        //axios.get(url).then().catch()
        let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
        axios.get(url)
        .then((result)=>{

            let dataUpcomingMovie = result.data.results.map((x)=>{
                return new Requets(x.original_title,x.overview)
            })
    
            res.json(dataUpcomingMovie);
        })
        .catch((err)=>{
            console.log(err);
        })
    
    } 






//constructor-2
function Requets(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
}



let e1 = {
    "status": 500,
"responseText": "Sorry, something went wrong"
};
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



client.connect().then(()=>{
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
}).catch()




  
