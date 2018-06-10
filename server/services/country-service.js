const countries = require('./countries').sort((a, b) => b.population - a.population);

const getCountries = (filter, skip, take) => {
    var filteredCountries = countries;
    skip = skip || 0;
    take = take || 10;

	if (filter && filter != '') {
		filteredCountries = countries.filter(c =>
			c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }

    return new Promise((resolve, reject) => {
        // Simulate some DB delay
        setTimeout(() => {
            resolve(filteredCountries.slice(skip, take));
        }, 1000);
    });
}

module.exports = { getCountries };
