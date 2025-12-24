import React from "react";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Fuellex</title>
        <meta
          name="description"
          content="Learn how Fuellex collects, uses, and shares your personal information. Read our full Privacy Policy for more details."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="w-full bg-[#F3EEEA] px-4 sm:px-8 py-10 flex justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-sm text-center mb-8">Last updated: April 12, 2025</p>

          <p className="mb-4 alldetailsdescription font-medium">
            This Privacy Policy describes how Fuelflex (“we”, “us”, or “our”) collects, uses, and discloses your personal
            information when you visit, use our services, or make a purchase from fuelflex.in (the “Site”). By using any
            of our services, you agree to this Privacy Policy.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Changes to This Privacy Policy</h2>
          <p className="mb-4 alldetailsdescription">
            We may update this Privacy Policy from time to time. We'll post any changes on this page with an updated
            "Last updated" date.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">How We Collect and Use Your Personal Information</h2>
          <p className="mb-4 alldetailsdescription">
            We collect your personal information to provide and improve our services. This may include communicating with
            you, processing orders, or fulfilling legal obligations.
          </p>

          <h3 className="text-xl alldetailsdescription font-bold mt-6 mb-2">Information You Provide:</h3>
          <ul className="list-disc alldetailsdescription list-inside mb-4">
            <li className="alldetailsdescription">Contact details (name, address, phone, email)</li>
            <li className="alldetailsdescription">Order details (shipping/billing address, payment confirmation)</li>
            <li className="alldetailsdescription">Account credentials (username, password)</li>
            <li className="alldetailsdescription">Customer support communication</li>
          </ul>

          <h3 className="text-xl alldetailsdescription font-bold mt-6 mb-2">Information We Collect Automatically:</h3>
          <p className="mb-4 alldetailsdescription">
            We may collect usage data via cookies and similar technologies, including your IP address, device info, and
            interaction with our site.
          </p>

          <h3 className="text-xl alldetailsdescription font-bold mt-6 mb-2">Information from Third Parties:</h3>
          <p className="mb-4 alldetailsdescription">
            We may collect personal info from vendors and partners like Shopify and payment processors, who help us operate
            and improve our services.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside mb-4">
            <li className="alldetailsdescription">To provide products/services and fulfill contracts</li>
            <li className="alldetailsdescription">For marketing and advertising purposes</li>
            <li className="alldetailsdescription">To prevent fraud and ensure security</li>
            <li className="alldetailsdescription">To communicate with you and improve services</li>
          </ul>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Cookies</h2>
          <p className="mb-4 alldetailsdescription">
            We use cookies to enhance user experience and analyze website usage. You can manage cookie preferences through
            your browser. See{" "}
            <a href="https://www.shopify.com/legal/cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Shopify's Cookie Policy
            </a>
            .
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">How We Share Personal Information</h2>
          <ul className="list-disc list-inside mb-4">
            <li className="alldetailsdescription">With vendors, partners, and service providers</li>
            <li className="alldetailsdescription">As required by law or to protect our rights</li>
            <li className="alldetailsdescription">In business transfers (e.g., mergers or acquisitions)</li>
            <li className="alldetailsdescription">With your consent or at your direction</li>
          </ul>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">User-Generated Content</h2>
          <p className="mb-4 alldetailsdescription">
            If you submit public reviews or content, they will be visible to others. We are not responsible for how others
            use this data.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Third Party Links</h2>
          <p className="mb-4 alldetailsdescription">
            Our site may contain links to external sites. Please review their privacy policies separately—we are not
            responsible for their practices.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Children’s Data</h2>
          <p className="mb-4 alldetailsdescription">
            We do not knowingly collect data from children. If a child has submitted information, contact us to delete it.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Security and Data Retention</h2>
          <p className="mb-4 alldetailsdescription">
            We implement safeguards to protect your data but cannot guarantee absolute security. We retain information as
            long as necessary to fulfill the purposes outlined in this policy.
          </p>

          <h2 className="text-2xl alldetailsdescription font-bold mt-10 mb-3">Your Rights</h2>
          <ul className="list-disc list-inside mb-4 alldetailsdescription">
            <li className="alldetailsdescription">Right to access and know your data</li>
            <li className="alldetailsdescription">Right to correct or delete personal information</li>
            <li className="alldetailsdescription">Right to data portability and restriction of processing</li>
            <li className="alldetailsdescription">Right to withdraw consent</li>
            <li className="alldetailsdescription">Right to manage marketing preferences</li>
          </ul>

          <p className="mt-8 alldetailsdescription">
            If you have any questions or concerns about our privacy practices, feel free to contact us using the contact
            details provided on our website.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
