const fs = require("file-system");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const items = JSON.parse(fs.readFileSync("data/items.json"));
const batchImport = async () => {
  const item = await new MongoClient(MONGO_URI, options);

  try {
    await item.connect();
    const db = item.db("ReservoirCats");

    await db.collection("Products").insertMany(items);
  } catch (err) {
    console.log(err);
  }
  console.log("success!");
  item.close();
};

// Imports the companies data from the data file
const companies = JSON.parse(fs.readFileSync("data/companies.json"));

const companiesImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ReservoirCats");
    await db.collection("Companies").insertMany(companies);
    console.log(companies);
  } catch (err) {
    console.log(err);
  }
  console.log("success!");
  client.close();
};

// batchImport();
