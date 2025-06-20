import mongoose from 'mongoose';
const clubSchema = new mongoose.Schema({
    name: {   
        type: String,
        required: true,
        trim: true 
    },
    
    description: { 
        type: String,
        required: true
     },
    
    logo: { 
        type: String,
        default: '' 
    },
    
    coverImage: {
        type: String,
        default: ''
    },

    category: {
        type: String,
        required: true,
        enum: ['Sports', 'Arts & Culture', 'Technology', 'Science', 'Literature', 'Music','Academic','Social','Professional','Other']
    },
    foundedYear: {
        type: Number,
        default: new Date().getFullYear(),
    },

    members: {
        type: Number,
        default: 1
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    socialLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        website: String
    },

    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    announcements: [{
        title: String,
        content: String,
        date: {
            type: Date,
            default: Date.now
        },
        important: {
            type: Boolean,
            default: false
        }
    }],

    isApproved: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('Club', clubSchema);
    

