import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const NewSchema = new Schema(
  {
    name: {
      type: String
    },
    images: [
      {
        url: {
          type: String
        }
      }
    ],
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);
const New = mongoose.model('New', NewSchema);
export default New;
