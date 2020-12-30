const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


mongoose.connect('mongodb+srv://ElijahDolskij:qwert123@cluster0.ltknj.mongodb.net/FilmsData?retryWrites=true&w=majority',  { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false } );

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.on('open', () => console.log('Connection to DB!'));

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server started on port: ${PORT}`);
});

// ElijahDolskij / qwert123
