const { model, Schema } = require("mongoose");
const bcryptjs = require("bcryptjs");
const { randomUUID } = require("crypto");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      // если сделать пароль обезятельным - невозножно будет зайти через гугл
      // required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "verificationToken is required"],
      default: randomUUID(),
    },
    balance: {
      type: Number,
      default: null,
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(6);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

module.exports = model("user", userSchema);
