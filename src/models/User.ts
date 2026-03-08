import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  avatar: { type: String },
  bio: { type: String },
  coins: { type: Number, default: 1000 },
  clerkId: { type: String, unique: true }, // For auth if using Clerk, or just a generic ID
  purchasedPrompts: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }],
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);
export default User;
