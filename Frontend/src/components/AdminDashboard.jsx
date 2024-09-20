import React, { useState } from "react";
import AddItem from "./AddItem";
import Navbar from "./Navbar";
import DeleteItem from "./DeleteItem";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("add-item");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar when a section is selected
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row lg:flex-row xl:flex-row bg-gray-500 dark:bg-gray-800 relative mt-20">
        {/* Mobile Trigger Button */}
        <button
          onClick={toggleSidebar}
          className={`lg:hidden md:hidden w-fit h-fit  left-4 p-2 bg-blue-600 text-white rounded-md shadow-md ${
            sidebarOpen ? "sticky top-24 z-50" : "relative top-4"
          }`}
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`lg:w-64 w-3/4 fixed lg:static inset-0 lg:translate-x-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 shadow-lg transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="pt-10">
            <h1 className="text-3xl font-bold mb-10 mt-20">Admin Dashboard</h1>
            <nav className="space-y-4">
              <button
                onClick={() => handleSectionChange("add-item")}
                className={`block w-full text-left p-4 text-black dark:text-white rounded-lg transition-colors duration-300 ${
                  activeSection === "add-item"
                    ? "bg-pink-500 "
                    : "bg-pink-700 hover:bg-pink-500"
                }`}
              >
                Add Item
              </button>
              <button
                onClick={() => handleSectionChange("delete-item")}
                className={`block w-full text-left p-4 text-black dark:text-white rounded-lg transition-colors duration-300 ${
                  activeSection === "delete-item"
                    ? "bg-pink-500 "
                    : "bg-pink-700 hover:bg-pink-500"
                }`}
              >
                Delete Item
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 bg-gray-500 dark:bg-gray-800 shadow-inner">
          {activeSection === "add-item" && <AddItem />}
          {activeSection === "delete-item" && <DeleteItem />}
        </main>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          ></div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
