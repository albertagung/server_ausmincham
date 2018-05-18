// Define axios
const axios = require('axios')

// Send mailchimp from client to mailchimp API
insertNewSubscriber = (req, res) => {
	console.log(req.body)
	// Define mailchimp url
	const urlInsertNewSubscriber = 'https://us18.api.mailchimp.com/3.0/lists/d2e6f7f250/members/'
	// Define mailchimp auth credentials
	let authCredentials = {
		username: 'ausmincham',
		password: process.env.MAILCHIMP_API_KEY
	}
	// Send with axios
	axios({
		method: 'post',
		url: urlInsertNewSubscriber,
		auth: authCredentials,
		data: req.body
	})
	.then((response) => {
		res.status(200).send(response.data)
	})
	.catch((err) => {
		console.log(err.message)
		res.status(500).send(err)
	})
}

module.exports = {
	insertNewSubscriber
}