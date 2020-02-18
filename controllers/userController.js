const model = require('../models/userSchema');

// check if user exists in our system by google id_token, if yes send in the data the authorization (admin or client) of the user
async function checkUser(req, res) {
    try {
        const data = await model.findUser(req.body.id_token);
        console.log("data findOne",data);
        if (data.length == 0) {
            res.status(200).json({
                status: 200,
                message: "No user was found for this id_token",
                action: "Read",
                data: null
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                action: "Read",
                data: data[0].authorization
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
            action: "Read",
            data: null
        })
    }

}
// create new client user
async function createClientUser(req, res) {
    try {
        const data = await model.createNewClientUser(req.body);
        res.status(200).json({
            status:200,
            message: "success",
            action: "Create",
            data: data
        })

    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Create",
            data: null
        })
    }
}

module.exports = {
    checkUser,
    createClientUser
};