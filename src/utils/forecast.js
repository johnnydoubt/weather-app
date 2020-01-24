const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/48a6ae47983660d76e532b46475c7489/' +
		latitude +
		',' +
		longitude +
		'?lang=fr&units=si';

	request(
		{
			url,
			json: true
		},
		(error, { body }) => {
			if (error) {
				callback('Unable to connect to weather services!', undefined);
			} else if (body.error) {
				callback('Unable to find location.', undefined);
			} else {
				callback(undefined, {
					info: `${body.daily.data[0].summary} 
                    Il fait actuellement ${body.currently.temperature} degrés. \n
                    Il y a ${body.currently.precipProbability}% de chances de pluie. \n
                    Température maximale de la journée: ${body.daily.data[0].temperatureHigh}. \n
                    Température minimale de la journée: ${body.daily.data[0].temperatureLow}. \n
                    `,
					icon: body.currently.icon
				});
			}
		}
	);
};

module.exports = forecast;
