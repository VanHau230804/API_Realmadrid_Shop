const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true }
});
