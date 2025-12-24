import React from "react";

function Shipping() {
  return (
    <div className="w-full bg-[#F3EEEA] flex justify-center px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl w-full">
        {/* SEO Meta Tags */}
        <head>
          <title>Shipping Policy - Fuelflex</title>
          <meta
            name="description"
            content="Read Fuelflex's Shipping Policy. Find out about order processing, shipping rates, delivery times, and more. Contact us for any shipping-related inquiries."
          />
          <meta
            name="robots"
            content="index, follow"
          />
          <link rel="canonical" href="https://www.fuelflex.in/shipping-policy" />
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Shipping Policy",
              "provider": {
                "@type": "Organization",
                "name": "Fuelflex"
              },
              "url": "https://www.fuelflex.in/shipping-policy",
              "description": "Find details about Fuelflex's shipping policy including order processing, delivery time, and shipping rates."
            }
            `}
          </script>
        </head>

        <h1 className="text-3xl font-bold text-gray-900 text-center mt-4 mb-4">Shipping Policy</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-10">Last updated: April 12, 2025</p>

        <p className="mb-6 alldetailsdescription">
          This Shipping Policy outlines the terms and conditions regarding the shipping of our products to ensure a smooth and satisfactory experience for our customers. FIRST UNIFIED reserves the right to update or modify these terms and conditions at any time without prior notice.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2 alldetailsdescription">1. Order Processing</h2>
        <p className="mb-4 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">a. Processing Time:</strong> Orders are typically processed and dispatched within the same or the next business day (excluding weekends and holidays) after the order is placed and payment is confirmed. Delivering of the shipment is subject to the courier company or post office norms.
        </p>
        <p className="mb-6 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">b. Order Confirmation:</strong> Upon placing an order, you will receive an email confirmation with the details of your purchase and order number. Please review this confirmation for accuracy and contact us immediately if any corrections are needed.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">2. Shipping Methods</h2>
        <p className="mb-6 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">a. Domestic Shipping:</strong> Shipping times and costs are calculated at checkout based on the pincode submitted on the order page. Orders are shipped through registered domestic courier companies and/or registered Indian post only.
          <br />
          We envision to offer international shipping in the future.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">3. Shipping Rates</h2>
        <p className="mb-6 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">a. Domestic Rates:</strong> Domestic shipping rates are determined by the weight of the order and the selected shipping method. Free shipping may be available for orders over a certain value, as specified on our website.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">4. Shipment Tracking</h2>
        <p className="mb-4 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">a. Tracking Information:</strong> Once your order is dispatched, you will receive a shipping confirmation email with tracking information. You can use this information to track the status and location of your package.
        </p>
        <p className="mb-6 font-semibold alldetailsdescription">
          <strong className=" font-semibold alldetailsdescription">b. Delivery Updates:</strong> We recommend keeping an eye on the provided tracking information for real-time updates. In case of any issues, please contact our customer support team.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">5. Delivery Times</h2>
        <p className="mb-6 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">a. Estimated Times:</strong> Delivery of all orders will be to the address provided at checkout. FIRST UNIFIED is not responsible for any damage during transit. Estimated delivery times are shared during checkout but may vary due to external factors.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">6. Order Changes and Cancellations</h2>
        <p className="mb-4 alldetailsdescription">
          <strong className="alldetailsdescription font-semibold">a. Changes:</strong> Once an order is placed, changes to the shipping address, products, or other details may not be possible. Please review your order carefully before confirming.
        </p>
        <p className="mb-6 alldetailsdescription">
          <strong className="font-semibold alldetailsdescription">b. Cancellations:</strong> Orders cannot be canceled after they have been dispatched. If you wish to cancel, please contact us as soon as possible, and we’ll try our best to help.
        </p>

        <h2 className="text-xl font-bold alldetailsdescription mt-6 mb-2">7. Contact Us</h2>
        <p className="mb-6 alldetailsdescription">
          If you have any questions or concerns about our Shipping Policy, please contact us at <a href="tel:+919265067663" className="text-blue-600">+91 92650 67663</a> or email us at <a href="mailto:fuelflexindia@gmail.com" className="text-blue-600">fuelflexindia@gmail.com</a>.
        </p>

        <div className="text-gray-700 leading-relaxed">
          <p className="font-semibold alldetailsdescription">First Unified</p>
          <p className="alldetailsdescription">49, Ved Industrial Park-2,</p>
          <p className="alldetailsdescription">Bhuvaladi Gam Road, Kathwada,</p>
          <p className="alldetailsdescription">Ahmedabad - 382430</p>
          <p className="alldetailsdescription">+91 92650 67663</p>
          <p className="alldetailsdescription">fuelflexindia@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
