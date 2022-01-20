const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/random", (req, res) => {
	if (req.query.trd == process.env.RANDURL) {
		axios.get('https://quizzoweb-default-rtdb.firebaseio.com/gs.json')
			.then(response => {
				function getRandomInt(min, max) {
					min = Math.ceil(min);
					max = Math.floor(max);
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.send(Object.values(response.data)[ getRandomInt(0, Object.values(response.data).length) ])
			}).catch(err => { console.log(err) })
	} else { res.send("parsing data from machine...") }

})

app.listen(port);
