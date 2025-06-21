import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()


export function createUser(req,res){

    const newUserData = req.body;

    if (newUserData.type === "Admin") {
        if (req.user === null || req.user === undefined) {
            return res.json({
                message: "Please login as Administrator to create Admin accounts"
            });
        }

        if (req.user.type !== "Admin") {
            return res.json({
                message: "Please login as Administrator to create Admin accounts"
            });
        }
    }


    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);
    user.save().then (() => {
        res.json(
            {message: "User has been Created"}
        );
    })
    .catch((error) => {
        res.json(
            {message: "Error Creating User",
                error: error.message
            }
        );
    });
    
}

export function loginUser(req,res) {

    User.find({username: req.body.username}).then(
        (users) => {
            if(users.length == 0) {
                res.json(
                    {message: "User not Found"}
                )
            } else {
                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        email: user.email,
                        username: user.username,
                        isBlocked: user.isBlocked,
                        type: user.type
                    }, process.env.SECRET)
                    
                    res.json({
                        message: "Login Successful",
                        Token : token
                    })

                } else {
                    res.json(
                        {message: "Incorrect Password"}
                    )
                }
            }
        }
    )
}

export function getUser(req, res) {
    User.find()
        .then((users) => {
            res.json({
                message: "users Found",
                users: users
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

export function deleteUser(req,res) {
    const username = req.params.username;
    User.deleteOne({username: username})
    .then(() => {
        res.json(
            {message: "User deleted Successfully"}
        )
    })
    .catch((error) => {
        res.status(500).json(
            {message: "Error Deleting User",
                error: error.message
            }
        );
    });
}

export function updateUser(req,res) {
    const username = req.params.username;
    User.updateOne({username: username}, req.body)
    .then(() => {
        res.json(
            {message: "User Updated Successfully"}
        )
    })
    .catch((error) => {
        res.status(500).json(
            {
                message: "Error Updating User",
                error: error.message
            }
        );
    });
}