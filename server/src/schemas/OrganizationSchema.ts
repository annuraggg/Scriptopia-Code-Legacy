import mongoose from 'mongoose';
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  screeners: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: {
    type: Map,
    of: Number
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  requesters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Organization = mongoose.model('Organization', organizationSchema);

export default Organization;