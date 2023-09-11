import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    console.log("Received request for /"); // Log the request
    const collection = db.collection("records");

    // Log the collection name
    console.log("Fetching records from collection:", collection.collectionName);

    const results = await collection.find({}).toArray();

    // Log the fetched results
    console.log("Fetched results:", results);

    res.send(results).status(200);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "An error occurred while fetching records" });
  }
});

// POST route to add a new email record
router.post("/add-email", async (req, res) => {
    try {
      // Assuming you have a MongoDB collection called "records"
      const recordsCollection = db.collection("records");
  
      // Extract the email from the request body
      const { email } = req.body;
  
      // Create a new record object
      const newRecord = {
        email: email
      };
      // Insert the new record object into the collection
      const result = await recordsCollection.insertOne(newRecord);
  
      // Respond with a success message
      res.status(201).json({ message: "Record added successfully", insertedId: result.insertedId });
    } catch (error) {
      console.error("Error adding record:", error);
      res.status(500).json({ message: "An error occurred while adding the record" });
    }
  });

export default router;