import React from "react";

export default function ProductPopup(props) {
  const { product, onClose } = props;

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("product-popup")) {
      onClose();
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div
        className="flex items-center justify-center min-h-screen product-popup"
        onClick={handleOutsideClick}
      >
        <div className="relative bg-gray-800 text-white w-4/5 lg:w-3/4 xl:w-2/5 rounded-lg shadow-lg">
          <button
            className="absolute top-0 right-0 m-4 text-gray-300 hover:text-gray-100 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.828 6.828a2 2 0 0 1 2.828 0L12 9.172l2.172-2.344a2 2 0 0 1 2.828 2.828L14.828 12l2.344 2.172a2 2 0 0 1-2.828 2.828L12 14.828l-2.172 2.344a2 2 0 0 1-2.828-2.828L9.172 12 6.828 9.828a2 2 0 0 1 0-2.828z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="p-4">
            <div className="text-amber-300 text-center	text-xl"> Product Description </div>
            <br></br>
            <img className="mx-auto w-2/3 md:w-1/4 mb-4" src={product.image} alt={product.title} />
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-300 text-base mb-4">{product.description}</p>
            <p className="text-gray-300 text-base">Price: ₹{product.price}</p>
            <br></br>
            <p className="text-gray-300 text-base">Sold By: {product.uploader}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
