const db =  require('./database.js');

var createEvent = (
  eventName,
  location,
  tags,
  maxStudents,
  eventHost,
  description
) => {
    //Possibly connect location to google maps
    let event = {
        eventName: eventName,
        dateTime: new Date(),
        location: location,
        tags: tags,
        interestedStudents: [],
        confirmedStudents: [],
        maxStudents: maxStudents,
        eventHzost: eventHost,
        description: description,
        updates: []
    };

    db.createEvent(event, (err, response) => {
        if (err) {
            sendClientMessage('err', 'Could not create new event');
            return;
        }

        sendClientMessage('success', 'Created event successfully');
    });
};

//Add interested student
var addInterestedStudent = (eid, sid) => {
    
};
//Add confirmed student

//Remove interested student

//Remove confirmed student

//Update event