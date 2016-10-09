import mongoose, { Schema } from 'mongoose';
// import User from './User';

const CampaignSchema = new Schema({
    title: { type: String, required: true },
    purpose: { type: String, required: true },
    date: { type: Date, default: Date.now },
    place: {
        address: { type: String, default: '' },
        city: { type: String, default: '' },
        pin: { type: Number },
        state: { type: String, default: '' },
    },
    patients: [{ type: Schema.ObjectId, ref: 'User' }],
    doctors: [{ type: Schema.ObjectId, ref: 'User' }]
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

export default Campaign;
