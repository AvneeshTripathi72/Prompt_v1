import mongoose, { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  title: { type: String, required: true },
  tagline: { type: String },
  promptText: { type: String, required: true },
  platform: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 10 },
  seller: { type: String, required: true }, // Username or User ID
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;
