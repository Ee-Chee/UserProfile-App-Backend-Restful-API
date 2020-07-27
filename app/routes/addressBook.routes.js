module.exports = app => {
    const router = require("express").Router();
    const addressBook = require("../controllers/addressBook.controller.js");

    router.post("/registration", addressBook.createUserAddress);

    router.get("/user-addresses", addressBook.findAllUserAddresses);

    router.get("/:id", addressBook.findUserAddress);

    router.post("/update-details", addressBook.updateUserAddress);

    app.use("/api/address-book", router);
};
