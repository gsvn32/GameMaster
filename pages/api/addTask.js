const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://gamemater:gamemaster@gamemaster.vxgrqmj.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function getNextSequenceValue() {
  const db = client.db("gamemaster");
  const sequenceCollection = db.collection("users");
  const sequenceDoc = await sequenceCollection.findOneAndUpdate(
    { "taskSeqId": "gsvn32taskseq" },
    { $inc: { "taskSeq": 1 } },
    { returnOriginal: false }
  );

  return sequenceDoc.value.taskSeq;
}
async function closeConnection() {
  await client.close();
  console.log("Disconnected from MongoDB");
}
export default async function handler(req, res) {
	if(req.method==='POST'){
		//Make a connection to db
		try {
    await client.connect();
    console.log("Connected to MongoDB");


  const autoIncrementedValue = await getNextSequenceValue();
  const db = client.db("gamemaster");
  const collection = db.collection("tasks");

 const newDocument = {
    _id: new ObjectId(), // Use ObjectId to generate a unique identifier for the document
    task_id: autoIncrementedValue,
  title: req.body.title,
  status: "BL",
  p_hours: 0,
  Ddate: req.body.Ddate,
  Cdate: Date(),
  e_hours: req.body.e_hours,
  Blocked: [],
  Blocks: []
};
try {
    const result = await collection.insertOne(newDocument);
    console.log("Document inserted:", result.insertedId);
    res.status(200).json({ message: 'Added Task'+result.insertedId})
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(200).json({ message: 'Error inserting document'})
  }

  
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(200).json({ message: 'Database service Unavialbe'})
  } finally {
    await closeConnection();
  }
		
	}
	else{
  res.status(502).json({ message: "That's wrong Number!"})
	}
  
}
