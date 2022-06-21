let express = require("express");
let mongoose = require("mongoose");
let ejs = require("ejs");

let newsRoute = require("./routes/newsRoute");

let app = express();

let port = 8080;

mongoose.connect("mongodb://localhost/News-Node");
let db = mongoose.connection;

db.once("open", () => {
  console.log("Mongodb is connected successfully");
});

app.set("views", __dirname + "/views");
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use("/", newsRoute);

app.listen(port, () => {
  console.log(`Listening to port  ${port}`);
});

module.exports = app;
