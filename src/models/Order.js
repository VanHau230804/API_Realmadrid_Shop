import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true
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
  },
  quantity: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Number
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    items: [orderItemSchema],
    shippingInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      }
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'shipping',
        'delivered',
        'cancelled',
        'returned'
      ],
      default: 'pending'
    },
    cancelledReason: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
