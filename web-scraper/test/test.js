import fetch from 'node-fetch';

let date = '2021-11-30';

const response = await fetch(`https://www.homeofpurdue.com/includes/rest_v2/plugins_events_events_by_date/find/?json=%7B%22filter%22%3A%7B%22active%22%3Atrue%2C%22%24and%22%3A%5B%7B%22categories.catId%22%3A%7B%22%24in%22%3A%5B%22136%22%2C%224%22%2C%225%22%2C%226%22%2C%227%22%2C%22137%22%2C%229%22%2C%2210%22%2C%2298%22%2C%2211%22%2C%2212%22%2C%2213%22%2C%22138%22%2C%2265%22%2C%2214%22%2C%2215%22%2C%22144%22%5D%7D%7D%5D%2C%22date_range%22%3A%7B%22start%22%3A%7B%22%24date%22%3A%222021-10-31T04%3A00%3A00.000Z%22%7D%2C%22end%22%3A%7B%22%24date%22%3A%22${date}T05%3A00%3A00.000Z%22%7D%7D%7D%2C%22options%22%3A%7B%22limit%22%3A100%2C%22skip%22%3A0%2C%22count%22%3Atrue%2C%22castDocs%22%3Afalse%2C%22fields%22%3A%7B%22_id%22%3A1%2C%22location%22%3A1%2C%22date%22%3A1%2C%22startDate%22%3A1%2C%22address1%22%3A1%2C%22description%22%3A1%2C%22endDate%22%3A1%2C%22recurrence%22%3A1%2C%22recurType%22%3A1%2C%22latitude%22%3A1%2C%22longitude%22%3A1%2C%22media_raw%22%3A1%2C%22recid%22%3A1%2C%22title%22%3A1%2C%22url%22%3A1%2C%22listing.title%22%3A1%2C%22listing.url%22%3A1%7D%2C%22hooks%22%3A%5B%5D%2C%22sort%22%3A%7B%22date%22%3A1%2C%22rank%22%3A1%2C%22title_sort%22%3A1%7D%7D%7D&token=65d48d304062e9e304a33af506576151`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "_fbp=fb.1.1633903826888.1172797085; _gid=GA1.2.928886510.1635122194; GCLB=CMyqsKTmy-XUNw; __atuvc=4%7C41%2C1%7C42%2C1%7C43; _ga_Z9MN82YTMQ=GS1.1.1635130736.4.1.1635130737.0; _ga=GA1.2.1961413111.1633903827; _dc_gtm_UA-2123735-1=1; _gat_UA-82747010-2=1"
    },
    "referrer": "https://www.homeofpurdue.com/events/?view=grid&sort=date&filter_daterange%5Bstart%5D=2021-10-31&filter_daterange%5Bend%5D=2021-10-31",
    "referrerPolicy": "unsafe-url",
    "body": null,
    "method": "GET",
    "mode": "cors"
});

let data = await response.json();

console.log(data.docs.docs.length);