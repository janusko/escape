const { Stay} = require("../models/stay.model")
const { Host } = require("../models/host.model")
const { User } = require("../models/user.model")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports.upload = multer({ storage, fileFilter });

module.exports.allStays = (req, res) => {
    Stay.find()
        .then(stays=>res.json(stays))
        .catch(err=>res.status(400).json(err))
}

// get all stay of a host
module.exports.staysForOneHost = (req, res) => {
    Stay.find({host: req.params.hostId})
        .then(stays=>res.json(stays))
        .catch(err=>res.status(400).json(err))
}
//get one stay
module.exports.getStay = (req, res) => {
    Stay.findOne({_id:req.params.stayId})
        .then(stay => {
            console.log("back end", stay)
            res.json(stay)
        })
        .catch(err => res.status(400).json(err));
}

// get all stay of a user
module.exports.staysForOneUser = (req, res) => {
    Stay.find({user: req.params.userId})
        .then(stays=>res.json(stays))
        .catch(err=>res.status(400).json(err))
}

// module.exports.addStay = async(req, res) => {
//     try{
//         // add comment into Comment
//         const newStay = new Stay(req.body)
//         newStay.host = req.params.hostId
//         await newStay.save({image:request.file.filename})
    
//         // pushing the newly added comment into Job
//         const updatedStay = await Host.findOneAndUpdate(
//             {_id:req.params.hostId},
//             {$push : {stay : newStay}},
//             {new: true}
//             )
//         res.json(updatedStay)
//     }catch(err){
//         res.status(400).json(err)
//     }
// }

module.exports.addStay = async(req, res) => {
    try{
        console.log("before")
        console.log(req.file.filename)

        const newStay = new Stay({...req.body, image:req.file.filename})
        console.log("re params host id", req.body.hostId)

        const newestStay = await newStay.save()
        console.log("newwest", newestStay)

        const updatedHost = await Host.findOneAndUpdate(
            {_id:req.body.hostId},
            {$push : {liked_stay : newestStay}},
            {new: true}
            )
        res.json(updatedHost)
    }catch(err){
        console.log("err", err)
        res.status(400).json(err)
    }
}

module.exports.deleteStay = (req, res) => {
    Stay.deleteOne({_id: req.params.id})
        .then(deleteStay => res.json(deleteStay))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteManyStay = (req, res) => {
    Stay.deleteMany({ type: 'yourt' })
        .then(deleteStay => res.json(deleteStay))
        .catch(err => res.status(400).json(err))
}

module.exports.updateStay = (req, res) => {
    Stay.findOneAndUpdate({_id: req.params.stayId}, req.body, {new:true, runValidators:true})
        .then(updatedStay => res.json(updatedStay))
        .catch(err => res.status(400).json(err))
}