
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Buynow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQuantity } = location.state || {};

  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(location.state?.discount || 0);
  const [totalBill, setTotalBill] = useState(location.state?.totalBill || totalPrice);
  const [quantities, setQuantities] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    if (!cartItems) navigate("/cart");
    window.scrollTo(0, 0);
  }, [cartItems, navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = () => /^(\d{10,})$/.test(contact.replace(/\D/g, ""));

  const isFormComplete = () =>
    form.fullName.trim() &&
    validateEmail(form.email) &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.country.trim() &&
    form.pincode.trim().length === 6 &&
    isValidPhone();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const shipmentCharge = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || item.quantity || 1;
    if (
      item.name === "Cold pressed groundnut oil with pack of 15 kg" ||
      item.name === "Groundnut Oil with pack of 15 kg"
    ) {
      return total + quantity * 300;
    } else if (item.name === "Sunflower Oil with pack of 15 litre") {
      return total + quantity * 250;
    }
    return total;
  }, 0);

  const handleApplyPromo = () => {
    const validPromo = "SAVE10";
    if (promoApplied) {
      setPromoError("Promo code already applied.");
      return;
    }

    if (promoCode.trim().toUpperCase() === validPromo) {
      const discountAmount = totalPrice * 0.1;
      const newBill = totalPrice - discountAmount;

      setDiscount(discountAmount);
      setTotalBill(newBill);
      setPromoApplied(true);
      setPromoError("");
      toast.success("Promo code applied successfully!");
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
const handlePayment = async () => {
  if (loading) return;
  if (!isFormComplete()) {
    toast.error("Please fill all fields correctly before proceeding to payment.");
    return;
  }

  setLoading(true);

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error("Failed to load Razorpay. Please try again.");
    setLoading(false);
    return;
  }

  // ✅ Step 1: Create Razorpay order from backend
  let razorpayOrder;
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/order/create-razorpay-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalBill }),
    });

    if (!res.ok) throw new Error("Failed to create Razorpay order");
    razorpayOrder = await res.json(); // Contains order.id, amount, currency, etc.
  } catch (err) {
    console.error("Razorpay order creation failed:", err.message);
    toast.error("Failed to initiate payment. Try again.");
    setLoading(false);
    return;
  }

  // ✅ Step 2: Open Razorpay popup
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount, // already in paise
    currency: razorpayOrder.currency,
    name: "Your Store",
    description: "Order Payment",
    image: "/logo.png",
    order_id: razorpayOrder.id, // 🔥 MUST HAVE
    handler: async function (response) {
      const orderData = {
        paymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        cartItems,
        totalBill,
        shippingDetails: {
          fullName: form.fullName,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          country: form.country,
          contact: contact.replace(/\D/g, ""),
        },
      };

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orderData),
        });

        const contentType = res.headers.get("content-type");
        let data = contentType?.includes("application/json") ? await res.json() : await res.text();

        if (!res.ok) {
          console.error("Order API Error:", data);
          throw new Error(data?.message || "Order creation failed");
        }

        localStorage.removeItem("cartItems");
        toast.success("Order placed successfully!");

        setTimeout(() => {
          navigate("/shop", {
            state: {
              paymentId: orderData.paymentId,
              razorpayOrderId: orderData.razorpayOrderId,
              razorpaySignature: orderData.razorpaySignature,
              cartItems,
              totalBill,
              shippingDetails: orderData.shippingDetails,
            },
          });
        }, 2000);
      } catch (err) {
        console.error("Error storing order:", err.message);
        toast.error("Something went wrong while saving order.");
      }
    },
    prefill: {
      name: form.fullName,
      email: form.email,
      contact: contact.replace(/\D/g, ""),
    },
    theme: {
      color: "#6B4743",
    },
    modal: {
      ondismiss: () => {
        setLoading(false);
        toast.error("Payment cancelled.");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", function () {
    toast.error("Payment failed. Please try again.");
    setLoading(false);
  });

  rzp.open();
};



  

  return (
    <div className="bg-[#F3EEEA] py-6 sm:py-8 lg:py-12">
      <ToastContainer />
      <div className="max-w-full px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <div className="bg-[#F3EEEA] rounded-xl p-6 max-h-[85vh] overflow-y-auto">
          <h2 className="text-2xl buynowtexts font-bold text-gray-800 mb-6">Shipping Details</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm buynowtexts font-semibold mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
            </div>

            <div>
              <label className="block text-sm buynowtexts font-semibold mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
              {form.email && !validateEmail(form.email) && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
              )}
            </div>

            <div>
              <label className="block text-sm buynowtexts font-semibold mb-1">Contact Number</label>
              <PhoneInput
                country={"in"}
                value={contact}
                onChange={setContact}
                inputStyle={{
                  backgroundColor: "#F3EEEA",
                  width: "100%",
                  height: "38px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                }}
              />
              {contact && !isValidPhone() && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid contact number (min 10 digits).</p>
              )}
            </div>

            <div>
              <label className="block text-sm buynowtexts font-semibold mb-1">Address</label>
              <textarea
                name="address"
                rows={3}
                placeholder="123 Main Street, Apt 45, Some Area, Landmark"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743] resize-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block buynowtexts text-sm font-semibold mb-1">City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="Bangalore"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
                />
              </div>
              <div className="w-1/2">
                <label className="block buynowtexts text-sm font-semibold mb-1">State</label>
                <input
                  name="state"
                  type="text"
                  placeholder="Karnataka"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
                />
              </div>
            </div>

            <div div className="flex gap-4">
            <div className="w-1/2">
              <label className="block buynowtwexts text-sm font-semibold mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="560001"
                maxLength={6}
                value={form.pincode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
            </div>

            {/* Add Country Field */}
            <div className="w-1/2">
              <label className="block buynowtexts text-sm font-semibold  mb-1">Country</label>
              <input
                type="text"
                name="country"
                placeholder="India"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
            </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="#bg-[#F3EEEA] p-6">
          <h3 className="text-gray-800 buynowtexts text-xl font-bold mb-4">Payment Summary</h3>

          <div className="mb-4">
            <label className="block text-sm buynowtexts font-semibold mb-1">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                placeholder="Enter promo code"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="bg-[#6B4743] text-white px-4 py-2 rounded-md hover:bg-[#5a3c38] disabled:opacity-60"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-red-600 text-sm mt-1">{promoError}</p>}
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="buynowtexts font-semibold">Total Items:</span>
              <span className="buynowtexts font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="buynowtexts font-semibold">Total Cost:</span>
              <span className="buynowtexts font-semibold">Rs. {totalPrice?.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span className="buynowtexts font-semibold">Discount Applied:</span>
                <span className="buynowtexts font-semibold">- Rs. {discount.toFixed(2)}</span>
              </div>
            )} {shipmentCharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="carttexts font-semibold">Shipment Charges:</span>
                <span className="carttexts font-semibold">Rs. {shipmentCharge.toFixed(2)}</span>
              </div>
            )}
          </div>

          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span className="buynowtexts font-semibold">Total Bill:</span>
            <span className="buynowtexts font-semibold">Rs.  ₹{(totalPrice + shipmentCharge - discount).toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`mt-6 w-full py-2 px-4 text-white rounded-md transition duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6B4743] hover:bg-[#5a3c38]"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buynow;
