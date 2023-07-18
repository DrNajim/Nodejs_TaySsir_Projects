const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
})
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel