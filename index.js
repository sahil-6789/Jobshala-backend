require("dotenv").config();
// To load .env file we have to require dotenv package and using config function of this we can load all the environment of .env file into our node environment
// It provides flexibilty when we move from one system to another because things remain hidden
// We are removing sensitive and changable data from our code using .env

const express = require("express"),
  app = express(),   //This is an instance of express and will represent express in our code
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  cors = require("cors");
// Cross origin resource sharing
// When there is mismatch between the domain of frontend and backend i.e; the port where we are running backend and frontend
// Cors is a mechanism which uses additional http headers to tell the browser whether a specific web app can share resource with another web app (Both the web app should have different origin because when they have same origin then they can share resouces very easily)
const { db_user, db_pwd, db_host, db_name } = require("./config");

//requiring routes
  const jobRoutes = require("./routes/job"),
  userRoutes = require("./routes/user");

const mongoSrvString = `mongodb+srv://${db_user}:${db_pwd}@${db_host}/${db_name}?retryWrites=true&w=majority`;
// Its the path from where we will connect mongoDB (This is the root of connection)
// connect the database
const db = mongoose
  .connect(mongoSrvString, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //significant refactor of how it handles monitoring all the servers in a replica set or sharded cluster.
    //In MongoDB parlance, this is known as server discovery and monitoring.
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {   // when the promise if fufilled then .then() method is called
    console.log("Connected to mongo db");
  })
  .catch((err) => {   // when the promise is rejected(Due to some errors) then catch() method is called
    console.log("Couldn't connect to mongo db, err: ", err);
  });

app.use(cors());
// in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
// app.use(bodyParser.urlencoded({ extended: true })); //middleware for parsing bodies from URL.
app.use(bodyParser.json()); // we can use express().json in place of bodyParser.json() and It is used to control the data which we send from postmon or react into the nodejs. This is a middleware

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //to support HTTP Verbs other than GET,POST

app.use("/jobs", jobRoutes);
app.use("/user", userRoutes);
// Route: The link of API(endpoint) which we consume to hit the API
const port = process.env.PORT || 3030;
app.listen(port, function () {
  console.log(`[OK] server started on port ${port}`);
});
