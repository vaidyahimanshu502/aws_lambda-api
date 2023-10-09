// index.mjs
import { MongoClient } from "mongodb";

// Initialize the MongoDB client 
const uri = "mongodb+srv://assignment:edviron@cluster0.ebxruu8.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();

// Define the handler function as an async function
export const handler = async (event) => {
    try {
        const database = client.db('test');
        const collection = database.collection('dues');

        const currentDate = new Date();
        const defaulters = await collection.find({ due_date: { $lt: currentDate } }).toArray();

        return {
            statusCode: 200,
            body: JSON.stringify({ defaulters }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
