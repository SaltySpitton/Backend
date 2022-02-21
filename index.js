require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
//const bcrypt = require("bcryptjs");
const methodOverride = require("method-override");
const session = require("express-session");
const expressSession = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./middleware/expressError");
const errorHandler = require("./middleware/errorHandler");
const joi = require("joi");



app.set('port', process.env.PORT || 4200);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.PRODUCTION ? process.env.FRONT_END_URL : "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Require All Controllers
const userController = require("./controllers/users");
const questionsControllers = require("./controllers/questions");
const answerController = require("./controllers/answers");
const userDataController = require("./controllers/userdata");

//  middleware
const routeHit = async (req, res, next) => {
  console.log("A new route was just hit");
  next();
};

app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: "_",
  })
);

app.use(routeHit);
app.use(errorHandler);
app.use("/users", userController);
app.use("/questions", questionsControllers);
app.use("/answers", answerController);
app.use("/userData", userDataController);

app.listen(app.get('port'), () => {
    console.log(`port: ${app.get('port')}`)
})
