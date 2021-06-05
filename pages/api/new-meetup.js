// URL: /api/new-meetup
// Server Side Code

import { MongoClient } from "mongodb";

const DB_URL =
  "mongodb+srv://new-user-22:8P7yecjdhqo7hOdQ@interntest.klxyh.mongodb.net/meetups?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // can do data validation

      // store in db
      const client = await MongoClient.connect(DB_URL);
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);
      // console.log(result);

      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Something went wrong" });
    }
  }
}

export default handler;
