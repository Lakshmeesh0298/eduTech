const  {PostCourse,getcourse,searchCourse, getSingleCourse, getSingleCategories} = require ('../controllers/skillaryController')
const express=require('express')
const multer=require('multer')

const Router=express.Router()

const storage=require('../config/multer');
let upload=multer({storage})


Router.post('/',upload.any(['image','video']),PostCourse);

// Router.route('/').get(getCOurse)

Router.get('/',getcourse);

Router.get('/search/:search',searchCourse);

Router.get('/category/:subcategory', getSingleCourse);
Router.get('/singlecategory/:category',getSingleCategories );



module.exports = Router
