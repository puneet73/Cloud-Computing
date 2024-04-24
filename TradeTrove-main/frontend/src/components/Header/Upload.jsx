import './BasketStyle.css'
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Upload(props) {

  const {setItems } = props;

  const [item, setItem] = useState({
    title: '', 
    image: '', 
    description: '',
    price: 0,
    uploader: ""
  });

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  useEffect(() => {
    setItem({ ...item, uploader: user.name });
  }, [user]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);
    setItems(items => [...items, result]);
  }

  const url = "http://localhost:9004/items";

  const createItem = async (item) => {
    try {
      console.log(item)
      const { data } = await axios.post("http://localhost:3003/items", item);
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="blockCart col-1">
      <form action="" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Name of Product"
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
          onChange={e => setItem({ ...item, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price of Product"
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
          onChange={e => setItem({ ...item, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
          onChange={e => setItem({ ...item, description: e.target.value })}
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItem({ ...item, image: base64 })}
          className="text-white font-bold"
        />
        <img
          src={item.image}
          alt=""
          className="h-20 w-20 rounded object-cover"
        />
        <input
          type="text"
          placeholder={"Uploaded by: "+user.name}
          readOnly
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
        />



        <div className="right-align mt-4">
          <div className="buttonRow">
            <button className="checkoutButton px-6 py-3 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-600">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>


  );
}

export default Upload;
