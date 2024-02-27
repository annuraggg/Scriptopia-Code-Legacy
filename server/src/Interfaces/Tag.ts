import { Document, Schema, Types } from 'mongoose';

interface Tag extends Document {
  name: string;
  description: string;
}

export default Tag;
