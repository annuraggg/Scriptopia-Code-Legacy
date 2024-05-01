import { IEducation } from "@/Interfaces/Resume.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const resume = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,6})$/,
  },
  address: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  education: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (this: IEducation, value: Date) {
            return this.startDate <= value;
          },
          message: "End date must be after start date",
        },
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (this: IEducation, value: Date) {
            return this.startDate <= value;
          },
          message: "End date must be after start date",
        },
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      techStack: [String],
      link: {
        type: String,
        required: true,
      },
    },
  ],
  skills: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

resume.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

resume.index({ userID: 1 });
const Resume = mongoose.model("resume", resume);
export default Resume;
