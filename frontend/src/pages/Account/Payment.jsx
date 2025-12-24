import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalQuantity, discount, totalBill,shipmentCharge } = location.state || {};

  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: ""  // Add the country field here
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
    form.pincode.trim().length === 6 &&
    isValidPhone() &&
    form.country.trim(); // Ensure country is also validated

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
;
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
          <h2 className="text-2xl paymentformtexts  font-bold mb-6">Shipping Details</h2>

          <div className="space-y-5">
            <div>
              <label className="block paymentformtexts font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
              />
            </div>

            <div>
              <label className="block paymentformtexts font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
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
              <label className="block paymentformtexts font-semibold mb-1">Contact Number</label>
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
              <label className="block paymentformtexts font-semibold mb-1">Address</label>
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
                <label className="block paymentformtexts font-semibold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Bangalore"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
                />
              </div>
              <div className="w-1/2">
                <label className="block paymentformtexts font-semibold mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Karnataka"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6B4743]"
                />
              </div>
            </div>
           <div div className="flex gap-4">
            <div className="w-1/2">
              <label className="block paymentformtexts font-semibold mb-1">Pincode</label>
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
              <label className="block paymentformtexts font-semibold mb-1">Country</label>
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
        <div className="bg-[#F3EEEA] p-7">
          <h3 className="paymentformtexts font-bold mb-4">Payment Summary</h3>
          <div className="mb-4 space-y-2">
            <div className="flex justify-between">
              <span className="paymentformtexts font-semibold">Total Items:</span>
              <span className="paymentformtexts font-semibold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="paymentformtexts font-semibold">Shipment charge:</span>
              <span className="paymentformtexts font-semibold">{shipmentCharge}</span>
            </div>
            <div className="flex justify-between">
              <span className="paymentformtexts font-semibold">Total Cost:</span>
              <span className="paymentformtexts font-semibold">Rs. {totalPrice?.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span className="paymentformtexts font-semibold">Discount Applied:</span>
                <span className="paymentformtexts font-semibold">- Rs. {discount.toFixed(2)}</span>
              </div>
            )}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span className="paymentformtexts">Total Bill:</span>
            <span className="paymentformtexts">Rs. {totalBill?.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`mt-6 w-full py-2 px-4 text-white rounded-md transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6B4743] hover:bg-[#5a3c38]"}`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
