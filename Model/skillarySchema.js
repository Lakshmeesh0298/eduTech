const { Schema, model } = require("mongoose");

const SkillarySchema = new Schema(
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
  },
  { timeStamp: true },
  { index: true }
);

module.exports = model("skillarydata", SkillarySchema);
