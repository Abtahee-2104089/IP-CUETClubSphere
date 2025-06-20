import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true
    },
    description: { 
        type: String,
        required: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'past'],
        default: 'upcoming'
    },
    registrationFromUrl: {
        type: String,
        default: null,
        trim: true,
        validate: {
            validator: function(v) {
               if (!v) return true; // Allow empty string
               try {
                   new URL(v); // Check if it's a valid URL
                   return true;
               } catch  {
                     return false;
                }
            },
            message: 'please provide a valid URL for registration form'
        }
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxParticipants: {
        type: Number,
        default: null
    },
    feedback: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment:  String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});
export default mongoose.model('Event', eventSchema);

