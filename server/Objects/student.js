//Sign up student
var studentSignup = (username, email, password, fullName, birthdate, gender, tags) => {
    //Check if email or username already exists in database
    let student = {
        username: username,
        email: email,
        password: password, //hash the password
        fullName: fullName,
        birthdate: birthdate, //Possibly convert it to date object
        gender: gender, 
        tags: tags,
        notifications: [],
        interestedEvents: [],
        recommendedEvents: [],
        confirmedEvents: [],
        following: []
    };

    //Send to database the information

    //Send to app that it was successfully stored
};

var retreiveStudentInfo = (uid, socket) => {

};

var getRecommendations = (uid, socket) => {
    //Call recommendation algorithm to get recommendations for events
};

var addInterestedEvent = (uid, interestedEid, socket) => {
    //Verify uid
    //Verify eid
    //Get student from database and push interestedEvent onto there
    //Return success to app
};

var addConfirmedEvent = (uid, confirmedEid, socket) => {
    //Verify uid
    //Verify eid
    //Get student from database and push confirmedEvent onto there by pulling out of interestedEvents
    //Return success to app
};

var removeInterestedEvent = (uid, interestedEid, socket) => {
    //Verify uid
    //Verify eid
    //Get student from database and remove interestedEvent
};

var removeConfirmedEvent = (uid, confirmedEid, socket) => {
    //Verify uid
    //Verify eid
    //Get student from database and remove confirmedEvent
}

var followHost = (uid, hid, socket) => {
    //Verify uid and hid
    //Get student from database and add host to followed hosts
    //Call host function to add follower
    //Return success
};

var unfollowHost = (uid, hid, socket) => {
    //Verify uid and hid
    //Get student from database and remove host from followed hosts
    //Call host function to remove follower
    //Return success to app
};