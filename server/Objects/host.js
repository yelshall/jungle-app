const schemas = require("../schemas/schemas");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tag_functions = require('./tag');

//Add functionality to check if an event's time has already
//passed so it can be moved to archived events

var createHost = (newHost, callback) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(newHost.password, salt);

	let host = {
		email: newHost.email.toLowerCase(),
		hostEmail: newHost.hostEmail.toLowerCase(),
		password: hash,
		hostName: newHost.hostName,
		description: newHost.description,
		tags: newHost.tags,
		phoneNumber: newHost.phoneNumber,
		website: newHost.website.toLowerCase(),
		imageURL: newHost.imageURL,
		expoPushToken: newHost.expoPushToken
	};

	let hostSave = new schemas.Host(host);

	hostSave.save()
		.then(async data => {
			for (let i = 0; i < newHost.tags.length; i++) {
				tag_functions.addHost(newHost.tags[i], data._id);
			}

			let token = jwt.sign({ id: data._id, email: data.email, signInType: 'HOST' }, process.env.APP_SECRET, {
				expiresIn: 2592000 // 1 month
			});

			data.password = undefined;
			data.token = { id: data._id, email: data.email, token: token, signInType: 'HOST' };
			if (callback) { callback(null, data); }
		})
		.catch(err => {
			if (callback) { callback(err, null); }
		});
};

var isHostLogin = async (loginInfo, callback) => {
	try {
		let doc = await schemas.Host.findOne({ email: loginInfo.email });
		if (doc === null) {
			return false;
		}
		return true;
	} catch (error) {
		return null;
	}
};

var loginHost = (loginInfo, callback) => {
	schemas.Host.findOne({ email: loginInfo.email }, (err, res) => {
		if (err) {
			if (callback) { callback(err, null); }
			return;
		}

		if (res === null) {
			if (callback) { callback({ err: 'INCORRECT_EMAIL' }, null); }
			return;
		}

		if (!bcrypt.compareSync(loginInfo.password, res.password)) {
			if (callback) { callback({ err: 'INCORRECT_PASSWORD' }, null); }
		} else {
			let token = jwt.sign({ id: res._id, email: res.email, signInType: 'HOST' }, process.env.APP_SECRET, {
				expiresIn: 2592000 // 1 month
			});
			if (callback) { callback(null, { id: res._id, email: res.email, token: token, signInType: 'HOST' }); }
		}
	});
};

var deleteHost = (hid, callback) => {
	schemas.Host.findById(hid, (err, res) => {
		if (err) {
			if (callback) { callback(err, null); }
		} else {
			//Students
			res.followers.forEach((follower, index) => {
				schemas.Student.findByIdAndUpdate(follower, { $pull: { following: hid } }, (err, res) => {
					return;
				});
			});

			res.events.forEach((event, index) => {
				event_functions.deleteEvent(event);
			});

			res.tags.forEach((tag, index) => {
				tag_functions.removeHost(tag, hid);
			});

			schemas.Host.findByIdAndDelete(hid, (err, res2) => {
				if (err) {
					if (callback) { callback(err, null); }
				} else {
					if (res2.password) { res2.password = undefined; }
					if (callback) { callback(null, res2); }
				}
			});
		}
	});
}

var getHost = (hid, callback) => {
	schemas.Host.findById(hid).populate('tags').populate('followers')
		.populate('events').populate('messages').exec(async (err, res) => {
			if (err) {
				if (callback) { callback(err, null); }
			} else {
				if (res == undefined) {
					if (callback) { callback({ err: 'No host found.' }, null); }
					return;
				}
				res.password = undefined;
				let ret = [];
				for (let i = 0; i < res.events.length; i++) {
					ret.push(await schemas.Event.findById(res.events[i]._id).populate('eventHost').populate('updates').populate('tags').exec());
				}
				let messages = [];
				for (let i = 0; i < res.messages.length; i++) {
					messages.push(await schemas.Messages.findById(res.messages[i]._id).populate({ path: 'firstId', model: schemas.Student }).populate({ path: 'secondId', model: schemas.Host }).exec());
				}
				res.events = ret;
				res.messages = messages;
				if (callback) { callback(null, res); }
			}
		});
}

var updateHost = (hid, update, callback) => {
	if (update.type === "CHANGE_FIELD") {
		switch (update.field) {
			case "HOST_NAME":
				updateHostname(hid, update.hostName, callback);
				break;
			case "EMAIL":
				updateHostEmail(hid, update.email, callback);
				break;
			case "HOST_EMAIL":
				updateHostHostEmail(hid, update.hostEmail, callback);
				break;
			case "PHONENUMBER":
				updateHostPhoneNumber(hid, update.phoneNumber, callback);
				break;
			case "DESCRIPTION":
				updateHostDescription(hid, update.description, callback);
				break;
			case "WEBSITE":
				updateHostWebsite(hid, update.website, callback);
				break;
			case "IMAGE":
				updateHostImage(hid, update.image, callback);
				break;
			case "EXPO_TOKEN":
				updateHostExpoToken(hid, update.expoPushToken, callback);
				break;
			case "PASSWORD":
				updateHostPassword(hid, update.password, callback);
				break;
			default:
				if (callback) { callback({ err: "Incorrect update field" }, null); }
				break;
		}
	} else if (update.type === "ADD") {
		switch (update.field) {
			case "EVENT":
				addEvent(hid, update.eid, callback);
				break;
			case "STUDENT":
				addFollower(hid, update.eid, callback);
				break;
			case "TAG":
				addTag(hid, update.tid, callback);
				break;
			case "MESSAGES":
				addMessages(hid, update.mid, callback);
				break;
			default:
				if (callback) { callback({ err: "Incorrect update field" }, null); }
				break;
		}
	} else if (update.type === "REMOVE") {
		switch (update.field) {
			case "EVENT":
				removeEvent(hid, update.eid, callback);
				break;
			case "STUDENT":
				removeFollower(hid, update.eid, callback);
				break;
			case "TAG":
				removeTag(hid, update.tid, callback);
				break;
			case "MESSAGES":
				removeMessages(hid, update.mid, callback);
				break;
			default:
				if (callback) { callback({ err: "Incorrect update field" }, null); }
				break;
		}
	} else {
		if (callback) { callback({ err: "Incorrect update field" }, null); }
	}
};

var addFollower = (hid, sid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $addToSet: { followers: sid } }, callback);
};

var removeFollower = (hid, sid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $pull: { followers: sid } }, callback);
};

var addEvent = (hid, eid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $addToSet: { events: eid } }, callback);
};

var removeEvent = (hid, eid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $pull: { events: eid } }, callback);
};

var addTag = (hid, tid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $addToSet: { tags: tid } }, (err, res) => {
		if (err) {
			if (callback) { callback(err, null) };
			return;
		}
		tag_functions.addHost(tid, hid, callback);
	});
};

var removeTag = (hid, tid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $pull: { tags: tid } }, (err, res) => {
		if (err) {
			if (callback) { callback(err, null) };
			return;
		}
		tag_functions.removeHost(tid, hid, callback);
	});
};

var addMessages = (hid, mid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $addToSet: { messages: mid } }, callback);
};

var removeMessages = (hid, mid, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { $pull: { messages: mid } }, callback);
};

var updateHostname = (hid, hostName, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { hostName: hostName }, callback);
};

var updateHostEmail = (hid, email, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { email: email }, callback);
};

var updateHostHostEmail = (hid, hostEmail, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { hostEmail: hostEmail }, callback);
};

var updateHostExpoToken = (hid, expoPushToken, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { expoPushToken: expoPushToken }, callback);
};

var updateHostDescription = (hid, description, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { description: description }, callback);
};

var updateHostPhoneNumber = (hid, phoneNumber, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { phoneNumber: phoneNumber }, callback);
};

var updateHostWebsite = (hid, website, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { website: website }, callback);
};

var updateHostImage = (hid, image, callback) => {
	schemas.Host.findByIdAndUpdate(hid, { imageURL: image }, callback);
};

var updateHostPassword = (hid, password, callback) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	schemas.Host.findByIdAndUpdate(hid, { password: hash }, callback);
};

module.exports = {
	createHost: createHost,
	isHostLogin: isHostLogin,
	loginHost: loginHost,
	deleteHost: deleteHost,
	getHost: getHost,
	addFollower: addFollower,
	removeFollower: removeFollower,
	addTag: addTag,
	removeTag: removeTag,
	addEvent: addEvent,
	removeEvent: removeEvent,
	addMessages: addMessages,
	removeMessages: removeMessages,
	updateHostDescription: updateHostDescription,
	updateHostEmail: updateHostEmail,
	updateHostExpoToken: updateHostExpoToken,
	updateHostHostEmail: updateHostHostEmail,
	updateHostPhoneNumber: updateHostPhoneNumber,
	updateHostname: updateHostname,
	updateHostWebsite: updateHostWebsite,
	updateHostImage: updateHostImage,
	updateHost: updateHost,
	updateHostPassword: updateHostPassword
};