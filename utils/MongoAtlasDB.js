import { MongoClient } from "mongodb";

module.exports.getMeetupsCollection = async () => {
  const DB_URL = process.env.DB_URL;

  const client = await MongoClient.connect(DB_URL, {
    useUnifiedTopology: true,
  });

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  return { client, meetupsCollection };
};
