const express = require('express')
const app = express()
const countries = require('./countries').sort((a, b) => b.population - a.population)

app.use(express.static('public'))

const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};

app.use('/api/countries', corsMiddleware, (req, res, next) => {
	var filter = req.query.filter;
	var filteredCountries = countries;
	if (filter && filter != '') {
		filteredCountries = countries.filter(c =>
			c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
	}
	setTimeout(() => res.json(filteredCountries.slice(0, 10)), 5000);
});

app.listen(3000, () => console.log('App running on port 3000'))
