module.exports = app => {
    const router = require("express").Router();
    const addressBook = require("../controllers/addressBook.controller.js");

    router.post("/addUserAddress", addressBook.createUserAddress);

    // router.post("/registration", userInfo.addUser);

    // router.post("/authentication", userInfo.authUser);

    // router.post("/initialization", inventory.initializeQuantity);

    // router.get("/amount", inventory.findQuantity);

    // router.post("/changeAmount", inventory.updateQuantity);

    // router.get("/goods", inventory.findAllGoods);

    app.use("/api/address-book", router);
};
