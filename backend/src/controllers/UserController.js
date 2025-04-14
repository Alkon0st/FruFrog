

exports.UserController = {
    getUser: async (req, res) => {
        return res.send(req.params.id).status(200)
    },

    registerUser: async (req, res) => {
        return res.send({user_registered: req.body}).status(200)
    }
}