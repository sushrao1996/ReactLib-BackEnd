const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: {
      type: String
    },
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .get(function() {
    return this._password;
  })
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  });

userSchema.methods = {
  authenticate: function(plaintextpassword) {
    return this.securePassword(plaintextpassword) === this.encry_password;
  },
  securePassword: function(plaintextpassword) {
    if (!plaintextpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plaintextpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
