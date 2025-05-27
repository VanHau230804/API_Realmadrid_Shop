import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: [
      {
        type: String,
        required: true,
        trim: true,
        enum: ['customer', 'editor', 'admin'],
        default: 'customer'
      }
    ],
    isVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date
  },
  { timestamps: true, versionKey: false }
);
// Create a compound index on email and username
accountSchema.index({ email: 1 }, { unique: true });
const Account = mongoose.model('Account', accountSchema);
export default Account;
