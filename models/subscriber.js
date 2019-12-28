import mongoose from 'mongoose';
mongoose.set('debug', true);

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collection: "subscribers" })

const Subscriber = mongoose.model('subscriber', subscriberSchema);

export default Subscriber;