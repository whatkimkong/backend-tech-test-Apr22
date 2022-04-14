// ℹ️ package responsible to make the connection with mongodb

import Log from "../error-handling/Log";

// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/backend";

mongoose
  .connect(MONGO_URI)
  .then((x: any) => {
    Log.info(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error: any) => {
    Log.error(error.message);
  });
