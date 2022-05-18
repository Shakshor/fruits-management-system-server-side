const express = require('express');
const app = express();
var cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tdydn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
async function run() {
    try {
        await client.connect();
        console.log('db connected');
        const itemCollection = client.db('fruits-management').collection('items');

        // load the items
        app.get('/item', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })
    }
    finally {

    }
}

// calling the function
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('connecting successfully');
})

app.listen(port, () => {
    console.log('listening to the server', port);
})