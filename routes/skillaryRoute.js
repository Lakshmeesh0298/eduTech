const  {PostCourse,getcourse,searchCourse, getSingleCourse, getSingleCategories,deletecourse,filterCourse} = require ('../controllers/skillaryController')
const express=require('express')
const multer=require('multer')

const Router=express.Router()

const storage=require('../config/multer');
let upload=multer({storage})


Router.post('/',upload.any(['image','video']),PostCourse);
Router.route('/').delete(deletecourse).get(getcourse)
// Router.route('/filter').get(filterCourse)




 //todo: changes to be done to exclude the params 
 Router.get('/search/:search',searchCourse);
Router.get('/category/:subcategory', getSingleCourse);
Router.get('/singlecategory/:category',getSingleCategories );



module.exports = Router
