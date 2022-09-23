const SkillarySchema = require("../Model/skillarySchema");
let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmmfp9rcj",
  api_key: "954588356774862",
  api_secret: "0fmk6pIou8zlLYolbtcINEliCEo",
  secure: true,
});

//method post
// /course where / is default

const PostCourse = (req, res) => {
  try {
    let {
      categories,
      subcategory,
      coursename,
      title,
      description,
      course_overView,
      author,
      course_curriculum,
      lecture,
      instruction_Level,
      price,
      currency,
      language,
      course_overview,
    } = req.body;
    let payload = req.files;
    let uploadeddata = [...payload];
    let ImageLink = new Array();                     //todo==OR ==let ImageLink=[];
    for (let i = 0; i < uploadeddata.length; i++) {
      cloudinary.uploader.upload(
        uploadeddata[i].path,
        { folder: "uploader" },
        function (err, result) {
          ImageLink.push(result.url);
          if (ImageLink.length >= uploadeddata.length - 1) {
            let data = SkillarySchema({
              categories,
              subcategory,
              coursename,
              title,
              description,
              course_overView,
              author,
              course_curriculum,
              lecture,
              instruction_Level,
              price,
              currency,
              language,
              course_overview,
              image: [...ImageLink],
            }).save();
            res.status(201).json({
              status: "true",
              message: "data added",
              data: data,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getcourse = async (req, res, next) => {
  let data = await SkillarySchema.find({});
  res.status(201).json({
    status: true,
    message: "data fetched successfully",
    length: data.length,
    data,
  });
};

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

module.exports = { PostCourse, getcourse, searchCourse, getSingleCourse,getSingleCategories };
