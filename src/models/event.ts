import mongoose, { Document, Schema } from "mongoose";

export interface EventDoc extends Document {
  name: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  images: string[];
  venue: {
    name: string;
    latitude: number;
    longitude: number;
    street_number: string;
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  is_free: boolean;
  ticket_info: {
    [key: string]: string | undefined;
  };
  rules: {
    age_limit: number;
    alcohol: boolean;
    dress_code: string;
    camera_allowed: boolean;
  };
  artists: {
    name: string;
    role: string;
  }[];
}

const eventSchema = new Schema({
  name: String,
  description: String,
  category: String,
  start_date: Date,
  end_date: Date,
  images: [String],
  venue: {
    name: String,
    latitude: Number,
    longitude: Number,
    street_number: String,
    street: String,
    city: String,
    state: String,
    country: String,
    timezone: String,
  },
  is_free: Boolean,
  ticket_info: {
    type: Map,
    of: String,
  },
  rules: {
    age_limit: Number,
    alcohol: Boolean,
    dress_code: String,
    camera_allowed: Boolean,
  },
  artists: [
    {
      name: String,
      role: String,
    },
  ],
});

const Event = mongoose.model<EventDoc>("Event", eventSchema);

export default Event;
