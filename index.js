const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
// const authJwt = require("./config/jwt");

const errorHandler = require('./config/error-handler');

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(errorHandler);

const api = process.env.API_URL;

//Routes


const masterDataRoutes = require("./routes/masterdata");

app.use(`/${api}/masterdata`, masterDataRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING  , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log('connected')
  })

  .catch((err) => {
  });

const PORT = process.env.PORT || 3000 
//Server
app.listen(PORT, () => {
  console.log('listning',PORT)
});
