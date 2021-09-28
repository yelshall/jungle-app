var createTag = (tagName) => {
    //Check if tagName already exists

    let tag = {
        tid: "Placeholder", //Generate unique tag id
        tagName: tagName,
        events: [],
        hosts: []
    }

    //Store in database?
};

var getTagId = (tagName) => {
    //Get tagname from database
};

var addEvent = (tid, eid) => {
    //add event to this tid
};

var removeEvent = (tid, eid) => {
    //remove event from this tid
};

var addHost = (tid, hid) => {
    //add host to this tid
};

var removeHost = (tid, hid) => {
    //remove host from this tid
};