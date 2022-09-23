const errorHandler = (err, req, res, next) => {
  res
    .status(err.statuscode || 500)
    .json({ success: false, error: err.message || "server error" });
};
module.exports = errorHandler;

////////////////
// const errorHandler = (err,req,res,next)=>{
//     res.setHeader('Content-Type','application/json').status(err.statuscode||500).send(JSON.parse(err))
// }
// module.exports = errorHandler
