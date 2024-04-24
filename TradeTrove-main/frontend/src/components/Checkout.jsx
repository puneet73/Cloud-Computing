import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DummyHeader from './DummyHeader';

export default function checkout() {

  const [cartItems, setCartItems] = useState([]);
  
  const history = useHistory();

  const [orderDetails, setOrderDetails] = useState({
    items: [],
    buyer: "",
    address: "",
    country: "",
    pincode: "",
    contact: "",
    upi: "",
    price: 0,
  })

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  useEffect(() => {
    setOrderDetails({ ...orderDetails, buyer: user.name });
  }, [user]);

  useEffect(() => {
    const updatedOrderDetails = {
      ...orderDetails,
      items: cartItems,
    };
    setOrderDetails(updatedOrderDetails);
  }, [cartItems])

  const handleChange = e => {
    const { name, value } = e.target
    setOrderDetails({
      ...orderDetails,
      [name]: value
    })
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    const updatedOrderDetails = {
      ...orderDetails,
      price: totalPrice.toFixed(2),
    };
    setOrderDetails(updatedOrderDetails);
    const result = await purchase(orderDetails);
    const redirectMe = (url) => {
      history.push(url)
      window.location.reload();
    }
    redirectMe('/orderHistory')
  }

  const url = "http://localhost:3004/order";

  const purchase = async (order) => {
    try {
      const { data } = await axios.post(url, {order, totalPrice});
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getCartItems = async () => {
    try {
      const { data } = await axios.post("http://localhost:3002/cart", {user})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCartItems();
      setCartItems(result)
    }
    fetchData()
  }, [user])

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 70;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <DummyHeader></DummyHeader>
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 ">
        <div className="text-gray-400 bg-gray-900 body-font">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div>
              <p className="mt-1 text-xl">For the purchase of</p>
            </div>
            <div>
              <div className="flow-root">
                <ul className="-my-2 divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li className="flex items-center gap-4 py-10">

                      <img
                        src={item.image}
                        alt=""
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div>
                        <h3 className="text-3xl text-slate-50">{item.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <br></br>
                            <dt className="inline text-base text-sky-400">₹{item.price}</dt>
                            <dd className="inline text-base text-slate-50"> x </dd>
                            <dd className="inline text-base text-rose-500">{item.qty}</dd>
                            <dd className="inline text-base text-slate-50"> = </dd>
                            <dd className="inline text-base text-green-300">₹{item.qty * item.price.toFixed(2)}</dd>
                          </div>
                          <div>
                            <br></br>
                            <dt className="inline text-base text-slate-50">Seller: </dt>
                            <dd className="inline text-base text-pink-400">{item.uploader}</dd>
                          </div>
                        </dl>
                      </div>

                    </li>
                  ))}
                </ul>

              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-slate-50">Subtotal</p>
                  <p className="font-semibold text-slate-50">₹{itemsPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-slate-50">Tax</p>
                  <p className="font-semibold text-slate-50">₹{taxPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-slate-50">Shipping Price</p>
                  <p className="font-semibold text-slate-50">₹{shippingPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-2xl font-medium text-rose-500">Total</p>
                <p className="text-2xl font-semibold text-green-300">₹{totalPrice.toFixed(2)}</p>
              </div>
              <br></br>
            </div>
          </div>

        </div>

        <div className="text-gray-400 bg-gray-900 body-font border-l border-white">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form>
              <div className="col-span-3">
                <label htmlFor="FirstName" className="block text-base text-slate-50">Your Addresses </label>
                <input type="text" id="FirstName" placeholder="Full Address" className="w-full rounded-md shadow-sm sm:text-sm" name="address" value={orderDetails.address} onChange={handleChange} />
                <br></br>
                <div>
                  <label htmlFor="Country" className="sr-only">Country</label>
                  <select id="Country" className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm" name="country" value={orderDetails.country} onChange={handleChange}>
                    <option>Select</option>
                    <option>India</option>
                    <option>Wales</option>
                    <option>Scotland</option>
                    <option>France</option>
                    <option>Belgium</option>
                    <option>Japan</option>
                  </select>
                </div>
                <br></br>
                <div>
                  <label className="sr-only" htmlFor="PostalCode"> ZIP/Post Code </label>

                  <input
                    type="text"
                    id="PostalCode"
                    placeholder="ZIP/Post Code"
                    className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                    name="pincode"
                    value={orderDetails.pincode} onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-base text-slate-50">Contact Number</label>
                <input id="Email" placeholder="Phone Number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" name="contact" value={orderDetails.contact} onChange={handleChange} />
              </div>
              <fieldset className="col-span-6">
                <label className="block text-base text-slate-50">UPI ID</label>
                <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm" >
                  <div>
                    <input type="text" id="CardNumber" placeholder="UPI ID" className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm" name="upi" value={orderDetails.upi} onChange={handleChange} />
                  </div>
                </div>
              </fieldset>

              <br></br>

              <div className="col-span-6">
                <button onClick={placeOrder} className="block w-full rounded-md bg-rose-600 p-2.5 text-base text-white transition duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400">
                  Pay ₹{totalPrice.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}