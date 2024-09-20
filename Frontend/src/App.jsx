import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import Collections from "./collections/Collections";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Cart from "./components/Cart";
import SearchProvider from "./context/searchProvider.jsx";
import PurchaseHistory from "./components/PurchaseHistory.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Loader from "./components/Loader";

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 2-second loading delay
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SearchProvider>
        <div className={`bg-white text-black dark:bg-slate-900 dark:text-white`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/collection"
              element={
                authUser ? (
                  <Collections />
                ) : (
                  <Navigate to="/Signup" state={{ from: "/collection" }} />
                )
              }
            />
            <Route
              path="/purchaseHistory"
              element={
                authUser ? (
                  <PurchaseHistory />
                ) : (
                  <Navigate to="/Signup" state={{ from: "/purchaseHistory" }} />
                )
              }
            />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
          <Toaster />
        </div>
      </SearchProvider>
    </>
  );
}

export default App;
