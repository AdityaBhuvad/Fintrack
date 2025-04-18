const UserModel = require("../model/user.model")


module.exports.createService = async ({ username, password, email }) => {
    if (!username|| !password || !email) {
        throw new Error("All fields are required");
    } else {
        const user_doc = await UserModel.create({
            username,
            password,
            email
        })
        return user_doc;
    }
}