const { model, SchemaTypes, Schema } = require("mongoose");
const { Categories } = require("../lib/constants");

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      length: 8,
      required: [true, "Введите дату"],
    },
    description: {
      type: String,
      required: [true, "Введите название"],
    },
    category: {
      type: String,
      enum: {
        values: Categories,
        message: "Выберите одну из категорий",
      },
    },
    value: {
      type: Number,
      min: 0,
      required: [true, "Введите сумму"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    income: {
      type: Boolean,
      default: false,
      required: true,
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
  }
);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
