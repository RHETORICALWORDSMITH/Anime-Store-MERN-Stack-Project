import React from "react";
import Navbar from "./Navbar";
import CartCards from "./CartCards";

import Footer from "./Footer";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mb-32 mt-16">
        <CartCards />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
