const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config/index");
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phonenumber: {
      type: Number,
    },
    password: {
      type: String,
      select: false,
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "publisher"],
      default: "user",
    },
    profile_picture: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    billing_address: {
      type: String,
    },
    reviews: {
      type: [],
    },
    notification: {
      type: String,
    },
    purchased_course: [],
    published_course: [],
    details1: [],
    details2: [],
    details3: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  let crypted = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, crypted);
});

UserSchema.methods.regTOKEN = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

UserSchema.methods.matchPASSWORD = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model("auth", UserSchema);
