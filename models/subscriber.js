import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);

export default SubscriberModel;