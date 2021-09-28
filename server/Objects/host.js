//Sign up student
var hostSignup = (email, password, hostName, description, phoneNumber, website,tags) => {
    //Check if email or username already exists in database
    //Hash password first
    let host = {
        hid: "PlaceHolder", //Implement a random uid generator
        email: email,
        password: password,
        hostName: hostName,
        description: description,
        phoneNumber: phoneNumber,
        website: website,
        tags: tags,
        eventsList: [], 
        followerCount: 0
    };

    //Send to database the information

    //Send to app that it was successfully stored
};

//Create Event

//Update Event

//Delete Event

//Add follower

//Remove follower

//Send message back to client