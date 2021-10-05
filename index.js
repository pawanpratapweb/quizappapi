const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/api", (req, res) => {
	if(req.query.psi == process.env.HOMEURL) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.sendFile(__dirname + "/api.json");	
	} else { res.send("parsing data from machine...") }
})

app.get("/api/random", (req, res) => {
	if(req.query.trd == process.env.RANDURL) {
		axios.get('https://quizappapis.herokuapp.com/api?psi=' + process.env.HOMEURL)
		.then(response => {
			function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.send(response.data[getRandomInt(0, response.data.length)])
		}).catch(err => {console.log(err)})
	} else { res.send("parsing data from machine...") }

})

app.listen(port);
