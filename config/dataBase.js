const { connect } = require("mongoose");
const { success, info, error } = require("consola");
const { NODE_ENV, MONGOLOCAL_URL, MONGOATLAS_URL } = require("./index");

exports.connectDataBase = () => {
  if (NODE_ENV === "production") {
    connect(MONGOATLAS_URL);
    success("mongo ATLAS connected");
  } else {
    connect(MONGOLOCAL_URL);
    success("mongo LOCAL connected");
  }
};
