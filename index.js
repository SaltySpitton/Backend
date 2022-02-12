require('dotenv').config()
const express = require("express");
const app = express();
const port = 4200;
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
//const bcrypt = require("bcryptjs");
const methodOverride = require("method-override");
const session = require("express-session");
const expressSession = require("express-session");
const mongoSanitize = require('express-mongo-sanitize');




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


// Require All Controllers
const userController = require("./controllers/users");
const questionsControllers = require("./controllers/questions");
const answerController = require("./controllers/answers");


//  middleware
const routeHit = async (req, res, next) => {
  console.log("A new route was just hit");
  next();
}

const errorHandler = (err, req,res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    //if in developement will give stack lines and more specifics
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: '_',
  }),
);

app.use(routeHit);
app.use(errorHandler);


app.use("/users", userController);
app.use("/questions", questionsControllers);
app.use("/answers", answerController);

app.listen(port, () => {
  console.log(`🎉🎊' Port is connected at ${port}`);
});
