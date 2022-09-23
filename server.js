const express = require("express");
const { PORT, NODE_ENV } = require("./config");
const { connectDataBase } = require("./config/dataBase");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");
const { success, info, error } = require("consola");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const bodyParser = require("body-parser");
const courseRoute = require('./routes/skillaryRoute')
const cors=require('cors')
let app = express();

const startServer = () => {
  try {
    connectDataBase();

    if (NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors())
    app.use(express.urlencoded({ extended: true }));
   

    app.use("/auth", authRoute);
    app.use("/user", profileRoute);
    app.use('/course',courseRoute)
    app.use(errorHandler);
    app.listen(PORT, (err) => {
      if (err) throw err;
      success(`server is running on ${PORT}`);
    });
  } catch (err) {
    error(err);
  }
};
startServer();