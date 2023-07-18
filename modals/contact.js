const mongoose = require("mongoose")
const ContactSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    email_body : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
})
const ContactModel = mongoose.model("Contact", ContactSchema)
module.exports = ContactModel