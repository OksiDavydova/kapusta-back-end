const { model, Schema } = require("mongoose");

const balanceSchema = Schema(
  {
    balance: {
      type: String,
      required: [true, "Set name for contact"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

module.exports = model("balance", balanceSchema);
