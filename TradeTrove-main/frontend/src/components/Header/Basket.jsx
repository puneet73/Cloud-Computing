import React from 'react';
import './BasketStyle.css'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Basket(props) {

  const { onAdd, onRemove, reRender, user } = props;

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCartItems = async () => {
    try {
      const { data } = await axios.post("http://localhost:5001/cart", { user });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user !== null) {
        setIsLoading(true);
        const result = await getCartItems();
        setCartItems(result);
        setIsLoading(false);
      }
    }
    fetchData()
  }, [reRender])

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const history = useHistory();

  const redirectMe = (url) => {
    history.push(url)
    window.location.reload();
  }

  return (

    <aside className="blockCart col-1">
      <h2 className="h2">Cart Items</h2>
      <br></br>

      <div>
        {isLoading ? <p>Loading cart...</p> :

          cartItems.map((item) => (
            <div key={item._id} className="row">
              <div className="col-2 inline text-base text-violet-500">{item.title}</div>
              <div className="col-2 text-base text-sky-400">
                <button onClick={() => onRemove(item)} className="remove">
                  -
                </button>{' '}
                <button onClick={() => onAdd(item)} className="add">
                  +
                </button>
              </div>
              <div className="col-2 inline text-base text-rose-300" >{item.qty}</div>
              <div className="col-2 text-right inline text-base text-green-300">
                ₹{item.qty * item.price.toFixed(2)}
              </div>
            </div>
          ))

        }

        <br></br>

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <br></br>
            <div className="row">
              <div className="col-2 inline text-base text-red-500">Items Price</div>
              <div className="col-1 text-right inline text-base text-red-500">₹{itemsPrice.toFixed(2)}</div>
            </div>
            <br></br>
            <hr />
            <div className="buttonRow">
              <button onClick={() => redirectMe('/checkout')} className="bg-blue-500 hover:bg-rose-500 text-base text-white py-2 px-4 rounded">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
