const user = require("../model/userScema")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage })


const getUsers = async (req, res) => {
    try {
        const data = await user.find();
        if (!data) {
            res.status(404).send("No users found.");
        }
        else {
            res.status(201).send({ data: data });
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
}

// const createUser = async (req, res) => {

//     try {
//         if (req.body || req.body != null) {

//             const data = await user.create(req.body);
//             const token = await data.genauthtoken();
//             console.log(data);

//             res.status(201).send({ data, token });

//         }
//         else {
//             res.status(400).send("Invalid data.");
//         }
//     } catch (error) {
//         console.log(error);

//     }
// }
const createUser = async (req, res) => {
    if (req.body && req.body !== null) {
        try {
            // Create a new user instance using `new User()`
            const data = await user.create(req.body);

            // Save the user and generate the token
              // Ensure the user is saved to the database
            const token = await data.genauthtoken();  // Call genauthtoken on the Mongoose instance

            // Send the response with user data and token
            res.status(201).send({ data: data, token: token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Error creating user", details: error.message });
        }
    } else {
        res.status(400).send("Invalid data.");
    }
};


const updateUser = async () => {
    // Code to update user
}

const removeUser = async () => {
    // Code to update user
}

module.exports = { getUsers, createUser, updateUser, removeUser, upload }