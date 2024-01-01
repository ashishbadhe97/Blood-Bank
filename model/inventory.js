const { mongoose, Schema } = require("mongoose");

const inventorySchema = new Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory-type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: String,
      required: [true, "blood quantity is required"],
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "organisation is required"],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
