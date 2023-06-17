require("dotenv").config();
const upload = require("./upload");
const express = require("express");
const json2xls = require("json2xls");
const bodyparser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/getexcel", (req, res) => {
  try {
    jsondata = req.body;
    let xls = json2xls(jsondata);
    const xlsfile = Date.now() + "output.xlsx";
    fs.writeFileSync(xlsfile, xls, "binary");
    console.log("Created successfully!");

    upload.uploadFile(xlsfile, ".xlsx");

    res.status(200).json({
      status: "true",
      message: "Successfully created",
    });

  } catch (err) {
    console.log(err);
  }
});

const port = process.env.port;
app.listen(port, () => {
  console.log("Running on port " + port);
});

// ContentType: "application/vnd.ms-excel";
// const dataj = [
//   { status: "value1", message: "value2" },
//   { status: "value3", message: "value4" },
// ];
