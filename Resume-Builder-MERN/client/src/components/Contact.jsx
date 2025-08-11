import React, { useState } from "react";

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Track input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Message sent! You rated us ${rating} star${rating !== 1 ? "s" : ""}.`
    );
  };

  const renderRatingStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        type="button"
        key={i + 1}
        className={`text-2xl transition-colors ${
          (hoverRating || rating) >= i + 1
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        aria-label={`${i + 1} Star${i > 0 ? "s" : ""}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 flex items-center justify-center px-4 pt-8 pb-[140px] sm:pt-12 sm:pb-[160px]">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="lg:col-span-7 relative overflow-hidden text-center lg:text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-blue-400/10 to-blue-800/5 -z-10"></div>

          <div className="inline-flex items-center bg-blue-600/10 text-blue-700 border border-blue-200 mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm font-semibold text-xs sm:text-sm">
            <span className="mr-2 text-blue-700 text-base sm:text-lg">✨</span>
            Let's Connect
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-blue-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            Get in
            <br />
            <span className="text-blue-600 italic">Touch</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-blue-700/80 mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Ready to transform your career? We're here to make it happen.
          </p>

          <div className="relative max-w-xs sm:max-w-sm mx-auto lg:mx-0 bg-white/60 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[2rem] sm:rounded-[3rem] blur-3xl opacity-20 -z-10"></div>
            <div className="text-center space-y-4 sm:space-y-6 relative z-10 border border-blue-500 rounded-lg p-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-2xl flex items-center justify-center mx-auto text-white text-2xl sm:text-3xl select-none">
                💬
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-1 sm:mb-2">
                  Quick Response
                </h3>
                <p className="text-blue-700 text-sm sm:text-base">
                  We reply within 30 minutes
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-blue-600">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
                <div className="w-px h-4 bg-blue-200"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 bg-white rounded-xl shadow-lg w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-indigo-600 text-center lg:text-left">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  fullName ? "text-indigo-600" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  fullName ? "border-indigo-600" : "border-gray-300"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  email ? "text-indigo-600" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  email ? "border-indigo-600" : "border-gray-300"
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  message ? "text-indigo-600" : "text-gray-700"
                }`}
              >
                Your Message
              </label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  message ? "border-indigo-600" : "border-gray-300"
                }`}
              ></textarea>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate our service?
              </label>
              <div className="flex space-x-1">{renderRatingStars()}</div>
              {rating === 0 && (
                <p className="text-red-500 mt-1 text-xs sm:text-sm">
                  Please select a rating
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition duration-300 transform hover:scale-[1.02]"
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
