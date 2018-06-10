const express = require('express')
const app = express()
const countryService = require('./services/country-service')

app.use(express.static('public'))

const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};

app.use('/api/countries', corsMiddleware, (req, res, next) => {
	var filter = req.query.filter;
	countryService.getCountries(filter)
	.then(filteredCountries => res.json(filteredCountries));
});

app.listen(3002, () => console.log('App running on port 3002'))
