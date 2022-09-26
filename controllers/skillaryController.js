const SkillarySchema = require("../Model/skillarySchema");

var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'shubhamthegreat',
  api_key: '552848858169248',
  api_secret: 'rzI_DlXFCk7frC2IggFyBXdeSEU',
})

//method post
// /course where / is default

// updated & working 
const PostCourse = (req, res, next) => {
  let image = req.files;
  var imagedata = image.filter((data) => {
    if (data.fieldname == "image") {
      return data;
    }
  });

  let videodata = image.filter((data) => {
    if (data.fieldname == "video") {
      return data;
    }
  });
  //  now push data to database and cloudinary
  let cloudinaryPayload = [...imagedata];

  var cloudinaryUpload = (value) => {
    let imagelink = new Array();
    value.map((data) => {
      cloudinary.uploader.upload(
        data.path,
        { folder: "skillary" },
        (err, result) => {
          if (err) throw err;
          if (result.url !== null) {
            imagelink.push(result.url);
            if (imagelink.length >= imagedata.length) {
              uploadtoDatabase(); //  push all data to database
              async function uploadtoDatabase() {
                try {
                  let payload = {
                    ...req.body,
                    image: imagelink,
                    video: videodata,
                  };
                  let data = SkillarySchema(payload).save();
                  res.status(201).json({
                    status: "true",
                    message: "data successfully sent to database",
                    data
                  });
                } catch (error) {
                    res.status(500).json({
                      message:error.message
                      
                    })
                }
              }
            }
          }
        }
      );
    });
  };
  cloudinaryUpload(cloudinaryPayload);
}

const getcourse = async (req, res, next) => {
  let data = await SkillarySchema.find({});
  res.status(201).json({
    status: true,
    message: "data fetched successfully",
    length: data.length,
    data,
  });
};

const deletecourse = async(req,res,next)=>{
  try {
  let data = await SkillarySchema.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status:"true",
    message:"data deleted successfully",
    data
  })
  } catch (error) {
    console.log(error)
  }
}

const filterCourse = async (req,res,next)=>{
  
  // shallow copy of query 

  const queryObj = {...req.query}
  const excludeField = ['sort',"page",'limit','fields']
  excludeField.forEach(x=>{
    delete queryObj[x]
  })

  // Advanced filtering

  let queryString = JSON.stringify(queryObj)
  // so we get :{ price: { gte: '6000' }, categories: 'DataScience' }
  // so we need :{ price: { $gte: '6000' }, categories: 'DataScience' } 
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
  let query = SkillarySchema.find(JSON.parse(queryString))
 
  const course = await query
  res.status(201).json({
    status:"true",
    length:course.length,
    course
  })

}









//  need to test 

const searchCourse = async (req, res, next) => {
  console.log("search");
  let data = await SkillarySchema.find({
    $or: [
      { categories: { $regex: req.params.search } },
      { subcategory: { $regex: req.params.search } },
      { price: { $regex: req.params.search } },
      { language: { $regex: req.params.search } },
      { author: { $regex: req.params.search } },
    ],
  }).lean();
  res.status(201).json({
    status: true,
    message: "data fetched successfully",
    length: data.length,
    data,
  });
};

const getSingleCourse = async (req, res, next) => {
  console.log(req.params);
  let data = await SkillarySchema.find({
    subcategory: { $regex: req.params.subcategory },
  }).lean();
  console.log(data);
  res.status(201).json({
    status: true,
    message: "data fetched successfully",
    length: data.length,
    data,
  });
};

const getSingleCategories = async (req, res, next) => {
  let data = await SkillarySchema.find({
    categories: { $regex: req.params.category },
  }).lean();
  res.status(201).json({
    status: true,
    message: "data fetched successfully",
    length: data.length,
    data,
  });
};

module.exports = { PostCourse, getcourse, searchCourse, getSingleCourse,getSingleCategories,deletecourse,filterCourse };
