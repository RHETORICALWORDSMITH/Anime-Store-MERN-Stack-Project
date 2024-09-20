import React, { useState } from "react";
import toast from "react-hot-toast"

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("Comics");
  const [Type, setType] = useState("Comics");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProductTypes = ["Comics", "Clothes", "Action Figures", "Shoes"];

  const handleTypeChange = (type, checked) => {
    if (checked) {
      setCategory(type);
      setType(type);
    }
    console.log("works " + type);
  };

  const displayMessage = () => {
    toast.success("Item has been added!");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 dark:bg-gray-800 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-full md:max-w-2xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-4 text-center mt-10">
          Product Categories
        </h1>
        <div className="flex justify-center items-center gap-2 flex-wrap mb-4">
          {ProductTypes.map((type) => (
            <div key={type} className="form-control">
              <label className="cursor-pointer flex items-center gap-1">
                <span className="label-text text-black dark:text-white">
                  {type}
                </span>
                <input
                  type="checkbox"
                  checked={category === type}
                  className="checkbox checkbox-warning w-5"
                  onChange={(e) => handleTypeChange(type, e.target.checked)}
                />
              </label>
            </div>
          ))}
        </div>
        <form
          action="http://localhost:3000/upload"
          encType="multipart/form-data"
          method="POST"
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter item name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="hidden">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Category
              </label>
              <input
                type="text"
                name="category"
                value={Type}
                onChange={(e) => handleTypeChange(e.target.value, true)}
                placeholder="Enter item category"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {category === "Comics" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="Enter Genre"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            )}

            {(category === "Clothes" || category === "Shoes") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Small Size Stock
                  </label>
                  <input
                    type="text"
                    name="smallSize"
                    placeholder="Enter Stock"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Medium Size Stock
                  </label>
                  <input
                    type="text"
                    name="mediumSize"
                    placeholder="Enter Stock"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Large Size Stock
                  </label>
                  <input
                    type="text"
                    name="LargeSize"
                    placeholder="Enter Stock"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </>
            )}

            {category != "Clothes" && category != "Shoes" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter Item Description"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="comicsAndFigures"
                    min="1"
                    placeholder="Enter the item amount"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </>
            )}

            {category == "Clothes" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cloth Type
                </label>
                <input
                  type="text"
                  name="clothType"
                  placeholder="Enter Shirt, Pants etc"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product ID
              </label>
              <input
                type="text"
                name="id"
                placeholder="Enter product ID"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700 dark:text-gray-300 p-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                required
              />
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-purple-700 dark:hover:bg-purple-600"
            onClick={displayMessage}
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
