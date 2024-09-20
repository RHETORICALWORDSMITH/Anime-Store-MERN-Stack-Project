import React from 'react'

const ViewOrders = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search"
            className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg w-1/2 md:w-1/3"
          />
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-sm font-medium dark:text-gray-300">Open For Order</span>
              <input type="checkbox" className="ml-2 toggle-checkbox" />
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="avatar.jpg"
                alt="User Avatar"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <span className="font-medium dark:text-gray-300">Lubomír Dvořák</span>
            </div>
          </div>
        </header>

        {/* Order History */}
        <section className="mt-8">
          <h1 className="text-xl md:text-2xl font-bold dark:text-white">Order History</h1>
          <div className="flex flex-wrap space-x-2 md:space-x-6 my-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded">All Orders</button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded">
              Summary
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded">
              Completed
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded">
              Cancelled
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <input type="date" className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg" />
            <span className="dark:text-gray-300">To</span>
            <input type="date" className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg" />
          </div>

          {/* Orders Table */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                <tr>
                  <th className="p-4 dark:text-gray-300">Id</th>
                  <th className="p-4 dark:text-gray-300">Name</th>
                  <th className="p-4 dark:text-gray-300">Payment</th>
                  <th className="p-4 dark:text-gray-300">Time remaining</th>
                  <th className="p-4 dark:text-gray-300">Type</th>
                  <th className="p-4 dark:text-gray-300">Status</th>
                  <th className="p-4 dark:text-gray-300">Total</th>
                  <th className="p-4 dark:text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-4 dark:text-gray-300">#2632</td>
                  <td className="p-4 flex items-center space-x-2 dark:text-gray-300">
                    <img src="avatar1.jpg" alt="avatar" className="w-6 h-6 rounded-full" />
                    <span>Brooklyn Zoe</span>
                  </td>
                  <td className="p-4 dark:text-gray-300">Cash</td>
                  <td className="p-4 dark:text-gray-300">13 min</td>
                  <td className="p-4 dark:text-gray-300">Delivery</td>
                  <td className="p-4 text-yellow-500 dark:text-yellow-400">Delivered</td>
                  <td className="p-4 dark:text-gray-300">£12.00</td>
                  <td className="p-4 relative">
                    <button className="text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5" fill="currentColor">{/* SVG path */}</svg>
                    </button>
                    {/* Action Dropdown */}
                    <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10 hidden">
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Refund
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Message
                      </a>
                    </div>
                  </td>
                </tr>
                {/* Repeat similar rows */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ViewOrders
