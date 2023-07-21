const express = require ('express');
const app = express ();
const http = require ('http').Server (app);
require ('dotenv').config ();
const bodyParser = require ('body-parser');
require ('./dbConfig/mongodbConfig.js');
const userRoutes = require ('./routes/userRoutes.js');
app.use (bodyParser.json ());

app.use ('/user', userRoutes);

http.listen (process.env.PORT, () => {
  console.log (`Server is running on http://localhost:${process.env.PORT}`);
});
