const express = require("express");
const { userAuthenticationMiddlerware } = require("../middleware/authMiddleware");
const { createInventoryController, getInventoryController, updateInventoryController } = require("../controllers/inventoryController");
const router = express.Router();

router.post("/create-inventory", userAuthenticationMiddlerware, createInventoryController);
router.get("/get-inventories", userAuthenticationMiddlerware, getInventoryController);
router.patch("/update-inventory", userAuthenticationMiddlerware, updateInventoryController);

module.exports = router