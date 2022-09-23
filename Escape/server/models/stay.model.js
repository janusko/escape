const mongoose = require('mongoose');
const Schema = mongoose.Schema


const StaySchema = new mongoose.Schema({
    image: { 
        type: String,
        // required: [true, "Image is required"],
    },
    name: { 
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name name must be at least 3 characters long"]
    },
    price: { 
        type: Number,
        required: [true, "Price is required"],
    },
    address: { 
        type: String,
        required: [true, "Addresse is required"]
    },
    // coordinates: { 
    lat: {type: Number},
    lng: {type: Number},
    // },
    description: { 
        type: String,
        required: [true, "Description is required"]
    },
    numberOfRoom: { 
        type: Number,
        required: [true, "Number of rooms is required"]
    },
    numberOfPeople: { 
        type: Number,
        required: [true, "Number of people is required"]
    },
    type: { 
        type: String, possiblesValues: ['house', 'apartment', 'yourt', 'tent', 'cabana','island', 'castle'],
        required: [true, "Type of stay is required"]
    },
    cancelation: { 
        type: Boolean,
        default: false,
    },
    host:{
        type: Schema.Types.ObjectId,
        ref: "Host"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports.Stay = mongoose.model('Stay', StaySchema);