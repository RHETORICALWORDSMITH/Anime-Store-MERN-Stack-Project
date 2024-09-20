import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibility } from "../redux/counter/buyComVisSlice";
import {
  decrement,
  increment,
  buyUpdate,
} from "../redux/counter/purchaseSlice.js";
import { addToCart } from "../redux/counter/cartSlice.js";
import toast from "react-hot-toast";

const Buy = () => {
  // Retrieve visibility state of the Buy component and the selected item from Redux store
  const detailVis = useSelector((state) => state.detailVis.value);
  const item = useSelector((state) => state.detailVis.item);
  const dispatch = useDispatch();

  // Retrieve the quantity of the item currently selected from Redux store
  const noItem = useSelector(
    (state) => state.boughtItem.selectedItems[item.id]?.value || 0
  );

  // State to manage the selected size of the item
  const [selectedSize, setSelectedSize] = useState("");

  // Handler to set the selected size when a size button is clicked
  const handleSizeClick = (sizeLabel) => {
    setSelectedSize(sizeLabel);
  };

  // Handler to add the item to the cart
  const handleAddToCart = () => {
    dispatch(addToCart({ item, noItem, itemSize: selectedSize }));
    dispatch(buyUpdate({ id: item.id, itemSize: selectedSize }));
    toast.success("Item added to cart!");
    dispatch(changeVisibility({ item }));
  };

  // Handler to change the visibility of the Buy component
  const handleVisibility = () => {
    dispatch(changeVisibility({ item }));
  };

  return (
    <>
      {/* Conditionally render the Buy component if detailVis is true */}
      {detailVis && (
        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center z-50">
          <div className="flex flex-col w-full max-w-4xl bg-white dark:bg-gray-800 mx-4 md:mx-6 lg:mx-0">
            {/* Close button to hide the Buy component */}
            <div className="flex justify-end px-4 pt-1 text-xl font-semibold">
              <button onClick={() => handleVisibility()} className="z-50">
                X
              </button>
            </div>

            <div className="p-4 md:p-6 rounded-lg shadow-lg flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Image of the item */}
              <div className="w-full lg:w-1/2 flex items-center justify-center mb-4 lg:mb-0">
                <img
                  src={item.image}
                  alt="Main Image"
                  className="max-h-64 md:max-h-80 lg:max-h-96 object-cover"
                />
              </div>

              <div className="w-full lg:w-1/4 flex flex-col space-y-3 md:space-y-4">
                {/* In-stock indicator */}
                <span className="bg-yellow-500 text-white px-2 py-1 rounded uppercase text-xs md:text-sm">
                  In-Stock
                </span>

                {/* Item name */}
                <h1 className="text-xl md:text-2xl font-bold dark:text-white">
                  {item.name}
                </h1>

                {/* Item category */}
                <p className="text-teal-500 text-xs md:text-sm">
                  Category:{" "}
                  {item.category === "Clothes" ? item.clothType : item.category}
                </p>

                {/* Item price */}
                <p className="text-2xl md:text-3xl font-semibold dark:text-gray-300">
                  {item.price}$
                </p>

                {/* Size selection buttons */}
                {(item.category == "Clothes" || item.category == "Shoes") &&
                  Object.keys(item.stock)
                    .filter(
                      (key) =>
                        item.stock[key] > 0 &&
                        ["smallSize", "mediumSize", "largeSize"].includes(key)
                    ) // Filter available sizes
                    .map((key) => {
                      const sizeLabel =
                        key === "smallSize"
                          ? "S"
                          : key === "mediumSize"
                          ? "M"
                          : key === "largeSize"
                          ? "L"
                          : ""; // Map keys to labels

                      return (
                        <button
                          key={key}
                          className={`border dark:border-gray-600 rounded px-2 py-1 md:px-4 md:py-2 dark:text-gray-300 ${
                            selectedSize === sizeLabel
                              ? "bg-black text-white dark:text-gray-950 dark:bg-white"
                              : ""
                          }`}
                          onClick={() => handleSizeClick(sizeLabel)}
                        >
                          {sizeLabel}
                        </button>
                      );
                    })}

                {/* Quantity controls and Add to Cart button */}
                <div>
                  <p className="mb-1 md:mb-2 dark:text-gray-300">Quantity:</p>
                  <div className="flex gap-3 md:gap-5">
                    {/* Decrement quantity button */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 md:w-8"
                      viewBox="0 -960 960 960"
                      fill="#EAC452"
                      onClick={() => dispatch(decrement({ id: item.id }))}
                    >
                      <path d="M200-446.67v-66.66h560v66.66H200Z" />
                    </svg>

                    {/* Display current quantity */}
                    <span className="text-xl md:text-2xl dark:text-white text-black">
                      {noItem}
                    </span>

                    {/* Increment quantity button */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 md:w-8"
                      viewBox="0 -960 960 960"
                      fill="#EAC452"
                      onClick={() => dispatch(increment({ id: item.id }))}
                    >
                      <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
                    </svg>
                  </div>
                </div>

                {/* Add to Cart button */}
                <button
                  className="bg-yellow-500 cursor-pointer text-white text-lg font-bold py-2 md:py-3 rounded-lg w-full"
                  onClick={() => handleAddToCart()}
                  disabled={
                    noItem === 0 ||
                    (["Clothes", "Shoes"].includes(item.category) &&
                      selectedSize === "")
                  }
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
