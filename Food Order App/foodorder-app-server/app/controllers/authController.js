const Users = require ("../models/userModel");

exports.login = async (req, res) => {

    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("username and password are required");
    }
    else {
        try {
            
            const user = await Users.findOne ({userName: username});
            if (!user) {
                res.status(400);
                throw new Error(`Invalid user with username = ${username}|${req.body.username}| ${user}`);
            }
            else if (user.password != password) {
                res.status(400);
                throw new Error(`Invalid password for username = ${username}`);
            }
            else {
                res.status (200).json ({
                    message: "User loggin in successfully",
                    data: {
                        username: username,
                        password: password,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
            }
        }
        catch (error) {
            throw new Error (`Error while login user ${error}`);
        }
    }
}

