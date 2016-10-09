import mongoose, { Schema } from 'mongoose';

const DonationSchema = new Schema({
  donor: {type: Schema.ObjectId, ref: 'User' },
  amount: {type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;
