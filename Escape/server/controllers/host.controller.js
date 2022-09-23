const multer = require('multer');
const { Host } = require('../models/host.model');
let path = require('path');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World2"
    });
}

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

module.exports.createHost = (request, response) => {
    console.log('req body', request.body)
    console.log('req file', request.file)
    const {firstName, lastName, email, password, confirmPassword} = request.body;
    Host.create({firstName, lastName, email, password, confirmPassword, image:request.file.filename})
        .then(host => {
            const hostToken=jwt.sign({
                id: host._id
            }, process.env.SECRET_KEY, console.log("we are in the hostToken", host))
            response
                .cookie("hostToken", hostToken, {
                    httpOnly:true
                })
                .json({msg: "success", host:host})
        })
        .catch(err => {
            console.log("we are in the err");
            response.status(400).json(err)});
}

module.exports.cookie =(req, res)=>{
    res
        // httpOnly allows cookie to be view only by server
        .cookie("testkey","testvalue", {httpOnly:true})
        .json("success")
}

// logging in
module.exports.login = async(req, res)=>{
    const host = await Host.findOne({ email: req.body.email });
    if(host === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
    // making it this far means we found a user with the email address
    // comparing the password to the hashed password in the db
    const correctPassword = await bcrypt.compare(req.body.password, host.password);
    if(!correctPassword) {
        // if password was not a match
        return res.sendStatus(400);
    }
    // password is a match
    const hostToken = jwt.sign({
        id: host._id
    }, process.env.SECRET_KEY);
    // the response object allows chained calls to cookie and json
    res
        .cookie("hostToken", hostToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });  
}

module.exports.logout = (req, res) =>{
    res.clearCookie('hostToken')
    res.sendStatus(200)
}

module.exports.findAllHost = (req, res) => {
    Host.find({})
        .then(hosts=>res.cookie("test","test", {httpOnly:true}).json(hosts))
        .catch(err => res.status(400).json(err));
};

module.exports.getHost = (req, res) => {
    Host.findOne({_id:req.params.id}).populate("stay")
        .then(host => res.json(host))
        .catch(err => res.status(400).json(err));
}

module.exports.updateHost = (req, res) => {
    Host.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedHost => res.json(updatedHost))
        .catch(err => res.status(400).json(err))
}

module.exports.deleteHost = (req, res) => {
    Host.deleteOne({_id: req.params.id})
        .then(deleteHost => res.json(deleteHost))
        .catch(err => res.status(400).json(err))
}

// get all stays of a host
module.exports.getAllStays = (req, res) => {
    Host.findOne({_id: req.params.hostId}).populate('stay')
        .then(foundHost=>res.json(foundHost))
        .catch(err=>res.status(400).json(err))
}

module.exports.getHostDecoded = (req, res) =>{
    const decodedJwt = jwt.decode(req.cookies.hostToken, {complete: true})
    Host.findOne({_id: decodedJwt.payload.id})
        .then(oneHost=>res.json(oneHost))
        .catch(err=>res.status(500).json(err))
}