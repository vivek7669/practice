// require("dotenv").config();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const userScema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         // unique: true,
//         lowercase: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 8,
//         maxlength: 100
//     },
//     email: {
//         type: String,
//         lowercase: true,
//         trim: true,
//         validate: {
//             validator: (email) => {
//                 const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//                 return regex.test(email);
//             },
//             message: 'Invalid email format'
//         }
//     },
//     image : {
//         type: String,
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'user' , 'superadmin'],
//         default: 'user'
//     },
//     otp :{
//         type : Number
//     },
//     tokens : [
//         {
//             token : String
//         }
//     ]
// })

// const user = mongoose.model("user",userScema);

// userScema.methods.genauthtoken = async function() {
//     const token = await jwt.sign({ id: this._id.toString() }, process.env.JWTKEY, { expiresIn: '1d' });

//     this.tokens = this.tokens.concat({ token });

//     await this.save();

//     return token;
// }
// module.exports = user;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
        },
    }],
});

// Instance method to generate auth token
userSchema.methods.genauthtoken = async function () {
    const token = await jwt.sign({ id: this._id.toString() }, process.env.JWTKEY, { expiresIn: '1d' });

    // Add the generated token to the user's tokens array
    this.tokens = this.tokens.concat({ token });

    // Save the updated user document
    await this.save();

    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
