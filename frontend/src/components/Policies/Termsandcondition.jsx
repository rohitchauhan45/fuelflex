import React from "react";
import { Helmet } from "react-helmet";

function Termsandcondition() {
  return (
    <div className="w-full min-h-screen alldetailsdescription bg-[#F3EEEA] px-4 sm:px-6 lg:px-8 py-12 flex justify-center overflow-y-auto">
      <div className="max-w-7xl w-full">
        {/* SEO Meta Tags */}
        <Helmet>
          <title>Terms and Conditions | Fuelflex</title>
          <meta
            name="description"
            content="Read the Terms and Conditions for using Fuelflex services and products. Understand our policies and legal agreements to ensure a safe and secure experience."
          />
        </Helmet>

        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Last updated: April 12, 2025
        </p>

        <div className="space-y-8 alldetailsdescription text-sm leading-relaxed">
          <p className="alldetailsdescription">
            These Terms of Service ("Terms") constitute a legal agreement between you and Fuelflex ("we", "us", "our"), governing your use of our website, www.fuelflex.in (the “Site”). By accessing or using our Site, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not access the Site.
          </p>

          {/* List of Terms */}
          {[
            ["1. Online Store Terms", "By agreeing to these Terms, you affirm that you are of legal age in your jurisdiction to enter into a binding contract."],
            ["2. General Conditions", "We reserve the right to refuse service to anyone for any reason at any time."],
            ["3. Accuracy, Completeness, and Timeliness of Information", "We strive to provide accurate, current, and complete information on our Site."],
            ["4. Modifications to the Service and Prices", "Prices for our products are subject to change without notice."],
            ["5. Products or Services", "Certain products or services may be available exclusively online through the Site."],
            ["6. Accuracy of Billing and Account Information", "We reserve the right to refuse any order you place with us."],
            ["7. Optional Tools", "We may provide you with access to third-party tools over which we neither monitor nor have any control."],
            ["8. Third-Party Links", "Certain content, products, and services available via our Service may include materials from third-parties."],
            ["9. User Comments, Feedback and Other Submissions", "If you send creative ideas or suggestions, we may use them without restriction."],
            ["10. Personal Information", "Your submission of personal information through the store is governed by our Privacy Policy."],
            ["11. Errors, Inaccuracies and Omissions", "Occasionally there may be information that contains typographical errors or inaccuracies."],
            ["12. Prohibited Uses", "You are prohibited from using the Site for unlawful purposes or to violate any laws."],
            ["13. Disclaimer of Warranties; Limitation of Liability", "We do not guarantee that your use of our Service will be uninterrupted or error-free."],
            ["14. Indemnification", "You agree to indemnify and hold harmless Fuelflex and our affiliates from any claim or demand."],
            ["15. Severability", "If any provision is found to be unlawful or unenforceable, it shall still be enforceable to the fullest extent allowed."],
            ["16. Termination", "These Terms are effective unless and until terminated by either you or us."],
            ["17. Entire Agreement", "These Terms and any policies posted constitute the entire agreement between you and us."],
            ["18. Governing Law", "These Terms shall be governed by and construed in accordance with the laws of India."],
            ["19. Changes to Terms of Service", "We reserve the right to update, change or replace any part of these Terms."],
            ["20. Contact Information", "Questions about the Terms of Service should be sent to us at fuelflexindia@gmail.com."],
          ].map(([title, content], index) => (
            <div key={index}>
              <h2 className="font-bold alldetailsdescription text-base mb-2">{title}</h2>
              <p className="font-semibold alldetailsdescription">{content}</p>
            </div>
          ))}
        </div>

        {/* Internal Link for better SEO and User Navigation */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            For more information, you can visit our <a href="/privacy" className="text-blue-600">Privacy Policy</a> .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Termsandcondition;
