const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const router = require("./routes/router");
require('./db/Connection')

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(`${__dirname}/public`)); // To serve static files
app.use(express.static(path.join(__dirname, "public"))); // To serve static files

/*
    1: Global MIDDLEWARES
*/
if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev")); // for logging in console
}

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: [
          "'self'",
          // "data:",
          // "blob:",
          "https://*.cloudflare.com",
          "http://localhost:8000/",
          // "ws:",
        ],
        baseUri: ["'self'"],
        scriptSrc: [
          "self",
          "http://localhost:8000/",
          "http://127.0.0.1:8000/",
          "https://*.cloudflare.com",
          "https://polyfill.io",
          // "http:",
          // "data:",
        ],
        styleSrc: ["self", "https:", "http:", "unsafe-inline"],
        imgSrc: ["'self'", "data:", "blob:"],
        fontSrc: ["'self'", "https:", "data:"],
        childSrc: ["'self'", "blob:"],
        styleSrcAttr: ["'self'", "unsafe-inline", "http:"],
        frameSrc: ["'self'"],
      },
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

// Implementing Rate Limiting; limit the requests to server per hour
const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 1000, // 100 requests per hour
  headers: true,
});
app.use("/api", limiter);

// reading url params and data from body to req.params and req.body
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" })); // for bodyParser
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xssClean());

// For parameter pollution like adding sort twice in query string
app.use(hpp());

/*
    Custom Middleware
*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

/*
    Mounting Rounters as middleware
*/
app.use("/api/v1", router);

/*
    For unknown routes
    all() is used for all get, post, patch, delete requests
*/
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});

/*
    Global Error Handling Middleware
*/
app.use(globalErrorHandler);

module.exports = app;
