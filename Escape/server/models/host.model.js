const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const Schema = mongoose.Schema


const HostSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long"]
    },
    lastName: { 
        type: String,
        required: [true, "Last name is require"],
        minlength: [2, "Last name must be at least 2 characters long"]
    },
    email: { 
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: { 
        type: String,
        require: [true, "Password is required"],
        minlength: [7, "Password must be at least 7 characters"],
    },
    image: { 
        type: String
    },
    stay:{
        type: Schema.Types.ObjectId,
        ref: "Stay"
    }

}, { timestamps: true });


HostSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
    });
});

// middleware to add in another validations
// using prehook to have it run before validations
// feature of Middleware is the "next" function. 
// Essentially when our Middleware has finished whatever it needs to do, 
// we need to call this to have the next Middleware or next function (in this case normal validations) run.
HostSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});

// the .virtual needs to run after the validate has been confirmed
// allows to confirm password without having to store the info in our db
// Schema#virtual returns a VirtualType object
HostSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );


module.exports.Host = mongoose.model('Host', HostSchema);