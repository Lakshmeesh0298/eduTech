const { JWT_COOKIE_EXPIRE, NODE_ENV } = require("../config");
const UserSchema = require("../Model/UserModel");
const errorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { GMAILPASSWORD } = require("../config");
// const jwt = require("jsonwebtoken");
// const _ = require("lodash");

//errorResponse function
const sendResponseToken = (user, statusCode, res) => {
  let TOKEN = user.regTOKEN();
  let options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 3600 * 1000),
    httpOnly: true,
    secure: NODE_ENV === "production",
  };
  res
    .status(statusCode)
    .json({ success: true, message: "successfully token fetched", TOKEN })
    .cookie("cookie", options, TOKEN);
};

//register controller
exports.registerController = async (req, res, next) => {
  try {
    let { username, firstname, lastname, email, phonenumber, password, role } =
      req.body;
    let user = await UserSchema.create({
      username,
      firstname,
      lastname,
      email,
      phonenumber,
      password,
      role,
    });
    sendResponseToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(new errorResponse(`registeration failed`, 500));
    // res.status(500).json({success:false,message:error.keyValue, reason:error.message})
  }
};

//user login controller
exports.userLoginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await UserSchema.findOne({ email }).select("+password");
    let matchPassword = await user.matchPASSWORD(password);

    if (!email || !password) {
      return next(new errorResponse("email and password are mandatory", 500));
    } else if (!user) {
      return next(new errorResponse("user doesn't exists", 500));
    } else if (!matchPassword) {
      return next(new errorResponse("password does not match", 500));
    }
    sendResponseToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(new errorResponse("login failed", 500));
  }
};

//logout Controller
exports.logoutController = async (req, res, next) => {
  try {
    res.cookie("cookie", "", {
      expires: new Date(new Date().getTime() + 60 * 1000),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ status: true, message: "You Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    next(new errorResponse("Error while logging out", 500));
  }
};

// forgot controller
exports.forgotController = async (req, res, next) => {
  try {
    let { registeredEmail } = req.body;
    console.log(req.body)
    let emailUpdate = await UserSchema.findOne({ email: registeredEmail });
    if (registeredEmail == emailUpdate.email) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "dumyacount007@gmail.com", pass: `${GMAILPASSWORD}` },
      });
      let details = {
        from: "dumyacount007@gmail.com",
        to: `${registeredEmail}`,
        subject: "Reset Your Password",
        html: `<h1>This is mail is to reset your password</h1>
                    <p>click on reset below to change your password</p>
                    <a href="http://localhost:5000/auth/forgot-password"><button>Reset</button></a>
                    <p style="color:blue">if it wasn't requested by you then IGNORE this message</p>`,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) throw err;
      });
      res
        .status(200)
        .json({ status: true, message: `email sent to ${registeredEmail}` });
    } else {
      res.status(200).json({
        status: false,
        message: "redirect to reset page saying enter registered email",
      });
    }
  } catch (error) {
    console.log(error);
    next(new errorResponse("error"), 500);
  }
};

//reset password controller
exports.resetPassword = async (req, res, next) => {
  try {
    let { registeredEmail, newPassword, confirmNewPassword } = req.body;

    let { email } = await UserSchema.findOne(
      { email: registeredEmail },
      { _id: 0, email: 1 }
    );
    if (registeredEmail == email) {
      console.log("Matchedemial:", email);
      if (newPassword == confirmNewPassword) {
        let crypted = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, crypted);

        await UserSchema.updateOne(
          { email: registeredEmail },
          { $set: { password: newPassword } }
        );
        res
          .status(200)
          .json({ status: true, message: "redirect to login page" });
      } else {
        res.status(400).json({
          status: false,
          message: "Match password while resetting old one....🤦‍♂️",
        });
      }
    } else {
      res
        .status(200)
        .json({ status: false, message: "enter your Registered email" });
    }
  } catch (error) {
    console.log(error);
    next(new errorResponse("error"), 500);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//change password

exports.changePassword = async (req, res, next) => {
  try {
    let { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword == confirmNewPassword) {
      let { password } = await UserSchema.findOne({
        email: req.user.email,
      }).select("+password");

      let match = await bcrypt.compare(currentPassword, password);
      if (match) {
        let crypted = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, crypted);

        await UserSchema.updateOne(
          { email: req.user.email },
          { $set: { password: newPassword } }
        );
        res.status(200).json({
          status: true,
          message: "password changed successfully,redirect to login page",
        });
      } else {
        res
          .status(500)
          .json({ status: false, message: "Enter Correct Present Password " });
      }
    } else {
      res
        .status(400)
        .json({ status: false, message: "Match the New Password....🤦‍♂️" });
    }
  } catch (error) {
    console.log(error);
    next(new errorResponse("error"), 500);
  }
};
