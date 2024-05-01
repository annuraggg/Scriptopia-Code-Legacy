import mongoose from "mongoose";

interface IEducation extends Document {
  title: string;
  type: string;
  institution: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface IExperience extends Document {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

interface IResume extends Document {
  userID: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  education: IEducation[];
  experience: IExperience[];
  projects: IProject[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { IResume, IProject, IExperience, IEducation };
