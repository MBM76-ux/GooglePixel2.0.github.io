const ContactPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen">

      <section className="flex justify-center items-center min-h-screen p-6">
        <form
          action="https://formspree.io/f/meernjjd"
          method="POST"
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input type="checkbox" required className="w-4 h-4 text-black border-gray-300 rounded" />
            <label className="ml-2 text-sm">Agree to terms</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

    </div>
  );
};

export default ContactPage;
