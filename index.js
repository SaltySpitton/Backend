const express = require("express");
const app = express();
const port = 4200;
const methodOverride = require("method-override");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require All Controllers

const questionsControllers = require("./controllers/questions");

// App use
app.use(questionsControllers);

const routeHit = (req, res, next) => {
  console.log("A new route was just hit");
  next();
};
app.use(routeHit);

app.listen(port, () => {
  console.log(`🎉🎊' Port is connected at ${port}`);
});
