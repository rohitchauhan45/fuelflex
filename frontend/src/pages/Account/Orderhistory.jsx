import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import { MdEmail, MdLogout } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion'; // Import motion for animations

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/history`, {
          withCredentials: true,
        });

        setOrders(response.data.orders);
        setEmail(response.data.email);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order history');
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });

      window.location.href = '/login';
      navigate("/login");
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#F3EEEA] py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <FaBoxOpen className="text-3xl text-indigo-600" />
            <h2 className="text-3xl font-extrabold text-gray-800">Your Orders</h2>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        </div>

        {email && (
          <motion.div className="flex items-center gap-2 text-gray-600 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <MdEmail className="text-lg text-gray-500" />
            <span className="text-sm">
              Logged in as: <span className="font-medium">{email}</span>
            </span>
          </motion.div>
        )}

        {loading ? (
          <motion.div
            className="flex items-center gap-2 text-gray-500 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ImSpinner2 className="text-xl animate-spin" />
            <span>Loading your orders...</span>
          </motion.div>
        ) : error ? (
          <motion.p
            className="text-red-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {error}
          </motion.p>
        ) : orders.length === 0 ? (
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            You have not placed any orders yet.
          </motion.p>
        ) : (
          <motion.ul
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {orders.map((order, index) => (
              <motion.li
                key={order._id}
                className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Order #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Total: <span className="font-medium text-gray-800">₹{order.totalBill}</span>
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {order.cartItems?.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Items Ordered:</p>
                    <div className="space-y-2 pl-2">
                      {order.cartItems.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-gray-600">
                          <span>{item.name}</span>
                          <span className="text-gray-500">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OrderHistory;
