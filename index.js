const express = require("express");
const app = express();
const port = 4200;
const methodOverride = require("method-override");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Require All Controllers

const userController = require('./controllers/users')
const questionsControllers = require('./controllers/questions');
const answerController= require('./controllers/answers')

const routeHit = async(req, res, next) => {
  console.log("A new route was just hit");
  next();
};
app.use(routeHit);

app.use('/users', userController)
app.use('/questions', questionsControllers)
app.use('/answers', answerController)

app.listen(port, () => {
  console.log(`🎉🎊' Port is connected at ${port}`);
});
