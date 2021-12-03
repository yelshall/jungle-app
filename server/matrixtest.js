const { Double } = require('bson');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority");

const user_factors = mongoose.model('user_factors', (new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId
})));

const event_factors = mongoose.model('event_factors', (new mongoose.Schema({
	event_id: mongoose.Schema.Types.ObjectId
})));

const recommendEvents = async () => {
	try {
		let user_factor = await user_factors.find({ user_id: '618c67b842d9d6f199a58cba' }).exec();
		let event_factor = await event_factors.find({}).exec();

		console.log(event_factor[0]["1"]);

		for (let i = 0; i < event_factor.length; i++) {
			event_factor[i] = {
				score: event_factor[i]["1"] * user_factor["1"] +
					event_factor[i]["2"] * user_factor["2"] +
					event_factor[i]["3"] * user_factor["3"] +
					event_factor[i]["4"] * user_factor["4"] +
					event_factor[i]["5"] * user_factor["5"],
				event_id: event_factor[i].event_id
			};
		}

		event_factor.sort((a, b) => a.score > b.score);

		/*console.log(event_factor.slice(0, 15));*/
	} catch (error) {
		console.log(error);
	}
};

recommendEvents();

module.exports = {
	recommendEvents: recommendEvents
};