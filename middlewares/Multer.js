const multer = require('multer')


 let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,)
    },
    filename:function(req,file,cb){
        cb(null, Date.now() +  file.originalname())
    }
})


module.exports = storage