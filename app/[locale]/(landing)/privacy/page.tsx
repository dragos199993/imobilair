export default function Privacy() {
  return (
    <div className="container mx-auto rounded-lg py-12">
      <h1 className="mb-4 text-2xl font-semibold">Privacy Policy</h1>

      <ol className="list-decimal pl-6">
        <li className="mb-4">
          Introduction Welcome to <b>{process.env.NEXT_PUBLIC_APP_NAME}</b>{' '}
          (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed
          to protecting your privacy and providing you with a secure experience
          while using our AI services for real estate agents. This Privacy
          Policy outlines how we collect, use, disclose, and protect your
          personal information.
        </li>
        <li className="mb-4">
          Information We Collect
          <br />
          <span className="ml-4">2.1. Personal Information:</span>
          <ul className="ml-8 list-disc">
            <li>
              When you sign up for our services, we may collect your name, email
              address, and contact details.
            </li>
            <li>
              We may collect billing information, such as credit card details,
              to process payments.
            </li>
          </ul>
          <span className="ml-4">2.2. Usage Information:</span>
          <ul className="ml-8 list-disc">
            <li>
              We may collect information about how you use our services,
              including log data, device information, and usage patterns.
            </li>
          </ul>
        </li>
        <li className="mb-4">
          How We Use Your Information
          <br />
          <span className="ml-4">
            3.1. We use your personal information to:
          </span>
          <ul className="ml-8 list-disc">
            <li>Provide and improve our AI services.</li>
            <li>Process payments and communicate with you.</li>
            <li>
              Send you important updates, newsletters, and promotional
              materials.
            </li>
          </ul>
          <span className="ml-4">3.2. We may use usage information to:</span>
          <ul className="ml-8 list-disc">
            <li>Monitor and analyze the usage of our services.</li>
            <li>Improve the performance and functionality of our services.</li>
          </ul>
        </li>
        <li className="mb-4">
          Sharing Your Information
          <br />
          We may share your information with third parties only as necessary to
          provide our services or as required by law.
        </li>
        <li className="mb-4">
          Data Security
          <br />
          We take data security seriously and implement measures to protect your
          information. However, no method of transmission over the internet or
          electronic storage is 100% secure.
        </li>
        <li className="mb-4">
          Your Choices
          <br />
          You can access, update, or delete your personal information by
          contacting us. You may also unsubscribe from our marketing
          communications.
        </li>
        <li className="mb-4">
          Changes to this Privacy Policy
          <br />
          We may update this Privacy Policy to reflect changes in our practices
          or for other operational, legal, or regulatory reasons. We will notify
          you of any changes via email or on our website.
        </li>
      </ol>
    </div>
  )
}
