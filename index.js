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

const routeHit = async (req, res, next) => {
  console.log("A new route was just hit");
  next();
};
app.use(routeHit);

app.use("/users", userController);
app.use("/questions", questionsControllers);
app.use("/answers", answerController);

app.listen(port, () => {
  console.log(`🎉🎊' Port is connected at ${port}`);
});
