import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const KitSchema = new Schema(
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
    price: {
      type: Number
    },
    size: [
      {
        label: {
          type: String
        }
      }
    ],
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  { timestamps: true, versionKey: false }
);
const Kit = mongoose.model('Kit', KitSchema);
export default Kit;
