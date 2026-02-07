// const module=require('mongoose')
const schema = require('../modules/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const finduser = await schema.findOne({ $or: [{ username }, { email }] })
        console.log(finduser)
        if (finduser) {
            return res.status(505).json({ message: 'user already exist' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newuser = await schema.create({ username, email, password: hashedPassword })
        res.status(200).json({ message: 'user is created' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured', error: error.message })
    }
}



exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await schema.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "Password does not match" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_TOKEN,
            { expiresIn: "1h" }
        );
        console.log(token)

        res.status(200).json({ data: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.Logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'user logout successfully' })
    } catch (error) {
        res.status(500).json({ message: 'some error is occured' })
    }
}