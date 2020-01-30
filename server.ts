import mongoose from 'mongoose';
import express from "express";

// Initialise our app
const app = express();

// Lets set our port
/**
 * The default port number is `3000` if Heroku does not provide us a port
 * Take note on that as we will come to that.
 */
app.set("port", process.env.PORT || 3000);

console.log(process.env.COMPOSE_PROJECT_NAME);

// Define our json response
const data = {
  blog_name: "docker_nodejs_app",
  blog_author: "wachira (tesh254)",
  blog_author_twitter: "@wachira_dev",
  NODE_ENV: `${process.env.NODE_ENV}`,
  db_connection_string: `connection string: ${process.env.MONGODB_URI}`,
  db_connection_status: 0,
};

(async () => {
  try {
    const connected = await connectDB(process.env.MONGODB_URI);
    console.log("Connected to mongo database successfully");
  } catch(e) {
    console.log('Error happend while connecting to the DB: ', e.message)
  }
})();

/**
 * To ensure works as it should we will create a
 * simple endpoint to return a json response
 * with our db connection status
 */
// Define out GET request endpoint
app.get("/", (req, res) => {
  data.db_connection_status = mongoose.connection.readyState;
  res.status(200).json(data);
});

// Initialize our server
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

async function connectDB(DBconnectionString) {
  console.log(`Connecting to DB - uri: ${DBconnectionString}`);
  return mongoose.connect(DBconnectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};