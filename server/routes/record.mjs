import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  console.log("Received request for /"); // Add this line
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
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