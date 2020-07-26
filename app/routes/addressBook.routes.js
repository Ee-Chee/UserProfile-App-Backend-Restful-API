module.exports = app => {
    const router = require("express").Router();
    const addressBook = require("../controllers/addressBook.controller.js");

    router.post("/registration", addressBook.createUserAddress);

    router.get("/user-addresses", addressBook.findAllUserAddresses);

    app.use("/api/address-book", router);
};
