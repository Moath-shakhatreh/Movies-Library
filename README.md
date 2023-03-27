# Movies-Library
# Project Name: Movies Library - Project Version: v1

**Author Name**: Mo'ath Ahmad

## WRRC
![plot](./wrrc.jpg)
![plot](./wrrc-2.jpg)
![plot](./Screenshot%20wrrc3.png)

## Overview

## Getting Started
1-Download node.js <br />
2-init -y <br />
3-create `index.js`<br />
4-`npm install express`<br />
5-`npm i cores`<br/>
6-`npm i nodemon`<br/>
7-`npm i auxios`<br/>
8-`go inside your database shell ~ server is running sqlstart` <br/> 
9-`psql create a new database(CREATE DATABASE databasename)`<br/>
10-`create a new table :`<br/>
inside schema.sql file :
    CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
....)
11-` connect my table to my database` psql  -d databasename -f schema.sql <br/>

12-`Write qureis in my server:`
npm install pg
In index.js:
const url="postgres://username:password@localhost:5432/databaseName" // store it in the .env file <br/>
13- `create a new client instance`
const { Client } = require('pg')
const client = new Client(url) <br/>
14- `connect to db`
client.connect().then(() => {

15- app.listen(PORT, () => {
        console.log(`Server is listening ${PORT}`);
    });
})
use client.query() to do CRUD
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->


## Project Features
<!-- What are the features included in you app -->
This app allow you to check the trending movies <br/>
search any movie by it's name,
choose  movie depend on its genre,
,showing the upComing movies,add movies to the dataBase, showing all the movies in the dataBase.
also you can edit any movie name or comments , delete any movie by it's ID and get any movie also by it's ID.   
