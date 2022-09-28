PROJECT EDUTECH
MODULES USED
MONGOOSE
Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB. It is akin to an 
Object Relational Mapper (ORM) such as SQLAlchemy for traditional SQL databases. The problem 
that Mongoose aims to solve is allowing developers to enforce a specific schema at the application 
layer.
CLOUDINARY
Cloudinary is an end-to-end image- and video-management solution for websites and mobile apps, 
covering everything from image and video uploads, storage, manipulations, optimizations to 
delivery.
JWT
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained 
way for securely transmitting information between parties as a JSON object. This information can be 
verified and trusted because it is digitally signed.
BCRYPT
Bcrypt allows building a password security platform that can evolve alongside hardware technology 
to guard against the threats that the future may bring, such as attackers having the computing 
power to crack passwords twice as fast.
NODEMAILER
Nodemailer is a Node. js module that allows you to send emails from your server with ease. Whether 
you want to communicate with your users or just notify yourself when something has gone wrong, 
one of the options for doing so is through mail.
MORGAN
morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the 
process.
MULTER
Multer is a node. js middleware for handling multipart/form-data , which is primarily used for 
uploading files. It is written on top of busboy for maximum efficiency. NOTE: Multer will not process 
any form which is not multipart ( multipart/form-data ).
CORS
Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to 
indicate any origins (domain, scheme, or port) other than its own from which a browser should 
permit loading resources.
PACKAGE JSON
URL’S
Course URL

1. To Get all Course
Request type :- Get
url:- http://localhost:5000/course/

2. To add Course
Request type:- POST
Content-type: multipart/form-data
url:- http://localhost:5000/course/

3. Search
Request type: GET
URL: http://localhost:5000/course/search/search
Search: subcategory, price, language, author

4. Get Single Course
Request type: GET
URL: http://localhost:5000/course/course/category/subcategory
Subcategory: html,css, js, maths

5. add course to cart
Request type:put
url: http://localhost:5000/user/course_id/add
{
  "userId":"id of the user"
}

Auth URL’s

1. To Register User
Request type:- POST
Content-type: application/json
url:- http://localhost:5000/auth/register
{
 "username":"hari",
 "email":"harishrao.star396@gmail.com",
 "password":"harish"
}

2. to Login User
Request type:- POST
Content-type: application/json
Token: set/true
url:- http://localhost:5000/auth/login
{
 "email":"harishrao.star396@gmail.com",
 "password":"harish"
}

3. Forgot password
Request type:- POST
Content-type: application/json
url:- http://localhost:5000/auth/forgot-password
{
 "registeredEmail":"harishrao.star396@gmail.com"
}

4. Reset Password
Request type:- POST
Content-type: application/json
url:- http://localhost:5000/auth/reset-password
{
 "registeredEmail":"harishrao.star396@gmail.com",
 "newPassword":"harishrao",
 "confirmNewPassword":"harishrao"
}

5. Logout
Request type:- GET
Token: Required
url:- http://localhost:5000/auth/logout
6. Change password
Request type:- POST
Content-type: application/json
url:- http://localhost:5000/auth/change-password
{
 "currentPassword":"harishrao",
 "newPassword":"harish",
 "confirmNewPassword":"harish"
}
Course API
 {
    categories: {
      type: String,
      enum: [
        "analytics",
        "aptitude",
        "bussiness",
        "ca",
        "carrerdevelopment",
        "dybersecurity",
        "design",
        "datascience",
        "webdevelopment",
      ],
    },
    subcategory: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: [""],
    },
    video: {
      type: [""],
    },
    course_overView: {
      type: String,
    },
    author: {
      type: String,
    },
    course_curriculum: {
      type: String,
    },
    lectures: {
      types: String,
    },
    instruction_Level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    previousBuyTheCourseStudents: {
      type: String,
    },
    lastUpdate: {
      type: String,
      default: Date.now(),
    },
    rating: {
      type: String,
    },
    price: {
      type: String,
    },
    Currency: {
      type: String,
      enum: ["rs", "dollar", "Glish", "french", "german"],
      default: "rs",
    },
    language: {
      type: String,
      enum: ["english", "kannada", "french", "german", "spanish"],
    },
    courseType: {
      type: String,
      enum: ["live", "recorded"],
    },
    reviews: {},
    Blank1: {},
    Blank2: {},