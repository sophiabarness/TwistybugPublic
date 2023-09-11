import { MongoClient } from "mongodb";

// const connectionString = process.env.ATLAS_URI || "";
const connectionString = "mongodb+srv://sbarnes1:hXe0fioFhj9TFgST@twistybug.d1tuwro.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);


let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Twistybug");

export default db;