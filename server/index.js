const express = require('express')
const app = express()
const countryService = require('./services/country-service')
const fs = require('fs')
const path = require('path')
const bundle =  require('./public/server.bundle.js')
const renderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync('./public/index.html', 'utf-8')
})

// 1) Provide a fetch implementation
// global.fetch = require('node-fetch');
// Prerendering does not fail but still is not loading countries... Let's figure out why
 // 2) Fetch wrapper
// const fetch = require('node-fetch');
// global.fetch = function(url, options) {
// 	return fetch(url, options)
// 	.catch(error => {
// 		console.log('Network error');
// 		console.log(error);
// 	});
// }
// The network requests are not working because of the relative url
 // 3) Fetch wrapper with absoluteUrl
 const fetch = require('node-fetch');
 const baseUrl = 'http://localhost:3005';
 global.fetch = (url, options) => fetch(baseUrl + url, options);

// Expose only assets in static folder
// (Otherwise, the index.html file in the public folder would be served directly)
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

const corsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};

app.use('/api/countries', corsMiddleware, (req, res, next) => {
	console.log('/api/countries endpoint accessed');
	var filter = req.query.filter;
	countryService.getCountries(filter)
	.then(filteredCountries => res.json(filteredCountries));
});

app.get(['/', '/search'], (req, res, next) => { 

	var context = { url: req.url };

	console.log('Server rendering started');
	bundle.default(context).then(app => {
	  	renderer.renderToString(app, context, (err, html) => {
			if (err) {
			  	return res.status(500).end('Internal server error');
			} else {
				console.log('Server rendering finalised');
				html = html.replace(/\<\!----\>/g, '').replace(/>[\s]+</g, '><');
			  	return res.end(html);
			}
	  	});
  	}, err => res.status(500).end('Internal server error'));  
});

app.listen(3005, () => console.log('App running on port 3005'))
