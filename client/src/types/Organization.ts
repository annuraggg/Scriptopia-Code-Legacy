interface Organization extends Document {
  name: string;
  description: string;
  website: string;
  screeners: string;
  ratings: Record<string, number>;
  admins: string;
  code: string;
  email: string;
  phone: string;
  requesters: string;
}

export default Organization;
