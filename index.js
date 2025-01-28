import axios from "axios";
import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


const Api_Key = process.env.API_KEY;
const url = "https://api.api-ninjas.com/v1/passwordgenerator";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(url, {
      headers: { "X-Api-Key": Api_Key },
    });
    const result = response.data;
    console.log(result);
    const length = req.body.length;
    res.render("index.ejs", { data: result ,
      length : length
     });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to generate a password. Please try again.",
    });
  }
});


app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const length = req.body.length;

    const response = await axios.get(
      `${url}?length=${length}`,
      {
        headers: { "X-Api-Key": Api_Key },
      }
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      data: result,
      length : length,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to generate a password with the specified length. Please try again.",
    });
  }
});




app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
