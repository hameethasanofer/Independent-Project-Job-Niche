import React, { useState } from "react";

const Contact = () => {
  const [rating, setRating] = useState(0); // user-selected rating
  const [hoverRating, setHoverRating] = useState(0); // star hover effect

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent! You rated us ${rating} star${rating !== 1 ? "s" : ""}.`);
  };

  const handleSocialClick = (url) => {
    window.open(url, "_blank");
  };

  // Render stars for rating input (clickable)
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          type="button"
          key={i}
          className={`text-4xl ${
            (hoverRating || rating) >= i ? "text-orange-400" : "text-gray-300"
          } transition-colors`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`${i} Star${i > 1 ? "s" : ""}`}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-[120vh] bg-orange-50 flex items-center justify-center px-8 py-20">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl p-14 grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Contact Info */}
        <div>
          <h2 className="text-5xl font-bold text-orange-600 mb-6">Contact Us</h2>
          <p className="text-xl text-gray-700 mb-8">
            If you have any feedback or questions, feel free to get in touch with us.
          </p>

          <div className="flex items-center gap-5 mb-6">
            <div className="bg-orange-100 p-4 rounded-full text-2xl">📞</div>
            <a href="tel:0750662237" className="text-xl text-gray-800 hover:underline">
              Phone: 0750662237
            </a>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <div className="bg-orange-100 p-4 rounded-full text-2xl">📧</div>
            <a href="mailto:sksinthu15@gmail.com" className="text-xl text-gray-800 hover:underline">
              Email: sksinthu15@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <button
              onClick={() =>
                handleSocialClick("https://www.linkedin.com/in/abhijit-khyade-954b9324b")
              }
              className="bg-orange-100 p-4 rounded-full text-2xl"
              aria-label="LinkedIn"
            >
              🔗
            </button>
            <span className="text-xl text-gray-800">LinkedIn</span>
          </div>

          {/* Company Partners Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-4 text-orange-600">Our Partners</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full inline-block"></span>
                Partner One - Innovative Tech Solutions
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full inline-block"></span>
                Partner Two - Creative Marketing Co.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-orange-500 rounded-full inline-block"></span>
                Partner Three - Reliable IT Services
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-4xl font-semibold mb-6 text-orange-600">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="John hoe"
                required
                className="w-full border border-gray-300 rounded-lg px-5 py-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="JohnHoe@gmail.com"
                required
                className="w-full border border-gray-300 rounded-lg px-5 py-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Message</label>
              <textarea
                required
                placeholder="Type your message here.."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-5 py-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              ></textarea>
            </div>

            {/* Star Rating Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {renderRatingStars()}
              </div>
              {rating === 0 && (
                <p className="text-red-500 mt-1 text-sm">Please select a rating</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold px-8 py-3 rounded-lg transition"
              disabled={rating === 0} // disable submit until rating selected
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
