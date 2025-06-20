import { max } from 'date-fns';
import mongoose from 'mongoose';
const membershipRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    requestMessage: {
        type: String,
        trim: true,
        maxlength: 500
    },
    adminResponse: {
        type: String,
        trim: true,
        maxlength: 500
    },

    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// compound index for userId and clubId to ensure uniqueness
membershipRequestSchema.index({ userId: 1, clubId: 1 }, { unique: true });
export default mongoose.model('MembershipRequest', membershipRequestSchema);
// This schema defines a membership request model for clubs in a university system.
// It includes fields for the user ID, club ID, request status, request message, admin response, and metadata about the review process.