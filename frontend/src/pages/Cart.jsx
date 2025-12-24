import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeOne } from "../redux/action/cartAction";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length > 0) {
      storedCart.forEach((item) => dispatch(addToCart(item)));
    }
  }, []);
  

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeOne(id));
      setQuantities((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
      return;
    }
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = Number(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
    const itemQuantity = quantities[item.id] || item.quantity || 1;
    return total + itemPrice * itemQuantity;
  }, 0);

  const shipmentCharge = cartItems.reduce((total, item) => {
    if (item.name === "Cold pressed groundnut oil with pack of 15 kg") {
      const quantity = quantities[item.id] || item.quantity || 1;
      return total + quantity * 300; // 
    }
    if (item.name === "Groundnut Oil with pack of 15 kg") {
      const quantity = quantities[item.id] || item.quantity || 1;
      return total + quantity * 300; // 
    }
    if (item.name === "Sunflower Oil with pack of 15 litre") {
      const quantity = quantities[item.id] || item.quantity || 1;
      return total + quantity * 250; // 
    }
    return total;
  }, 0);

  const handlepromocode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(0.1 * totalPrice);
    } else if (promoCode === "SAVE20") {
      setDiscount(0.2 * totalPrice);
    } else {
      setDiscount(0);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0 || totalPrice === 0) {
      setDiscount(0);
      setPromoCode("");
    }
  }, [cartItems, totalPrice]);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + (quantities[item.id] || item.quantity || 1);
  }, 0);

  const totalBill = totalPrice - discount + shipmentCharge;

  return (
    <div className="bg-[#F3EEEA] py-6 sm:py-8 lg:py-12">
      <div className="max-w-full px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-[#F3EEEA] rounded-lg p-4 h-[500px] overflow-auto">
          <div className="grid grid-cols-5 gap-4 mb-2 font-semibold text-gray-700">
            <div className="carttexts font-bold">Item</div>
            <div className="carttexts font-bold">Item Name</div>
            <div className="carttexts font-bold text-center">Quantity</div>
            <div className="carttexts font-bold text-right">Total Price</div>
            <div></div>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-600 carttexts font-bold">No items in cart</p>
          ) : (
            cartItems.map((item) => {
              const itemPrice = Number(item.price.toString().replace(/[^0-9.]/g, "")) || 0;
              const itemQuantity = quantities[item.id] || item.quantity || 1;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-5 gap-4 py-2 border-b last:border-b-0 items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="mix-blend-darken w-16 h-16 object-cover rounded mr-2"
                    />
                  </div>

                  <div>
                    <p className="carttexts font-semibold">{item.name}</p>
                    <p className="carttexts text-sm">{item.category}</p>
                  </div>

                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, itemQuantity - 1)}
                      className={`rounded-md px-2 py-1 ${
                        itemQuantity === 1
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      disabled={itemQuantity === 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={itemQuantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity)) {
                          handleQuantityChange(item.id, newQuantity);
                        }
                      }}
                      className="carttexts w-10 px-2 py-1 border rounded-md text-center"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, itemQuantity + 1)}
                      className="bg-gray-200 text-gray-800 rounded-md px-2 py-1"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-gray-800 carttexts text-right">
                    Rs. {(itemPrice * itemQuantity).toFixed(2)}
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => dispatch(removeOne(item.id))}
                      className="text-red-500 carttexts text-2xl font-extrabold hover:text-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-[#F3EEEA] rounded-lg p-4 min-h-[300px]">
          <h3 className="text-gray-800 carttexts text-xl font-bold mb-4">
            Order Summary
          </h3>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="carttexts font-semibold"> Total Items:</span>
              <span className="carttexts font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="carttexts font-semibold">Total Cost:</span>
              <span className="carttexts font-semibold">Rs. {totalPrice.toFixed(2)}</span>
            </div>
            {shipmentCharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="carttexts font-semibold">Shipment Charges:</span>
                <span className="carttexts font-semibold">Rs. {shipmentCharge.toFixed(2)}</span>
              </div>
            )}
          </div>

          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <button
            onClick={handlepromocode}
            className="w-full py-2 px-4 bg-[#6B4743] text-white rounded-md hover:bg-[#5a3c38]"
          >
            Apply Promo Code
          </button>

          {discount > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <span className="carttexts font-semibold">Discount:</span>
              <span className="carttexts font-semibold">Rs. {discount.toFixed(2)}</span>
            </div>
          )}

          <hr className="my-4" />
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="carttexts font-semibold">Total Bill:</span>
            <span className="carttexts font-semibold">Rs. {totalBill.toFixed(2)}</span>
          </div>

          <button
            onClick={() =>
              navigate("/payment", {
                state: {
                  cartItems,
                  totalPrice,
                  totalQuantity,
                  shipmentCharge,
                  discount,
                  totalBill,
                },
              })
            }
            disabled={totalBill === 0}
            className={`mt-6 w-full py-2 px-4 rounded-md text-white transition-all duration-200 ${
              totalBill === 0
                ? "bg-[#6B4743]  cursor-not-allowed"
                : "bg-[#6B4743] hover:bg-[#5a3c38]"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
