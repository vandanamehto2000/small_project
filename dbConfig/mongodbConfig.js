const mongoose = require ('mongoose');

const {MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE} = process.env;
const mongoURI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.mjxa7c7.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
console.log(mongoURI);
mongoose.connect (mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on ('error', console.error.bind (console, 'connection error:'));
db.once ('open', () => {
  console.log ('Connected to MongoDB');
});

module.exports = db;


