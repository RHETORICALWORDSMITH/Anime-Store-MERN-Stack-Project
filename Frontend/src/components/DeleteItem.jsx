import React, { useState } from "react";
import toast from "react-hot-toast"

const DeleteItem = () => {
  const [productId, setProductId] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [deleteButtonVis, setDeleteButtonVis] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getProductDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();
      setProductDetails(data);
      setDeleteButtonVis(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId, confirm: confirmText }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProductDetails(null);
      toast.success("Item Deleted!")
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 dark:bg-gray-800 p-4">
      <form className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md space-y-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Delete Item
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product ID
          </label>
          <input
            type="number"
            name="id"
            placeholder="Enter product ID"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="w-full bg-red-600 text-white py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105 duration-200"
            onClick={getProductDetails}
          >
            Get Product Details
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-600 dark:text-red-400 text-center mt-4">
            {errorMessage}
          </div>
        )}

        {productDetails && (
          <div className="flex justify-center items-center gap-8">
            <div className="mt-4 text-gray-900 dark:text-white">
              <h3 className="text-xl font-semibold">Product Details:</h3>
              <p>
                <strong>ID:</strong> {productDetails.id}
              </p>
              <p>
                <strong>Name:</strong> {productDetails.name}
              </p>
              <p>
                <strong>Price:</strong> ${productDetails.price}
              </p>
            </div>
            <img
              src={productDetails.image}
              alt="Product"
              className="w-32 h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
            />
          </div>
        )}

        {deleteButtonVis && (
          <>
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Deletion
              </label>
              <input
                type="text"
                name="confirm"
                placeholder="Enter 'CONFIRM'"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105 duration-200 mt-4"
              onClick={deleteProduct}
              disabled={confirmText !== "CONFIRM"}
            >
              Delete Product
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default DeleteItem;
