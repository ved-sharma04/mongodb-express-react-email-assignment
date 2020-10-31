const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const connectionString = process.env.MONGODB_URI;
//Mongodb Schema {email:"emailID"}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));
//new
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db("mydb");
        const collection = db.collection("users");
        //app. comes here

        app.post('/api/add/:email', (req, res) => {
            const { email } = req.params;

            console.log(email);
            collection.insertOne({ email: email })
                .then(result => {
                    console.log(result);
                    //return res.redirect('/api/home')
                    return res.send("Added email");
                })
                .catch(error => console.error(error))
        })

        app.get('/api/home', (req, res) => {
            db.collection('users').find().toArray()
                .then(results => {
                    console.log(results);
                    //return res.sendFile('D:/react/training/server/' + 'index.html');
                    return res.send("welcome to server");
                })
                .catch(error => console.error(error))
        })

        app.post('/api/delete/:email', (req, res) => {
            const { email } = req.params;

            collection.deleteOne(
                {
                    email: email
                })
                .then(result => {
                    console.log(result);
                    //return res.redirect('/api/home');
                    return res.send("Deleted email");
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
