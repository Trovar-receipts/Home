export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ backgroundColor: "#000D0F" }}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-light mb-2" style={{ color: "#F5F5F7" }}>Privacy Policy</h1>
        <p className="text-sm mb-12" style={{ color: "#8A8D8F" }}>Last updated: June 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "#8A8D8F" }}>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>1. Who we are</h2>
            <p>Trovar is a SaaS platform operated by Matthew Arnott (trading as Trovar) based in New Zealand. We provide automated invoice collection services for accounting firms in New Zealand and Australia.</p>
            <p className="mt-2">Contact: <a href="mailto:matt@trovar.co.nz" style={{ color: "#B6FF3B" }}>matt@trovar.co.nz</a></p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>2. What data we collect</h2>
            <p>We collect the following data when you use Trovar:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong style={{ color: "#F5F5F7" }}>Account data:</strong> Your name, email address, and accounting practice name when you sign up.</li>
              <li><strong style={{ color: "#F5F5F7" }}>Client data:</strong> Names and email addresses of clients you add to your practice account.</li>
              <li><strong style={{ color: "#F5F5F7" }}>OAuth tokens:</strong> Access tokens from connected platforms (Meta Ads, Google Ads, Adobe, Shopify) used solely to retrieve billing invoices on your behalf. We do not store passwords.</li>
              <li><strong style={{ color: "#F5F5F7" }}>Invoice data:</strong> Billing invoices retrieved from connected platforms including invoice ID, date, amount, currency, and description.</li>
              <li><strong style={{ color: "#F5F5F7" }}>Usage data:</strong> Basic usage information such as login times and feature usage to improve the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>3. How we use your data</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To provide the Trovar service: retrieving and displaying invoices from connected platforms</li>
              <li>To push invoices to your Xero account (when connected)</li>
              <li>To send you service notifications and product updates</li>
              <li>To improve the product based on usage patterns</li>
            </ul>
            <p className="mt-3">We do not sell your data to third parties. We do not use your data for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>4. Meta Platform data</h2>
            <p>When you connect a client's Meta Ads account, Trovar requests the following permissions:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong style={{ color: "#F5F5F7" }}>ads_read:</strong> To retrieve billing invoices and ad account information</li>
              <li><strong style={{ color: "#F5F5F7" }}>business_management:</strong> To access business-level invoice data</li>
            </ul>
            <p className="mt-3">We access only billing and invoice data. We do not read, store, or process ad creative, audience data, or personal data of people who have seen or interacted with ads.</p>
            <p className="mt-3">Meta platform data is used solely to retrieve invoices for accounting purposes. Data obtained through Meta APIs is not shared with third parties except as required to provide the service (e.g. pushing invoices to Xero at the user's direction).</p>
            <p className="mt-3">Users can revoke Meta access at any time by disconnecting the platform in Trovar or through their Meta Business Settings.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>5. Data storage and security</h2>
            <p>Your data is stored in Supabase (PostgreSQL) hosted on AWS in the Asia Pacific region. OAuth access tokens are stored encrypted. We use industry-standard security practices including HTTPS encryption for all data in transit.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>6. Data retention</h2>
            <p>We retain your data for as long as your account is active. If you cancel your account, we will delete your data within 30 days upon request. Invoice data may be retained for up to 7 years to comply with NZ IRD record-keeping requirements, unless you request earlier deletion.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>7. Your rights</h2>
            <p>Under the New Zealand Privacy Act 2020, you have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="mt-3">To exercise these rights, email <a href="mailto:matt@trovar.co.nz" style={{ color: "#B6FF3B" }}>matt@trovar.co.nz</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>8. Cookies</h2>
            <p>Trovar uses essential cookies only, for authentication and session management. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>9. Changes to this policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes by email. Continued use of Trovar after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3" style={{ color: "#F5F5F7" }}>10. Contact</h2>
            <p>For any privacy questions or concerns: <a href="mailto:matt@trovar.co.nz" style={{ color: "#B6FF3B" }}>matt@trovar.co.nz</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
