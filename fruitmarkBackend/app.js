const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config"); 
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routes
const citiesRoutes = require("./routes/cities");
const fruitsRoutes = require("./routes/fruits");
const usersRoutes = require("./routes/users");

const api = process.env.API_URL;

app.use(`/${api}/cities`, citiesRoutes);
app.use(`/${api}/fruits`, fruitsRoutes);
app.use(`/${api}/users`, usersRoutes);

//DB Config
const db = process.env.MONGO_URI
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "fruitmark-db",
})
.then(()=> console.log('MongoDB connected')).catch((err)=> console.log(err))

//Server
app.listen(process.env.PORT, () => {
  console.log(`server is running on Port:${ process.env.PORT }`);
});
