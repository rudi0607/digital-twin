import mongoose from 'mongoose';

const earthquakeSchema = new mongoose.Schema(
  {
    usgsId: { type: String, unique: true, required: true },
    place: { type: String, required: true },
    magnitude: { type: Number, required: true },
    time: { type: Date, required: true },
    depth: { type: Number, required: true },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    riskScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

earthquakeSchema.index({ coordinates: '2dsphere' });

export const Earthquake = mongoose.model('Earthquake', earthquakeSchema);
