import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import path from 'path'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



/* User Registration */
router.post("/signup", upload.single("photo"), async (req, res) => {
    try {
        /* Salting and Hashing the Password */
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        if (req.file) {
            /* Create a new user */
            const newuser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                photo: req.file.filename
            });

            /* Save User and Return */
            const user = await newuser.save()
            res.status(200).json(user)
        }
        else {
            /* Create a new user */
            const newuser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            });

            /* Save User and Return */
            const user = await newuser.save()
            res.status(200).json(user)
        }
    }
    catch (err) {
        console.log(err)
    }
})

/* User Login */
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(404).json("User not found");

        const validPass = await bcrypt.compare(req.body.password, user.password)
        !validPass && res.status(400).json("Wrong Password")

        res.status(200).json(user)

    } catch (err) {
        console.log(err)
    }
})

export default router