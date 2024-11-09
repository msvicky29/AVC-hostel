const mongoose=require('mongoose')

const adminSchema=mongoose.Schema({
   email: {type: String, required: true},
    password: {type: String, required: true},
    resetPasswordToken: {
        type: String,
        default: ''  // Set default as empty string
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
})

module.exports=mongoose.model('admin-db',adminSchema)