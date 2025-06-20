import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'student','club-admin'],
        default: 'student'
    },
    department: {
        type: String,
        required: function() {
            return this.role === 'student'|| this.role === 'club-admin'; 
        }
    },
    year: {
        type: Number,
        required: function() {
            return this.role === 'student'|| this.role === 'club-admin'; 
        },
    },
    avatar: {
        type: String,
        default: ''
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: function() {
            return this.role === 'club-admin'; 
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
     
});

//compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

//generate reset password token
userSchema.methods.generateResetToken = function() {
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit token
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpires = Date.now() + 10*60*1000; // Token valid for 10 minutes
    return resetToken;
};

export default mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model, including fields for name, email
