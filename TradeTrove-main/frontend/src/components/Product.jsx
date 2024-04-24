import { useState } from 'react';
import React from 'react';
import './Header/BasketStyle.css'

export default function Product(props) {
  const { product, onAdd, user, handleProductSelect } = props;
  return (
    <div className="lg:w-1/8 md:w-1/4 p-4 w-full border-1 border-white p-2">

      <a className="block relative h-10 rounded overflow-hidden">
        <img className="object-cover object-center w-full h-full block" src={product.image} alt={product.title} />
      </a>
      <div className="mt-4">
        <h3 className="text-white title-font text-xs font-small">{product.title}</h3>
        <p className="mt-1">₹{product.price}</p>
        <div className="flex">
          <button
            onClick={() => handleProductSelect(product)}
            className="text-white bg-cyan-500 py-0.1 px-2 hover:bg-blue-800 focus:outline-none rounded-none"
          >
            View More
          </button>

          <button
            className="addtocartButton ml-auto"
            onClick={() => {
              if (user && user._id) {
                if (!product._id.endsWith("_" + user.name)) {
                  product._id = product._id.replace(/_[^_]*$/, "") + "_" + user.name;
                }
                onAdd(product)
              } else {
                alert('Please Login!')
              }
            }}>
            <span data-title="YES!">ADD TO CART?</span>
          </button>
        </div>

      </div>
    </div>

  );
}
