// 👇 Types
import { Request, Response, NextFunction } from 'express';

// 👇 connect to db
require("./src/db/config");

// 👇 Handle http requests
const express = require("express");

// 👇 use express routing
const app = express();

// 👇 config to run middleware
require("./src/config/config")(app);


const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// 👇 all routes are controlled from routes/index.ts
const allRoutes = require("./src/routes");
app.use("/api", allRoutes); // prefix before route urls

app.use((req: Request, res: Response, next: NextFunction) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/src/public/index.html");
});

// ❗ Errors to be handled within error-handling file
require("./src/error-handling")(app);

module.exports = app;
