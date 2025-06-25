import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availability: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true,
    enum: ["Lin", "Coton", "Soie", "Laine", "Autre"]
  },
  region: {
    type: String,
    enum: ["Maghreb", "Levant", "Europe du Sud", "Mixte"]
  },
  artisan: {
    type: String,
    trim: true
  },
  collection: {
    type: String,
    trim: true
  },
  sizesAvailable: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "Unique"],
    default: ["Unique"]
  },
  images: {
    type: [String], // URLs vers plusieurs images
    default: []
  },
  highlight: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Product", productSchema);
