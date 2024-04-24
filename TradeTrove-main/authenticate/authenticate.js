import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Correct usage
app.use(cors())

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user, success: 1 })
            } else {
                res.send({ message: "Password didn't match", success: 0 })
            }
        } else {
            res.send({ message: "User not registered", success: 0 })
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})

const mongodb = 'mongodb+srv://puneetsheokand123:VS0Nh973EgzIDf9I@cluster0.wec3xhs.mongodb.net/mydatabase?retryWrites=true&w=majority';
const PORT = 3001;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, console.log(`Server running on ${PORT}`))).catch(err => console.log(err));