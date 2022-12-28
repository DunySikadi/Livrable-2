const express = require("express");
const morgan = require("morgan");
const app = express();
const edtRoutes = require("./routes/edtRoutes");
const profRoutes = require("./routes/profRoutes");
const db = require("./Database/db");
const expressOasGenerator = require("express-oas-generator");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/edt", edtRoutes);
app.use("/prof", profRoutes);

expressOasGenerator.handleResponses(app);
expressOasGenerator.handleRequests();

const whitelist = ["http://localhost:8090"];

const corsOptions = {
  origin: function (req, callback) {
    if (whitelist.indexOf(req) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

app.use(cors(corsOptions));

const test = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

test();

app.listen(8080);
