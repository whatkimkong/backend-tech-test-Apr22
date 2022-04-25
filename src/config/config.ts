import { Request, Response, NextFunction } from 'express';
const express = require("express");

/** CORS - cross origin resource sharing 
 * unless the request if from the same domain, by default express wont accept POST requests */
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Middleware configuration and SERVER STARTING 
module.exports = (app: any) => {
    // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
    // Services like heroku use something called a proxy and you need to add this to your server
    app.set("trust proxy", 1);
  
    // controls a very specific header to pass headers from the frontend
    app.use(
      cors({
        credentials: true,
        origin: process.env.ORIGIN || "http://localhost:5005",
      })
    );
  
    // In development environment the app logs
    app.use(logger("dev"));
  
    // To have access to `body` property in the request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'backend for president',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/backend",
          ttl: 1000 * 60 * 60 * 24 * 30,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          // sameSite: 'none',
          // secure: process.env.NODE_ENV === 'production',
        },
      })
    );
  };
  

/* no user so:
no need for: app.use((req: Request, res: Response, next: NextFunction) => {
      req.user = req.session.user || null;
      next();
    }); */