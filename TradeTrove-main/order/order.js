import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Correct usage
app.use(cors())

const orderSchema = mongoose.Schema({
    items: Array,
    buyer: String,
    address: String,
    country: String,
    pincode: String,
    contact: String,
    upi: String,
    price: Number,
}, { timestamps: true })
const Order = mongoose.model('Order', orderSchema);

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

app.post('/order', async (req, res) => {
    const {order, totalPrice} = req.body;
    const orderdetails = new Order(order);
    try {
        orderdetails.price = totalPrice;
        await orderdetails.save();
        const deletedItems = await CartItem.deleteMany({ owner: orderdetails.buyer });
        console.log(`Deleted ${deletedItems.deletedCount} items from the cart of user ${orderdetails.buyer}`);
        res.status(201).json(orderdetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/orderhistory', async (req, res) => {
    const { user } = req.body;
    let orders;
    try {
        console.log(user.name)
        orders = await Order.find({ buyer: user.name });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
})

const mongodb = 'mongodb+srv://puneetsheokand123:VS0Nh973EgzIDf9I@cluster0.wec3xhs.mongodb.net/mydatabase?retryWrites=true&w=majority';
const PORT = 3004;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, console.log(`Server running on ${PORT}`))).catch(err => console.log(err));