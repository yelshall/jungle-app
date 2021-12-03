const schemas = require('../schemas/schemas');
 
const recommendEvents = async (sid) => {
	try {
		let user_factor = await schemas.user_factors.find({ user_id: sid }).exec();
		let student = await schemas.Student.findById(sid).exec();

		
		let event_factor = await getUnseenEvents([...student.interestedEvents, ...student.confirmedEvents, ...student.unlikedEvents]);

		for (let i = 0; i < event_factor.length; i++) {
			event_factor[i] = {
				score: parseFloat(event_factor[i].e1) * parseFloat(user_factor[0].e1) +
					parseFloat(event_factor[i].e2) * parseFloat(user_factor[0].e2) +
					parseFloat(event_factor[i].e3) * parseFloat(user_factor[0].e3) +
					parseFloat(event_factor[i].e4) * parseFloat(user_factor[0].e4) +
					parseFloat(event_factor[i].e5) * parseFloat(user_factor[0].e5),
				event_id: event_factor[i].event_id
			};
		}

		event_factor.sort((a, b) => { return b.score - a.score; });
		
		return event_factor.slice(0, 20);
	} catch (error) {
		console.log(error);
	}
};

var getUnseenEvents = async (eventIds) => {
	const events = await schemas.event_factors.aggregate([
		{
			$match: {
				"event_id": { $nin: eventIds }
			}
		}
	]).exec();

	return events;
};

module.exports = {
	recommendEvents: recommendEvents
};