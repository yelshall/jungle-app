import pymongo
from pymongo import MongoClient
import datetime

Tags = ["Children & Family", "Community Events", "Music/Concerts",
"Art", "Downtown Happenings", "Festivals & Holidays", "Food",
"Shopping", "Purdue Events", "Museums & Exhibits", "Nightlife", "Over 21",
"Parks & Recreation", "Theatre & Dance", "Run/Walk/Ride", "Virtual Event", "Sports", "Academic"]

Images = ["https://majorhykr.files.wordpress.com/2019/01/family_of_four_with_2_children_hiking_in_the_great_smoky_mountains.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/westlafayettein/2_taste_2019_9476_copy_e6ee5a48-2f08-4377-bb22-1f14c203f2aa.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Slayter_center.jpg",
    "https://cla.purdue.edu/academic/rueffschool/galleries/exhibitions/images/AD_juried_2020.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/westlafayettein/VLWL_9761_0cfdd120-035c-491b-8f1f-5c8cb2ce70bc.jpg",
    "https://www.purdue.edu/uns/images/2011/pmo-christmas.jpg",
    "https://www.gannett-cdn.com/presto/2020/03/11/PLAI/3d9d3310-29b6-41ef-a687-f919e2fd9953-200310_NF_Purdue_01.JPG",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/westlafayettein/Purdue-Farmer-s-Market-2014-03-05-at-1.21.40-PM_6DDC5438-B2E2-3C4D-97129D4C593AC2FD_6de6477f-aead-0ea4-183b507e618b4451.png",
    "http://media.heartlandtv.com/images/Purdue+150th.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/westlafayettein/art_museum_4715_5c5c9d28-7e8e-45ac-9450-0f8030791f8f.jpg",
    "http://res.cloudinary.com/simpleview/image/upload/v1506958998/clients/lafayette/Wurst028_2daa8c40-aad5-44fb-a593-8a805cf4b0a1.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,q_75/https://getreadytotravelblog.files.wordpress.com/2018/09/img_5405.jpg%3Fw%3D4032%26h%3D3024",
    "https://www.wishtv.com/wp-content/uploads/2020/07/CROP-Tropicanoe-Cove-Lafayette-courtesty-City-of-Lafayette.jpg",
    "https://cla.purdue.edu/academic/rueffschool/theatre/gallery/Hair/full/hair-008.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/westlafayettein/marathon-photos-for-rachel-20_3c9fe167-e85d-7965-252200cd84531b1e.jpg",
    "https://www.indianachamber.com/wp-content/uploads/2019/04/Stock_PurdueBellTower_Photo.jpg",
    "https://purduesports.com/images/2020/6/18/MCE_7637_FullRes.jpg",
    "https://engineering.purdue.edu/IE/news/2020/september-2020-protect-purdue/WALCstudy.jpg"]

client = MongoClient("mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority")
db = client.db

for i in range(len(Tags)):
    Tag = {
        "tagName": Tags[i],
        "imageURL": Images[i],
        "events": [],
        "hosts": [],
        "metadata": {"dateCreated": datetime.datetime.utcnow()}
    }
    print(Tag)
    db.tags.replace_one(Tag, Tag, upsert = True)

