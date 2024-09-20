import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const PurchaseHistory = () => {
  const currEmail = useSelector((state) => state.email.currEmail);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get("http://localhost:3000/history/getfromDB");
        const data = res.data;

        const filteredData = data.filter((item) => item.email === currEmail);
        setHistory(filteredData);
      } catch (err) {
        setError(err);
      }
    };

    getHistory();
  }, [currEmail]);

  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-16">
      <Navbar />

      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Purchase History
        </h1>

        {history.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto shadow-lg rounded-lg">
            <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg">
              <thead className="sticky top-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Item
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {history.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 flex flex-col gap-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <img
                        src={
                          item.image ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt={item.name || "Item Image"}
                        className="w-20 object-cover shadow-lg"
                      />
                      <span className="px-3 py-1 rounded bg-pink-500 dark:text-white text-xs font-semibold w-fit">
                        {item.category}
                      </span>
                      <div></div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="p-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600 transition-colors duration-200">
                        Items: {item.noItem}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-4 py-2  text-white bg-black rounded-lg shadow dark:text-black dark:bg-white">
                        {item.price * item.noItem}$
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] bg-gray-700 rounded-lg">
            <p className="text-2xl text-red-500">
              No Purchase History Found
            </p>
            <span className="text-6xl mt-4">🛒</span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseHistory;
