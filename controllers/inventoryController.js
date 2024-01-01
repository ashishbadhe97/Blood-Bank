const Inventory = require("../model/inventory");

const createInventoryController = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).send({
      success: true,
      message: "Inventory created successfully",
      inventory,
    });
  } catch (error) {
    console.log("Error in createInventory API", error.message);
    res.status(500).send({
      success: false,
      message: "Error in createInventory API",
      error: error.message,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate("donor")
      .populate("organisation")
      .exec();

    res.status(200).send({
        success: true,
        message: "Fecthed all inventories successfully",
        inventories,
      })
  } catch (error) {
    console.log("Error in getAllInventories API", error.message);
    res.status(500).send({
      success: false,
      message: "Error in getAllInventories API",
      error: error.message,
    });
  }
};

const updateInventoryController = async (req, res) => {
  const { email, quantity } = req.body;
  try {
    const updatedInventory = await Inventory.findOneAndUpdate(email, quantity)
    await updatedInventory.save();
    res.status(200).send({
        success: true,
        message: "Updated inventory successfully",
        updatedInventory
      })
  } catch (error) {
    console.log("Error in updateInventory API", error.message);
    res.status(500).send({
      success: false,
      message: "Error in updateInventory API",
      error: error.message,
    });
  }
}

module.exports = {
  createInventoryController,
  getInventoryController,
  updateInventoryController
};
