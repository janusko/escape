const HostController = require("../controllers/host.controller")
const StayController = require("../controllers/stay.controller")
const UserController = require("../controllers/user.controller")
const {authenticate} = require("../configs/jwt.config")
const {authenticateHost} = require("../configs/jwt.config")

module.exports = (app)=>{
    // authenticateHost
    app.get("/api/airbnb/host", authenticateHost, HostController.findAllHost)
    app.get("/api/airbnb/host/cookie", HostController.cookie)
    app.post("/api/airbnb/host/login", HostController.login)
    app.get("/api/airbnb/host/logout", HostController.logout)
    app.post("/api/airbnb/host", HostController.upload.single('image'), HostController.createHost)
    app.get(`/api/getHost`, HostController.getHostDecoded)
    app.get("/api/airbnb/host/:id", HostController.getHost)
    app.put("/api/airbnb/host/:id", HostController.updateHost)
    app.delete("/api/airbnb/host/:id", HostController.deleteHost)

    // all routes for stay
    app.get("/api/airbnb/:hostId/stay", HostController.getAllStays)
    app.get("/api/stay/:hostId", StayController.staysForOneHost)
    app.post("/api/stay/:hostId", StayController.upload.single('image'), StayController.addStay)
    app.get("/api/stay/one/:stayId", StayController.getStay)
    app.post("/api/stay/:hostId", StayController.upload.single('image'), StayController.addStay)
    app.put("/api/stay/edit/:stayId", StayController.updateStay)
    app.get("/api/stay", StayController.allStays)
    app.delete("/api/stay/:id", StayController.deleteStay)
    // app.delete("/api/stay/", StayController.deleteManyStay)

    // all routes for user authenticate,
    app.get("/api/airbnb/user", authenticate, UserController.findAllUser)
    app.get("/api/airbnb/user/cookie", UserController.cookie)
    app.post("/api/airbnb/user/login", UserController.login)
    app.get("/api/airbnb/user/logout", UserController.logout)
    app.post("/api/airbnb/user", UserController.upload.single('image'), UserController.createUser)
    app.get("/api/airbnb/user/:id", UserController.getUser)
    app.put("/api/airbnb/user/:id", UserController.updateUser)
    app.delete("/api/airbnb/user/:id", UserController.deleteUser)
}