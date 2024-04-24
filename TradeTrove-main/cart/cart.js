import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Correct usage
app.use(cors())

const cartItemSchema = new mongoose.Schema({
    _id: { type: String },
    owner: String,
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, default: 1 },
    uploader: { type: String },
});
const CartItem = mongoose.model('CartItem', cartItemSchema);

app.post('/addtocart', async (req, res) => {
    const { product, user } = req.body;
    try {
        console.log(product._id);
        const exist = await CartItem.findOne({ _id: product._id });
        if (exist) {
            exist.qty += 1;
            await exist.save();
        } else {
            const newCartItem = new CartItem({ ...product });
            if (!newCartItem._id.endsWith("_" + user.name)){
                newCartItem._id = newCartItem._id.replace(/_[^_]*$/, "") + "_" + user.name;
            }
            newCartItem.owner = user.name;
            await newCartItem.save();
        }
        res.sendStatus(200);
    } catch (err) {
        console.error('Error handling cart request', err);
        res.sendStatus(500);
    }
});

app.post('/removefromcart', async (req, res) => {
    const { product, user } = req.body;
    try {
        const exist = await CartItem.findOne({  _id: product._id });
        if (exist.qty === 1) {
            await exist.remove();
        }
        else {
            exist.qty -= 1;
            await exist.save();
        }
        res.sendStatus(200);
    } catch (err) {
        console.error('Error handling cart request', err);
        res.sendStatus(500);
    }
});

app.post("/cart", async (req, res) => {
    const { user } = req.body;
    let cartitem;

    const getUser = new Promise((resolve, reject) => {
        if (user) {
            resolve(user);
        } else {
            reject('User not found');
        }
    });

    try {
        const fetchedUser = await getUser;
        console.log(fetchedUser.name);
        cartitem = await CartItem.find({ owner: user.name });
        res.status(200).json(cartitem);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Error finding cart items.' });
    }
});

const mongodb = 'mongodb+srv://puneetsheokand123:VS0Nh973EgzIDf9I@cluster0.wec3xhs.mongodb.net/mydatabase?retryWrites=true&w=majority';
const PORT = 3002;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, console.log(`Server running on ${PORT}`))).catch(err => console.log(err));