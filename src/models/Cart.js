import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
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

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true
    },
    items: [cartItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// // Thêm phương thức để tính tổng giá trị giỏ hàng
// cartSchema.methods.calculateTotal = function () {
//   return this.items.reduce((total, item) => total + item.price, 0);
// };

// // Middleware tự động cập nhật updatedAt khi có thay đổi
// cartItemSchema.pre('save', function (next) {
//   this.updatedAt = new Date();
//   next();
// });
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
