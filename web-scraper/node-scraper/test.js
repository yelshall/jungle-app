const fetch = require('node-fetch');
const textVersion = require('textversionjs');
const he = require('he');

var categories = [
    { label: "Art", value: "136", id: "616900567475d1f23c776147" },
    { label: "Children & Family", value: "4", id: "616900557475d1f23c776114" },
    { label: "Community Events", value: "5", id: "616900567475d1f23c77612a" },
    { label: "Downtown Happenings", value: "6", id: "616900567475d1f23c776155" },
    { label: "Festivals & Holidays", value: "7", id: "616900567475d1f23c776165" },
    { label: "Food", value: "137", id: "616900567475d1f23c77617b" },
    { label: "Museums & Exhibits", value: "9", id: "616900567475d1f23c77625e" },
    { label: "Music/Concerts", value: "10", id: "616900567475d1f23c776139" },
    { label: "Nightlife", value: "98", id: "616900567475d1f23c776270"},
    { label: "Over 21", value: "11", id: "616900567475d1f23c776286"},
    { label: "Parks & Recreation", value: "12", id: "616900567475d1f23c77629e" },
    { label: "Purdue Events", value: "13", id: "616900567475d1f23c77624a" },
    { label: "Run/Walk/Ride", value: "138", id: "616900567475d1f23c7762ba" },
    { label: "Shopping", value: "65", id: "616900567475d1f23c776208" },
    { label: "Sports", value: "14", id: "616900567475d1f23c7762d8" },
    { label: "Theatre & Dance", value: "15", id: "616900567475d1f23c7762ad" },
    { label: "Virtual Event", value: "144", id: "616900567475d1f23c7762c9" }
];

const formatDescription = (description) => {
    return he.decode(textVersion(description, {
        linkProcess: (href, linkText) => {
            return href;
        },
        imgProcess: (src, alt) => {
            return "";
        }
    })).replace(/\n/g, '\n');
};

const getEvents = async (startDate, endDate, callback) => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    let getToken = await fetch("https://www.homeofpurdue.com/plugins/core/get_simple_token/", {
        "referrer": "https://www.homeofpurdue.com/events/",
        "referrerPolicy": "unsafe-url",
        "body": null,
        "method": "GET",
        "mode": "cors"
    });

    let token = await getToken.text();

    let events = [];

    for (let i = 0; i < categories.length; i++) {
        let response = await fetch(`https://www.homeofpurdue.com/includes/rest_v2/plugins_events_events_by_date/find/?json=%7B%22filter%22%3A%7B%22active%22%3Atrue%2C%22%24and%22%3A%5B%7B%22categories.catId%22%3A%7B%22%24in%22%3A%5B%22136%22%2C%224%22%2C%225%22%2C%226%22%2C%227%22%2C%22137%22%2C%229%22%2C%2210%22%2C%2298%22%2C%2211%22%2C%2212%22%2C%2213%22%2C%22138%22%2C%2265%22%2C%2214%22%2C%2215%22%2C%22144%22%5D%7D%7D%5D%2C%22date_range%22%3A%7B%22start%22%3A%7B%22%24date%22%3A%22${startDate.toJSON()}%22%7D%2C%22end%22%3A%7B%22%24date%22%3A%22${endDate.toJSON()}%22%7D%7D%2C%22categories.catId%22%3A%7B%22%24in%22%3A%5B${categories[i].value}%5D%7D%7D%2C%22options%22%3A%7B%22limit%22%3A100%2C%22skip%22%3A0%2C%22count%22%3Atrue%2C%22castDocs%22%3Afalse%2C%22fields%22%3A%7B%22_id%22%3A1%2C%22location%22%3A1%2C%22date%22%3A1%2C%22startDate%22%3A1%2C%22address1%22%3A1%2C%22description%22%3A1%2C%22endDate%22%3A1%2C%22recurrence%22%3A1%2C%22recurType%22%3A1%2C%22latitude%22%3A1%2C%22longitude%22%3A1%2C%22media_raw%22%3A1%2C%22recid%22%3A1%2C%22title%22%3A1%2C%22url%22%3A1%2C%22listing.title%22%3A1%2C%22listing.url%22%3A1%7D%2C%22hooks%22%3A%5B%5D%2C%22sort%22%3A%7B%22date%22%3A1%2C%22rank%22%3A1%2C%22title_sort%22%3A1%7D%7D%7D&token=${token}`, {
            "referrer": "https://www.homeofpurdue.com/events/?view=grid&sort=date&filter_daterange%5Bstart%5D=2021-10-31&filter_daterange%5Bend%5D=2021-10-31",
            "referrerPolicy": "unsafe-url",
            "body": null,
            "method": "GET",
            "mode": "cors"
        });
        let data;
        try {
            data = await response.json();
        } catch (err) {
            if(callback) {callback(err, null);}
            return err;
        }
        
        let formatted = [];
        for(let j = 0; j < data.docs.docs.length; j++) {
            let event = {
                eventName: data.docs.docs[j].title,
                dateTime: new Date(data.docs.docs[j].startDate),
                endDateTime: new Date(data.docs.docs[j].endDate),
                location: data.docs.docs[j].location,
                latitude: data.docs.docs[j].latitude,
                longitude: data.docs.docs[j].longitude,
                tags: [categories[i].id],
                description: formatDescription(data.docs.docs[j].description),
                url: "https://www.homeofpurdue.com" + data.docs.docs[j].url
            };

            if(typeof data.docs.docs[j].media_raw != 'undefined' && data.docs.docs[j].media_raw.length > 0) {
                event.imageURL = data.docs.docs[j].media_raw[0].mediaurl;
                event.media = [];
                for(let k = 0; k < data.docs.docs[j].media_raw.length; k++) {
                    event.media.push(data.docs.docs[j].media_raw[k].mediaurl);
                }
            }

            formatted.push(event);
        }
        events.push({label:categories[i].label, events: formatted});
    }

    if(callback) {callback(null, events);}

    return events;
};