import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    preferences: {
      alertThreshold: { type: Number, default: 4.5 },
      darkMode: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
