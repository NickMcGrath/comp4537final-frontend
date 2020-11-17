let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let port = process.env.PORT || 8080;

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


let indexRouter = require("./routes/index");
let createProfileRouter = require("./routes/create-profile");
let overviewRouter = require("./routes/overview");

app.use("/", indexRouter);
app.use("/profile", createProfileRouter);
app.use("/overview", overviewRouter);

app.listen(port);

module.exports = app;
